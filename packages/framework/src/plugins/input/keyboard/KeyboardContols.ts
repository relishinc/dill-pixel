import { Application } from '../../../Application';
import { WithSignals } from '../../../mixins';
import { bindAllMethods } from '../../../utils';
import type { Action } from '../../actions';
import { normalizeKey, type KeyboardEventDetail } from '../../KeyboardPlugin';
import { AbstractControls } from '../AbstractControls';
import type { ControlsActionMap, KeyboardControlsMap, KeyboardControlsScheme } from '../types';

export class KeyboardControls extends WithSignals(AbstractControls) {
  protected scheme: Partial<KeyboardControlsMap>;
  private _keyDownMap: Partial<KeyboardControlsScheme>;
  private _keyUpMap: Partial<KeyboardControlsScheme>;
  private _keyCombinations: string[][] = [];
  private _singleDownKeys: Set<string> = new Set();
  private _keyCombinationsMap: Map<string[], Action> = new Map();
  private _activeDownKeys: Map<string, Action> = new Map();
  private _activeUpKeys: Map<string, Action> = new Map();

  constructor() {
    super();
    bindAllMethods(this);
  }

  get app() {
    return Application.getInstance();
  }

  isActionActive(action: Action): boolean {
    const controlsAction = this.scheme['down']?.[action] ?? null;
    if (!controlsAction) {
      return false;
    }
    if (Array.isArray(controlsAction)) {
      return (
        this._keyCombinationsMap.has(controlsAction) || controlsAction.some((key) => this._singleDownKeys.has(key))
      );
    } else {
      return this._singleDownKeys.has(controlsAction);
    }
  }

  public initialize(scheme: Partial<KeyboardControlsMap>): void {
    super.initialize(scheme as Partial<ControlsActionMap>);
    this._keyDownMap = scheme.down || {};
    this._keyUpMap = scheme.up || {};
    this._sortActions();
  }

  public connect() {
    this.addSignalConnection(
      this.app.signal.onActionContextChanged.connect(this._handleContextChanged),
      this.app.keyboard.onKeyDown().connect(this._handleKeyDown),
      this.app.keyboard.onKeyUp().connect(this._handleKeyUp),
    );
    this.app.ticker.add(this._update);
  }

  private _sortActions() {
    const actions = this.app.actionsPlugin.getActions();
    this._keyCombinations = [];
    this._keyCombinationsMap.clear();
    this._activeDownKeys.clear();
    this._activeUpKeys.clear();
    let keys = Object.keys(this._keyDownMap);

    keys.forEach((key) => {
      const item = this._keyDownMap[key];
      const action = actions[key];
      if (
        action.context !== '*' &&
        action.context !== this.app.actionContext &&
        !action.context.includes(this.app.actionContext)
      ) {
        return;
      }
      let input = item;
      if (input) {
        if (!Array.isArray(input)) {
          input = [input];
        }
        input.forEach((inputString: string) => {
          if (inputString.includes('+')) {
            const combo = inputString.split('+');
            this._keyCombinations.push(combo);
            this._keyCombinationsMap.set(combo, key as Action);
          } else {
            this._activeDownKeys.set(inputString, key as Action);
          }
        });
      }
    });

    // sort them from the largest to smallest
    this._keyCombinations.sort((a, b) => b.length - a.length);

    keys = Object.keys(this._keyUpMap);
    keys.forEach((key) => {
      const item = this._keyUpMap[key];
      let input = item;
      if (input) {
        if (!Array.isArray(input)) {
          input = [input];
        }
        input.forEach((inputString: string) => {
          this._activeUpKeys.set(inputString, key as Action);
        });
      }
    });

    //Logger.log('keyDownMap', this._keyDownMap, 'activeDownKeys', this._activeDownKeys);
    //Logger.log('keyUpMap', this._keyUpMap, 'activeUpKeys', this._activeUpKeys);
  }

  private _handleContextChanged() {
    this._getPossibleActions();
  }

  private _getPossibleActions() {
    this._sortActions();
  }

  private _handleKeyDown(detail: KeyboardEventDetail): void {
    const key = normalizeKey(detail.event.key);
    this._singleDownKeys.add(key);
  }

  private _handleKeyUp(detail: KeyboardEventDetail): void {
    const key = normalizeKey(detail.event.key);
    this._singleDownKeys.delete(key);

    const action = this._activeUpKeys.get(key);
    if (action) {
      this.app.action(action, { combination: false, inputState: 'up', key });
    }
  }

  private _update() {
    if (!this.app.keyboard) {
      return;
    }
    const keysDown = this.app.keyboard.keysDown;
    if (keysDown.size === 0) {
      return;
    }
    const eliminated = new Set<string>();
    // this._keyCombinations is already sorted from largest to smallest
    for (let i = 0; i < this._keyCombinations.length; i++) {
      const combination = this._keyCombinations[i];
      // check if all of the keys in the combination are down
      if (combination.some((key) => eliminated.has(key))) {
        continue;
      }
      if (combination.every((key) => keysDown.has(key))) {
        combination.forEach((key) => eliminated.add(key));
        // send the action
        const action = this._keyCombinationsMap.get(combination);
        if (action) {
          this.app.action(action, {
            key: combination,
            combination: true,
            inputState: 'down',
          });
        }
      }
    }

    // order doesn't matter here
    this._singleDownKeys.forEach((key) => {
      if (eliminated.has(key)) {
        return;
      }
      if (keysDown.has(key)) {
        const action = this._activeDownKeys.get(key);
        if (action) {
          this.app.action(action, { key, combination: false, inputState: 'down' });
        }
      }
    });
  }
}
