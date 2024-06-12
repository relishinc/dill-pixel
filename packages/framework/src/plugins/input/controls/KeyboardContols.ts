import { AbstractControlScheme, ControlsActionMap, IKeyboardControlScheme } from './interfaces';
import { bindAllMethods } from '../../../utils';

import { AbstractControls } from './AbstractControls';
import { Action } from '../actions';
import { Application } from '../../../Application';
import { KeyboardEventDetail } from '../../KeyboardPlugin';
import { WithSignals } from '../../../mixins';

type KeyboardControlsActionData = {
  key: string | string[];
  combination: boolean;
  inputState: 'up' | 'down';
};

export class KeyboardControls extends WithSignals(AbstractControls) {
  declare scheme: AbstractControlScheme<'down' | 'up'>;
  private _keyDownMap: ControlsActionMap;
  private _keyUpMap: ControlsActionMap;
  private _keyCombinations: string[][] = [];
  private _singleDownKeys: Set<string> = new Set();
  private _keyCombinationsMap: Map<string[], string> = new Map();

  constructor() {
    super();
    bindAllMethods(this);
  }

  get app() {
    return Application.getInstance();
  }

  public initialize(scheme: IKeyboardControlScheme): void {
    super.initialize(scheme);
    this._keyDownMap = scheme.down || {};
    this._keyUpMap = scheme.up || {};
    this._sortKeysIntoCombinationsAndSingles();
  }

  public connect() {
    this.addSignalConnection(
      this.app.input.onContextChanged.connect(this._handleContextChanged),
      this.app.keyboard.onKeyDown().connect(this._handleKeyDown),
      this.app.keyboard.onKeyUp().connect(this._handleKeyUp),
    );
    this.app.ticker.add(this._update);
  }

  private _sortKeysIntoCombinationsAndSingles() {
    this._keyCombinations = [];
    this._keyCombinationsMap.clear();
    const keys = Object.keys(this._keyDownMap);
    keys.forEach((key) => {
      const item = this._keyDownMap[key];
      if (item.context !== '*' && item.context.includes(this.app.input.context)) {
        return;
      }
      if (key.includes('+')) {
        const combo = key.split('+');
        this._keyCombinations.push(combo);
        this._keyCombinationsMap.set(combo, key);
      }
    });
    // sort them from the largest to smallest
    this._keyCombinations.sort((a, b) => b.length - a.length);
  }

  private _handleContextChanged() {
    this._getPossibleActions();
  }

  private _getPossibleActions() {
    this._sortKeysIntoCombinationsAndSingles();
  }

  private _handleKeyDown(detail: KeyboardEventDetail): void {
    const key = detail.event.key;
    this._singleDownKeys.add(key);
  }

  private _handleKeyUp(detail: KeyboardEventDetail): void {
    const key = detail.event.key;
    this._singleDownKeys.delete(key);
    this._maybeTriggerAction(key, this._keyUpMap, { combination: false, inputState: 'up', key });
  }

  private _update() {
    if (!this.app.keyboard) {
      return;
    }
    const keysDown = this.app.keyboard.keysDown;
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
          this._maybeTriggerAction(action, this._keyDownMap, {
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
        this._maybeTriggerAction(key, this._keyDownMap, { key, combination: false, inputState: 'down' });
      }
    });
  }

  private _findAction(actionKey: string, actionMap: ControlsActionMap): Action | string | null {
    const context = this.app.input.context;
    for (const key in actionMap) {
      const item = actionMap[key];
      const inputMatch = item.input === actionKey || (Array.isArray(item.input) && item.input.includes(actionKey));
      if (item.context === '*' && inputMatch) {
        return key;
      } else if (item.context.includes(context) && inputMatch) {
        return key;
      }
    }
    return null;
  }

  private _maybeTriggerAction(actionKey: string, actionMap: ControlsActionMap, data: KeyboardControlsActionData): void {
    const action = this._findAction(actionKey, actionMap);
    if (action) {
      this.app.exec.sendAction(action, data);
    }
  }
}
