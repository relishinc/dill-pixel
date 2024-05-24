import { Container } from 'pixi.js';
import { IApplication } from '../core';
import { IScene } from '../display';
import { Signal } from '../signals';
import { SceneImportList } from '../utils';
import { IPlugin, Plugin } from './Plugin';

export interface ISceneManagerPlugin extends IPlugin {
    isFirstScene: boolean;
    onSceneChangeStart: Signal<(detail: {
        exiting: string | null;
        entering: string;
    }) => void>;
    onSceneChangeComplete: Signal<(detail: {
        current: string;
    }) => void>;
    loadScreen?: IScene;
    view: Container;
    scenes: SceneImportList<IScene>;
    setDefaultLoadMethod(method: LoadSceneMethod): void;
    loadDefaultScene(): Promise<void>;
    loadScene(sceneIdOrLoadSceneConfig: LoadSceneConfig | string): Promise<void>;
}
export type LoadSceneMethod = 'immediate' | 'exitEnter' | 'enterExit' | 'enterBehind' | 'interStitialExitEnter' | 'exitInterstitialEnter';
export type LoadSceneConfig = {
    id: string;
    method?: LoadSceneMethod;
};
export declare class SceneManagerPlugin extends Plugin implements ISceneManagerPlugin {
    readonly id: string;
    onSceneChangeStart: Signal<(detail: {
        exiting: string | null;
        entering: string;
    }) => void>;
    onSceneChangeComplete: Signal<(detail: {
        current: string;
    }) => void>;
    loadScreen?: IScene;
    view: Container;
    isFirstScene: boolean;
    scenes: SceneImportList<IScene>;
    currentScene: IScene;
    defaultScene: string;
    private _sceneModules;
    private _lastScene;
    private _queue;
    private _defaultLoadMethod;
    private _currentSceneId;
    private _debugVisible;
    private _debugMenu;
    private _sceneSelect;
    constructor();
    setDefaultLoadMethod(method: LoadSceneMethod): void;
    destroy(): void;
    initialize(app: IApplication): Promise<void>;
    loadDefaultScene(): Promise<void>;
    loadScene(sceneIdOrLoadSceneConfig: string): Promise<void>;
    protected getCoreSignals(): string[];
    protected getCoreFunctions(): string[];
    private _createCurrentScene;
    private _queueComplete;
    private _destroyLastScene;
    private _exitLastScene;
    private _loadCurrentScene;
    private _unloadLastScene;
    private _initializeCurrentScene;
    private _addCurrentScene;
    private _addCurrentSceneBehind;
    private _enterCurrentScene;
    private _startCurrentScene;
    private _createDebugMenu;
    private _enableDebugMenu;
    private _disableDebugMenu;
    private _getSceneFromHash;
}
//# sourceMappingURL=SceneManagerPlugin.d.ts.map