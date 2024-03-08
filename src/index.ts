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
// modules
export type { IAssetManager } from './modules/default/AssetManager';
export type { ISceneManager, LoadSceneMethod } from './modules/default/SceneManager';
export type { IWebEventsManager } from './modules/default/WebEventsManager';
export type { IKeyboardManager, KeyboardEventDetail } from './modules/default/KeyboardManager';
export type { IFocusable, IFocusManager, FocusManagerOptions } from './modules/default/focus/FocusManager';
export type { IAudioManager } from './modules/default/audio/AudioManager';
export type { IModule } from './modules/Module';
export { Module } from './modules/Module';
export { default as defaultModules } from './modules/default/defaultModules';

// store
/**
 * Export the StorageAdapter and LocalStorageAdapter classes from the 'store' module.
 * These classes are used for managing the application's storage.
 */
export { StorageAdapter } from './store/adapters/StorageAdapter';
export { LocalStorageAdapter } from './store/adapters/LocalStorageAdapter';
export type { IStorageAdapter } from './store/adapters/StorageAdapter';
export { Store } from './store/Store';

// utils
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
} from './utils/types';
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

// mixins
/**
 * Export various mixin classes from the 'mixins' module.
 * These mixins are used to add additional functionality to the application's classes.
 */
export { Factory } from './mixins/factory';
export { Animated } from './mixins/animated';
export { Interactive } from './mixins/interaction';
export { Focusable } from './mixins/focus';

// display
/**
 * Export the Container and Scene classes from the 'display' module.
 * These classes are used for managing the application's display.
 */
export { Container } from './display/Container';
export { Button } from './display/Button';
export { Scene } from './display/Scene';
export type { IContainer } from './display/Container';
export type { IScene } from './display/Scene';

// create
/**
 * Export the create function from the 'core' module.
 * This function is used to create a new application instance.
 */
export { create } from './core/create';
