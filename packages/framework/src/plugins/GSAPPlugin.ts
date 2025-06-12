import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { BlurFilter, ColorMatrixFilter } from 'pixi.js';
import { IApplication } from '../core';
import { Logger, type Ease } from '../utils';
import { Plugin, type IPlugin } from './Plugin';

export interface GSAPPluginOptions {
  eases: Ease;
}

/**
 * Interface for the GSAPPlugin, defining its public API.
 */
export interface IGSAPPlugin extends IPlugin {
  /** An array of registered ease names. */
  readonly easeNames: string[];
  /** An object containing registered eases, where keys are ease names and values are GSAP ease functions. */
  readonly eases: Record<string, gsap.EaseFunction>;
  /** The GSAP instance. */
  readonly anim: typeof gsap;
  /**
   * Adds one or more GSAP tweens or timelines to a specified animation context.
   * An animation context is a custom collection (Set) of tweens/timelines managed by this plugin,
   * NOT a `gsap.Context` instance. If no contextId is provided, animations are added to the plugin's global collection.
   * @param animation - A single GSAP tween/timeline or an array of them.
   * @param contextId - Optional ID of the custom animation context. Defaults to the global context.
   * @returns The animation(s) that were added.
   */
  addAnimation(
    animation: gsap.core.Tween | gsap.core.Timeline | (gsap.core.Tween | gsap.core.Timeline)[],
    contextId?: string,
  ): gsap.core.Tween | gsap.core.Timeline | (gsap.core.Tween | gsap.core.Timeline)[];
  /**
   * Registers a custom ease function with GSAP.
   * @param name - The name of the custom ease.
   * @param ease - The GSAP ease function.
   * @returns An object containing the registered ease.
   */
  registerCustomEase(name: string, ease: gsap.EaseFunction): Ease;
  /**
   * Registers multiple custom ease functions with GSAP.
   * @param eases - An object where keys are ease names and values are GSAP ease functions.
   * @returns The complete map of registered eases.
   */
  registerEases(eases: Record<string, gsap.EaseFunction>): Ease;
  /**
   * Retrieves a custom animation context (a Set of tweens/timelines) by its ID.
   * This is NOT a `gsap.Context` instance.
   * @param contextId - The ID of the animation context.
   * @returns The animation context (a Set of tweens/timelines) or null if not found.
   */
  getContext(contextId: string): Set<gsap.core.Tween | gsap.core.Timeline> | null;
  /**
   * Plays all animations in a specified custom animation context, or all animations in all contexts if no ID is provided.
   * @param contextId - Optional ID of the animation context.
   */
  playAll(contextId?: string): void;
  /**
   * Pauses all animations in a specified custom animation context, or all animations in all contexts if no ID is provided.
   * @param contextId - Optional ID of the animation context.
   */
  pauseAll(contextId?: string): void;
  /**
   * Kills (stops and removes) all animations in a specified custom animation context, or all animations in all contexts if no ID is provided.
   * If all contexts are killed, the plugin's global animation collection is recreated.
   * @param contextId - Optional ID of the animation context.
   */
  killAll(contextId?: string): void;
  /**
   * Reverts all animations in a specified custom animation context to their initial state, or all animations in all contexts if no ID is provided.
   * @param contextId - Optional ID of the animation context.
   */
  revertAll(contextId?: string): void;
  /**
   * Clears (removes) a specific custom animation context and its tracked animations.
   * If this results in no active contexts, the plugin's global animation collection is recreated if all contexts are cleared.
   * @param contextId - The ID of the animation context to clear.
   */
  clear(contextId: string): void;
  /** Clears all custom animation contexts and recreates the plugin's global animation collection. */
  clearAll(): void;
  /** Kills all animations within the global animation collection managed by this plugin. */
  killGlobal(): void;
  /** Reverts all animations within the global animation collection managed by this plugin to their initial state. */
  revertGlobal(): void;
  /** Clears all animations from the global animation collection managed by this plugin. */
  clearGlobal(): void;
}

export type AnimationContext = Set<gsap.core.Tween | gsap.core.Timeline>;

/**
 * @class GSAPPlugin
 * @extends Plugin
 * @implements IGSAPPlugin
 *
 * @description
 * The `GSAPPlugin` integrates the GreenSock Animation Platform (GSAP) into the application,
 * providing a powerful and flexible way to create and manage animations.
 * It handles the registration of GSAP, PixiPlugin for GSAP to animate Pixi.js properties,
 * and custom eases. It offers methods for managing animation "contexts," which are custom
 * collections (Sets) of tweens or timelines. This allows for grouped control over animations
 * (e.g., pausing, killing, or reverting all animations associated with a particular scene or UI element).
 * **Note:** The "animation context" referred to in this plugin is a custom mechanism for grouping animations
 * and is NOT the same as a `gsap.Context` object provided by GSAP itself. This plugin manages its
 * own collections of animations.
 *
 * A "global" animation collection is maintained by default for animations not assigned to a specific contextId.
 *
 * @example
 * ```typescript
 * // Assuming 'app' is an instance of your Application (implements IApplication)
 * // and GSAPPlugin has been added to the application's plugins.
 *
 * // Accessing the plugin
 * const gsapPlugin = app.plugins.get<IGSAPPlugin>('GSAPPlugin');
 *
 * if (gsapPlugin) {
 *   // Using the GSAP instance directly for animations
 *   const target = { x: 0, y: 0 }; // Can be any JS object or Pixi display object
 *   gsapPlugin.anim.to(target, { x: 100, duration: 1, ease: 'power1.inOut' });
 *
 *   // Registering a custom ease
 *   // This makes 'myCustomEase' available in GSAP animations.
 *   gsapPlugin.registerCustomEase('myCustomEase', (progress) => {
 *     // A simple quadratic ease-in
 *     return progress * progress;
 *   });
 *   gsapPlugin.anim.to(target, { y: 50, duration: 1, ease: 'myCustomEase', delay: 1 });
 *
 *   // Creating and managing an animation in a specific context
 *   // const mySprite = new PIXI.Sprite(PIXI.Texture.WHITE); // Assuming PIXI is available
 *   // app.stage.addChild(mySprite); // Assuming app has a stage like PIXI.Application
 *
 *   // const tween = gsapPlugin.anim.to(mySprite, { alpha: 0.5, duration: 2 });
 *   // gsapPlugin.addAnimation(tween, 'mySceneAnimations'); // Assign this tween to 'mySceneAnimations' context
 *
 *   // Later, control all animations in that context
 *   // gsapPlugin.pauseAll('mySceneAnimations');
 *   // gsapPlugin.playAll('mySceneAnimations');
 *   // gsapPlugin.killAll('mySceneAnimations'); // This will also remove the context from plugin's tracking
 *
 *   // Working with the global context (default for animations added via `gsapPlugin.addAnimation()`)
 *   // const globalTween = gsapPlugin.anim.to(mySprite, { rotation: Math.PI, duration: 1 });
 *   // gsapPlugin.addAnimation(globalTween); // Added to the plugin's global animation tracking by default
 *
 *   // gsapPlugin.pauseAll(); // Pauses all animations in all custom contexts tracked by the plugin
 *
 *   // Global context specific methods (affect the animations tracked in the plugin's main global collection)
 *   // gsapPlugin.killGlobal();   // Calls .kill() on all animations in the plugin's main global collection
 *   // gsapPlugin.revertGlobal(); // Calls .revert() on all animations in the plugin's main global collection
 *   // gsapPlugin.clearGlobal();  // Calls .clear() on the plugin's main global collection and its tracked animations
 * }
 * ```
 */
export class GSAPPlugin extends Plugin implements IGSAPPlugin {
  private static readonly GLOBAL_CONTEXT_ID = '__dill_pixel_global';
  public readonly id = 'GSAPPlugin';
  private _globalContext: AnimationContext;
  private _animationContexts: Map<string, AnimationContext> = new Map();

  /**
   * @inheritdoc
   */
  public get easeNames(): string[] {
    return Object.keys(this.eases);
  }

  /**
   * @inheritdoc
   */
  public get eases(): Ease {
    return this.options.eases || {};
  }

  /**
   * Initializes the GSAP plugin.
   * Registers GSAP, PixiPlugin, and any pre-configured custom eases.
   * Creates a global GSAP context for the plugin.
   * @param _ - Plugin options (currently unused in method body, relies on app.config.gsap).
   * @param app - The application instance.
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
   * Creates and stores the main GSAP context used by this plugin.
   * Also initializes the tracking set for animations within this global context.
   * @protected
   */
  protected createGlobalContext(): void {
    this._animationContexts.set(GSAPPlugin.GLOBAL_CONTEXT_ID, new Set());
  }

  /**
   * @inheritdoc
   */
  public registerCustomEase(name: string, ease: gsap.EaseFunction): Ease {
    gsap.registerEase(name, ease);

    if (!this.options.eases) {
      this.options.eases = {};
    }
    this.options.eases[name] = ease;
    return { [name]: ease };
  }

  /**
   * @inheritdoc
   */
  public registerEases(eases: Ease): Ease {
    for (const [name, ease] of Object.entries(eases)) {
      this.registerCustomEase(name, ease);
    }
    return this.eases;
  }

  /**
   * @inheritdoc
   */
  public get anim(): typeof gsap {
    return gsap;
  }

  /**
   * @inheritdoc
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
        animation.forEach((anim) => ctx.add(anim));
      } else {
        ctx.add(animation);
      }
    }
    return animation;
  }

  /**
   * @inheritdoc
   *
   */
  public getContext(contextId: string): AnimationContext | null {
    return this._animationContexts.get(contextId) || null;
  }

  /**
   * @inheritdoc
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
  }

  /**
   * @inheritdoc
   */
  public pauseAll(contextId?: string): void {
    if (!contextId) {
      this._animationContexts.forEach((context) => context.forEach((animation) => animation.pause()));
    } else {
      this._animationContexts.get(contextId)?.forEach((animation) => animation.pause());
    }
  }

  /**
   * @inheritdoc
   */
  public killAll(contextId?: string): void {
    if (!contextId) {
      this._animationContexts.forEach((contextAnimations) => {
        contextAnimations.forEach((animation) => animation.kill());
      });
      this._animationContexts.clear(); // Clear all tracked animations from all contexts
      this.createGlobalContext(); // Re-initialize the global context and its tracking
    } else {
      Logger.log('killAll', contextId);
      const contextAnimations = this._animationContexts.get(contextId);
      if (contextAnimations) {
        contextAnimations.forEach((animation) => animation.kill());
      }
      this.clear(contextId); // Remove the specific context from tracking
    }
  }

  /**
   * @inheritdoc
   */
  public revertAll(contextId?: string): void {
    if (!contextId) {
      this._animationContexts.forEach((context) => context.forEach((animation) => animation.revert()));
    } else {
      this._animationContexts.get(contextId)?.forEach((animation) => animation.revert());
    }
  }

  /**
   * @inheritdoc
   */
  public clear(contextId: string, kill: boolean = false): void {
    if (kill) {
      this.killAll(contextId);
    }
    this._animationContexts.delete(contextId);
  }

  /**
   * @inheritdoc
   */
  public clearAll(kill: boolean = false): void {
    if (kill) {
      this.killAll();
    }
    this._animationContexts.clear();
    this.createGlobalContext(); // Re-initialize the global context tracking
  }

  /**
   * @inheritdoc
   * Kills all animations within the plugin's main GSAP context (`this._globalContext`)
   * and also kills any animations explicitly tracked under the `GLOBAL_CONTEXT_ID`.
   * This refers to the plugin's internal tracking, not a `gsap.Context`.
   */
  public killGlobal(): void {
    const globalAnimations = this._animationContexts.get(GSAPPlugin.GLOBAL_CONTEXT_ID);
    if (globalAnimations) {
      globalAnimations.forEach((anim) => anim.kill());
      globalAnimations.clear();
    }
  }

  /**
   * @inheritdoc
   * Reverts all animations within the plugin's main GSAP context (`this._globalContext`)
   * and also reverts any animations explicitly tracked under the `GLOBAL_CONTEXT_ID`.
   * This refers to the plugin's internal tracking, not a `gsap.Context`.
   */
  public revertGlobal(): void {
    const globalAnimations = this._animationContexts.get(GSAPPlugin.GLOBAL_CONTEXT_ID);
    if (globalAnimations) {
      globalAnimations.forEach((anim) => anim.revert());
    }
  }

  /**
   * @inheritdoc
   * Clears all animations from the plugin's global context
   * This refers to the plugin's internal tracking, not a `gsap.Context`.
   */
  public clearGlobal(kill: boolean = false): void {
    if (kill) {
      this.killGlobal();
    }
    this._globalContext.clear();
  }
}
