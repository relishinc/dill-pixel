import { Application as PIXIPApplication, AssetsManifest, Point } from 'pixi.js';
import { Size } from '../../utils';
import { ActionSignal, IAssetsPlugin, IAudioManagerPlugin, IFocusManagerPlugin, Ii18nPlugin, IInputPlugin, IKeyboardPlugin, IPlugin, IPopupManagerPlugin, IResizerPlugin, ISceneManagerPlugin, IWebEventsPlugin, ActionContext } from '../../plugins';
import { IStore } from '../../store';
import { Signal } from '../../signals';
import { IApplicationOptions } from './IApplicationOptions';
import { AppConfig } from '../types';
import { ICoreSignals } from './ICoreSignals';
import { ICoreFunctions } from './ICoreFunctions';

export interface IApplication extends PIXIPApplication {
    config: Partial<IApplicationOptions>;
    readonly size: Size;
    readonly center: Point;
    manifest: AssetsManifest | string | undefined;
    assets: IAssetsPlugin;
    scenes: ISceneManagerPlugin;
    webEvents: IWebEventsPlugin;
    keyboard: IKeyboardPlugin;
    focus: IFocusManagerPlugin;
    popups: IPopupManagerPlugin;
    audio: IAudioManagerPlugin;
    i18n: Ii18nPlugin;
    resizer: IResizerPlugin;
    input: IInputPlugin;
    store: IStore;
    actionContext: string | ActionContext;
    onPause: Signal<() => void>;
    onResume: Signal<() => void>;
    readonly appName: string;
    readonly appVersion: string | number;
    signal: ICoreSignals;
    func: ICoreFunctions;
    exec: ICoreFunctions;
    actions(action: string): ActionSignal;
    initialize(config: AppConfig): Promise<IApplication>;
    postInitialize(): Promise<void>;
    getPlugin<T extends IPlugin>(name: string): T;
    setContainer(container: HTMLElement): void;
}
//# sourceMappingURL=IApplication.d.ts.map