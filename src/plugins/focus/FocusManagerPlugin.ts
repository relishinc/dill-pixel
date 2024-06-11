import EventEmitter from 'eventemitter3';
import { Bounds, Container, PointerEvents, PointLike } from 'pixi.js';
import { IApplication } from '../../core';
import { Signal } from '../../signals';
import type { Constructor, PointLike as DillPixelPointLike } from '../../utils';
import { bindMethods, getLastMapEntry, getPreviousMapEntry, Logger } from '../../utils';
import type { IPlugin } from '../Plugin';
import { Plugin } from '../Plugin';
import type { IFocusOutliner } from './FocusOutliner';
import { FocusOutliner, FocusOutlinerConfig } from './FocusOutliner';

export type FocusManagerPluginOptions = {
  outliner: IFocusOutliner | Partial<FocusOutlinerConfig> | typeof FocusOutliner;
  usePixiAccessibility: boolean;
};

export interface IFocusable extends EventEmitter {
  isFocused: boolean;
  isKeyDown: boolean;
  focusEnabled: boolean;
  tabIndex: number;
  _accessibleDiv?: HTMLElement;

  // pixi accessibility features
  accessible: boolean;
  accessibleType: string;
  accessibleTitle: string;
  accessibleHint: string;
  accessiblePointerEvents?: PointerEvents;
  accessibleChildren: boolean;

  // signals
  onFocusIn: Signal<(focusable: IFocusable) => void>;
  onFocusOut: Signal<(focusable: IFocusable) => void>;
  onFocus: Signal<(focusable: IFocusable) => void>;
  onBlur: Signal<(focusable: IFocusable) => void>;
  position: PointLike;

  focusIn(): void;

  focusOut(): void;

  click(): void;

  blur(): void;

  getGlobalPosition(): PointLike;

  getFocusArea(): Bounds;

  getFocusPosition(): DillPixelPointLike | null;

  getFocusSize(): DillPixelPointLike | null;
}

export interface IFocusLayer {
  currentFocusable: IFocusable | null;
  defaultFocusable: IFocusable | null;
  lastFocusable: IFocusable | null;
  current: boolean;
  availableFocusables: IFocusable[];

  setCurrentFocusable(focusable: IFocusable | null): IFocusable | null;

  hasFocusable(focusable: IFocusable | null): boolean;

  setCurrent(): void;

  addFocusable(focusable: IFocusable, isDefault?: boolean): void;

  removeFocusable(focusable: IFocusable): void;

  sortFocusables(): void;

  sortFocusablesByPosition(): void;

  next(): IFocusable | null;

  prev(): IFocusable | null;
}

class FocusLayer implements IFocusLayer {
  public currentFocusable: IFocusable | null = null;
  public lastFocusable: IFocusable | null = null;
  public defaultFocusable: IFocusable | null = null;

  private _focusables: IFocusable[] = [];
  private _currentIndex: number = 0;

  constructor(public id: string | number) {}

  private _current: boolean = false;

  set current(value: boolean) {
    this._current = value;
    this.setCurrent();
  }

  public get availableFocusables(): IFocusable[] {
    return this._focusables.filter((f) => f.focusEnabled);
  }

  public setCurrent() {
    if (this._current) {
      if (!this.defaultFocusable) {
        this.defaultFocusable = this._focusables[0];
      }
      this.sortFocusables();
    } else {
      for (let i = 0; i < this._focusables.length; i++) {
        this._focusables[i].accessible = false;
      }
    }
  }

  public hasFocusable(focusable: IFocusable | null) {
    if (!focusable) {
      return false;
    }
    return this._focusables.indexOf(focusable) > -1;
  }

  public addFocusable(focusable: IFocusable, isDefault: boolean = false): void {
    this._focusables.push(focusable);
    if (isDefault) {
      this.defaultFocusable = focusable;
    }
    if (this._current) {
      this.sortFocusables();
    }
  }

  public removeFocusable(focusable: IFocusable) {
    const index = this._focusables.indexOf(focusable);
    if (index !== -1) {
      this._focusables.splice(index, 1);

      if (this.currentFocusable === focusable) {
        this.currentFocusable = null;
      }

      if (this.lastFocusable === focusable) {
        this.lastFocusable = null;
      }

      if (this.defaultFocusable === focusable) {
        this.defaultFocusable = null;
      }
    }
    if (this._current) {
      this.sortFocusables();
    }
  }

  public sortFocusables() {
    for (let i = 0; i < this._focusables.length; i++) {
      this._focusables[i].accessible = this._current;
      this._focusables[i].tabIndex = this._current ? Math.max(i, 1) + 1 : -1;
      if (this._focusables[i] === this.defaultFocusable) {
        this._focusables[i].tabIndex = this._current ? 1 : -1;
      }
    }
    if (this._current) {
      this._focusables.sort((a, b) => a.tabIndex - b.tabIndex);
    }
  }

  public sortFocusablesByPosition() {
    if (this._current) {
      this._focusables.sort((a: IFocusable, b: IFocusable) => {
        if (a.position.y !== b.position.y) {
          return a.position.y - b.position.y;
        }
        return a.position.x - b.position.x;
      });
    }
    Logger.log(this._focusables);
  }

  setCurrentFocusable(focusable: IFocusable | null) {
    if (focusable) {
      this._currentIndex = this._focusables.indexOf(focusable);
      this.currentFocusable = focusable;
    } else {
      this._currentIndex = -1;
      this.currentFocusable = null;
    }
    return this.currentFocusable;
  }

  public next() {
    this._currentIndex = this._currentIndex + 1;
    if (this._currentIndex >= this._focusables.length) {
      this._currentIndex = 0;
    }
    this.currentFocusable = this._focusables[this._currentIndex];
    return this.currentFocusable;
  }

  public prev() {
    this._currentIndex = this._currentIndex - 1;
    if (this._currentIndex < 0) {
      this._currentIndex = this._focusables.length - 1;
    }
    this.currentFocusable = this._focusables[this._currentIndex];
    return this.currentFocusable;
  }
}

export type FocusChangeDetail = { layer: string | number | null; focusable: IFocusable | null };

export interface IFocusManagerPlugin extends IPlugin {
  readonly view: Container;
  readonly layerCount: number;
  readonly currentLayer: IFocusLayer | undefined;
  readonly currentLayerId: string | number | null;
  readonly active: boolean;
  readonly layers: Map<string | number, IFocusLayer>;

  onFocusManagerActivated: Signal<() => void>;
  onFocusManagerDeactivated: Signal<() => void>;
  onFocusLayerChange: Signal<(currentLayerId: string | number) => void>;
  onFocusChange: Signal<(detail: FocusChangeDetail) => void>;

  enabled: boolean;

  restart(): void;

  focus(focusable: IFocusable): void;

  forceFocus(focusable: IFocusable): void;

  setFocus(focusable: IFocusable): void;

  addFocusLayer(layerId?: string | number, setAsCurrent?: boolean, focusables?: IFocusable | IFocusable[]): IFocusLayer;

  removeFocusLayer(layerId?: string | number): void;

  setFocusLayer(layerId: string | number): void;

  setLayerOrder(layerIds: (string | number)[]): void;

  add(focusable: IFocusable | IFocusable[], layerId?: string | number, isDefault?: boolean): void;

  addFocusable(focusable: IFocusable | IFocusable[], layerId?: string | number, isDefault?: boolean): void;

  remove(focusable: IFocusable | IFocusable[]): void;

  removeFocusable(focusable: IFocusable | IFocusable[]): void;

  deactivate(): void;

  clearFocus(): void;

  removeAllFocusLayers(): void;

  sortFocusablesByPosition(): void;
}

export class FocusManagerPlugin extends Plugin implements IFocusManagerPlugin {
  public override readonly id: string = 'focus';
  public readonly view = new Container();
  // signals
  public onFocusManagerActivated: Signal<() => void> = new Signal<() => void>();
  public onFocusManagerDeactivated: Signal<() => void> = new Signal<() => void>();
  public onFocusLayerChange: Signal<(currentLayerId: string | number) => void> = new Signal<
    (currentLayerId: string | number) => void
  >();
  public onFocusChange: Signal<(detail: FocusChangeDetail) => void> = new Signal<(detail: FocusChangeDetail) => void>();
  //
  private _focusOutliner: IFocusOutliner;
  private _focusTarget: IFocusable | null = null;
  private _keyboardActive: boolean = false;
  private _options: FocusManagerPluginOptions;

  private _layers: Map<string | number, IFocusLayer> = new Map();

  public get layers(): Map<string | number, IFocusLayer> {
    return this._layers;
  }

  private _currentLayerId: string | number | null = null;

  get currentLayerId(): string | number | null {
    return this._currentLayerId;
  }

  get currentLayer(): IFocusLayer | undefined {
    if (!this._currentLayerId) {
      return undefined;
    }
    return this._layers.get(this._currentLayerId);
  }

  private _active: boolean = false;

  get active(): boolean {
    return this._active;
  }

  private _enabled: boolean = true;

  get enabled() {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
  }

  public get layerCount(): number {
    return this._layers.size;
  }

  public sortFocusablesByPosition() {
    this._getCurrentLayer()?.sortFocusablesByPosition();
  }

  public initialize(app: IApplication): void {
    bindMethods(this, 'removeAllFocusLayers', '_handleGlobalMouseMove', '_handleGlobalPointerDown');
    const options: Partial<FocusManagerPluginOptions> = app.config?.focus || {};
    options.usePixiAccessibility = options.usePixiAccessibility ?? false;
    this._focusOutliner =
      typeof options?.outliner === 'function'
        ? new (options.outliner as Constructor<IFocusOutliner>)()
        : new FocusOutliner(options.outliner as Partial<FocusOutlinerConfig>);

    this._options = options as FocusManagerPluginOptions;

    this.view.addChild(this._focusOutliner as unknown as Container);

    this._updatePixiAccessibility();

    this._setupKeyboardListeners();
    this._setupAppListeners();
  }

  public destroy(): void {
    this._removeGlobalListeners();
    this.deactivate();
    this._focusOutliner.destroy();
    this._layers.clear();
    super.destroy();
  }

  public deactivate(): void {
    this._setTarget(null);
    this._updateOutliner();
    this._active = false;
  }

  public add(focusable: IFocusable | IFocusable[], layerId?: string | number, isDefault: boolean = false): void {
    this.addFocusable(focusable, layerId, isDefault);
  }

  public addFocusable(
    focusable: IFocusable | IFocusable[],
    layerId?: string | number | null | undefined,
    isDefault: boolean = false,
  ): void {
    if (layerId === undefined || layerId == null) {
      layerId = this._currentLayerId ?? null;
    }
    const layer = this._layers.get(layerId!);
    if (!layer) {
      Logger.error(`Layer with ID ${layerId} does not exist.`);
      return;
    }
    if (!Array.isArray(focusable)) {
      focusable = [focusable];
    }
    (focusable as IFocusable[]).forEach((f, idx) => {
      layer.addFocusable(f, idx === 0 && isDefault);
    });

    if (this._active && isDefault) {
      this._setTarget(layer.currentFocusable || layer.defaultFocusable || null, !this._active);
    }
  }

  public remove(focusable: IFocusable | IFocusable[]) {
    this.removeFocusable(focusable);
  }

  public removeFocusable(focusable: IFocusable | IFocusable[]) {
    if (!Array.isArray(focusable)) {
      focusable = [focusable];
    }
    this._layers.forEach((layer) => {
      (focusable as IFocusable[]).forEach((f) => {
        layer.removeFocusable(f);
      });
    });
    if (this._focusTarget && focusable.includes(this._focusTarget)) {
      this._setTarget(null);
    }
  }

  public setLayerOrder(layerIds: (string | number)[]): void {
    const newLayers: Map<string | number, IFocusLayer> = new Map();
    layerIds.forEach((layerId) => {
      if (!this._layers.has(layerId)) {
        throw new Error(`Layer with ID ${layerId} does not exist.`);
      }
      newLayers.set(layerId, this._layers.get(layerId)!);
    });
    this._layers = newLayers;
  }

  public addFocusLayer(
    layerId?: string | number,
    setAsCurrent: boolean = true,
    focusables?: IFocusable | IFocusable[],
  ): IFocusLayer {
    if (layerId === undefined) {
      layerId = this._layers.size;
    }
    let newLayer;
    if (this._layers.has(layerId)) {
      Logger.error(`Layer with ID ${layerId} already exists.`);
      newLayer = this._layers.get(layerId)!;
    } else {
      newLayer = new FocusLayer(layerId);
      this._layers.set(layerId, newLayer);
    }

    if (setAsCurrent || this._currentLayerId === null) {
      this.setFocusLayer(layerId);
    }
    if (focusables) {
      this.addFocusable(focusables, layerId);
    }
    return newLayer;
  }

  public removeFocusLayer(layerId?: string | number, removeTopLayerIfUndefined = true): void {
    if (layerId === undefined && removeTopLayerIfUndefined) {
      return this._removeTopLayer();
    }
    if (!this._layers.has(layerId!)) {
      throw new Error(`Layer with ID ${layerId} does not exist.`);
    }
    const nextLayerId = getPreviousMapEntry(this._layers, layerId)?.[0];
    this._layers.delete(layerId!);
    this._postDelete(nextLayerId);
  }

  public restart(reverse: boolean = false) {
    const layer = this._getCurrentLayer();
    this._setTarget(
      reverse
        ? layer?.availableFocusables?.[layer?.availableFocusables?.length - 1] || null
        : layer?.availableFocusables?.[0] || null,
    );
  }

  public forceFocus(focusable: IFocusable) {
    this.focus(focusable);
  }

  public setFocus(focusable: IFocusable) {
    this.focus(focusable);
  }

  public focus(focusable: IFocusable) {
    this._setTarget(focusable);
  }

  public setFocusLayer(layerId: string | number): void {
    if (!this._layers.has(layerId)) {
      throw new Error(`Layer with ID ${layerId} does not exist.`);
    }
    this._currentLayerId = layerId;
    const currentLayer = this._getCurrentLayer();
    if (currentLayer) {
      currentLayer.current = true;
      this._layers.forEach((layer, key) => {
        layer.current = key === layerId;
      });
      currentLayer.sortFocusables();
      this._setTarget(currentLayer.currentFocusable || currentLayer.defaultFocusable || null, !this._active);
    }
    this.onFocusLayerChange.emit(this._currentLayerId);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public postInitialize(_app: IApplication): Promise<void> | void {}

  public clearFocus() {
    this._setTarget(null);
  }

  public removeAllFocusLayers(): void {
    this._layers.clear();
    this._setTarget(null);
  }

  _onKeyDown(e: KeyboardEvent) {
    if (!this._enabled || (e.key !== 'Tab' && e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Space')) {
      return;
    }
    if (!this._options.usePixiAccessibility) {
      // e.preventDefault();
      if (e.key === 'Tab') {
        e.preventDefault();
        const layer = this._getCurrentLayer();
        const focusables = layer?.availableFocusables;
        if (!focusables) {
          return;
        }
        if (!this._keyboardActive) {
          this._activate();
          this._setTarget(this._focusTarget || layer.currentFocusable || layer.defaultFocusable || null);
        } else {
          // check if we're on the last focusable
          if (e.shiftKey) {
            this._prev();
          } else {
            this._next();
          }
        }
      } else if (e.key === 'Enter' || e.key === ' ' || e.key === 'Space') {
        if (this._focusTarget && this._focusTarget.isFocused) {
          this._focusTarget.emit('pointerdown', { type: 'pointerdown' });
        }
      }
    }
  }

  _onKeyUp(e: KeyboardEvent) {
    if (!this._enabled || (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Space')) {
      return;
    }
    if (!this._options.usePixiAccessibility) {
      // e.preventDefault();
      if (this._focusTarget && this._focusTarget.isFocused) {
        this._focusTarget?.emit('click', { type: 'click', originalEvent: e });
        this._focusTarget?.emit('pointerup', { type: 'pointerup', originalEvent: e });
      }
    }
  }

  _onMouseMove(e: MouseEvent) {
    if (e.movementX === 0 && e.movementY === 0) {
      return;
    }
    this._deactivate();
  }

  protected getCoreFunctions(): string[] {
    return [
      'addFocusable',
      'removeFocusable',
      'setLayerOrder',
      'addFocusLayer',
      'removeFocusLayer',
      'setFocusLayer',
      'setFocus',
      'focus',
      'clearFocus',
      'removeAllFocusLayers',
    ];
  }

  protected getCoreSignals(): string[] {
    return ['onFocusManagerActivated', 'onFocusManagerDeactivated', 'onFocusLayerChange', 'onFocusChange'];
  }

  private _next() {
    const nextTarget = this._getCurrentLayer()?.next();
    if (!nextTarget) {
      Logger.error('FocusManager:: _next():: No focusable found in the current layer.');
      return;
    }
    this._setTarget(nextTarget);
  }

  private _prev() {
    const nextTarget = this._getCurrentLayer()?.prev();
    if (!nextTarget) {
      Logger.error('FocusManager:: _prev():: No focusable found in the current layer.');
      return;
    }
    this._setTarget(nextTarget);
  }

  private _deactivate() {
    if (!this._keyboardActive) {
      return;
    }
    this._keyboardActive = false;
  }

  private _activate() {
    if (this._keyboardActive) {
      return;
    }
    this._keyboardActive = true;
    globalThis.document.addEventListener('mousemove', this._onMouseMove, true);
  }

  private _updatePixiAccessibility() {
    // @ts-expect-error _div is protected
    this.app.renderer.accessibility._div.setAttribute('id', 'pixi-accessibility');
    if (!this._options.usePixiAccessibility) {
      // @ts-expect-error _div is protected
      this.app.renderer.accessibility._div.setAttribute('disabled', 'disabled');
      this.app.renderer.accessibility.destroy();
      globalThis.addEventListener('keydown', this._onKeyDown, false);
      globalThis.addEventListener('keyup', this._onKeyUp, false);
    }
  }

  private _getCurrentLayer(): IFocusLayer | null {
    return this._currentLayerId != null ? this._layers.get(this._currentLayerId) || null : null;
  }

  private _removeTopLayer() {
    const layerId = getLastMapEntry(this._layers)?.[0];
    const nextLayerId = getPreviousMapEntry(this._layers, layerId)?.[0];
    if (layerId === undefined) {
      return;
    }
    this._layers.delete(layerId);
    this._postDelete(nextLayerId);
  }

  private _postDelete(nextLayerId: string | number | undefined) {
    if (this._layers.size === 0) {
      this._currentLayerId = null;
    } else if (nextLayerId !== undefined) {
      this.setFocusLayer(nextLayerId);
    }
  }

  private _setTarget(focusTarget: IFocusable | null, setInactiveOnNull: boolean = true) {
    const layer = this._getCurrentLayer();
    const oldFocusTarget = this._focusTarget;
    this._focusTarget = focusTarget;
    // call the focus out methods on the current focusable, which is changing
    if (oldFocusTarget && this._active) {
      this._clearFocusTarget(oldFocusTarget);
    }
    if (this.app.renderer.accessibility.isActive || this._keyboardActive) {
      if (this._focusTarget) {
        if (!this._active) {
          this._active = true;
        }
        if (this._options.usePixiAccessibility && !this._focusTarget._accessibleDiv) {
          this.app.renderer.accessibility.postrender();
        }

        if (this._options.usePixiAccessibility) {
          this.app.ticker.addOnce(() => {
            this._focusTarget?._accessibleDiv?.focus();
          });
        }

        if (layer?.hasFocusable(focusTarget)) {
          // call focusIn on the focusable
          if (this._focusTarget) {
            this._focusTarget.focusIn();
            this._focusTarget.isFocused = true;
            this._focusTarget.onFocusIn.emit(this._focusTarget);
            layer.setCurrentFocusable(this._focusTarget);
            this._updateOutliner();
          }
        } else {
          Logger.warn(
            `The focusable`,
            focusTarget,
            `does not exist on the current focus layer: ${this._currentLayerId}`,
          );
        }
      } else {
        this._focusOutliner.clear();
      }
    } else {
      this._focusOutliner.clear();
      if (this._active && setInactiveOnNull) {
        this._active = false;
        this.onFocusManagerDeactivated.emit();
        return;
      }
    }

    if (oldFocusTarget !== focusTarget && this._active) {
      this.onFocusChange.emit({ focusable: this._focusTarget, layer: this._currentLayerId });
    }
  }

  private _clearFocusTarget(focusTarget: IFocusable | null) {
    if (!focusTarget) {
      return;
    }
    focusTarget.focusOut();
    focusTarget.isFocused = false;
    focusTarget.onFocusOut.emit(focusTarget);
    focusTarget.blur();
    focusTarget.onBlur.emit(focusTarget);
  }

  private _setupKeyboardListeners(): void {
    window.addEventListener('keydown', this._onKeyDown, false);
    this._addGlobalListeners();
  }

  private _addGlobalListeners() {
    globalThis.document.addEventListener('mousemove', this._handleGlobalMouseMove);
    globalThis.document.addEventListener('pointerdown', this._handleGlobalPointerDown);
  }

  private _removeGlobalListeners() {
    globalThis.document.removeEventListener('mousemove', this._handleGlobalMouseMove);
    globalThis.document.removeEventListener('pointerdown', this._handleGlobalPointerDown);
  }

  private _handleGlobalMouseMove() {
    if (!this._enabled) {
      return;
    }
    if (this._active) {
      this.deactivate();
    }
  }

  private _handleGlobalPointerDown() {
    if (!this._enabled) {
      return;
    }
    if (this._active) {
      this.deactivate();
    }
    if (this.app.renderer.accessibility.isActive || this._keyboardActive) {
      // @ts-expect-error _deactivate is protected
      this.app.renderer.accessibility._deactivate();
      this._deactivate();
    }
  }

  private _setupAppListeners(): void {
    this.app.scenes.onSceneChangeStart.connect(this.removeAllFocusLayers);
  }

  private _updateOutliner() {
    if (this._focusTarget) {
      this._focusOutliner.position.set(this._focusTarget.position.x, this._focusTarget.position.y);
      this._focusOutliner.draw(this._focusTarget);
    } else {
      this._focusOutliner.clear();
    }
  }
}
