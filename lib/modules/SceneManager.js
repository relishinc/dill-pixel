var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Container } from 'pixi.js';
import { Application } from '../core/Application';
import { CoreModule } from '../core/decorators';
import { Signal } from '../signals';
import { Logger } from '../utils/console/Logger';
import { isDev } from '../utils/env';
import { getDynamicModuleFromImportListItem } from '../utils/framework';
import { bindAllMethods } from '../utils/methodBinding';
import { createQueue } from '../utils/promise/Queue';
import { Module } from './Module';
let SceneManager = class SceneManager extends Module {
    constructor() {
        super();
        this.id = 'SceneManager';
        this.onSceneChangeStart = new Signal();
        this.onSceneChangeComplete = new Signal();
        // view container - gets added to the stage
        this.view = new Container();
        // maybe the user wants the enter animation to be different for the first scene
        this.isFirstScene = true;
        // scene management
        this.scenes = [];
        this._sceneModules = new Map();
        //
        this._lastScene = null;
        this._defaultLoadMethod = 'immediate';
        bindAllMethods(this);
    }
    setDefaultLoadMethod(method) {
        this._defaultLoadMethod = method;
    }
    destroy() { }
    initialize(app) {
        this.view.sortableChildren = true;
        this.scenes = app.config?.scenes || [];
        if (isDev) {
            this.defaultScene = this._getSceneFromHash() || '';
        }
        this.defaultScene = this.defaultScene || app.config?.defaultScene || this.scenes?.[0]?.id;
        this._defaultLoadMethod = app.config.defaultSceneLoadMethod || 'immediate';
        Logger.log('SceneManager initialize::', this.scenes);
        if (this.app.config?.showSceneDebugMenu === true || (isDev && this.app.config?.showSceneDebugMenu !== false)) {
            this._createDebugMenu();
        }
        return Promise.resolve(undefined);
    }
    async loadDefaultScene() {
        return this.loadScene(this.defaultScene);
    }
    async loadScene(sceneIdOrLoadSceneConfig) {
        if (this._queue) {
            // TODO: maybe allow halting the queue and starting a fresh scene load
            // for now, just ignore the request until the queue finishes
            return;
        }
        this._lastScene = null;
        const newSceneId = typeof sceneIdOrLoadSceneConfig === 'string' ? sceneIdOrLoadSceneConfig : sceneIdOrLoadSceneConfig.id;
        const method = typeof sceneIdOrLoadSceneConfig === 'string'
            ? this._defaultLoadMethod
            : sceneIdOrLoadSceneConfig?.method || this._defaultLoadMethod;
        if (this.currentScene) {
            this._lastScene = this.currentScene;
        }
        // check if the scene item exists
        const sceneItem = this.scenes.find((scene) => scene.id === newSceneId);
        if (!sceneItem) {
            throw new Error(`Scene item not found  for id ${newSceneId}`);
        }
        this._currentSceneId = newSceneId;
        // found a scene item
        this._queue = createQueue(this._createCurrentScene);
        // TODO: finish adding scene changing behaviours
        // TODO: add loading assets into this queue
        // TODO: add progress updates
        switch (method) {
            case 'exitEnter':
                this._queue.add(this._exitLastScene, this._destroyLastScene, this._initializeCurrentScene, this._addCurrentScene, this._enterCurrentScene, this._startCurrentScene);
                break;
            case 'enterExit':
                this._queue.add(this._initializeCurrentScene, this._addCurrentScene, this._enterCurrentScene, this._startCurrentScene, this._destroyLastScene);
                break;
            case 'enterBehind':
                this._queue.add(this._initializeCurrentScene, this._addCurrentSceneBehind, this._enterCurrentScene, this._exitLastScene, this._destroyLastScene, this._startCurrentScene);
                break;
            default:
                this._queue.add(this._destroyLastScene, this._initializeCurrentScene, this._addCurrentScene, this._enterCurrentScene, this._startCurrentScene);
                break;
        }
        this._queue.add(this._queueComplete);
        this._queue.start();
    }
    async _createCurrentScene() {
        const sceneItem = this.scenes.find((scene) => scene.id === this._currentSceneId);
        let SceneClass = undefined;
        if (this._sceneModules.has(this._currentSceneId)) {
            SceneClass = this._sceneModules.get(this._currentSceneId);
        }
        else {
            const module = await getDynamicModuleFromImportListItem(sceneItem);
            if (!module) {
                throw new Error(`Couldn't load ${this._currentSceneId}"`);
            }
            if (module[this._currentSceneId]) {
                SceneClass = module[this._currentSceneId];
            }
            else {
                SceneClass = module;
            }
            if (SceneClass) {
                this._sceneModules.set(this._currentSceneId, SceneClass);
            }
        }
        if (!SceneClass) {
            throw new Error(`Couldn't load ${this._currentSceneId}"`);
        }
        this.currentScene = new SceneClass();
        this.currentScene.id = this._currentSceneId;
        this.onSceneChangeStart.emit({ exiting: this._lastScene?.id || null, entering: this.currentScene.id });
    }
    _queueComplete() {
        this.isFirstScene = false;
        this._lastScene = null;
        this.onSceneChangeComplete.emit({ current: this.currentScene.id });
        this._queue = null;
        return Promise.resolve();
    }
    async _destroyLastScene() {
        if (!this._lastScene) {
            return Promise.resolve();
        }
        this.view.removeChild(this._lastScene);
        this._lastScene.destroy();
        return Promise.resolve();
    }
    async _exitLastScene() {
        if (!this._lastScene) {
            return Promise.resolve();
        }
        await this._lastScene.exit();
        return Promise.resolve();
    }
    async _initializeCurrentScene() {
        await this.currentScene.initialize();
        this.currentScene.resize(this.app.size);
        return Promise.resolve();
    }
    _addCurrentScene() {
        this.view.addChild(this.currentScene);
        return Promise.resolve();
    }
    _addCurrentSceneBehind() {
        this.view.addChildAt(this.currentScene, 0);
        return Promise.resolve();
    }
    async _enterCurrentScene() {
        await this.currentScene.enter();
        return Promise.resolve();
    }
    async _startCurrentScene() {
        void this.currentScene.start();
        return Promise.resolve();
    }
    _createDebugMenu() {
        this._debugMenu = document.createElement('div');
        this._debugMenu.style.cssText =
            'position: absolute; bottom: 0; left: 0; z-index: 1000; background-color: rgba(0,0,0,0.8); color: white; padding: 10px; border-top-right-radius:8px';
        (Application.containerElement || document.body).appendChild(this._debugMenu);
        const sceneSelect = document.createElement('select');
        sceneSelect.style.cssText = 'width: 100%; padding:4px; border-radius:5px;';
        sceneSelect.value = this.defaultScene || '';
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.innerHTML = 'Select a scene';
        sceneSelect.appendChild(defaultOption);
        this.scenes.forEach((value) => {
            const option = document.createElement('option');
            option.value = value.id;
            option.innerHTML = value.id;
            if (value.id === this.defaultScene) {
                option.selected = true;
            }
            sceneSelect.appendChild(option);
        });
        this._debugMenu.appendChild(sceneSelect);
        this._debugMenu.addEventListener('change', (e) => {
            if (this._queue) {
                e.preventDefault();
                return;
            }
            const target = e.target;
            const sceneId = target.value;
            if (sceneId) {
                window.location.hash = sceneId.toLowerCase();
            }
        });
        window.addEventListener('hashchange', () => {
            const sceneId = this._getSceneFromHash();
            if (sceneId) {
                this.loadScene(sceneId);
            }
        });
    }
    _getSceneFromHash() {
        let hash = window?.location?.hash;
        if (hash) {
            hash = hash.replace('#', '');
            if (hash.length > 0) {
                for (let i = 0; i < this.scenes.length; i++) {
                    if (this.scenes[i]?.id?.toLowerCase() === hash.toLowerCase()) {
                        return this.scenes[i].id;
                    }
                }
            }
        }
        return null;
    }
};
SceneManager = __decorate([
    CoreModule,
    __metadata("design:paramtypes", [])
], SceneManager);
export { SceneManager };
//# sourceMappingURL=SceneManager.js.map