import { IApplication } from '../core/Application';
import { Signal } from '../signals';
import { IPlugin, Plugin } from './Plugin';

export type ActionsList = string[];
export declare enum InputController {
    Keyboard = "keyboard",
    Gamepad = "gamepad",
    Mouse = "mouse",
    Touch = "touch"
}
export type InputManagerOptions = {
    actions?: ActionsList;
};
export type ActionSignal<T = any> = Signal<(detail: ActionDetail<T>) => void>;
export interface IInputPlugin extends IPlugin {
    activeGamepads: Map<string, Gamepad>;
    activeControllers: Set<string>;
    options: InputManagerOptions;
    onGamepadConnected: Signal<(gamepad: Gamepad) => void>;
    onGamepadDisconnected: Signal<(gamepad: Gamepad) => void>;
    onControllerActivated: Signal<(controller: string) => void>;
    onControllerDeactivated: Signal<(controller: string) => void>;
    onContextChanged: Signal<(context: string | ActionContext) => void>;
    context: string | ActionContext;
    actions(action: string): ActionSignal;
    sendAction(action: string, data?: any): void;
    isControllerActive(controller: InputController): boolean;
    isGamepadActive(gamepad: Gamepad): boolean;
}
export declare enum ActionContext {
    General = "general",
    Menu = "menu",
    Game = "game"
}
export declare enum Action {
    Up = "up",
    Down = "down",
    Left = "left",
    Right = "right",
    Action = "action",
    Next = "next",
    Back = "back",
    Pause = "pause",
    Unpause = "unpause",
    Start = "start",
    Menu = "menu"
}
export type ActionDetail<T = any> = {
    id: string;
    context: string | ActionContext;
    data?: T;
};
export declare class InputPlugin extends Plugin implements IInputPlugin {
    readonly id = "input";
    activeGamepads: Map<string, Gamepad>;
    activeControllers: Set<string>;
    options: InputManagerOptions;
    onGamepadConnected: Signal<(gamepad: Gamepad) => void>;
    onGamepadDisconnected: Signal<(gamepad: Gamepad) => void>;
    onControllerActivated: Signal<(controller: string) => void>;
    onControllerDeactivated: Signal<(controller: string) => void>;
    onContextChanged: Signal<(context: string | ActionContext) => void>;
    private _actionSignals;
    private _context;
    get context(): string | ActionContext;
    set context(context: string | ActionContext);
    initialize(app: IApplication, options?: InputManagerOptions): Promise<void>;
    destroy(): void;
    isControllerActive(controller: InputController): boolean;
    isGamepadActive(gamepad: Gamepad): boolean;
    actions<T = any>(action: string): ActionSignal<T>;
    sendAction<T = any>(actionId: string, data?: T): void;
    setActionContext(context: string | ActionContext): string;
    protected getCoreFunctions(): string[];
    protected getCoreSignals(): string[];
    private _activateController;
    private _deactivateController;
    private _activateGamepad;
    private _deactivateGamepad;
    private _onTouchStart;
    private _onMouseMove;
    private _onKeyDown;
    private _onGamepadConnected;
    private _onGamepadDisconnected;
}
//# sourceMappingURL=InputPlugin.d.ts.map