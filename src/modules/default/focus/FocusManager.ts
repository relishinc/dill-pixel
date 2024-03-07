import { Bounds, Container, PointerEvents, PointLike } from 'pixi.js';
import { IApplication } from '../../../core/Application';
import { CoreModule } from '../../../core/decorators';
import { PIXIContainer } from '../../../pixi';
import { Signal } from '../../../signals';
import { Logger } from '../../../utils/console/Logger';
import { getLastMapEntry, getPreviousMapEntry } from '../../../utils/map';
import { bindMethods } from '../../../utils/methodBinding';
import { Constructor } from '../../../utils/types';
import type { IModule } from '../../Module';
import { Module } from '../../Module';
import { FocusOutliner, FocusOutlinerConfig, IFocusOutliner } from './FocusOutliner';

export type FocusManagerOptions = {
  outliner: IFocusOutliner | Partial<FocusOutlinerConfig>;
};

export interface IFocusable {
  focusEnabled: boolean;

  // pixi accessibility features
  accessible: boolean;
  accessibleType: string;
  accessibleTitle: string;
  accessibleHint: string;
  accessiblePointerEvents?: PointerEvents;
  tabIndex: number;
  accessibleChildren: boolean;

  // signals
  onFocusIn: Signal<(focusable: IFocusable) => void>;
  onFocusOut: Signal<(focusable: IFocusable) => void>;
  onFocus: Signal<(focusable: IFocusable) => void>;
  onBlur: Signal<(focusable: IFocusable) => void>;
  position: PointLike;

  focusIn(): void;

  focusOut(): void;

  focus(): void;

  blur(): void;

  getGlobalPosition(): PointLike;

  getFocusArea(): Bounds;
}

export interface IFocusLayer {
  currentFocusable: IFocusable | null;
  defaultFocusable: IFocusable | null;
  lastFocusable: IFocusable | null;

  hasFocusable(focusable: IFocusable | null): boolean;

  setCurrent(): void;

  addFocusable(focusable: IFocusable, isDefault?: boolean): void;

  removeFocusable(focusable: IFocusable): void;

  navigate(direction: number): void;
}

class FocusLayer implements IFocusLayer {
  public currentFocusable: IFocusable | null = null;
  public lastFocusable: IFocusable | null = null;
  public defaultFocusable: IFocusable | null = null;

  private _focusables: IFocusable[] = [];
  private _currentIndex: number = 0;

  constructor() {}

  private get _availableFocusables(): IFocusable[] {
    return this._focusables.filter((f) => f.focusEnabled);
  }

  public setCurrent() {
    if (!this.defaultFocusable) {
      this.defaultFocusable = this._focusables[0];
    }
    this._focusables.forEach((f) => {
      f.accessible = true;
    });
  }

  public hasFocusable(focusable: IFocusable | null) {
    if (!focusable) {
      return false;
    }
    return this._focusables.indexOf(focusable) > -1;
  }

  public addFocusable(focusable: IFocusable, isDefault: boolean = false): void {
    this._focusables.push(focusable);
    focusable.tabIndex = this._focusables.length - 1;
    if (isDefault) {
      this.defaultFocusable = focusable;
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
  }

  public navigate(direction: number): void {
    const available = this._availableFocusables;

    this._currentIndex = (this._currentIndex + direction + available.length) % available.length;

    this.currentFocusable = available[this._currentIndex];
  }
}

type FocusChangeDetail = { layer: string | number | null; focusable: IFocusable | null };

export interface IFocusManager extends IModule {
  readonly view: Container;
  readonly layerCount: number;
  readonly currentLayerId: string | number | null;
  readonly active: boolean;

  onFocusManagerActivated: Signal<() => void>;
  onFocusManagerDeactivated: Signal<() => void>;
  onFocusLayerChange: Signal<(currentLayerId: string | number) => void>;
  onFocusChange: Signal<(detail: FocusChangeDetail) => void>;

  focus(focusable: IFocusable): void;

  forceFocus(focusable: IFocusable): void;

  addFocusLayer(layerId?: string | number, focusables?: IFocusable | IFocusable[], setAsCurrent?: boolean): IFocusLayer;

  removeFocusLayer(layerId?: string | number): void;

  setFocusLayer(layerId: string | number): void;

  setLayerOrder(layerIds: (string | number)[]): void;

  addFocusable(focusable: IFocusable | IFocusable[], layerId?: string | number, isDefault?: boolean): void;

  removeFocusable(focusable: IFocusable | IFocusable[]): void;

  deactivate(): void;
}

@CoreModule
export class FocusManager extends Module implements IFocusManager {
  public readonly id: string = 'FocusManager';
  public readonly view = new Container();
  // signals
  public onFocusManagerActivated = new Signal<() => void>();
  public onFocusManagerDeactivated = new Signal<() => void>();
  public onFocusLayerChange = new Signal<(currentLayerId: string | number) => void>();
  public onFocusChange = new Signal<(detail: FocusChangeDetail) => void>();
  //
  private _focusOutliner: IFocusOutliner;
  private _layers: Map<string | number, IFocusLayer> = new Map();

  private _currentLayerId: string | number | null = null;
  private _focusTarget: IFocusable | null = null;

  private _active: boolean = false;

  get active(): boolean {
    return this._active;
  }

  get currentLayerId(): string | number | null {
    return this._currentLayerId;
  }

  public get layerCount(): number {
    return this._layers.size;
  }

  public initialize(app: IApplication): void {
    bindMethods(this, 'removeAllFocusLayers');

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
    this.deactivate();
    this._focusOutliner.destroy();
    this._layers.clear();
  }

  public deactivate(): void {
    this._setTarget(null);
  }

  public addFocusable(
    focusable: IFocusable | IFocusable[],
    layerId?: string | number,
    isDefault: boolean = false,
  ): void {
    if (layerId === undefined) {
      layerId = getLastMapEntry(this._layers)?.[0];
    }
    const layer = this._layers.get(layerId!);
    if (!layer) {
      throw new Error(`Layer with ID ${layerId} does not exist.`);
    }
    if (!Array.isArray(focusable)) {
      focusable = [focusable];
    }
    (focusable as IFocusable[]).forEach((f) => {
      layer.addFocusable(f, isDefault);
    });
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
    focusables?: IFocusable | IFocusable[],
    setAsCurrent: boolean = true,
  ): IFocusLayer {
    if (layerId === undefined) {
      layerId = this._layers.size;
    }
    if (this._layers.has(layerId)) {
      throw new Error(`Layer with ID ${layerId} already exists.`);
    }
    const newLayer = new FocusLayer();
    this._layers.set(layerId, newLayer);
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

  public forceFocus(focusable: IFocusable) {
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
      currentLayer.setCurrent();
      if (this._active) {
        this._setTarget(currentLayer.currentFocusable || currentLayer.defaultFocusable || null);
      }
    }

    this.onFocusLayerChange.emit(this._currentLayerId);
  }

  public removeAllFocusLayers(): void {
    this._layers.clear();
  }

  private _getCurrentLayer() {
    return this._currentLayerId != null ? this._layers.get(this._currentLayerId) : null;
  }

  private _removeTopLayer() {
    const layerId = getLastMapEntry(this._layers)[0];
    const nextLayerId = getPreviousMapEntry(this._layers, layerId)?.[0];
    this._layers.delete(layerId);
    this._postDelete(nextLayerId);
  }

  private _postDelete(nextLayerId: string | number) {
    if (this._layers.size === 0) {
      this._currentLayerId = null;
    } else if (nextLayerId !== undefined) {
      this.setFocusLayer(nextLayerId);
    }
  }

  private _setTarget(focusTarget: IFocusable | null) {
    let shouldEmit = false;
    if (this._focusTarget !== focusTarget) {
      shouldEmit = true;
      // call the focus out methods on the current focusable, which is changing
      this._focusTarget?.focusOut();
      this._focusTarget?.onFocusOut?.emit(this._focusTarget!);
      this._focusTarget?.blur();
      this._focusTarget?.onBlur?.emit(this._focusTarget!);
    }

    this._focusTarget = focusTarget;

    if (this._focusTarget) {
      if (this._getCurrentLayer()?.hasFocusable(focusTarget)) {
        // call focusIn on the focusable
        this._focusTarget?.focusIn();
        this._focusTarget?.onFocusIn?.emit(this._focusTarget!);

        this._updateOutliner();
      } else {
        Logger.warn(`The focusable ${focusTarget} does not exist on the current focus layer: ${this._currentLayerId}`);
      }
    } else {
      this._focusOutliner.clear();

      if (this._active) {
        shouldEmit = true;
        this._active = false;
        this.onFocusManagerDeactivated.emit();
      }
    }

    if (shouldEmit) {
      this.onFocusChange.emit({ focusable: focusTarget, layer: this._currentLayerId });
    }
  }

  private _setupKeyboardListeners(): void {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const direction = this._active ? (e.shiftKey ? -1 : 1) : 0;
        if (!this._active) {
          this._active = true;
          this.onFocusManagerActivated.emit();
        }
        this._navigate(direction);
      }
      if (e.key === 'Enter' || e.key === ' ') {
        if (this._active && this._focusTarget) {
          this._focusTarget.focus();
          this._focusTarget.onFocus.emit(this._focusTarget);
        }
      }
    });

    window.addEventListener('mousedown', () => {
      this.deactivate();
    });
  }

  private _setupAppListeners(): void {
    this.app.scenes.onSceneChangeStart.connect(this.removeAllFocusLayers);
  }

  private _navigate(direction: number): void {
    if (this._currentLayerId == null || this._layers.size === 0) return;
    const currentLayer = this._layers.get(this._currentLayerId);
    if (currentLayer) {
      currentLayer.navigate(direction);
      this._setTarget(currentLayer.currentFocusable);
    }
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
