import { Bounds, Container, PointerEvents, PointLike } from 'pixi.js';
import { IApplication } from '../../core/Application';

import { CoreFunction, CoreModule } from '../../core/decorators';
import { PIXIContainer } from '../../pixi';
import { Signal } from '../../signals';
import { Logger } from '../../utils/console/Logger';
import { getLastMapEntry, getPreviousMapEntry } from '../../utils/map';
import { bindMethods } from '../../utils/methodBinding';
import { Constructor, PointLike as DillPixelPointLike } from '../../utils/types';
import type { IModule } from '../Module';
import { Module } from '../Module';
import { FocusOutliner, FocusOutlinerConfig, IFocusOutliner } from './FocusOutliner';

export type FocusManagerOptions = {
  outliner: IFocusOutliner | Partial<FocusOutlinerConfig>;
};

export interface IFocusable {
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
}

class FocusLayer implements IFocusLayer {
  public currentFocusable: IFocusable | null = null;
  public lastFocusable: IFocusable | null = null;
  public defaultFocusable: IFocusable | null = null;

  private _focusables: IFocusable[] = [];
  private _currentIndex: number = 0;
  private _current: boolean = false;

  constructor(public id: string | number) {}

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
}

type FocusChangeDetail = { layer: string | number | null; focusable: IFocusable | null };

export interface IFocusManager extends IModule {
  readonly view: Container;
  readonly layerCount: number;
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

  addFocusLayer(layerId?: string | number, focusables?: IFocusable | IFocusable[], setAsCurrent?: boolean): IFocusLayer;

  removeFocusLayer(layerId?: string | number): void;

  setFocusLayer(layerId: string | number): void;

  setLayerOrder(layerIds: (string | number)[]): void;

  add(focusable: IFocusable | IFocusable[], layerId?: string | number, isDefault?: boolean): void;

  addFocusable(focusable: IFocusable | IFocusable[], layerId?: string | number, isDefault?: boolean): void;

  remove(focusable: IFocusable | IFocusable[]): void;

  removeFocusable(focusable: IFocusable | IFocusable[]): void;

  deactivate(): void;
}

@CoreModule
export class FocusManager extends Module implements IFocusManager {
  public readonly id: string = 'FocusManager';
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
  private _layers: Map<string | number, IFocusLayer> = new Map();

  private _currentLayerId: string | number | null = null;
  private _focusTarget: IFocusable | null = null;

  private _active: boolean = false;
  private _enabled: boolean = true;

  get enabled() {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
  }

  get active(): boolean {
    return this._active;
  }

  get currentLayerId(): string | number | null {
    return this._currentLayerId;
  }

  public get layerCount(): number {
    return this._layers.size;
  }

  public get layers(): Map<string | number, IFocusLayer> {
    return this._layers;
  }

  public initialize(app: IApplication): void {
    this._updateAccesibilityDivId();

    bindMethods(this, 'removeAllFocusLayers', '_handleGlobalMouseMove', '_handleGlobalPointerDown');

    const options: Partial<FocusManagerOptions> = app.config?.focusOptions || {};
    this._focusOutliner =
      typeof options === 'function'
        ? new (options as Constructor<IFocusOutliner>)()
        : new FocusOutliner(options as Partial<FocusOutlinerConfig>);

    this.view.addChild(this._focusOutliner as unknown as PIXIContainer);
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

  @CoreFunction
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

    if (this._active && this.app.renderer.accessibility.isActive && isDefault) {
      this._setTarget(layer.currentFocusable || layer.defaultFocusable || null, !this._active);
    }
  }

  public remove(focusable: IFocusable | IFocusable[]) {
    this.removeFocusable(focusable);
  }

  @CoreFunction
  public removeFocusable(focusable: IFocusable | IFocusable[]) {
    if (!Array.isArray(focusable)) {
      focusable = [focusable];
    }
    this._layers.forEach((layer) => {
      (focusable as IFocusable[]).forEach((f) => {
        layer.removeFocusable(f);
      });
    });
  }

  @CoreFunction
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

  @CoreFunction
  public addFocusLayer(
    layerId?: string | number,
    focusables?: IFocusable | IFocusable[],
    setAsCurrent: boolean = true,
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

  @CoreFunction
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
        : layer?.defaultFocusable || null,
    );
  }

  public forceFocus(focusable: IFocusable) {
    this.focus(focusable);
  }

  @CoreFunction
  public setFocus(focusable: IFocusable) {
    this.focus(focusable);
  }

  public focus(focusable: IFocusable) {
    this._setTarget(focusable);
  }

  @CoreFunction
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

  @CoreFunction
  public removeAllFocusLayers(): void {
    this._layers.clear();
    this._setTarget(null);
  }

  private _updateAccesibilityDivId() {
    // @ts-ignore
    this.app.renderer.accessibility._div.setAttribute('id', 'pixi-accessibility');
  }

  private _getCurrentLayer() {
    return this._currentLayerId != null ? this._layers.get(this._currentLayerId) : null;
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
    if (this.app.renderer.accessibility.isActive) {
      if (this._focusTarget) {
        if (!this._active) {
          this._active = true;
        }
        //@ts-ignore
        if (!this._focusTarget._accessibleDiv) {
          this.app.renderer.accessibility.postrender();
        }
        this.app.ticker.addOnce(() => {
          this._focusTarget?._accessibleDiv?.focus();
        });

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
    window.addEventListener('keydown', (e) => {
      if (!this._enabled) {
        return;
      }
      if (e.key === 'Tab') {
        const layer = this._getCurrentLayer();
        const focusables = layer?.availableFocusables;

        if (!focusables) {
          return;
        }
        // check if we're on the last focusable

        if (
          (e.shiftKey && this._focusTarget === focusables[0]) ||
          (!e.shiftKey && this._focusTarget === focusables[focusables.length - 1])
        ) {
          e.preventDefault();
          this.restart(e.shiftKey);
        }
      }
    });

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

  private _handleGlobalMouseMove(e: MouseEvent) {
    if (!this._enabled) {
      return;
    }
    if (this._active) {
      this.deactivate();
    }
  }

  private _handleGlobalPointerDown(e: PointerEvent) {
    if (!this._enabled) {
      return;
    }
    if (this._active) {
      this.deactivate();
    }
    if (this.app.renderer.accessibility.isActive) {
      // @ts-ignore
      this.app.renderer.accessibility._deactivate();
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
