import {
  Artboard,
  File,
  LinearAnimationInstance,
  Mat2D,
  RiveCanvas,
  SMIInput,
  StateMachineInstance,
  WrappedRenderer,
} from '@rive-app/canvas-advanced-lite';
import { Container, destroyCanvas, Logger, Signal, WithSignals } from 'dill-pixel';
import { Assets, FederatedPointerEvent, Sprite, Texture, Ticker } from 'pixi.js';
import { RivePlugin } from './RivePlugin';
import { Alignment, Fit, RiveOptions } from './types';

/**
 * @see https://www.npmjs.com/package/pixi-rive
 * RiveEntity component extended from Dill Pixel Container
 * PIXI.Assets.add({ alias: 'vehicles', src: 'https://cdn.rive.app/animations/vehicles.riv' });
 * const vehicles = new RiveEntity({ asset: 'vehicles', autoPlay: true });
 * app.stage.addChild(vehicles);
 *
 * @param {Artboard} artboard current Rive Artboard instance
 * @param {LinearAnimationInstance} animations current Animation instances
 * @param {StateMachineInstance} stateMachines current Rive State Machine instances
 * @param {Map<string, SMIInput>} inputFields current artboard input fields from all state machines
 * @param {Function} onStateChange callback method for catching state machines changes
 * @param {Fit} fit fit Rive component into container sizes (Contain by default)
 * @param {Alignment} align align Rive component in container (Center by default)
 * @param {number} maxWidth max width of sprite (original Rive artboard size will be used if maxWidth is not set)
 * @param {number} maxHeight max height of sprite (original Rive artboard size will be used if maxHeight is not set)
 */
export class RiveEntity extends WithSignals(Container) {
  // signals
  onStateChange: Signal<(states?: any) => void> = new Signal();
  onReady: Signal<(rive?: RiveCanvas) => void> = new Signal();
  onPlay: Signal<(animations: string | string[]) => void> = new Signal();
  onStop: Signal<(animations: string | string[]) => void> = new Signal();
  onPause: Signal<() => void> = new Signal();
  onResume: Signal<() => void> = new Signal();
  // TODO: Can't figure out how to implement this yet
  // can't seem to get animation duration or loop values
  // perhaps it's a bug?
  // onLoop: Signal<() => void> = new Signal();
  //
  animations: LinearAnimationInstance[] = [];
  stateMachines: StateMachineInstance[] = [];
  inputFields: Map<string, SMIInput> = new Map();
  artboard?: Artboard;
  private _debug: boolean = false;
  private _file?: File;
  private _aligned?: Mat2D;
  private _renderer?: WrappedRenderer;
  private _canvas?: OffscreenCanvas | HTMLCanvasElement;
  private _paused: boolean;
  private _enabled: boolean = false;

  /**
   * Constructor will load Rive wasm if it not loaded yet
   * and create instances of Rive scene components (artboard, animation, stateMachine)
   * after initialize will call onReady method and run animation if autoPlay was setted
   * @param {RiveOptions} options initial component options
   */
  constructor(public options: RiveOptions) {
    super({ autoResize: false, autoUpdate: false, priority: -1 });
    this._debug = options.debug ?? false;

    this.initEvents(options!.interactive ?? false);
    if (options.autoInit !== false) {
      void this.initialize();
    }
  }

  private _align: Alignment = 'center';

  get align(): Alignment {
    return this._align;
  }

  set align(value: Alignment) {
    this._align = value;
  }

  private _fit: Fit = 'contain';

  get fit(): Fit {
    return this._fit;
  }

  set fit(value: Fit) {
    this._fit = value;
    this.updateSize();
  }

  private _maxWidth: number = 0;

  get maxWidth(): number {
    return this._maxWidth;
  }

  set maxWidth(value: number) {
    this._maxWidth = value;
    this.updateSize();
  }

  private _maxHeight: number = 0;

  get maxHeight(): number {
    return this._maxHeight;
  }

  set maxHeight(value: number) {
    this._maxHeight = value;
    this.updateSize();
  }

  private _rive?: RiveCanvas;

  get rive(): RiveCanvas {
    return this.plugin.rive;
  }

  private _view: Sprite;

  get view(): Sprite {
    return this._view;
  }

  get plugin(): RivePlugin {
    return this.app.getPlugin(RivePlugin.ID);
  }

  async initialize() {
    await this.initRive(this.options.asset).then(() => {
      this.loadArtboard(this.options.artboard);
      this.loadStateMachine(this.options.stateMachine);
      this.playAnimation(this.options.animation);
      if (this.options.fit) {
        this.fit = this.options.fit;
      }
      if (this.options.align) {
        this.align = this.options.align;
      }
      if (this.options.maxWidth) {
        this.maxWidth = this.options.maxWidth;
      }
      if (this.options.maxHeight) {
        this.maxHeight = this.options.maxHeight;
      }
      if (this.options.maxHeight !== undefined || this.options.maxWidth !== undefined) {
        this.updateSize();
      }

      if (this.options.autoPlay) {
        this.enable();
      } else this.update();
    });

    this.onReady.emit(this.rive);
  }

  /**
   * Enable rive scene animation
   */
  enable(): void {
    this._enabled = true;
    if (this.rive) {
      this.app.ticker.add(this.update);
    }
  }

  /**
   * Disable rive scene animation
   */
  disable(): void {
    this._enabled = false;
    if (this.rive) {
      this.app.ticker.remove(this.update);
    }
  }

  /**
   * Load Rive scene artboard by name or load default artboard if name is not set
   * Rive should be initialized before (RiveOptions.onReady was emited)
   * @param {string|number} artboard name of the loading artboard
   */
  loadArtboard(artboard: string | undefined): void | Promise<void> {
    if (this.artboard) {
      this._destroyInternals();
      this.options.artboard = artboard;
      return this.initialize();
    }
    if (this._file && this._canvas) {
      this.artboard = artboard ? this._file.artboardByName(artboard) : this._file.defaultArtboard();
      if (!this._view) {
        this._view = this.add.sprite({
          asset: Texture.from(this._canvas, false),
          anchor: this.options?.anchor ?? 0,
          scale: this.options?.scale ?? 1,
        });
      } else {
        this._view.texture.source.update();
      }
    }
    this.updateSize();
  }

  /**
   * Load Rive state machines by names or load first state machine
   * Artbaord should be loaded before
   * Will load first state machine if name is empty
   * @param {string|number} machines name or names of the loading state machines
   */
  loadStateMachine(machines: string | string[] = []): void {
    if (!this.artboard || !this.rive) return;
    if (typeof machines === 'string') machines = [machines];
    else if (!machines.length) {
      const defaultMachine = this.artboard!.stateMachineByIndex(0);
      machines = defaultMachine ? [defaultMachine.name] : [];
    }
    machines.map((name) => {
      const machine = this.artboard!.stateMachineByName(name);
      this.unloadStateMachine(name);
      this.stateMachines.push(new this.rive!.StateMachineInstance(machine, this.artboard!));
    });
    this.initInputFields();
  }

  /**
   * Unload state machine and destroy instance
   * @param {string} name name of the state machine
   */
  unloadStateMachine(name: string): void {
    this.stateMachines = this.stateMachines.filter((machine) => {
      if (machine.name === name) {
        machine.delete();
        return false;
      } else return true;
    });
  }

  /**
   * Play Rive animation by name (artbaord should be loaded before)
   * You can play only one timeline animation at the same time.
   * If animation is looped or it's a pingpong, it will be repeated endlessly
   * otherwise it plays only once
   *
   * TODO: add onStart/onEnd/onLoop methods for animation
   *
   * @param {string|number} animations animation name or array of nmaes
   */
  playAnimation(animations: string | string[] = []): void {
    if (!this.artboard && !this.rive) return;
    if (typeof animations === 'string') animations = [animations];
    else if (!animations.length && !this.stateMachines.length) {
      const defaultAnimation = this.artboard!.animationByIndex(0);
      animations = defaultAnimation ? [defaultAnimation.name] : [];
    }
    animations.map((name) => {
      const animation = this.artboard!.animationByName(name);
      this.stopAnimation(name);

      const anim = new this.rive!.LinearAnimationInstance(animation, this.artboard!);

      this.animations.push(anim);
    });

    this.onPlay.emit(animations);
  }

  /**
   * Stop current animation and destroy Rive animation instance
   */
  stopAnimation(animations: string | string[]): void {
    const animationsToStop = Array.isArray(animations) ? animations : [animations];
    this.animations = this.animations.filter((animation) => {
      if (animationsToStop.includes(animation.name)) {
        animation.delete();
        return false;
      } else return true;
    });

    this.onStop.emit(animations);
  }

  pause() {
    this._paused = true;
    this.onPause.emit();
  }

  resume() {
    this._paused = false;
    this.onResume.emit();
  }

  /**
   * Get list of available artboards in current Rive file
   */
  getAvailableArtboards(): string[] {
    const available: string[] = [];
    if (this._file) {
      for (let i = 0; i < this._file.artboardCount(); i++) {
        available[i] = this._file.artboardByIndex(i).name;
      }
    }
    return available;
  }

  /**
   * Get list of available state machines in current artboard
   */
  getAvailableStateMachines(): string[] {
    const available: string[] = [];
    if (this.artboard) {
      for (let i = 0; i < this.artboard.stateMachineCount(); i++) {
        available[i] = this.artboard.stateMachineByIndex(i).name;
      }
    }
    return available;
  }

  /**
   * Get list of available animations in current artboard
   */
  getAvailableAnimations(): string[] {
    const available: string[] = [];
    if (this.artboard) {
      for (let i = 0; i < this.artboard.animationCount(); i++) {
        available[i] = this.artboard.animationByIndex(i).name;
      }
    }
    return available;
  }

  /**
   * Recalculate and update sizes of ofscreencanvas due to artboard size
   * Artboard should be loaded before
   */
  updateSize(): void {
    if (this.artboard && this.rive && this._renderer && this._canvas) {
      const bounds = this.artboard.bounds;
      const { minX, minY, maxX, maxY } = bounds;
      const width = maxX - minX;
      const height = maxY - minY;
      const maxWidth = this._maxWidth || width;
      const maxHeight = this._maxHeight || height;
      const fit = this.rive.Fit[this._fit];
      const align = this.rive.Alignment[this._align];
      const frame = { minX: 0, minY: 0, maxX: maxWidth, maxY: maxHeight };

      this._canvas.width = maxWidth;
      this._canvas.height = maxHeight;
      this._aligned = this.rive?.computeAlignment(fit, align, frame, bounds);
      this._renderer.align(fit, align, frame, bounds);
      this._view.texture.source.update();
    }
  }

  /**
   * Receive input fields from all active state machines
   */
  initInputFields(): void {
    const { bool, trigger } = this.rive!.SMIInput;
    this.inputFields.clear();
    this.stateMachines.forEach((m) => {
      for (let i = 0; i < m.inputCount(); i++) {
        let field: SMIInput;
        const input = m.input(i);
        if (input.type == bool) field = input.asBool();
        else if (input.type == trigger) field = input.asTrigger();
        else field = input.asNumber();
        this.inputFields.set(input.name, field);
      }
    });
  }

  /**
   * Get state machine input field by name
   * @param {string} name input field name
   * @returns {number|boolean} value of the input field
   */
  getInputValue(name: string): number | boolean | undefined {
    const input = this.inputFields.get(name);
    return input && input.value;
  }

  /**
   * Set state machine input field value by name
   * @param {string} name of the input field
   * @param {number|boolean} value  of the input field
   */
  setInput(name: string, value: number | boolean): void {
    const input = this.inputFields.get(name);
    if (input && input.type !== this.rive?.SMIInput.trigger) {
      input.value = value;
    }
  }

  /**
   * Trigger state machine input field
   * @param {string} name of the trigger field
   */
  fireTrigger(name: string): void {
    const input = this.inputFields.get(name);
    if (input && input.type === this.rive?.SMIInput.trigger) {
      input.fire();
    }
  }

  /**
   * Destroy all component resources
   */
  destroy() {
    this._destroyInternals();
    try {
      this._renderer?.delete();
    } catch (e) {
      // nothing
    }
    try {
      this._file?.delete();
    } catch (e) {
      // nothing
    }
    super.destroy();
  }

  public update(ticker: Ticker = this.app.ticker) {
    if (this._paused || !this.artboard || !this._renderer || !this.rive) {
      return;
    }
    const elapsedTime = ticker.elapsedMS / 1000;
    this.advanceStateMachines(elapsedTime);
    this.advanceAnimations(elapsedTime);
    this.artboard.advance(elapsedTime);
    this._renderer.clear();
    this._renderer.save();
    this.artboard.draw(this._renderer);
    this._renderer.restore();
    this._renderer.flush();
    this.view.texture.source.update();

    /**
     * https://rive.app/community/doc/low-level-api-usage/doctAfBY6v3P#integrating-rive-into-existing-raf-loop
     */
    this.rive.resolveAnimationFrame();
  }

  protected handlePointerdown(e: FederatedPointerEvent) {
    const point = this.translatePoint(e.global);
    this.stateMachines.map((m) => m.pointerDown(...point));
  }

  protected handlePointerup(e: FederatedPointerEvent) {
    const point = this.translatePoint(e.global);
    this.stateMachines.map((m) => m.pointerUp(...point));
  }

  protected handlePointermove(e: FederatedPointerEvent) {
    const point = this.translatePoint(e.global);
    this.stateMachines.map((m) => m.pointerMove(...point));
  }

  private _destroyInternals() {
    this.disable();
    this.off('pointerdown', this.handlePointerdown);
    this.off('pointerup', this.handlePointerup);
    this.off('pointermove', this.handlePointermove);

    try {
      this.stateMachines.map((machine) => machine.delete());
    } catch (e) {
      // nothing
    }
    try {
      this.animations.map((animation) => animation.delete());
    } catch (e) {
      // nothing
    }
    try {
      this.artboard?.delete();
    } catch (e) {
      // nothing
    }

    this.animations = [];
    this.stateMachines = [];

    this.view.texture.destroy(true);
    this.view.destroy();

    // @ts-expect-error artboard can't be null
    this.artboard = null;

    // @ts-expect-error view can't be null
    this._view = null;

    if (this._canvas) {
      destroyCanvas(this._canvas);
    }
    // @ts-expect-error canvas can't be null
    this._canvas = null;
  }

  /**
   * Will load wasm and rive sprite asset from assets library
   * also create offscreen canvas and rive renderer
   * @param riv
   */
  private async initRive(riv: string | Uint8Array): Promise<void> {
    const asset = typeof riv === 'string' ? await Assets.load(riv) : riv;
    this._file = await this.rive.load(asset);
    this._canvas = this.createCanvas();
    this._renderer = this.rive.makeRenderer(this._canvas, true);
  }

  /**
   * Attach pointer events to the pixi sprite and pass them to the Rive state machine
   * @param {boolean} interactive true if we need to attach pointer events to sprite
   */
  private initEvents(interactive: boolean): void {
    if (!interactive) return;
    if (this.options.cursor) {
      this.cursor = this.options.cursor;
    }
    this.eventMode = 'static';
    this.on('pointerdown', this.handlePointerdown);
    this.on('onpointerup', this.handlePointerup);
    this.on('onpointermove', this.handlePointermove);
  }

  /**
   * Convert global Pixi.js coordinates to Rive point coordinates
   * @param {{x:number,y:number}} global point coordinates
   * @returns
   */
  private translatePoint(global: { x: number; y: number }): [number, number] {
    const { x, y } = this.toLocal(global);
    const { tx, ty, xx, yy } = this._aligned || { tx: 0, ty: 0, xx: 1, yy: 1 };
    return [(x - tx) / xx, (y - ty) / yy];
  }

  /**
   * Will create offscreen canvas
   * In debug mode will create a regular canvas and display it over the page
   */
  private createCanvas(): OffscreenCanvas | HTMLCanvasElement {
    if (this._debug) {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.right = '0';
      canvas.style.top = '0';
      canvas.style.width = 'auto';
      canvas.style.height = 'auto';
      document.body.appendChild(canvas);
      return canvas;
    }
    return new OffscreenCanvas(100, 100);
  }

  /**
   * Play all state machines animations
   * @param {number} elapsed time from last update
   */
  private advanceStateMachines(elapsed: number): void {
    this.stateMachines.map((m) => {
      if (m.reportedEventCount()) {
        Logger.log(`state machine ${m.name} reported ${m.reportedEventCount()} events`);
      }
      m.advance(elapsed);

      if (m.stateChangedCount()) {
        const states = [];
        for (let i = 0; i < m.stateChangedCount(); i++) {
          states.push(m.stateChangedNameByIndex(i));
        }
        if (states.length) {
          this.onStateChange.emit(states);
        }
      }
    });
  }

  /**
   * Play all scene animations
   * @param {number} elapsed time from last update
   */
  private advanceAnimations(elapsed: number): void {
    this.animations.map((a) => {
      a.advance(elapsed);
      a.apply(1);
    });
  }
}
