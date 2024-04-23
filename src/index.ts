/**
 * This is the main entry point for the library. It exports all the necessary classes, types, and utilities.
 */

export * from './pixi';

// core
/**
 * Export the Application class from the 'core' module.
 * This class is used to create a new application instance.
 */
export { Application } from './core/Application';
/**
 * Export the IApplication and RequiredApplicationConfig types from the 'core' module.
 * These types are used for type checking the application instance and its configuration.
 */
export type { IApplication, RequiredApplicationConfig } from './core/Application';

/**
 * Export various types from the 'modules' module.
 * These types are used for type checking the different modules of the application.
 */
export type { IAssetManager } from './modules/AssetManager';
export type { ISceneManager, LoadSceneMethod } from './modules/SceneManager';
export type { IWebEventsManager } from './modules/WebEventsManager';
export type { IKeyboardManager, KeyboardEventDetail } from './modules/KeyboardManager';
export type { IFocusable, IFocusManager, FocusManagerOptions } from './modules/focus/FocusManager';
export type { IAudioManager } from './modules/audio/AudioManager';
export type { Ii18nModule, i18nOptions } from './modules/i18nModule';
export type { IResizer } from './modules/Resizer';
export type { IInputManager, ActionDetail } from './modules/InputManager';
export type { IModule } from './modules/Module';

export { Module } from './modules/Module';
export { AssetManager } from './modules/AssetManager';
export { i18nModule } from './modules/i18nModule';
export { KeyboardManager } from './modules/KeyboardManager';
export { Resizer } from './modules/Resizer';
export { SceneManager } from './modules/SceneManager';
export { SpineModule } from './modules/SpineModule';
export { StatsModule } from './modules/StatsModule';
export { WebEventsManager } from './modules/WebEventsManager';
export { InputManager, ActionContext, Action } from './modules/InputManager';

export { default as defaultModules } from './modules/defaultModules';

/**
 * Export the StorageAdapter and LocalStorageAdapter classes from the 'store' module.
 * These classes are used for managing the application's storage.
 */
export { StorageAdapter } from './store/adapters/StorageAdapter';
export { LocalStorageAdapter } from './store/adapters/LocalStorageAdapter';
export type { IStorageAdapter } from './store/adapters/StorageAdapter';
export { Store } from './store/Store';

/**
 * Export various utility types and functions from the 'utils' module.
 * These utilities are used throughout the application for various tasks.
 */
export type {
  WithRequiredProps,
  Constructor,
  TextureLike,
  SpriteSheetLike,
  ContainerLike,
  RectLike,
  PointLike,
  WithPointLike,
  Size,
  ImportListItem,
  ImportList,
  SceneImportList,
  SceneImportListItem,
} from './utils/types';
export { clamp, lerp } from './utils/math';
export { resolvePointLike, getSheetLikeString, setObjectName } from './utils/functions';
export { getPreviousMapEntry, getLastMapEntry } from './utils/map';
export { isRetina, isMobile } from './utils/platform';
export { isDev, isProduction, env } from './utils/env';
export { Logger } from './utils/console/Logger';
export { Queue, createQueue } from './utils/promise/Queue';
export { delay } from './utils/async';
export { pluck, omitKeys } from './utils/object';
export { bindMethods, bindAllMethods, checkAndInvokeMethod } from './utils/methodBinding';
export { getDynamicModuleFromImportListItem } from './utils/framework';

/**
 * Export various mixin classes from the 'mixins' module.
 * These mixins are used to add additional functionality to the application's classes.
 */
export { FactoryContainer } from './mixins/factory';
export { Animated } from './mixins/animated';
export { Interactive } from './mixins/interaction';
export { Focusable } from './mixins/focus';
export { WithSignals } from './mixins/signals';

/**
 * Export the Container and Scene classes from the 'display' module.
 * These classes are used for managing the application's display.
 */
export { Container } from './display/Container';
export { Popup } from './display/Popup';
export type { PopupConfig } from './display/Popup';
export { Button } from './display/Button';
export { Scene } from './display/Scene';
export { FlexContainer } from './display/FlexContainer';
export { UICanvas } from './display/UICanvas';
export type {
  IFlexContainer,
  FlexWrap,
  FlexDirection,
  JustifyContent,
  AlignItems,
  FlexContainerConfig,
} from './display/FlexContainer';

export type { IContainer } from './display/Container';
export type { IPopup } from './display/Popup';
export type { IScene } from './display/Scene';

/**
 * Export the create function from the 'core' module.
 * This function is used to create a new application instance.
 */
export { create } from './core/create';
