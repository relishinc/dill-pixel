import { AssetsManifest, Application as PIXIPApplication, Point } from 'pixi.js';
import type {
  Action,
  ActionSignal,
  IAssetsPlugin,
  IAudioManagerPlugin,
  IControls,
  IFocusManagerPlugin,
  Ii18nPlugin,
  IInputPlugin,
  IKeyboardPlugin,
  IPlugin,
  IPopupManagerPlugin,
  IResizerPlugin,
  ISceneManagerPlugin,
  IWebEventsPlugin,
} from '../../plugins';
import { ActionContext } from '../../plugins';
import { IGSAPPlugin } from '../../plugins/GSAPPlugin';
import { Signal } from '../../signals';
import type { DataSchema, IDataAdapter, IStore } from '../../store';
import type { Ease, Size } from '../../utils';
import type { AppConfig } from '../types';
import type { ICoreFunctions } from './ICoreFunctions';
import { ICoreSignals } from './ICoreSignals';

/**
 * Represents the core application interface, extending PixiJS Application.
 * It manages plugins, game state, actions, and provides access to various application subsystems.
 *
 * @template D - The type of the data schema used by the application's store.
 * @template C - The type of the action context used for dispatching actions.
 * @template A - The type of actions that can be dispatched in the application.
 *
 * @example
 * ```typescript
 * import { Application } from '@dillpixel/framework';
 *
 * // Define your data schema, action context, and actions
 * interface MyDataSchema {
 *   score: number;
 *   playerName: string;
 * }
 *
 * interface MyActionContext {
 *   userId: string;
 * }
 *
 * type MyActions = 'startGame' | 'endGame' | 'updateScore';
 *
 * // Create a new application instance
 * const app = new Application<MyDataSchema, MyActionContext, MyActions>();
 *
 * async function main() {
 *   await app.initialize({
 *     // Application configuration
 *     appName: 'My Awesome Game',
 *     // ... other config options
 *   }, document.getElementById('game-container'));
 *
 *   // Access application properties and methods
 *   console.log(app.appName); // 'My Awesome Game'
 *   app.scenes.load('mainMenu');
 *   app.action('startGame');
 * }
 *
 * main();
 * ```
 */
export interface IApplication<
  D extends DataSchema = DataSchema,
  C extends ActionContext = ActionContext,
  A extends Action = Action,
> extends PIXIPApplication {
  /**
   * The application configuration object.
   * Contains settings for various aspects of the application, including plugins, assets, and scenes.
   * @readonly
   * @example
   * ```typescript
   * console.log(app.config.appName); // 'My Awesome Game'
   * if (app.config.showStats) {
   *   // Show performance stats
   * }
   * ```
   */
  readonly config: Partial<AppConfig<D>>;

  /**
   * Environment variables available to the application.
   * Typically sourced from `import.meta.env`.
   * @readonly
   * @example
   * ```typescript
   * const apiKey = app.env.API_KEY;
   * if (app.env.NODE_ENV === 'development') {
   *   // Enable debug features
   * }
   * ```
   */
  readonly env: Record<string, string>;

  /**
   * The current size (width and height) of the application's view/canvas.
   * Managed by the ResizerPlugin.
   * @readonly
   * @example
   * ```typescript
   * console.log(app.size.width, app.size.height);
   * const aspectRatio = app.size.width / app.size.height;
   * ```
   */
  readonly size: Size;

  /**
   * The center point (x, y) of the application's view/canvas.
   * Automatically updated when the application resizes.
   * @readonly
   * @example
   * ```typescript
   * // Center a sprite on the screen
   * mySprite.position.copyFrom(app.center);
   * ```
   */
  readonly center: Point;

  /**
   * The asset manifest used by the application.
   * Can be a URL to a manifest file, or an AssetsManifest object.
   * @readonly
   * @example
   * ```typescript
   * console.log(app.manifest); // Could be './assets.json' or an object
   * ```
   */
  readonly manifest: AssetsManifest | string | undefined;

  /**
   * The AssetsPlugin instance for managing game assets.
   * Provides methods for loading and accessing textures, sounds, fonts, etc.
   * @readonly
   * @example
   * ```typescript
   * const playerTexture = await app.assets.load('playerSprite');
   * const backgroundMusic = app.assets.getSound('bgm');
   * ```
   */
  readonly assets: IAssetsPlugin;

  /**
   * The SceneManagerPlugin instance for managing game scenes.
   * Handles scene transitions, loading, and lifecycle.
   * @readonly
   * @example
   * ```typescript
   * app.scenes.load('level1');
   * app.scenes.currentScene.pause();
   * ```
   */
  readonly scenes: ISceneManagerPlugin;

  /**
   * The WebEventsPlugin instance for managing browser-related events.
   * Handles events like window resize, visibility change, etc.
   * @readonly
   * @example
   * ```typescript
   * app.webEvents.onResize.connect((newSize) => {
   *   console.log('Resized to:', newSize.width, newSize.height);
   * });
   * ```
   */
  readonly webEvents: IWebEventsPlugin;

  /**
   * The KeyboardPlugin instance for managing keyboard input.
   * @readonly
   * @example
   * ```typescript
   * if (app.keyboard.isKeyDown('Space')) {
   *   // Player jumps
   * }
   * app.keyboard.onKeyDown.connect((keyEvent) => {
   *  if(keyEvent.key === 'Escape') app.scenes.load('pauseMenu');
   * });
   * ```
   */
  readonly keyboard: IKeyboardPlugin;

  /**
   * The FocusManagerPlugin instance for managing UI focus.
   * @readonly
   */
  readonly focus: IFocusManagerPlugin;

  /**
   * The PopupManagerPlugin instance for managing pop-up dialogs or views.
   * @readonly
   * @example
   * ```typescript
   * app.popups.show('settingsPopup', { volume: 0.5 });
   * ```
   */
  readonly popups: IPopupManagerPlugin;

  /**
   * The AudioManagerPlugin instance for managing game audio.
   * Handles sound effects and background music.
   * @readonly
   * @example
   * ```typescript
   * app.audio.playSound('explosion');
   * app.audio.setMusicVolume(0.7);
   * ```
   */
  readonly audio: IAudioManagerPlugin;

  /**
   * The i18nPlugin instance for internationalization and localization.
   * @readonly
   * @example
   * ```typescript
   * const localizedGreeting = app.i18n.translate('GREETING_KEY');
   * app.i18n.setLocale('fr-FR');
   * ```
   */
  readonly i18n: Ii18nPlugin;

  /**
   * The ResizerPlugin instance for managing application resizing.
   * @readonly
   */
  readonly resizer: IResizerPlugin;

  /**
   * The InputPlugin instance for managing various input sources.
   * This often consolidates controls from keyboard, mouse, gamepad, etc.
   * @readonly
   */
  readonly input: IInputPlugin;

  /**
   * The Controls instance, typically accessed via the InputPlugin.
   * Provides a higher-level abstraction for game controls and actions.
   * @readonly
   * @example
   * ```typescript
   * if (app.controls.isActionActive('jump')) {
   *   // Player jumps
   * }
   * ```
   */
  readonly controls: IControls;

  /**
   * The Store instance for managing application state.
   * Uses a data schema and adapters for persistence.
   * @readonly
   * @example
   * ```typescript
   * const currentScore = app.store.getState().score;
   * app.store.updateState({ score: currentScore + 10 });
   * ```
   */
  readonly store: IStore;

  /**
   * The primary DataAdapter instance, usually for managing game data.
   * @readonly
   * @example
   * ```typescript
   * const playerData = await app.data.get('playerStats');
   * await app.data.set('playerStats', { health: 100, mana: 50 });
   * ```
   */
  readonly data: IDataAdapter<D>;

  /**
   * The current context for dispatching actions.
   * Allows passing additional contextual information when actions are triggered.
   * @example
   * ```typescript
   * app.actionContext = { userId: 'user123', source: 'uiButton' };
   * app.action('submitScore', { score: 1000 }); // Context will be included
   * ```
   */
  actionContext: C;

  /**
   * A signal that emits when the application is paused.
   * @example
   * ```typescript
   * app.onPause.connect(() => {
   *   console.log('Application paused');
   *   // Stop game-specific timers or animations not handled by app.pause()
   * });
   * ```
   */
  onPause: Signal<() => void>;

  /**
   * A signal that emits when the application is resumed from a paused state.
   * @example
   * ```typescript
   * app.onResume.connect(() => {
   *   console.log('Application resumed');
   *   // Restart game-specific timers or animations
   * });
   * ```
   */
  onResume: Signal<() => void>;

  /**
   * Pauses the application.
   * This can include pausing the ticker, animations, audio, and timers based on the `PauseConfig`.
   * @param config - Optional configuration for what aspects of the application to pause.
   * @example
   * ```typescript
   * // Pause everything
   * app.pause();
   *
   * // Only pause audio and timers
   * app.pause({ pauseAudio: true, pauseTimers: true });
   * ```
   */
  pause(config?: import('../types').PauseConfig): void;

  /**
   * Resumes the application from a paused state.
   * Restores the state of ticker, animations, audio, and timers that were paused.
   * @example
   * ```typescript
   * app.resume();
   * ```
   */
  resume(): void;

  /**
   * Indicates whether the application is currently paused.
   * @readonly
   * @example
   * ```typescript
   * if (app.paused) {
   *   // Show pause menu
   * }
   * ```
   */
  readonly paused: boolean;

  /**
   * The name of the application.
   * Defined in the application configuration.
   * @readonly
   * @example
   * ```typescript
   * document.title = app.appName;
   * ```
   */
  readonly appName: string;

  /**
   * The version of the application.
   * Typically injected at build time (e.g., via `__DILL_PIXEL_APP_VERSION`).
   * @readonly
   * @example
   * ```typescript
   * console.log(`Running ${app.appName} v${app.appVersion}`);
   * ```
   */
  readonly appVersion: string | number;

  /**
   * Access to core application signals.
   * These are global signals for important application events.
   * @readonly
   * @example
   * ```typescript
   * app.signal.onLoadRequiredComplete.connectOnce(() => {
   *  console.log('Core assets loaded!');
   * });
   * ```
   */
  signal: ICoreSignals;

  /**
   * Access to core application functions.
   * Provides a registry for globally accessible utility functions.
   * @readonly
   * @example
   * ```typescript
   * const utility = app.func.get('myUtility');
   * if (utility) utility.doSomething();
   * ```
   */
  func: ICoreFunctions;

  /**
   * Alias for `func`. Access to core application functions.
   * @readonly
   */
  exec: ICoreFunctions;

  /**
   * Retrieves an ActionSignal for a specific action type.
   * This allows subscribing to specific actions dispatched within the application.
   * @param action - The action type to get the signal for.
   * @returns An ActionSignal that can be connected to.
   * @template TActionData - The type of data expected with the action.
   * @example
   * ```typescript
   * // Assuming 'updateScore' is an action defined in 'MyActions'
   * // And it carries a payload like { points: number }
   * interface ScoreUpdateData { points: number; }
   *
   * app.actions<ScoreUpdateData>('updateScore').connect((data) => {
   *   console.log(`Score updated by ${data.points} points.`);
   *   // Update game state based on data.points
   * });
   * ```
   */
  actions<TActionData = any>(action: A): ActionSignal<TActionData>;

  /**
   * Dispatches an action with optional data.
   * This is an alias for `sendAction`.
   * @param action - The action type to dispatch.
   * @param data - Optional data to accompany the action.
   * @template TActionData - The type of data being sent.
   * @example
   * ```typescript
   * // Dispatch 'startGame' action
   * app.action('startGame');
   *
   * // Dispatch 'updateScore' action with data
   * app.action('updateScore', { points: 100 });
   * ```
   */
  action<TActionData = any>(action: A, data?: TActionData): void;

  /**
   * Dispatches an action with optional data.
   * @param action - The action type to dispatch.
   * @param data - Optional data to accompany the action.
   * @template TActionData - The type of data being sent.
   * @example
   * ```typescript
   * // Dispatch 'playerAction' with specific details
   * app.sendAction('playerAction', { type: 'shoot', targetId: 'enemy123' });
   * ```
   */
  sendAction<TActionData = any>(action: A, data?: TActionData): void;

  /**
   * Checks if a specific action is currently considered active, usually based on input controls.
   * @param action - The action type to check.
   * @returns True if the action is active, false otherwise.
   * @example
   * ```typescript
   * if (app.isActionActive('moveForward')) {
   *   player.move(1);
   * }
   * ```
   */
  isActionActive(action: A): boolean;

  // animation
  /**
   * The GSAPPlugin instance for managing animations.
   * Provides access to GSAP functionality and animation contexts.
   * @readonly
   * @returns The GSAP plugin instance.
   * @example
   * ```typescript
   * const timeline = app.animation.createTimeline();
   * timeline.to(mySprite, { alpha: 0, duration: 1 });
   * ```
   */
  readonly animation: IGSAPPlugin;
  /**
   * The global GSAP instance.
   * Direct access to the `gsap` object for creating tweens and timelines.
   * @readonly
   * @returns The GSAP instance.
   * @example
   * ```typescript
   * app.anim.to(mySprite.scale, { x: 1.5, y: 1.5, duration: 0.5, ease: 'power2.inOut' });
   * ```
   */
  readonly anim: typeof gsap;

  /**
   * Adds one or more GSAP tweens or timelines to a specified animation context.
   * This refers to the GSAPPlugin's custom animation context (a Set of tweens/timelines),
   * NOT a `gsap.Context` instance. If no contextId is provided, animations are added
   * to the plugin's global collection, allowing them to be managed (e.g., paused, resumed, killed) collectively.
   * @param animation - A single GSAP tween/timeline or an array of them.
   * @param contextId - Optional ID of the animation context. Defaults to the global context.
   * @returns The animation(s) that were added.
   * @example
   * ```typescript
   * const myTween = app.anim.to(myObject, { x: 100, duration: 1 });
   * app.addAnimation(myTween, 'mySceneAnimationCollection');
   *
   * // Later, kill all animations in this context
   * app.animation.killAll('mySceneAnimationCollection'); // Assuming killAll is the method to clear the custom context
   * ```
   */
  addAnimation(
    animation: gsap.core.Tween | gsap.core.Timeline | (gsap.core.Tween | gsap.core.Timeline)[],
    contextId?: string,
  ): gsap.core.Tween | gsap.core.Timeline | (gsap.core.Tween | gsap.core.Timeline)[];

  /**
   * Returns the registered GSAP eases or their names.
   * Useful for dynamically applying easing functions or listing available eases.
   * @param namesOnly - If true, returns only the ease names as an array of strings. Otherwise, returns an object mapping names to Ease functions.
   * @returns An object of registered eases (name: Ease function) or an array of ease names.
   * @example
   * ```typescript
   * const availableEaseNames = app.eases(true); // ['power1.inOut', 'back.out', ...]
   * console.log(availableEaseNames);
   *
   * const easeFunctions = app.eases();
   * if (easeFunctions['power2.in']) {
   *   app.anim.to(mySprite, { y: 200, ease: easeFunctions['power2.in'] });
   * }
   * ```
   */
  eases(namesOnly?: boolean): Ease | string[];

  // initialize
  /**
   * Initializes the application with the given configuration and attaches it to an HTML element.
   * This is the main entry point for starting the application.
   * @param config - The application configuration object.
   * @param el - The HTML element to append the application's canvas to. If not provided, an error will be thrown.
   * @returns A promise that resolves with the initialized application instance.
   * @example
   * ```typescript
   * const gameContainer = document.getElementById('game');
   * if (gameContainer) {
   *   app.initialize({ appName: 'My Game' }, gameContainer)
   *     .then(initializedApp => {
   *       console.log(`${initializedApp.appName} initialized successfully!`);
   *       initializedApp.scenes.load('mainMenu');
   *     })
   *     .catch(error => console.error('Initialization failed:', error));
   * } else {
   *    console.error('Game container element not found!');
   * }
   * ```
   */
  initialize(config: Partial<AppConfig<D>>, el?: HTMLElement): Promise<IApplication<D, C, A>>;

  /**
   * Runs any post-initialization setup tasks.
   * This is called after the main `initialize` method has completed and core plugins are ready.
   * It's a good place for plugins to finalize their setup or for the application to perform tasks
   * that depend on a fully initialized environment.
   * @returns A promise that resolves when post-initialization tasks are complete.
   * @example
   * ```typescript
   * // Inside a custom Application class or after app.initialize resolves
   * async function startMyGame() {
   *   await app.initialize(config, el);
   *   await app.postInitialize(); // Ensures everything is fully set up
   *   app.scenes.load('intro');
   * }
   * ```
   */
  postInitialize(): Promise<void>;

  /**
   * Retrieves a registered plugin by its name.
   * @param name - The name/ID of the plugin to retrieve.
   * @param debug - If true and the plugin is not found, an error will be logged. Defaults to false.
   * @returns The plugin instance if found, otherwise undefined (or T if type assertion is used).
   * @template T - The expected type of the plugin.
   * @example
   * ```typescript
   * const myCustomPlugin = app.getPlugin<MyCustomPluginType>('myCustomPlugin');
   * if (myCustomPlugin) {
   *   myCustomPlugin.doSomethingCool();
   * }
   *
   * const nonExistentPlugin = app.getPlugin('nonExistent', true); // Will log an error
   * ```
   */
  getPlugin<T extends IPlugin>(name: string, debug?: boolean): T;

  /**
   * Sets the main HTML container element for the application.
   * This is typically the element where the PixiJS canvas is appended.
   * @param container - The HTMLElement to be used as the application container.
   * @example
   * ```typescript
   * const newGameContainer = document.createElement('div');
   * document.body.appendChild(newGameContainer);
   * app.setContainer(newGameContainer); // If app needs to change its parent container
   * ```
   */
  setContainer(container: HTMLElement): void;
}
