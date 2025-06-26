import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { BlurFilter, ColorMatrixFilter } from 'pixi.js';
import { IApplication } from '../core';
import { Signal } from '../signals';
import { type Eases } from '../utils';
import { Plugin, type IPlugin } from './Plugin';

/**
 * Configuration options for the GSAP plugin.
 */

export interface GSAPPluginOptions {
  /** Custom easing functions to register with GSAP */
  eases: Eases;
}

/**
 * Interface for the GSAPPlugin, defining its public API for high-performance animations.
 * Provides comprehensive GSAP integration with custom animation context management.
 */
export interface IGSAPPlugin extends IPlugin {
  /**
   * Array of all registered custom ease names.
   * @readonly
   */
  readonly easeNames: string[];

  /**
   * Object containing all registered custom eases, where keys are ease names and values are GSAP ease functions.
   * @readonly
   */
  readonly eases: Eases;

  /**
   * The GSAP instance for creating animations.
   * @readonly
   */
  readonly anim: typeof gsap;

  /**
   * Adds one or more GSAP tweens or timelines to a specified animation context.
   * Animation contexts are custom collections (Set) of tweens/timelines managed by this plugin,
   * NOT `gsap.Context` instances. If no contextId is provided, animations are added to the global context.
   *
   * @param animation - A single GSAP tween/timeline or an array of them
   * @param contextId - Optional ID of the custom animation context. Defaults to the global context
   * @returns The animation(s) that were added
   *
   * @example
   * ```typescript
   * // Add single animation to specific context
   * const tween = gsap.to(mySprite, { x: 100, duration: 1 });
   * gsapPlugin.addAnimation(tween, 'gameplayAnimations');
   *
   * // Add multiple animations to global context
   * const tweens = [
   *   gsap.to(sprite1, { alpha: 0.5, duration: 1 }),
   *   gsap.to(sprite2, { rotation: Math.PI, duration: 2 })
   * ];
   * gsapPlugin.addAnimation(tweens);
   * ```
   */
  addAnimation(
    animation: gsap.core.Tween | gsap.core.Timeline | (gsap.core.Tween | gsap.core.Timeline)[],
    contextId?: string,
  ): gsap.core.Tween | gsap.core.Timeline | (gsap.core.Tween | gsap.core.Timeline)[];

  /**
   * Registers a custom ease function with GSAP.
   *
   * @param name - The name of the custom ease
   * @param ease - The GSAP ease function
   * @returns An object containing the registered ease
   *
   * @example
   * ```typescript
   * // Register a custom bounce ease
   * gsapPlugin.registerCustomEase('myBounce', (progress) => {
   *   return progress < 0.5
   *     ? 2 * progress * progress
   *     : 1 - Math.pow(-2 * progress + 2, 3) / 2;
   * });
   *
   * // Use the custom ease in animations
   * gsap.to(mySprite, { x: 200, duration: 1, ease: 'myBounce' });
   * ```
   */
  registerCustomEase(name: string, ease: gsap.EaseFunction): Record<string, gsap.EaseFunction>;

  /**
   * Registers multiple custom ease functions with GSAP in batch.
   *
   * @param eases - An object where keys are ease names and values are GSAP ease functions
   * @returns The complete map of registered eases
   *
   * @example
   * ```typescript
   * gsapPlugin.registerEases({
   *   'softBounce': (t) => t * t * (3 - 2 * t),
   *   'sharpEase': (t) => t * t * t,
   *   'customBack': (t) => t * t * (2.7 * t - 1.7)
   * });
   * ```
   */
  registerEases(eases: Eases): Eases;

  /**
   * Retrieves a custom animation context (a Set of tweens/timelines) by its ID.
   * This is NOT a `gsap.Context` instance but rather a custom collection for grouping animations.
   *
   * @param contextId - The ID of the animation context
   * @returns The animation context (a Set of tweens/timelines) or null if not found
   *
   * @example
   * ```typescript
   * const menuAnimations = gsapPlugin.getContext('menuAnimations');
   * if (menuAnimations) {
   *   console.log(`Menu has ${menuAnimations.size} active animations`);
   * }
   * ```
   */
  getContext(contextId: string): Set<gsap.core.Tween | gsap.core.Timeline> | null;

  /**
   * Plays all animations in a specified custom animation context, or all animations in all contexts.
   *
   * @param contextId - Optional ID of the animation context. If omitted, plays all animations
   *
   * @example
   * ```typescript
   * // Play all animations in a specific context
   * gsapPlugin.playAll('gameplayAnimations');
   *
   * // Play all animations in all contexts
   * gsapPlugin.playAll();
   * ```
   */
  playAll(contextId?: string): void;

  /**
   * Pauses all animations in a specified custom animation context, or all animations in all contexts.
   *
   * @param contextId - Optional ID of the animation context. If omitted, pauses all animations
   *
   * @example
   * ```typescript
   * // Pause game animations when menu opens
   * gsapPlugin.pauseAll('gameplayAnimations');
   *
   * // Pause everything when app loses focus
   * gsapPlugin.pauseAll();
   * ```
   */
  pauseAll(contextId?: string): void;

  /**
   * Kills (stops and removes) all animations in a specified custom animation context, or all animations.
   * If all contexts are killed, the plugin's global animation collection is recreated.
   *
   * @param contextId - Optional ID of the animation context. If omitted, kills all animations
   *
   * @example
   * ```typescript
   * // Kill specific context when transitioning scenes
   * gsapPlugin.killAll('oldSceneAnimations');
   *
   * // Emergency stop all animations
   * gsapPlugin.killAll();
   * ```
   */
  killAll(contextId?: string): void;

  /**
   * Reverts all animations in a specified custom animation context to their initial state.
   *
   * @param contextId - Optional ID of the animation context. If omitted, reverts all animations
   *
   * @example
   * ```typescript
   * // Reset UI animations to initial state
   * gsapPlugin.revertAll('uiAnimations');
   *
   * // Reset everything for game restart
   * gsapPlugin.revertAll();
   * ```
   */
  revertAll(contextId?: string): void;

  /**
   * Clears (removes) a specific custom animation context and its tracked animations.
   * If this results in no active contexts, the global collection is recreated if all contexts are cleared.
   *
   * @param contextId - The ID of the animation context to clear
   *
   * @example
   * ```typescript
   * // Clean up completed level animations
   * gsapPlugin.clear('level1Animations');
   * ```
   */
  clear(contextId: string): void;

  /**
   * Clears all custom animation contexts and recreates the plugin's global animation collection.
   *
   * @example
   * ```typescript
   * // Complete reset when restarting the game
   * gsapPlugin.clearAll();
   * ```
   */
  clearAll(): void;

  /**
   * Kills all animations within the global animation collection managed by this plugin.
   *
   * @example
   * ```typescript
   * // Stop only global animations, keep context-specific ones
   * gsapPlugin.killGlobal();
   * ```
   */
  killGlobal(): void;

  /**
   * Reverts all animations within the global animation collection to their initial state.
   *
   * @example
   * ```typescript
   * // Reset global animations without affecting contexts
   * gsapPlugin.revertGlobal();
   * ```
   */
  revertGlobal(): void;

  /**
   * Clears all animations from the global animation collection managed by this plugin.
   *
   * @example
   * ```typescript
   * // Clear global animations for cleanup
   * gsapPlugin.clearGlobal();
   * ```
   */
  clearGlobal(): void;

  // signals
  onPlayAll: Signal<(contextId: string) => void>;
  onPauseAll: Signal<(contextId: string) => void>;
  onKillAll: Signal<(contextId: string) => void>;
  onRevertAll: Signal<(contextId: string) => void>;
  onClear: Signal<(detail: { contextId: string; kill: boolean }) => void>;
  onClearAll: Signal<(kill: boolean) => void>;
  onKillGlobal: Signal<() => void>;
  onRevertGlobal: Signal<() => void>;
  onClearGlobal: Signal<(kill: boolean) => void>;
  onEaseRegistered: Signal<(detail: { name: string; ease: gsap.EaseFunction }) => void>;
  onEasesRegistered: Signal<(eases: Eases) => void>;
  onAnimationAddded: Signal<(detail: { animation: gsap.core.Tween | gsap.core.Timeline; contextId: string }) => void>;
}

/**
 * Type alias for animation context collections.
 * Represents a Set containing GSAP tweens and timelines for grouped animation management.
 */
export type AnimationContext = Set<gsap.core.Tween | gsap.core.Timeline>;

/**
 * High-performance GSAP animation plugin for PIXI.js applications.
 *
 * Integrates the GreenSock Animation Platform (GSAP) into the application framework,
 * providing powerful and flexible animation capabilities with optimized PIXI.js integration.
 * Features custom animation context management for grouped animation control, custom easing
 * registration, and automatic PIXI.js property animation support.
 *
 * Key Features:
 * - Full GSAP integration with PIXI.js optimization
 * - Custom animation contexts for grouped control (pause/play/kill by category)
 * - Custom easing function registration and management
 * - Automatic PIXI filter integration (BlurFilter, ColorMatrixFilter)
 * - Memory-efficient animation tracking and cleanup
 * - Global and context-specific animation management
 *
 * **Important:** Animation "contexts" in this plugin are custom collections (Sets) for grouping
 * animations and are NOT the same as `gsap.Context` objects provided by GSAP itself.
 *
 * @example
 * ```typescript
 * // Basic setup and usage
 * const gsapPlugin = app.plugins.get<IGSAPPlugin>('GSAPPlugin');
 *
 * // Create optimized PIXI animations
 * const sprite = new PIXI.Sprite(texture);
 * gsapPlugin.anim.to(sprite, {
 *   x: 100,
 *   y: 50,
 *   alpha: 0.8,
 *   duration: 1,
 *   ease: 'back.out(1.7)'
 * });
 *
 * // Register custom eases for game feel
 * gsapPlugin.registerCustomEase('gameJuice', (t) => {
 *   return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
 * });
 *
 * // Context-based animation management
 * const menuTween = gsapPlugin.anim.to(menuButton, { scale: 1.1, duration: 0.3 });
 * gsapPlugin.addAnimation(menuTween, 'menuAnimations');
 *
 * // Later: pause all menu animations when game starts
 * gsapPlugin.pauseAll('menuAnimations');
 *
 * // Animate PIXI filters
 * const blurFilter = new PIXI.BlurFilter();
 * sprite.filters = [blurFilter];
 * gsapPlugin.anim.to(blurFilter, { blur: 10, duration: 2 });
 * ```
 *
 * @remarks
 * - Automatically registers PixiPlugin for optimized PIXI.js property animations
 * - Includes ColorMatrixFilter and BlurFilter integration for advanced effects
 * - Uses efficient Set-based tracking for O(1) animation context operations
 * - Provides both global and context-specific animation lifecycle management
 * - Custom eases are automatically registered with GSAP and stored for reference
 */
export class GSAPPlugin extends Plugin implements IGSAPPlugin {
  /** Internal identifier for the global animation context */
  private static readonly GLOBAL_CONTEXT_ID = '__dill_pixel_global';

  /** Plugin identifier for framework registration */
  public readonly id = 'GSAPPlugin';

  // signals
  public onPlayAll = new Signal<(contextId: string) => void>();
  public onPauseAll = new Signal<(contextId: string) => void>();
  public onKillAll = new Signal<(contextId: string) => void>();
  public onRevertAll = new Signal<(contextId: string) => void>();
  public onClear = new Signal<(detail: { contextId: string; kill: boolean }) => void>();
  public onClearAll = new Signal<(kill: boolean) => void>();
  public onKillGlobal = new Signal<() => void>();
  public onRevertGlobal = new Signal<() => void>();
  public onClearGlobal = new Signal<(kill: boolean) => void>();
  public onEaseRegistered = new Signal<(detail: { name: string; ease: gsap.EaseFunction }) => void>();
  public onEasesRegistered = new Signal<(eases: Eases) => void>();
  public onAnimationAddded = new Signal<
    (detail: { animation: gsap.core.Tween | gsap.core.Timeline; contextId: string }) => void
  >();

  /** Global animation context reference for quick access */
  private _globalContext: AnimationContext;

  /** Map of all custom animation contexts by their string identifiers */
  private _animationContexts: Map<string, AnimationContext> = new Map();

  /**
   * Array of all registered custom ease names.
   * @readonly
   */
  public get easeNames(): string[] {
    return Object.keys(this.eases);
  }

  /**
   * Object containing all registered custom eases.
   * @readonly
   */
  public get eases(): Eases {
    return this.options.eases || {};
  }

  /**
   * Initializes the GSAP plugin with PIXI.js integration and custom configurations.
   * Sets up PixiPlugin, registers custom eases, and creates the global animation context.
   *
   * @param _ - Plugin options (currently unused, relies on app.config.gsap)
   * @param app - The application instance providing configuration
   *
   * @example
   * ```typescript
   * // Plugin is automatically initialized by the framework
   * // Configuration comes from app.config.gsap
   * const config = {
   *   gsap: {
   *     eases: {
   *       'customBounce': (t) => t * t * (3 - 2 * t),
   *       'gameEase': (t) => Math.pow(t, 2.5)
   *     }
   *   }
   * };
   * ```
   */
  public async initialize(_: any, app: IApplication) {
    this._options = app.config.gsap || {};

    if (this._options.eases) {
      this.registerEases(this._options.eases);
    }
    gsap.registerPlugin(PixiPlugin);

    PixiPlugin.registerPIXI({
      filters: {
        ColorMatrixFilter,
        BlurFilter,
      },
    });

    this.createGlobalContext();
  }

  /**
   * Creates and initializes the global animation context.
   * Sets up the default context for animations not assigned to specific contexts.
   * @protected
   */
  protected createGlobalContext(): void {
    this._animationContexts.set(GSAPPlugin.GLOBAL_CONTEXT_ID, new Set());
  }

  /**
   * Registers a single custom ease function with GSAP.
   * The ease becomes available for use in all GSAP animations by name.
   *
   * @param name - Unique name identifier for the ease
   * @param ease - GSAP-compatible easing function (takes progress 0-1, returns eased value)
   * @returns Object containing the registered ease for chaining or reference
   *
   * @example
   * ```typescript
   * // Register a custom elastic ease
   * gsapPlugin.registerCustomEase('elasticOut', (t) => {
   *   const c4 = (2 * Math.PI) / 3;
   *   return t === 0 ? 0 : t === 1 ? 1 :
   *     Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
   * });
   *
   * // Use in animations
   * gsap.to(mySprite, { x: 100, duration: 1, ease: 'elasticOut' });
   * ```
   */
  public registerCustomEase(name: string, ease: gsap.EaseFunction): Record<string, gsap.EaseFunction> {
    gsap.registerEase(name, ease);

    if (!this.options.eases) {
      this.options.eases = {};
    }
    this.options.eases[name] = ease;
    this.onEaseRegistered.emit({ name, ease });
    return { [name]: ease };
  }

  /**
   * Registers multiple custom ease functions with GSAP in a single operation.
   * Efficient batch registration for multiple custom eases.
   *
   * @param eases - Object mapping ease names to ease functions
   * @returns The complete map of all registered eases
   *
   * @example
   * ```typescript
   * // Register a suite of game-specific eases
   * gsapPlugin.registerEases({
   *   'jumpEase': (t) => t * t * (3 - 2 * t),
   *   'impactEase': (t) => 1 - Math.cos(t * Math.PI / 2),
   *   'floatEase': (t) => Math.sin(t * Math.PI / 2),
   *   'snapEase': (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
   * });
   * ```
   */
  public registerEases(eases: Eases): Eases {
    for (const [name, ease] of Object.entries(eases)) {
      this.registerCustomEase(name, ease);
    }
    this.onEasesRegistered.emit(eases);
    return this.eases;
  }

  /**
   * Gets the GSAP instance for creating animations.
   * Provides access to the full GSAP API with PIXI.js optimizations enabled.
   * @readonly
   */
  public get anim(): typeof gsap {
    return gsap;
  }

  /**
   * Adds animation(s) to a specified context for grouped management.
   * Creates the context if it doesn't exist. Defaults to global context if no contextId provided.
   *
   * @param animation - Single animation or array of animations to track
   * @param contextId - Context identifier (defaults to global context)
   * @returns The same animation(s) passed in for chaining
   *
   * @example
   * ```typescript
   * // Add to specific context for scene management
   * const levelTweens = [
   *   gsap.to(player, { x: 100, duration: 2 }),
   *   gsap.to(enemy, { rotation: Math.PI, duration: 1.5 }),
   *   gsap.to(powerup, { scale: 1.2, yoyo: true, repeat: -1, duration: 0.8 })
   * ];
   * gsapPlugin.addAnimation(levelTweens, 'level1Gameplay');
   *
   * // Add to global context (default)
   * const bgTween = gsap.to(background, { alpha: 0.8, duration: 3 });
   * gsapPlugin.addAnimation(bgTween);
   * ```
   */
  public addAnimation(
    animation: gsap.core.Tween | gsap.core.Timeline | (gsap.core.Tween | gsap.core.Timeline)[],
    contextId: string = GSAPPlugin.GLOBAL_CONTEXT_ID,
  ): gsap.core.Tween | gsap.core.Timeline | (gsap.core.Tween | gsap.core.Timeline)[] {
    if (!this._animationContexts.has(contextId)) {
      this._animationContexts.set(contextId, new Set());
    }
    const ctx = this._animationContexts.get(contextId);
    if (ctx) {
      if (Array.isArray(animation)) {
        animation.forEach((anim) => {
          ctx.add(anim);
          this.onAnimationAddded.emit({ animation: anim, contextId });
        });
      } else {
        ctx.add(animation);
        this.onAnimationAddded.emit({ animation, contextId });
      }
    }

    return animation;
  }

  /**
   * Retrieves a custom animation context by its identifier.
   * Returns null if the context doesn't exist.
   *
   * @param contextId - The context identifier to look up
   * @returns The animation context Set or null if not found
   *
   * @example
   * ```typescript
   * // Check if context exists and get info
   * const gameplayContext = gsapPlugin.getContext('gameplayAnimations');
   * if (gameplayContext) {
   *   console.log(`Found ${gameplayContext.size} gameplay animations`);
   *
   *   // Iterate through animations if needed
   *   gameplayContext.forEach(animation => {
   *     console.log('Animation progress:', animation.progress());
   *   });
   * }
   * ```
   */
  public getContext(contextId: string): AnimationContext | null {
    return this._animationContexts.get(contextId) || null;
  }

  /**
   * Plays all animations in the specified context or all contexts.
   * Useful for resuming paused animations or ensuring all animations are active.
   *
   * @param contextId - Optional context identifier. If omitted, plays all animations in all contexts
   *
   * @example
   * ```typescript
   * // Resume specific context after pause
   * gsapPlugin.playAll('menuAnimations');
   *
   * // Resume all animations (e.g., after app regains focus)
   * gsapPlugin.playAll();
   *
   * // Conditional playback
   * if (gameState === 'playing') {
   *   gsapPlugin.playAll('gameplayAnimations');
   * }
   * ```
   */
  public playAll(contextId?: string): void {
    if (!contextId) {
      this._animationContexts.forEach((context) =>
        context.forEach((animation) => {
          animation.play();
        }),
      );
    } else {
      this._animationContexts.get(contextId)?.forEach((animation) => {
        animation.play();
      });
    }

    this.onPlayAll.emit(contextId ?? 'all');
  }

  /**
   * Pauses all animations in the specified context or all contexts.
   * Animations retain their current progress and can be resumed with playAll().
   *
   * @param contextId - Optional context identifier. If omitted, pauses all animations in all contexts
   *
   * @example
   * ```typescript
   * // Pause game animations when menu opens
   * gsapPlugin.pauseAll('gameplayAnimations');
   *
   * // Pause everything when app loses focus
   * window.addEventListener('blur', () => {
   *   gsapPlugin.pauseAll();
   * });
   *
   * // Conditional pausing
   * if (gameState === 'paused') {
   *   gsapPlugin.pauseAll('gameplayAnimations');
   * }
   * ```
   */
  public pauseAll(contextId?: string): void {
    if (!contextId) {
      this._animationContexts.forEach((context) => context.forEach((animation) => animation.pause()));
    } else {
      this._animationContexts.get(contextId)?.forEach((animation) => animation.pause());
    }

    this.onPauseAll.emit(contextId ?? 'all');
  }

  /**
   * Kills (stops and removes) all animations in the specified context or all contexts.
   * Killed animations cannot be resumed and are removed from tracking.
   * If killing all contexts, the global context is automatically recreated.
   *
   * @param contextId - Optional context identifier. If omitted, kills all animations in all contexts
   *
   * @example
   * ```typescript
   * // Kill animations when transitioning scenes
   * gsapPlugin.killAll('currentSceneAnimations');
   *
   * // Emergency stop all animations
   * gsapPlugin.killAll();
   *
   * // Clean up specific context before recreation
   * gsapPlugin.killAll('temporaryEffects');
   * ```
   */
  public killAll(contextId?: string): void {
    if (!contextId) {
      this._animationContexts.forEach((contextAnimations) => {
        contextAnimations.forEach((animation) => animation.kill());
      });
      this._animationContexts.clear(); // Clear all tracked animations from all contexts
      this.createGlobalContext(); // Re-initialize the global context and its tracking
    } else {
      const contextAnimations = this._animationContexts.get(contextId);
      if (contextAnimations) {
        contextAnimations.forEach((animation) => animation.kill());
      }
      this.clear(contextId); // Remove the specific context from tracking
    }
    this.onKillAll.emit(contextId ?? 'all');
  }

  /**
   * Reverts all animations in the specified context or all contexts to their initial state.
   * Animation targets return to their original property values before the animation started.
   *
   * @param contextId - Optional context identifier. If omitted, reverts all animations in all contexts
   *
   * @example
   * ```typescript
   * // Reset UI to initial state
   * gsapPlugin.revertAll('uiAnimations');
   *
   * // Reset everything for game restart
   * gsapPlugin.revertAll();
   *
   * // Reset temporary effects
   * gsapPlugin.revertAll('screenEffects');
   * ```
   */
  public revertAll(contextId?: string): void {
    if (!contextId) {
      this._animationContexts.forEach((context) => context.forEach((animation) => animation.revert()));
    } else {
      this._animationContexts.get(contextId)?.forEach((animation) => animation.revert());
    }

    this.onRevertAll.emit(contextId ?? 'all');
  }

  /**
   * Clears (removes) a specific animation context from tracking.
   * Optionally kills the animations before clearing the context.
   *
   * @param contextId - The context identifier to clear
   * @param kill - Whether to kill animations before clearing (default: false)
   *
   * @example
   * ```typescript
   * // Clear completed level context
   * gsapPlugin.clear('level1Animations');
   *
   * // Clear and kill animations simultaneously
   * gsapPlugin.clear('temporaryEffects', true);
   * ```
   */
  public clear(contextId: string, kill: boolean = false): void {
    if (kill) {
      this.killAll(contextId);
    }
    this._animationContexts.delete(contextId);

    this.onClear.emit({ contextId, kill });
  }

  /**
   * Clears all animation contexts and recreates the global context.
   * Optionally kills all animations before clearing contexts.
   *
   * @param kill - Whether to kill all animations before clearing (default: false)
   *
   * @example
   * ```typescript
   * // Complete reset for new game
   * gsapPlugin.clearAll(true);
   *
   * // Clear tracking without killing animations
   * gsapPlugin.clearAll(false);
   * ```
   */
  public clearAll(kill: boolean = false): void {
    if (kill) {
      this.killAll();
    }
    this._animationContexts.clear();
    this.createGlobalContext(); // Re-initialize the global context tracking

    this.onClearAll.emit(kill);
  }

  /**
   * Kills all animations within the global animation context only.
   * This affects only animations added to the global context, not other custom contexts.
   *
   * @example
   * ```typescript
   * // Kill only global animations, preserve context-specific ones
   * gsapPlugin.killGlobal();
   *
   * // Useful for clearing background animations while keeping UI animations
   * gsapPlugin.killGlobal();
   * gsapPlugin.playAll('uiAnimations'); // UI animations continue
   * ```
   */
  public killGlobal(): void {
    const globalAnimations = this._animationContexts.get(GSAPPlugin.GLOBAL_CONTEXT_ID);
    if (globalAnimations) {
      globalAnimations.forEach((anim) => anim.kill());
      globalAnimations.clear();
    }

    this.onKillGlobal.emit();
  }

  /**
   * Reverts all animations within the global animation context to their initial state.
   * Only affects animations in the global context, not custom contexts.
   *
   * @example
   * ```typescript
   * // Reset only global animations
   * gsapPlugin.revertGlobal();
   *
   * // Reset global animations while preserving context states
   * gsapPlugin.revertGlobal();
   * // Context-specific animations remain unchanged
   * ```
   */
  public revertGlobal(): void {
    const globalAnimations = this._animationContexts.get(GSAPPlugin.GLOBAL_CONTEXT_ID);
    if (globalAnimations) {
      globalAnimations.forEach((anim) => anim.revert());
    }

    this.onRevertGlobal.emit();
  }

  /**
   * Clears all animations from the global animation context.
   * Optionally kills the animations before clearing from tracking.
   *
   * @param kill - Whether to kill animations before clearing (default: false)
   *
   * @example
   * ```typescript
   * // Clear global context without killing
   * gsapPlugin.clearGlobal();
   *
   * // Clear and kill global animations
   * gsapPlugin.clearGlobal(true);
   * ```
   */
  public clearGlobal(kill: boolean = false): void {
    if (kill) {
      this.killGlobal();
    }
    this._globalContext.clear();

    this.onClearGlobal.emit(kill);
  }
}
