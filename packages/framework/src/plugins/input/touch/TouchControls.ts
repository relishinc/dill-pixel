import { AbstractControlScheme, ControlsActionMap } from '../interfaces';
import { bindAllMethods } from '../../../utils';

import { AbstractControls } from '../AbstractControls';
import type { Action } from '../actions';
import { Application } from '../../../Application';
import { WithSignals } from '../../../mixins';
import type { ITouchControlScheme } from './interfaces';
import type { IButton, IJoystick } from '../../../ui';

type TouchControlsActionData = {
  button?: string | string[];
  combination?: boolean;
  inputState?: 'up' | 'down' | 'joystick';
};

export class TouchControls extends WithSignals(AbstractControls) {
  declare scheme: AbstractControlScheme<'down' | 'up' | 'joystick'>;
  private _buttons: Set<IButton> = new Set();
  private _joystickMap: ControlsActionMap;
  private _buttonDownMap: ControlsActionMap;
  private _buttonUpMap: ControlsActionMap;
  private _combinations: string[][] = [];
  private _singleDownButtons: Set<string> = new Set();
  private _combinationsMap: Map<string[], string> = new Map();

  constructor() {
    super();
    bindAllMethods(this);
  }

  private _joystick: IJoystick;

  get joystick(): IJoystick {
    return this._joystick;
  }

  set joystick(value: IJoystick) {
    this._joystick = value;
  }

  get app() {
    return Application.getInstance();
  }

  addButton(button: IButton) {
    if (!button || this._buttons.has(button)) {
      return;
    }
    this.addSignalConnection(
      button.onDown.connect(() => this._handleButtonDown(button)),
      button.onUp.connect(() => this._handleButtonUp(button)),
      button.onUpOutside.connect(() => this._handleButtonUp(button)),
      button.onDestroy.connect(() => this.removeButton(button)),
    );
    this._buttons.add(button);
  }

  removeButton(button: IButton) {
    if (!button || !this._buttons.has(button)) {
      return;
    }
    button.onDown.disconnect(() => this._handleButtonDown(button));
    button.onUp.disconnect(() => this._handleButtonUp(button));
    button.onUpOutside.disconnect(() => this._handleButtonUp(button));
    button.onDestroy.disconnect(() => this.removeButton(button));
    this._buttons.delete(button);
  }

  public initialize(scheme: ITouchControlScheme): void {
    super.initialize(scheme);
    this._buttonDownMap = scheme.down || {};
    this._buttonUpMap = scheme.up || {};
    this._joystickMap = scheme.joystick || {};
    this._sortCombinations();
  }

  public connect() {
    this.app.ticker.add(this._update);
  }

  isActionActive(action: Action): boolean {
    const buttonAction = this.scheme['down']?.[action] ?? null;
    if (buttonAction) {
      if (Array.isArray(buttonAction.input)) {
        return this._combinationsMap.has(buttonAction.input);
      } else {
        return this._singleDownButtons.has(buttonAction.input);
      }
    } else {
      const joystickAction = this.scheme['joystick']?.[action] ?? null;
      if (joystickAction) {
        if (Array.isArray(joystickAction.input)) {
          return joystickAction.input.includes(this._joystick.direction);
        } else {
          return joystickAction?.input === this._joystick?.direction;
        }
      }
    }
    return false;
  }

  private _sortCombinations() {
    this._combinations = [];
    this._combinationsMap.clear();
    const buttons = Object.keys(this._buttonDownMap);
    buttons.forEach((key) => {
      const item = this._buttonDownMap[key];
      if (item.context !== '*' && !item.context.includes(this.app.input.context)) {
        return;
      }
      let input = item.input;
      if (!Array.isArray(input)) {
        input = [input];
      }
      input.forEach((inputString) => {
        if (inputString.includes('+')) {
          const combo = inputString.split('+');
          this._combinations.push(combo);
          this._combinationsMap.set(combo, inputString);
        }
      });
    });
    // sort them from the largest to smallest
    this._combinations.sort((a, b) => b.length - a.length);
  }

  private _handleContextChanged() {
    this._getPossibleActions();
  }

  private _getPossibleActions() {
    this._sortCombinations();
  }

  private _handleButtonDown(button: IButton): void {
    this._singleDownButtons.add(button.id!);
  }

  private _handleButtonUp(button: IButton): void {
    this._singleDownButtons.delete(button.id!);
    this._maybeTriggerAction(button.id!, this._buttonUpMap, {
      combination: false,
      inputState: 'up',
      button: button.id!,
    });
  }

  private _update() {
    if (!this.app.keyboard) {
      return;
    }
    const joystickDirection = this._joystick?.direction ?? null;
    const buttonsDown = this._singleDownButtons;
    const eliminated = new Set<string>();
    // this._combinations is already sorted from largest to smallest
    for (let i = 0; i < this._combinations.length; i++) {
      const combination = this._combinations[i];
      // check if all of the keys in the combination are down
      if (combination.some((key) => eliminated.has(key))) {
        continue;
      }
      if (combination.every((key) => buttonsDown.has(key) || joystickDirection === key)) {
        combination.forEach((key) => eliminated.add(key));
        // send the action
        const action = this._combinationsMap.get(combination);
        if (action) {
          this._maybeTriggerAction(action, this._buttonDownMap, {
            button: combination,
            combination: true,
            inputState: 'down',
          });
        }
      }
    }

    // order doesn't matter here
    this._singleDownButtons.forEach((id) => {
      if (eliminated.has(id)) {
        return;
      }
      if (buttonsDown.has(id)) {
        this._maybeTriggerAction(id, this._buttonDownMap, {
          button: id,
          combination: false,
          inputState: 'down',
        });
      }
    });

    // joustick dir
    if (joystickDirection) {
      this._maybeTriggerAction(joystickDirection, this._joystickMap, {
        inputState: 'joystick',
      });
    }
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

  private _maybeTriggerAction(actionKey: string, actionMap: ControlsActionMap, data: TouchControlsActionData): void {
    const action = this._findAction(actionKey, actionMap);
    if (action) {
      this.app.exec.sendAction(action, data);
    }
  }
}
