var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
import { CoreFunction, CorePlugin } from '../core/decorators';
import { Signal } from '../signals';
import { Plugin } from './Plugin';
export var InputController;
(function (InputController) {
    InputController["Keyboard"] = "keyboard";
    InputController["Gamepad"] = "gamepad";
    InputController["Mouse"] = "mouse";
    InputController["Touch"] = "touch";
})(InputController || (InputController = {}));
export var ActionContext;
(function (ActionContext) {
    ActionContext["General"] = "general";
    ActionContext["Menu"] = "menu";
    ActionContext["Game"] = "game";
})(ActionContext || (ActionContext = {}));
export var Action;
(function (Action) {
    Action["Up"] = "up";
    Action["Down"] = "down";
    Action["Left"] = "left";
    Action["Right"] = "right";
    Action["Action"] = "action";
    Action["Next"] = "next";
    Action["Back"] = "back";
    Action["Pause"] = "pause";
    Action["Unpause"] = "unpause";
    Action["Start"] = "start";
    Action["Menu"] = "menu";
})(Action || (Action = {}));
const defaultActions = [
    Action.Up,
    Action.Down,
    Action.Left,
    Action.Right,
    Action.Action,
    Action.Pause,
    Action.Unpause,
    Action.Start,
    Action.Menu,
    Action.Back,
    Action.Next,
];
const defaultOptions = {
    actions: defaultActions,
};
let InputManager = class InputManager extends Plugin {
    id = 'InputManager';
    // properties
    activeGamepads = new Map();
    activeControllers = new Set([]);
    options;
    // signals
    onGamepadConnected = new Signal();
    onGamepadDisconnected = new Signal();
    onControllerActivated = new Signal();
    onControllerDeactivated = new Signal();
    onContextChanged = new Signal();
    // private properties
    _context = ActionContext.General;
    _actionSignals = new Map();
    get context() {
        return this._context;
    }
    set context(context) {
        if (this._context === context) {
            return;
        }
        this._context = context;
        this.onContextChanged.emit(context);
    }
    async initialize(app, options = defaultOptions) {
        this.options = { ...defaultOptions, ...options };
        app.stage.eventMode = 'static';
        app.stage.on('touchstart', this._onTouchStart);
        app.stage.on('globalmousemove', this._onMouseMove);
        window.addEventListener('keydown', this._onKeyDown);
        window.addEventListener('gamepadconnected', this._onGamepadConnected);
        window.addEventListener('gamepaddisconnected', this._onGamepadDisconnected);
    }
    destroy() {
        // unregister all event listeners
        this.app.stage.off('touchstart', this._onTouchStart);
        this.app.stage.off('globalmousemove', this._onMouseMove);
        window.removeEventListener('keydown', this._onKeyDown);
        window.removeEventListener('gamepadconnected', this._onGamepadConnected);
        window.removeEventListener('gamepaddisconnected', this._onGamepadDisconnected);
        super.destroy();
    }
    isControllerActive(controller) {
        return this.activeControllers.has(controller);
    }
    isGamepadActive(gamepad) {
        return this.activeGamepads.has(gamepad.id);
    }
    actions(action) {
        if (!this._actionSignals.has(action)) {
            this._actionSignals.set(action, new Signal());
        }
        return this._actionSignals.get(action);
    }
    sendAction(actionId, data) {
        this.actions(actionId).emit({ id: actionId, context: this.context, data });
    }
    setActionContext(context) {
        this.context = context;
    }
    _activateController(inputController) {
        if (this.activeControllers.has(inputController)) {
            return;
        }
        this.activeControllers.add(inputController);
        // emit the controller activated signal
        this.onControllerActivated.emit(inputController);
    }
    _deactivateController(inputController) {
        const wasControllerActive = this.activeControllers.has(inputController);
        if (!wasControllerActive) {
            return;
        }
        this.activeControllers.delete(inputController);
        // emit the controller deactivated signal
        this.onControllerDeactivated.emit(inputController);
    }
    _activateGamepad(gamepad) {
        this.activeGamepads.set(gamepad.id, gamepad);
    }
    _deactivateGamepad(gamepadId) {
        this.activeGamepads.delete(gamepadId);
    }
    _onTouchStart() {
        this._activateController(InputController.Touch);
    }
    _onMouseMove() {
        this._activateController(InputController.Mouse);
    }
    _onKeyDown() {
        this._activateController(InputController.Keyboard);
    }
    _onGamepadConnected(event) {
        this._activateController(InputController.Gamepad);
        // add the gamepad id just in case we need it (?)
        this._activateController(event.gamepad.id);
        this._activateGamepad(event.gamepad);
        // emit the gamepad connected signal
        this.onGamepadConnected.emit(event.gamepad);
    }
    _onGamepadDisconnected(event) {
        // remove the gamepad
        this._deactivateGamepad(event.gamepad.id);
        // pause the game any time there is a controller disconnect
        this.sendAction(Action.Pause);
        // emit the gamepad disconnected signal
        this.onGamepadDisconnected.emit(event.gamepad);
        // check if all gamepads are disconnected
        if (this.activeGamepads.size === 0) {
            this._deactivateController(InputController.Gamepad);
        }
    }
};
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Boolean)
], InputManager.prototype, "isControllerActive", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Gamepad]),
    __metadata("design:returntype", Boolean)
], InputManager.prototype, "isGamepadActive", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], InputManager.prototype, "actions", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_a = typeof T !== "undefined" && T) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], InputManager.prototype, "sendAction", null);
__decorate([
    CoreFunction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InputManager.prototype, "setActionContext", null);
InputManager = __decorate([
    CorePlugin
], InputManager);
export { InputManager };
