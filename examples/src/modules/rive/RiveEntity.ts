import { Assets, RenderTexture, Sprite, Texture } from 'pixi.js';
import Rive, {
  Artboard,
  File,
  LinearAnimationInstance,
  Mat2D,
  RiveCanvas,
  SMIInput,
  StateMachineInstance,
  WrappedRenderer,
} from '@rive-app/canvas-advanced';

import { Container } from 'dill-pixel';

// Fit options for the canvas
export enum Fit {
  Cover = 'cover',
  Contain = 'contain',
  Fill = 'fill',
  FitWidth = 'fitWidth',
  FitHeight = 'fitHeight',
  None = 'none',
  ScaleDown = 'scaleDown',
}

// Alignment options for the canvas
export enum Alignment {
  Center = 'center',
  TopLeft = 'topLeft',
  TopCenter = 'topCenter',
  TopRight = 'topRight',
  CenterLeft = 'centerLeft',
  CenterRight = 'centerRight',
  BottomLeft = 'bottomLeft',
  BottomCenter = 'bottomCenter',
  BottomRight = 'bottomRight',
}

/**
 * WebAssembly Rive module loader
 * You can change wasm path by calling "setWasmPath" function
 * before creating RiveSprite instances!
 */
let WASM_PATH = 'https://unpkg.com/@rive-app/canvas-advanced@2.10.4/rive.wasm';
const riveApp = Rive({ locateFile: () => WASM_PATH });

export function setWasmPath(path: string): void {
  WASM_PATH = path;
}

/**
 * Properties accepted by RiveSprite Component
 * @param {string} asset name of the asset element (will be loaded if still not loaded) or *.riv file content (Uint8Array)
 * @param {boolean} debug turning on debug mode will display original Rive canvas
 * @param {boolean} autoplay run animation or state machine after initializing
 * @param {boolean} interactive enable passing pointer events into Rive state machine
 * @param {string} artboard create artoard by name (default artboard will be loaded if name is not set)
 * @param {string} animation run animation by name
 * @param {string} stateMachine name of the loaded statemachine (default state machine will be loaded if name is not set)
 * @param {Function} onStateChange callback fires when state machine has changes (will pass array of state names)
 * @param {Function} onReady callback method which will be called after rive component initialization
 */
type RiveOptions = {
  asset: string | Uint8Array;
  debug?: boolean;
  autoPlay?: boolean;
  interactive?: boolean;
  artboard?: string;
  animation?: string | string[];
  stateMachine?: string | string[];
  onStateChange?: (...args: any[]) => void;
  onReady?: (...args: any[]) => void;
};

/**
 * RiveSprite component extended from Pixi.js Sprite
 *
 * Usage example:
 * PIXI.Assets.add({ alias: 'vehicles', src: 'https://cdn.rive.app/animations/vehicles.riv' });
 * const vehiclesSprite = new RiveSprite({ asset: 'vehicles', autoPlay: true });
 * app.stage.addChild(vehiclesSprite);
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
export class RiveEntity extends Container {
  maxWidth: number = 0;
  maxHeight: number = 0;
  fit: Fit = Fit.Contain;
  align: Alignment = Alignment.Center;
  animations: LinearAnimationInstance[] = [];
  stateMachines: StateMachineInstance[] = [];
  inputFields: Map<string, SMIInput> = new Map();
  onStateChange?: (states?: string[]) => void;
  artboard?: Artboard;
  view: Sprite;
  private _animFrame: number = 0;
  private _lastTime: number = 0;
  private _enabled: boolean = false;
  private _debug: boolean = false;
  private _rive?: RiveCanvas;
  private _file?: File;
  private _aligned?: Mat2D;
  private _renderer?: WrappedRenderer;
  private _canvas?: OffscreenCanvas | HTMLCanvasElement;
  private _renderTexture: RenderTexture;

  /**
   * Constructor will load Rive wasm if it not loaded yet
   * and create instances of Rive scene components (artboard, animation, stateMachine)
   * after initialize will call onReady method and run animation if autoPlay was setted
   * @param {RiveOptions} options initial component options
   */
  constructor(options: RiveOptions) {
    super();
    this.view = this.add.sprite();
    this._debug = options.debug ?? false;
    this.onStateChange = options.onStateChange;
    this.initEvents(options!.interactive ?? false);
    this.initRive(options.asset).then(() => {
      this.loadArtboard(options.artboard);
      this.loadStateMachine(options.stateMachine);
      this.playAnimation(options.animation);
      if (options.autoPlay) {
        this.enable();
      } else {
        this._rive?.requestAnimationFrame(this.renderLoop);
      }
      if (options.onReady) options.onReady(this._rive);
    });
  }

  /**
   * Destroy all component resources
   */
  destroy() {
    super.destroy();
    this.disable();
    this.stateMachines.map((machine) => machine.delete());
    this.animations.map((animation) => animation.delete());
    this.artboard?.delete();
    this._renderer?.delete();
    this._file?.delete();
  }

  /**
   * Enable rive scene animation
   */
  enable(): void {
    this._enabled = true;
    if (!this._animFrame && this._rive) {
      this._animFrame = this._rive.requestAnimationFrame(this.renderLoop);
    }
  }

  /**
   * Disable rive scene animation
   */
  disable(): void {
    this._enabled = false;
    if (this._animFrame && this._rive) {
      this._rive.cancelAnimationFrame(this._animFrame);
      this._animFrame = 0;
    }
  }

  /**
   * Load Rive scene artboard by name or load default artboard if name is not set
   * Rive should be initialized before (RiveOptions.onReady was emited)
   * @param {string|number} artboard name of the loading artboard
   */
  loadArtboard(artboard: string | undefined): void {
    if (this.artboard) {
      this.artboard.delete();
    }
    if (this._file && this._canvas) {
      this.artboard = artboard ? this._file.artboardByName(artboard) : this._file.defaultArtboard();
      this.updateTexture();
    }
    this.updateSize();
  }

  updateTexture() {
    this.view.texture = Texture.from(this._canvas, true);
  }

  /**
   * Load Rive state machines by names or load first state machine
   * Artbaord should be loaded before
   * Will load first state machine if name is empty
   * @param {string|number} machines name or names of the loading state machines
   */
  loadStateMachine(machines: string | string[] = []): void {
    if (!this.artboard || !this._rive) return;
    if (typeof machines === 'string') machines = [machines];
    else if (!machines.length) {
      const defaultMachine = this.artboard!.stateMachineByIndex(0);
      machines = defaultMachine ? [defaultMachine.name] : [];
    }
    machines.map((name) => {
      const machine = this.artboard!.stateMachineByName(name);
      this.unloadStateMachine(name);
      this.stateMachines.push(new this._rive!.StateMachineInstance(machine, this.artboard!));
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
    if (!this.artboard && !this._rive) return;
    if (typeof animations === 'string') animations = [animations];
    else if (!animations.length && !this.stateMachines.length) {
      const defaultAnimation = this.artboard!.animationByIndex(0);
      animations = defaultAnimation ? [defaultAnimation.name] : [];
    }
    animations.map((name) => {
      const animation = this.artboard!.animationByName(name);
      this.stopAnimation(name);
      this.animations.push(new this._rive!.LinearAnimationInstance(animation, this.artboard!));
    });
  }

  /**
   * Stop current animation and destroy Rive animation instance
   */
  stopAnimation(name: string): void {
    this.animations = this.animations.filter((animation) => {
      if (animation.name === name) {
        animation.delete();
        return false;
      } else return true;
    });
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
    if (this.artboard && this._rive && this._renderer) {
      const bounds = this.artboard.bounds;

      const { minX, minY, maxX, maxY } = bounds;
      const width = maxX - minX;
      const height = maxY - minY;

      const maxWidth = this.maxWidth || width;
      const maxHeight = this.maxHeight || height;

      const fit = this._rive.Fit[this.fit];
      const align = this._rive.Alignment[this.align];
      const frame = { minX: 0, minY: 0, maxX: maxWidth, maxY: maxHeight };
      this._aligned = this._rive?.computeAlignment(fit, align, frame, bounds);
      this._renderer.align(fit, align, frame, bounds);
      this._canvas!.width = maxWidth;
      this._canvas!.height = maxHeight;
      this.updateTexture();
    }
  }

  /**
   * Receive input fields from all active state machines
   */
  initInputFields(): void {
    const { bool, trigger } = this._rive!.SMIInput;
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
    if (input && input.type !== this._rive?.SMIInput.trigger) {
      input.value = value;
    }
  }

  /**
   * Trigger state machine input field
   * @param {string} name of the trigger field
   */
  fireTrigger(name: string): void {
    const input = this.inputFields.get(name);
    if (input && input.type === this._rive?.SMIInput.trigger) {
      input.fire();
    }
  }

  /**
   * Update animation and state machine progress
   * @param {number} time delta time from last animation frame (in seconds)
   */
  private renderLoop = (time: number) => {
    if (!this._lastTime) this._lastTime = time;
    const elapsedTime = (time - this._lastTime) / 1000;
    this._lastTime = time;
    if (this.artboard && this._renderer) {
      this.advanceStateMachines(elapsedTime);
      this.advanceAnimations(elapsedTime);
      this.artboard.advance(elapsedTime);
      this._renderer.clear();
      this._renderer.save();
      this.artboard.draw(this._renderer);
      this._renderer.restore();
      this._renderer.flush();
      this.updateTexture();
    }
    if (this._animFrame && this._rive) {
      this._rive.requestAnimationFrame(this.renderLoop);
    }
  };

  /**
   * Will load wasm and rive sprite asset from assets library
   * also create offscreen canvas and rive renderer
   * @param {string} name name of the asset element
   */
  private async initRive(riv: string | Uint8Array): Promise<void> {
    const asset = typeof riv === 'string' ? await Assets.load(riv) : riv;
    this._rive = await riveApp;
    this._file = await this._rive.load(asset);
    this._canvas = this.createCanvas();
    this._renderer = this._rive.makeRenderer(this._canvas, true);
  }

  /**
   * Attach pointer events to the pixi sprite and pass them to the Rive state machine
   * @param {boolean} interactive true if we need to attach pointer events to sprite
   */
  private initEvents(interactive: boolean): void {
    if (!interactive) return;
    // this.cursor = 'pointer';
    this.eventMode = 'static';
    this.onpointerdown = (e) => {
      const point = this.translatePoint(e.global);
      this.stateMachines.map((m) => m.pointerDown(...point));
    };
    this.onpointerup = (e) => {
      const point = this.translatePoint(e.global);
      this.stateMachines.map((m) => m.pointerUp(...point));
    };
    this.onpointermove = (e) => {
      const point = this.translatePoint(e.global);
      this.stateMachines.map((m) => m.pointerMove(...point));
    };
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
      m.advance(elapsed);
      if (this.onStateChange && m.stateChangedCount()) {
        const states = [];
        for (let i = 0; i < m.stateChangedCount(); i++) {
          states.push(m.stateChangedNameByIndex(i));
        }
        if (states.length) {
          this.onStateChange(states);
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