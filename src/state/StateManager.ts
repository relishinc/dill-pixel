import {Point} from 'pixi.js';
import {Dictionary} from 'typescript-collections';
import {Application} from '../core';
import {hideLoadScreen, initState, loadAssets, showLoadScreen, stateTransitionHalted, unloadAssets} from '../functions';
import {Container} from '../gameobjects';
import {AssetMap, AssetMapData, LoadToken} from '../load';
import {Signals} from '../signals';
import {delay} from '../utils';
import * as LogUtils from '../utils/LogUtils';
import {State} from './State';
import {StateToken} from './StateToken';
import {TransitionStep} from './TransitionStep';
import * as TransitionType from './TransitionType';

/**
 * Holds construction details about a state.
 */
interface IStateData {
  create: () => State;
}

export function transitionToState(
  stateIdAndData: string | typeof State | { id: string; data: any },
  loadScreen?: string | undefined,
  transitionSteps?: TransitionStep[],
): boolean {
  return Application.getInstance().state.transitionTo(stateIdAndData, loadScreen, transitionSteps);
}

/**
 * Manages all states.
 * @extends Container
 */
export class StateManager<T extends Application = Application> extends Container<T> {
  /**
   * Cached size of the game.
   */
  private _size: Point;
  /**
   * Flag for state transitions.
   */
  private _isTransitioning: boolean;
  /**
   * Dictionary of all registered states.
   */
  private _stateData: Dictionary<string, IStateData>;

  private _firstStateId: string;
  /**
   * The current active state.
   */
  private _currentState: State | undefined;
  /**
   * The id of the current active state.
   */
  private _currentStateId: string = 'undefined';
  /**
   * The new state.
   */
  private _newState: State | undefined;
  /**
   * Construction data for the current active state.
   */
  private _currentStateData: IStateData | undefined;
  /**
   * Construction data for the queued next state.
   */
  private _newStateData: IStateData | undefined;
  /**
   * The id of the queued next state. Currently only used for debugging purposes.
   */
  private _queuedStateId: string = 'undefined';
  /**
   * The current active load screen.
   */
  private _loadScreen: string | undefined;
  /**
   * The current transtion step index.
   */
  private _transitionStepIndex: number;
  /**
   * The StateToken for the state to transition to.
   */
  private _newStateToken: StateToken | undefined;
  /**
   * Flag for simultaneous state animation race condition check.
   */
  private _simultaneousCheckAnimInComplete: boolean;
  /**
   * Flag for simultaneous state animation race condition check.
   */
  private _simultaneousCheckAnimOutComplete: boolean;

  /**
   * The internal flag for print log statements.
   */
  private _debug: boolean = false;

  private _first: boolean = true;
  private _firstComplete: boolean = false;
  private _hashChangeListener: boolean = false;

  private _defaultStateId?: string | undefined;

  private _defaultTransitionType: TransitionStep[] = TransitionType.TRANSITION_ANIM_NEW_IN_FRONT;

  private _useHash = false;
  private _useDebugMenu = false;
  private _statesMenu: HTMLDivElement;
  private _excluded: string[] = [];

  constructor(private _app: Application) {
    super();
    this._size = new Point();
    this._stateData = new Dictionary<string, IStateData>();
    this._isTransitioning = false;
    this._simultaneousCheckAnimInComplete = false;
    this._simultaneousCheckAnimOutComplete = false;
    this._transitionStepIndex = 0;

    this.bindMethods('onStateLoadRequested');

    this.addSignalConnection(Signals.loadState.connect(this.onStateLoadRequested));
  }

  public set useHash(value: boolean) {
    this._useHash = value;
    if (this._useHash) {
      this.listenForHashChange();
    }
  }

  public set useDebugMenu(value: boolean) {
    this._useDebugMenu = value;
    if (this._useDebugMenu) {
      this.useHash = true;
      this.showDebugMenu();
    }
  }

  set defaultTransitionType(transitionType: TransitionStep[]) {
    this._defaultTransitionType = transitionType;
  }

  public get default() {
    return this._defaultStateId;
  }

  /**
   * Enabling this will print all debug logs.
   */
  public set debug(pEnabled: boolean) {
    this._debug = pEnabled;
  }

  // get the current state
  public get current(): State | undefined {
    return this._currentState;
  }

  public get currentId(): string {
    return this._currentStateId;
  }

  /**
   * Updates the current active state.
   * @param deltaTime ticker.shared.elapsedMS / 1000.
   */
  public update(deltaTime: number): void {
    if (this._currentState !== undefined) {
      this._currentState.update(deltaTime);
    }
  }

  /**
   * Called when the window is resized.
   * @param size The new size.
   */
  public onResize(size: Point): void {
    this._size.copyFrom(size);

    if (this._currentState !== undefined) {
      this._currentState.size = this._size;
      this._currentState.positionSelfCenter(this._size);
      this._currentState.onResize(this._size);
    }
  }

  /**
   * Registers a state so that it can be transitioned to.
   * @param stateIdOrClass The id of the new state or the class of the new state.
   * @param creationMethod A function that constructs the state.
   * @param autoAddAssets whether to automatically register the asset group for this state - only works if stateIdOrClass is a class
   */
  public register(
    stateIdOrClass: string | typeof State<T> | typeof State,
    creationMethod?: () => State<T>,
    autoAddAssets: boolean = true,
  ) {
    if (typeof stateIdOrClass === 'string') {
      this._stateData.setValue(stateIdOrClass, { create: creationMethod as () => State<T> });
    } else {
      const Klass: typeof State = stateIdOrClass as typeof State;
      // @ts-ignore
      this._stateData.setValue(Klass.NAME, { create: () => new Klass() });
      if (autoAddAssets) {
        this.app.addAssetGroup(stateIdOrClass);
      }
    }

    if (!this._firstStateId) {
      this._firstStateId = this._stateData.keys()[0];
    }
  }

  public statesRegistered() {
    const defaultState = this.app.defaultState || this._firstStateId;
    if (typeof defaultState === 'string') {
      this._defaultStateId = defaultState;
    } else {
      const Klass: typeof State = defaultState as typeof State;
      this._defaultStateId = Klass.NAME;
    }
  }

  public showDebugMenu() {
    this._statesMenu = document.createElement('div');
    this._statesMenu.style.cssText =
      'position: absolute; bottom: 0; left: 0; z-index: 1000; background-color: rgba(0,0,0,0.8); color: white; padding: 10px; border-top-right-radius:8px';

    (Application.containerElement || document.body).appendChild(this._statesMenu);

    const statesList = document.createElement('select');
    statesList.style.cssText = 'width: 100%; padding:4px; border-radius:5px;';
    statesList.value = this._defaultStateId || '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.innerHTML = 'Select a game state';

    statesList.appendChild(defaultOption);

    const states = this._stateData.keys();
    states.forEach((pStateId: string) => {
      if (this._excluded.indexOf(pStateId) !== -1) {
        return;
      }
      const option = document.createElement('option');
      option.value = pStateId;
      option.innerHTML = pStateId;
      if (pStateId === this._defaultStateId) {
        option.selected = true;
      }
      statesList.appendChild(option);
    });

    this._statesMenu.appendChild(statesList);

    this._statesMenu.addEventListener('change', (e: Event) => {
      if (this._isTransitioning) {
        e.preventDefault();
        return;
      }
      const target = e.target as HTMLSelectElement;
      const stateId = target.value;
      if (stateId) {
        window.location.hash = stateId.toLowerCase();
      }
    });

    this.app.signals.stateTransitionStart.connect((stateId) => {
      setTimeout(() => {
        // set the selected state in the menu
        const select = this._statesMenu.querySelector('select');
        if (select) {
          select.value = stateId;
          select.options[select.selectedIndex].selected = true;
        }
      }, 100);
    });
  }

  /**
   * Method to transition states
   * instead call this.app.state.transitionTo(stateId, loadScreenId)
   * @param stateIdAndData
   * @param loadScreen
   * @param transitionSteps
   */
  public transitionTo(
    stateIdAndData: string | typeof State<T> | { id: string; data: any },
    loadScreen?: string | undefined,
    transitionSteps?: TransitionStep[],
  ): boolean {
    if (this._isTransitioning) {
      return false;
    }
    const stateObj = stateIdAndData as { id: string; data: any };
    const stateStr: string | typeof State = stateIdAndData as string | typeof State;

    if (!transitionSteps) {
      transitionSteps = this._first ? TransitionType.TRANSITION_FIRST_VIEW : this._defaultTransitionType;
    }
    this._first = false;

    let token: StateToken;
    const newLoadScreen = loadScreen || this.app.load.defaultLoadScreenId;

    if (stateObj?.id) {
      token = new StateToken(stateObj, newLoadScreen, ...transitionSteps);
    } else {
      if (typeof stateStr === 'string') {
        token = new StateToken(stateStr, newLoadScreen, ...transitionSteps);
      } else {
        const Klass: typeof State = stateStr as typeof State;
        token = new StateToken(Klass.NAME, newLoadScreen, ...transitionSteps);
      }
    }

    this._newStateToken = token;
    this.startTransition(token.stateId, token.loadScreen);

    return true;
  }

  public getRegisteredStateIds(): string[] {
    return this._stateData.keys();
  }

  public getStateFromHash(): string | null {
    let hash = window?.location?.hash;
    if (hash) {
      hash = hash.replace('#', '');
      const registeredStates = this.getRegisteredStateIds();
      if (hash.length > 0) {
        for (let i = 0; i < registeredStates.length; i++) {
          if (registeredStates[i]?.toLowerCase() === hash.toLowerCase()) {
            return registeredStates[i];
          }
        }
      }
    }
    return null;
  }

  public excludeFromDebugList(name: string) {
    this._excluded.push(name);
  }

  protected listenForHashChange() {
    if (!this._hashChangeListener) {
      this._hashChangeListener = true;
      window.addEventListener('hashchange', () => {
        const stateId = this.getStateFromHash();
        if (stateId) {
          this.transitionTo(stateId);
        }
      });
    }
  }

  /**
   * Transitions to a new state.
   * @param stateId The new state to transition to.
   * @param [loadScreen] The load screen to use.
   */
  private startTransition(stateId: string, loadScreen?: string): void {
    Signals.stateTransitionStart.emit(stateId);
    this.log(
      'Transition requested from %c%s %cto %c%s.',
      LogUtils.STYLE_RED_BOLD,
      this._currentStateId,
      LogUtils.STYLE_BLACK,
      LogUtils.STYLE_RED_BOLD,
      stateId,
    );
    if (this._isTransitioning) {
      this.logW('Transition already in progress, transition to (%s) ignored', stateId);
      return;
    }
    const data: IStateData | undefined = this._stateData.getValue(stateId);
    if (data === undefined) {
      this.logE(
        '%c%s%c has not been registered as a state. Please include it in your registerState ' + 'implementation.',
        LogUtils.STYLE_RED_BOLD,
        stateId,
        LogUtils.STYLE_BLACK,
      );
      return;
    }

    this._isTransitioning = true;
    if (this._statesMenu) {
      this._statesMenu.querySelector('select')?.setAttribute('disabled', 'true');
    }

    this._queuedStateId = stateId;
    this._newStateData = data;
    this._loadScreen = loadScreen;
    // Start transition
    this.setAndPerformTransitionStep(0);
  }

  /**
   * Completes view animate in step if it is in current transition steps.
   */
  private handleViewAnimateInComplete(): void {
    this.log('handleViewAnimateInComplete');
    let step: TransitionStep;

    if (this._newStateToken !== undefined) {
      step = this._newStateToken.transitionSteps[this._transitionStepIndex];

      switch (step) {
        case TransitionStep.AnimNewIn:
          this.performNextTransitionStep();
          break;
        case TransitionStep.AnimSimultaneously:
          this._simultaneousCheckAnimInComplete = true;

          // This is a race condition.  Ensure current view is fully animated out and new one is animated in.
          if (this._simultaneousCheckAnimInComplete && this._simultaneousCheckAnimOutComplete) {
            this.performNextTransitionStep();
          }
          break;
      }
    }
  }

  /**
   * Completes view animate out step if it is in current transition steps.
   */
  private handleViewAnimateOutComplete(): void {
    this.log('handleViewAnimateOutComplete');
    let step: TransitionStep;

    if (this._newStateToken !== undefined) {
      step = this._newStateToken.transitionSteps[this._transitionStepIndex];

      switch (step) {
        case TransitionStep.AnimCurrentOut:
          this.performNextTransitionStep();
          break;
        case TransitionStep.AnimSimultaneously:
          this._simultaneousCheckAnimOutComplete = true;

          // This is a race condition.  Ensure current view is fully animated out and new one is animated in.
          if (this._simultaneousCheckAnimInComplete && this._simultaneousCheckAnimOutComplete) {
            this.performNextTransitionStep();
          }
          break;
      }
    }
  }

  /**
   * Completes load screen animate in step.
   */
  private handleLoadScreenAnimateInComplete(): void {
    this.log('handleLoadScreenAnimateInComplete');
    // Ready for next step.
    this.performNextTransitionStep();
  }

  /**
   * Completes load screen animate out step.
   */
  private handleLoadScreenAnimateOutComplete(): void {
    this.log('handleLoadScreenAnimateOutComplete');
    // Ready for next step.
    this.performNextTransitionStep();
  }

  /**
   * Completes load assets step if it is in the current transition steps.
   */
  private handleLoadAssetsComplete(): void {
    this.log('handleLoadAssetsComplete');
    // Ignore these notifications if not waiting for anything.
    // That's the case for initial load on Splash View.
    if (
      this._newStateToken !== undefined &&
      this._newStateToken.transitionSteps.length > 0 &&
      this._newStateToken.transitionSteps[this._transitionStepIndex] === TransitionStep.LoadAssets
    ) {
      // Ready for next step.
      this.performNextTransitionStep();
    }
  }

  /**
   * Completes unload assets step.
   */
  private handleUnloadAssetsComplete(): void {
    this.log('handleUnloadAssetsComplete');
    this.performNextTransitionStep();
  }

  /**
   * Completes attach new state step if it is in the current transition steps.
   */
  private handleViewReady(token: StateToken): void {
    this.log('handleViewReady');

    if (!token) {
      token = this._newStateToken!;
    }

    let step: TransitionStep;

    if (token !== undefined) {
      step = token.transitionSteps[this._transitionStepIndex];

      switch (step) {
        case TransitionStep.AttachNewInFront:
        case TransitionStep.AttachNewBehind:
          this.performNextTransitionStep();
          break;
      }
    }
  }

  /**
   * Completes halt step if it is in the current transition steps.
   */
  private handleResumeFromHalt(): void {
    this.log('handleResumeFromHalt');
    let step: TransitionStep;

    if (this._newStateToken !== undefined) {
      step = this._newStateToken.transitionSteps[this._transitionStepIndex];

      switch (step) {
        case TransitionStep.Halt:
          this.performNextTransitionStep();
          break;
      }
    }
  }

  /**
   * Performs the next transition step.
   */
  private performNextTransitionStep(): void {
    this.log('performNextTransitionStep');
    this.setAndPerformTransitionStep(this._transitionStepIndex + 1);
  }

  /**
   * Perform a transition step at a specific index. If no more steps remain, complete the transition.
   * @param stepIndex The index of the step to perform.
   */
  private setAndPerformTransitionStep(stepIndex: number): void {
    this.log('setAndPerformTransitionStep');
    let step: TransitionStep;

    this._transitionStepIndex = stepIndex;

    this.log('Step index %s out of %s steps', stepIndex, this._newStateToken!.transitionSteps.length);

    if (this._transitionStepIndex < this._newStateToken!.transitionSteps.length) {
      step = this._newStateToken!.transitionSteps[this._transitionStepIndex];
      this.performTransitionStep(step);
    } else {
      this.log('%cNO MORE STEPS', LogUtils.STYLE_PINK_DARK);

      // No more steps to execute
      this._currentState = this._newState;
      this._currentStateData = this._newStateData;
      this._currentStateId = this._newStateToken!.stateId;
      this._newStateToken = undefined;
      this._newState = undefined;
      this._newStateData = undefined;
      this._transitionStepIndex = 0;
      this._isTransitioning = false;
      this._simultaneousCheckAnimInComplete = false;
      this._simultaneousCheckAnimOutComplete = false;
      this._firstComplete = true;

      if (this._statesMenu) {
        this._statesMenu.querySelector('select')?.removeAttribute('disabled');
      }

      Signals.stateTransitionComplete.emit(this._currentStateId);
    }
  }

  /**
   * Performs a specific transition step.
   * @param step The step to perform.
   */
  private performTransitionStep(step: TransitionStep): void {
    this.log('performTransitionStep(%c%s%c)', LogUtils.STYLE_BLUE_BOLD, TransitionStep[step], LogUtils.STYLE_BLACK);

    switch (step) {
      case TransitionStep.AnimNewIn:
        this.performStepAnimNewIn();
        break;
      case TransitionStep.AnimCurrentOut:
        this.performStepAnimCurrentOut();
        break;
      case TransitionStep.AnimSimultaneously:
        this.performStepAnimSimultaneously();
        break;
      case TransitionStep.AttachNewInFront:
        this.performStepAttachNewView(true);
        break;
      case TransitionStep.AttachNewBehind:
        this.performStepAttachNewView(false);
        break;
      case TransitionStep.RemoveCurrent:
        this.performStepRemoveCurrent();
        break;
      case TransitionStep.LoadAssets:
        this.performStepLoadAssets();
        break;
      case TransitionStep.UnloadAssets:
        this.performStepUnloadAssets();
        break;
      case TransitionStep.UnloadUnusedAssets:
        this.performStepUnloadUnusedAssets();
        break;
      case TransitionStep.ShowLoadScreen:
        this.performStepShowLoadScreen();
        break;
      case TransitionStep.HideLoadScreen:
        this.performStepHideLoadScreen();
        break;
      case TransitionStep.HideLoadScreenAndAnimnNewIn:
        this.performStepHideLoadScreen();
        this.performStepAnimNewIn();
        break;
      case TransitionStep.Halt:
        this.performStepHalt();
        break;
      case TransitionStep.PauseAFrame:
        this.performPause(0.1);
        break;
      case TransitionStep.Pause1Second:
        this.performPause(1);
        break;
      case TransitionStep.Pause5Seconds:
        this.performPause(5);
        break;
      default:
        break;
    }
  }

  /**
   * Animates in the new state.
   */
  private performStepAnimNewIn(): void {
    this.log('performStepAnimNewIn');
    if (this._newState === undefined) {
      this.logE(
        'The new view is null. Ensure step %s or %s is performed before this one.',
        TransitionStep.AttachNewInFront,
        TransitionStep.AttachNewBehind,
      );
      this.performNextTransitionStep();
    } else {
      this._newState.animateIn(this.handleViewAnimateInComplete.bind(this));
    }
  }

  /**
   * Animates out the current state.
   */
  private performStepAnimCurrentOut(): void {
    this.log('performStepAnimCurrentOut');
    if (this._currentState === undefined) {
      if (this._firstComplete) {
        this.logE('The current view is null. Review your transition steps.');
      }

      this.performNextTransitionStep();
    } else {
      this._currentState?.animateOut(this.handleViewAnimateOutComplete.bind(this));
    }
  }

  /**
   * Animates in the new state and animates out the current state at the same time.
   */
  private performStepAnimSimultaneously(): void {
    this.log('performStepAnimSimultaneously');
    // These flags will be used to handle the race condition between current view animating out
    // and new one animating in.
    this._simultaneousCheckAnimInComplete = false;
    this._simultaneousCheckAnimOutComplete = false;

    if (this._newState === undefined) {
      this.logE(
        'The new view is null. Ensure step %s or %s is performed before this one.',
        TransitionStep.AttachNewInFront,
        TransitionStep.AttachNewBehind,
      );
      this._simultaneousCheckAnimInComplete = true;
    } else {
      // Animate in the new view and wait for its callback
      this._newState.animateIn(this.handleViewAnimateInComplete.bind(this));
    }

    if (this._currentState === undefined) {
      this.logE('The current view is null. Review your transition steps.');
      this._simultaneousCheckAnimOutComplete = true;
    } else {
      // Animate out the current view and wait for its callback
      this._currentState.animateOut(this.handleViewAnimateOutComplete.bind(this));
    }

    // The unlikely case that there's neither a new view to animate in or current to animate out.
    // The error/warning is already reported above
    if (this._simultaneousCheckAnimInComplete && this._simultaneousCheckAnimOutComplete) {
      this.performNextTransitionStep();
    }
  }

  /**
   * Creates, initializes and attaches a new state either in front of or behind other states.
   * @param newInFront Should the new view be in front of other states or behind.
   */
  private async performStepAttachNewView(newInFront: boolean): Promise<void> {
    this.log('performStepAttachNewView');
    const d = new Date();
    this.log(
      "(%s)\n --- current view: '%s' @ time %s with %s milliseconds",
      this._newStateToken!.stateId,
      this._currentStateId,
      d.toLocaleTimeString(),
      d.getMilliseconds(),
    );

    if (this._newState !== undefined) {
      this.logE('New view already exists. Review your transition steps.');
      this.performNextTransitionStep();
    } else {
      this._newState = this.createState(this._newStateData!);

      if (this._newState) {
        // Attach state as child of manager.
        this.add.existing(this._newState);

        // set the state's data (if there is any)
        if (this._newStateToken!.data) {
          this._newState.data = this._newStateToken!.data;
        }

        this._newState.size = this._size;
        this._newState.positionSelfCenter(this._size);

        // call its init method
        await this._newState.init(this._size);

        // call the onResize method
        this._newState.onResize(this._size);

        initState(this._newStateToken!.data);

        // Caller requests the new view to be added in front or behind the existing view.
        if (newInFront) {
          this.log(
            'Attaching %c%s%c in %cfront.',
            LogUtils.STYLE_RED_BOLD,
            this._newStateToken!.stateId,
            LogUtils.STYLE_BLACK,
            LogUtils.STYLE_BLUE_BOLD,
          );
          this.setChildIndex(this._newState, this.children.length - 1);
        } else {
          this.log(
            'Attaching %c%s%c %cbehind.',
            LogUtils.STYLE_RED_BOLD,
            this._newStateToken!.stateId,
            LogUtils.STYLE_BLACK,
            LogUtils.STYLE_BLUE_BOLD,
          );
          this.setChildIndex(this._newState, 0);
        }

        /**
         * @todo Relish GM => Should we send a view ready notification?
         */
        // Notify the world that a view has been added.
        // _mediator.NotifyViewAdded(_newViewToken);

        // Wait for ViewReady notification.
        this.handleViewReady(this._newStateToken!);
      }
    }
  }

  /**
   * Removes and destroys the current state.
   */
  private performStepRemoveCurrent(): void {
    this.log('performStepRemoveCurrent');
    if (this._currentState === undefined) {
      this.logE('The current view is null. Review your transition steps.');
      this.performNextTransitionStep();
    } else {
      // Remove from stage.
      this.removeChild(this._currentState);

      // State will not be reused so destroy it.
      this._currentState.destroy({ children: true });

      // Notify the world when a view is removed.
      // _mediator.NotifyViewRemoved(_currentView.Token);
      this._currentState = undefined;
      delete this._currentState;

      this.log('Current %c%s%c removed.', LogUtils.STYLE_RED_BOLD, this._currentStateId, LogUtils.STYLE_BLACK);

      // Ready to perform next step.
      this.performNextTransitionStep();
    }
  }

  /**
   * Loads assets required by the new state.
   */
  private performStepLoadAssets(): void {
    this.log('performStepLoadAssets');

    const assetsToLoad = this.trimLoadList(this._newStateToken!.stateId);

    if (assetsToLoad.length > 0) {
      // Load all assets via the LoadManager
      const token: LoadToken = new LoadToken(assetsToLoad, this.handleLoadAssetsComplete.bind(this), this._loadScreen);
      loadAssets(token);
    } else {
      // No assets to load.
      this.logW(
        'No new assets to load found for %c%s%c. Advancing transition.',
        LogUtils.STYLE_RED_BOLD,
        this._newStateToken!.stateId,
        LogUtils.STYLE_BLACK,
      );
      this.performNextTransitionStep();
    }
  }

  /**
   * Unload assets needed for the old state. Any assets already loaded that are needed by the new state will not be
   * unloaded.
   */
  private performStepUnloadAssets(): void {
    this.log('performStepUnloadAssets');
    // Get list of assets used by the old view
    const assets: AssetMapData[] = this.trimUnloadList(this._currentStateId, this._newStateToken!.stateId);

    if (assets !== undefined) {
      if (assets.length > 0) {
        const token: LoadToken = new LoadToken(assets, this.handleUnloadAssetsComplete.bind(this), this._loadScreen);
        unloadAssets(token);
      } else {
        // No assets to unload
        this.performNextTransitionStep();
      }
    } else {
      // No assets to unload
      this.performNextTransitionStep();
    }
  }

  /**
   * Copied from ULF but is currently not used.
   * @ignore This.
   */
  private performStepUnloadUnusedAssets(): void {
    this.log('performStepUnloadUnusedAssets');
    // Not used
    this.performNextTransitionStep();
  }

  /**
   * Shows the current active load screen.
   */
  private performStepShowLoadScreen(): void {
    this.log('performStepShowLoadScreen');
    if (this._loadScreen !== undefined) {
      showLoadScreen({
        callback: this.handleLoadScreenAnimateInComplete.bind(this),
        loadScreen: this._loadScreen,
        stateData: this._newStateToken !== undefined ? this._newStateToken.data : undefined,
        firstLoad: false,
      });
    } else {
      this.logE(
        'Load screen show requested with %c%s%c passed in. Please specify a registered load screen to' + ' use.',
        LogUtils.STYLE_RED_BOLD,
        this._loadScreen,
        LogUtils.STYLE_BLACK,
      );
    }
  }

  /**
   * Hides the current active load screen.
   */
  private performStepHideLoadScreen(): void {
    this.log('performStepHideLoadScreen');
    if (this._loadScreen !== undefined) {
      hideLoadScreen({
        callback: this.handleLoadScreenAnimateOutComplete.bind(this),
        loadScreen: this._loadScreen,
      });
    } else {
      this.logE(
        'Load screen show requested with %c%s%c passed in. Please specify a registered load screen to' + ' use.',
        LogUtils.STYLE_RED_BOLD,
        this._loadScreen,
        LogUtils.STYLE_BLACK,
      );
    }
  }

  /**
   * Sneds notification for halting transition. Does not call `performNextTransitionStep` automatically.
   */
  private performStepHalt(): void {
    this.log('performStepHalt');
    stateTransitionHalted(this._newStateToken);
  }

  /**
   * Pauses a transition for the duration provided.
   * @param duration The duration of the pause.
   */
  private async performPause(duration: number): Promise<void> {
    this.log('performPause');
    await delay(duration);
    this.performNextTransitionStep();
  }

  /**
   * Generates a list of assets to unload based on the assets that were loaded in the old state and the assets
   * needed by the new state.
   * @param oldStateId The id of the state that is leaving.
   * @param newStateId The id of the state that is arriving.
   * @returns The list of assets to unload.
   */
  private trimUnloadList(oldStateId: string, newStateId: string): AssetMapData[] {
    const oldAssets: AssetMapData[] = AssetMap.getAssetGroup(oldStateId);
    const newAssets: AssetMapData[] = AssetMap.getAssetGroup(newStateId);
    const requiredAssets = Application.instance.requiredAssets;
    // Concatenate the arrays so we only loop through oldAssets once
    const assetsToKeep: string[] = requiredAssets.map((a) => a.assetName).concat(...newAssets.map((a) => a.assetName));
    // Comparing just the assetNames means we can use Array.indexOf
    const assetsToUnload = oldAssets.filter((a) => assetsToKeep.indexOf(a.assetName) < 0);

    if (this._debug) {
      assetsToUnload.forEach((asset) => {
        this.log('Added %c%s%c to unload list', LogUtils.STYLE_RED_BOLD, asset.assetName, LogUtils.STYLE_BLACK);
      });
    }
    return assetsToUnload;
  }

  /**
   * Generates a list assets to load based on already loaded assets and the assets needed by the new state.
   * @param newStateId The id of the state that is arriving.
   * @returns The list of assets to load.
   */
  private trimLoadList(newStateId: string): AssetMapData[] {
    const newAssets: AssetMapData[] = AssetMap.getAssetGroup(newStateId);
    const assetsToLoad: AssetMapData[] = new Array<AssetMapData>();

    for (const asset of newAssets) {
      if (!asset.isLoaded()) {
        assetsToLoad.push(asset);
      }
    }

    return assetsToLoad;
  }

  /**
   * Creates and returns a new state.
   * @param stateData The construction data for the state.
   */
  private createState(stateData: IStateData): State {
    return stateData.create();
  }

  /**
   * Called when a state transition is requested.
   * @param token The data defining the state transition.
   */
  private onStateLoadRequested(token: StateToken): void {
    this._newStateToken = token;
    this.startTransition(token.stateId, token.loadScreen);
  }

  /**
   * Logs a message with class name and colour coding if debug flag is true.
   * @param pText The message to print.
   * @param [pParams] Optional data to be included in the message.
   * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
   */
  private log(pText: string, ...pParams: any[]): void {
    if (this._debug) {
      LogUtils.log(pText, { className: 'StateManager', color: LogUtils.COLOR_RELISH }, ...pParams);
    }
  }

  /**
   * Logs a warning message with class name and colour coding if debug flag is true.
   * @param pText The message to print.
   * @param [pParams] Optional data to be included in the message.
   * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
   */
  private logW(pText: string, ...pParams: any[]): void {
    if (this._debug) {
      LogUtils.logWarning(pText, { className: 'StateManager', color: LogUtils.COLOR_RELISH }, ...pParams);
    }
  }

  /**
   * Logs an error message with class name and colour coding.
   * @param pText The message to print.
   * @param [pParams] Optional data to be included in the message.
   * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
   */
  private logE(pText: string, ...pParams: any[]): void {
    LogUtils.logError(pText, { className: 'StateManager', color: LogUtils.COLOR_RELISH }, ...pParams);
  }
}
