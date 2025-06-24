import '@pixi/layout';
import { Layout } from '@pixi/layout';
import '@pixi/layout/devtools';

import { Plugin, type IPlugin } from './Plugin';

/**
 * Interface for the Layout plugin providing PIXI.js layout management.
 * Enables advanced CSS-like layout capabilities for PIXI display objects.
 */
export interface ILayoutPlugin extends IPlugin {}

/**
 * Layout management plugin for PIXI.js applications using @pixi/layout.
 *
 * Integrates the @pixi/layout library to provide CSS-like layout capabilities
 * for PIXI display objects, including flexbox, positioning, and responsive design.
 * Automatically configures sensible default styles for consistent layout behavior.
 *
 * Key Features:
 * - CSS Flexbox-like layout system for PIXI containers
 * - Responsive design capabilities with intrinsic sizing
 * - Automatic layout calculation and positioning
 * - Gap, padding, and margin support
 * - Transform origin and object positioning controls
 * - Development tools integration for layout debugging
 *
 * Default Style Configuration:
 * - Container: Auto width/height with no gap
 * - Leaf: Intrinsic sizing with flex shrink enabled
 * - Shared: Center transform origin, row direction, stretch alignment
 *
 * @example
 * ```typescript
 * // Plugin is automatically initialized with the application
 * // Layout capabilities are immediately available on all containers
 *
 * // Create a flexbox-style layout
 * const container = new PIXI.Container();
 * container.layout = {
 *   display: 'flex',
 *   flexDirection: 'row',
 *   justifyContent: 'space-between',
 *   alignItems: 'center',
 *   gap: 10,
 *   padding: 20
 * };
 *
 * // Add children that will be automatically laid out
 * const button1 = new PIXI.Sprite(buttonTexture);
 * const button2 = new PIXI.Sprite(buttonTexture);
 * const button3 = new PIXI.Sprite(buttonTexture);
 *
 * container.addChild(button1, button2, button3);
 * // Children are automatically positioned using flexbox rules
 *
 * // Responsive design with intrinsic sizing
 * const responsiveContainer = new PIXI.Container();
 * responsiveContainer.layout = {
 *   width: '100%',
 *   maxWidth: 800,
 *   flexDirection: 'column',
 *   alignItems: 'center'
 * };
 * ```
 *
 * @remarks
 * - Requires @pixi/layout package to be installed
 * - Provides devtools integration for layout debugging in development
 * - Default styles are optimized for common game UI patterns
 * - Layout calculations happen automatically when display objects are added/modified
 * - Supports both absolute and relative positioning
 */
export class LayoutPlugin extends Plugin implements ILayoutPlugin {
  /** Plugin identifier for framework registration */
  public readonly id = 'LayoutPlugin';

  /**
   * Initializes the Layout plugin with optimized default styles.
   * Configures the @pixi/layout system with sensible defaults for game development,
   * including flexbox behavior, sizing, and alignment settings.
   *
   * Default Configuration Details:
   * - **Container styles**: Auto-sizing with no gaps for efficient nesting
   * - **Leaf styles**: Intrinsic sizing with flex shrink for responsive behavior
   * - **Shared styles**: Center origins, row direction, and stretch alignment
   * - **Transform origin**: Set to 50% for predictable scaling and rotation
   * - **Object position**: Centered for consistent alignment behavior
   *
   * @example
   * ```typescript
   * // Called automatically by the plugin system
   * // After initialization, all PIXI containers support layout properties
   *
   * const container = new PIXI.Container();
   * container.layout = {
   *   display: 'flex',        // Use flexbox layout
   *   flexDirection: 'column', // Stack children vertically
   *   gap: 10,                // 10px gap between children
   *   padding: 15             // 15px padding around content
   * };
   * ```
   */
  async initialize() {
    Layout.defaultStyle = {
      container: {
        width: 'auto',
        height: 'auto',
        gap: 0,
      },
      leaf: {
        width: 'intrinsic',
        height: 'intrinsic',
        flexShrink: 1,
      },
      shared: {
        transformOrigin: '50%',
        objectPosition: 'center',
        flexShrink: 1,
        flexDirection: 'row',
        alignContent: 'stretch',
        flexWrap: 'nowrap',
        overflow: 'visible',
      },
    };
  }
}
