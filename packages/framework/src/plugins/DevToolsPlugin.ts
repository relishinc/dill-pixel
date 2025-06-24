import { initDevtools } from '@pixi/devtools';
import { Application } from 'pixi.js';
import { Plugin, type IPlugin } from './Plugin';

/**
 * Interface for the DevTools plugin providing development debugging capabilities.
 * Enables PIXI.js developer tools integration for enhanced debugging and inspection.
 */
export interface IDevToolsPlugin extends IPlugin {
  /**
   * Initializes the PIXI DevTools for the given application instance.
   * Enables the browser developer tools extension for PIXI.js debugging.
   *
   * @param app - The PIXI Application instance to attach devtools to
   *
   * @example
   * ```typescript
   * const devToolsPlugin = app.plugins.get<IDevToolsPlugin>('DevToolsPlugin');
   * if (devToolsPlugin && process.env.NODE_ENV === 'development') {
   *   devToolsPlugin.initializeDevTools(pixiApp);
   * }
   * ```
   */
  initializeDevTools(app: Application): void;
}

/**
 * Developer tools plugin for enhanced PIXI.js debugging and inspection.
 *
 * Integrates the official PIXI.js developer tools browser extension, providing
 * visual debugging capabilities, scene graph inspection, and performance monitoring
 * directly in the browser's developer tools panel.
 *
 * Features:
 * - Scene graph visualization and navigation
 * - Real-time property inspection and editing
 * - Performance metrics and rendering statistics
 * - Texture atlas and asset inspection
 * - Interactive debugging tools
 *
 * @example
 * ```typescript
 * // Plugin is typically initialized automatically in development builds
 * // Manual initialization example:
 * const devToolsPlugin = app.plugins.get<IDevToolsPlugin>('DevToolsPlugin');
 * if (devToolsPlugin && process.env.NODE_ENV === 'development') {
 *   devToolsPlugin.initializeDevTools(pixiApp);
 * }
 *
 * // The devtools will then be available in browser developer tools
 * // Look for the "PIXI" tab in Chrome/Firefox developer tools
 * ```
 *
 * @remarks
 * - Should only be enabled in development environments
 * - Requires the PIXI DevTools browser extension to be installed
 * - May impact performance and should be disabled in production builds
 * - Provides comprehensive debugging capabilities for PIXI.js applications
 */
export class DevToolsPlugin extends Plugin implements IDevToolsPlugin {
  /** Plugin identifier for framework registration */
  public readonly id = 'DevToolsPlugin';

  /**
   * Initializes the DevTools plugin.
   * Sets up the plugin for later DevTools activation when needed.
   *
   * @example
   * ```typescript
   * // Called automatically by the plugin system
   * // No manual initialization required
   * ```
   */
  async initialize() {}

  /**
   * Initializes and activates PIXI DevTools for the specified application.
   * Connects the application to the browser's PIXI DevTools extension for debugging.
   *
   * @param app - The PIXI Application instance to enable debugging for
   *
   * @example
   * ```typescript
   * // Typically called conditionally based on environment
   * const pixiApp = new PIXI.Application();
   * const devToolsPlugin = app.plugins.get<IDevToolsPlugin>('DevToolsPlugin');
   *
   * if (devToolsPlugin && process.env.NODE_ENV === 'development') {
   *   devToolsPlugin.initializeDevTools(pixiApp);
   *   console.log('PIXI DevTools enabled - check browser developer tools');
   * }
   * ```
   *
   * @remarks
   * - Should only be called in development environments
   * - Requires the PIXI DevTools browser extension to be installed
   * - Once initialized, debugging tools will be available in the browser's developer tools
   * - The extension provides a "PIXI" tab with comprehensive debugging features
   */
  public initializeDevTools(app: Application) {
    initDevtools({ app });
  }
}
