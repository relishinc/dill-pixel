import { Container } from 'pixi.js';
import { IApplication } from '../core/Application';
import { IScene, Scene } from '../display/Scene';
import { Signal } from '../signals';
import { ImportList } from '../utils/types';
import type { IModule } from './Module';
import { Module } from './Module';
export interface ISceneManager extends IModule {
    isFirstScene: boolean;
    onSceneChangeStart: Signal<(detail: {
        exiting: string | null;
        entering: string;
    }) => void>;
    onSceneChangeComplete: Signal<(detail: {
        current: string;
    }) => void>;
    loadScreen?: Scene;
    view: Container;
    scenes: ImportList<IScene>;
    setDefaultLoadMethod(method: LoadSceneMethod): void;
    loadDefaultScene(): Promise<void>;
    loadScene(sceneIdOrLoadSceneConfig: LoadSceneConfig | string): Promise<void>;
}
export type LoadSceneMethod = 'immediate' | 'exitEnter' | 'enterExit' | 'enterBehind' | 'interStitialExitEnter' | 'exitInterstitialEnter';
export type LoadSceneConfig = {
    id: string;
    method?: LoadSceneMethod;
};
export declare class SceneManager extends Module implements ISceneManager {
    readonly id: string;
    onSceneChangeStart: Signal<(detail: {
        exiting: string | null;
        entering: string;
    }) => void>;
    onSceneChangeComplete: Signal<(detail: {
        current: string;
    }) => void>;
    loadScreen?: Scene;
    view: Container;
    isFirstScene: boolean;
    scenes: ImportList<IScene>;
    currentScene: IScene;
    defaultScene: string;
    private _sceneModules;
    private _lastScene;
    private _queue;
    private _defaultLoadMethod;
    private _currentSceneId;
    private _debugMenu;
    constructor();
    setDefaultLoadMethod(method: LoadSceneMethod): void;
    destroy(): void;
    initialize(app: IApplication): Promise<void>;
    loadDefaultScene(): Promise<void>;
    loadScene(sceneIdOrLoadSceneConfig: string): Promise<void>;
    private _createCurrentScene;
    private _queueComplete;
    private _destroyLastScene;
    private _exitLastScene;
    private _initializeCurrentScene;
    private _addCurrentScene;
    private _addCurrentSceneBehind;
    private _enterCurrentScene;
    private _startCurrentScene;
    private _createDebugMenu;
    private _getSceneFromHash;
}
//# sourceMappingURL=SceneManager.d.ts.map