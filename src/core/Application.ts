// @ts-ignore
import FontFaceObserver from 'fontfaceobserver';
import { Application as PIXIApplication, Assets, IApplicationOptions, Point, Ticker } from 'pixi.js';
import { AudioToken, HowlerManager, IAudioManager, IVoiceOverManager, VoiceOverManager } from '../audio';
import { CopyManager } from '../copy';
import {
  DefaultKeyboardFocusManagerSprite,
  HitAreaRenderer,
  KeyboardFocusManager,
  KeyboardManager,
  MouseManager,
} from '../input';
import { AssetMap, AssetMapData, LoadManager, LoadScreen, LoadScreenProvider, SplashScreen } from '../load';
import { PhysicsBase, PhysicsEngineType } from '../physics';
import { PopupManager } from '../popup';
import { SaveManager } from '../save';
import { keyboardReFocus, Signals } from '../signals';
import { State, StateManager } from '../state';
import { AssetUtils, delay, HTMLTextStyleManager, OrientationManager, ResizeManager, WebEventsManager } from '../utils';
import { Add, Make } from '../utils/factory';
import { AppConfig } from './AppConfig';

export interface HLFApplicationOptions extends IApplicationOptions {
  physics?: boolean;
  showStatsInProduction?: boolean;
  showStateDebugInProduction?: boolean;
}

type DebuggerType = typeof import('../debug').Debugger;

const isDev = process.env.NODE_ENV === 'development';

export class Application extends PIXIApplication {
  protected static readonly SIZE_MIN_DEFAULT: Point = new Point(1024, 768);
  protected static readonly SIZE_MAX_DEFAULT: Point = new Point(1365, 768);
  protected static _instance: Application;

  protected _stateManager: StateManager;
  protected _audioManager: IAudioManager;
  protected _popupManager: PopupManager;
  protected _loadManager: LoadManager;
  protected _keyboardManager: KeyboardManager;
  protected _keyboardFocusManager: KeyboardFocusManager<DefaultKeyboardFocusManagerSprite>;
  protected _resizeManager: ResizeManager;
  protected _copyManager: CopyManager;
  protected _mouseManager: MouseManager;
  protected _webEventsManager: WebEventsManager;
  protected _screenSizeRatio!: number;
  protected _size: Point;
  protected _hitAreaRenderer!: HitAreaRenderer;
  protected _saveManager!: SaveManager;
  protected _orientationManager!: OrientationManager;
  protected _voiceoverManager!: IVoiceOverManager;

  protected _addFactory: Add;

  protected startSplashProcess: OmitThisParameter<(pPersistentAssets: AssetMapData[], pOnComplete: () => void) => void>;

  protected _debugger: unknown;
  protected _physics: PhysicsBase;

  protected stats: any;

  /**
   * The config passed in can be a json object, or an `AppConfig` object.
   * @param pConfig
   * @see `AppConfig` for what can be contained in the passed in config.
   * @default autoResize: true
   * @default resolution: utils.isMobile.any === false ? 2 : (window.devicePixelRatio > 1 ? 2 : 1);
   */
  protected constructor(pConfig?: Partial<HLFApplicationOptions> & { [key: string]: any }) {
    // TODO Relish GM => Look into what might be added to the AppConfig class and if there is reason to cache it.
    super(new AppConfig(pConfig));
    if (isDev || pConfig?.showStatsInProduction) {
      this.addStats();
    }
    // start the ticker if it hasn't been started yet
    if (!this.ticker.started) {
      this.ticker.start();
    }

    // set the resolution suffix for loading assets
    AssetUtils.resolutionSuffix = this.resolutionSuffix;

    // bind functions
    this.update = this.update.bind(this);
    this.onRequiredAssetsLoaded = this.onRequiredAssetsLoaded.bind(this);

    // create factories
    this._addFactory = new Add(this.stage);
    this._size = new Point();

    Ticker.shared.add(this.update);

    this._webEventsManager = new WebEventsManager(this);
    this._mouseManager = new MouseManager(this.renderer.events);
    this._stateManager = new StateManager(this);
    this._popupManager = new PopupManager(this);
    this._loadManager = new LoadManager(this, this.createSplashScreen());
    this._audioManager = new HowlerManager(this);
    this._keyboardManager = new KeyboardManager(this);
    this.addFocusManager();

    if (this.resizeTo) {
      this._resizeManager = new ResizeManager(this);
    } else {
      this._resizeManager = new ResizeManager(
        this,
        pConfig?.sizeMin || Application.SIZE_MIN_DEFAULT,
        pConfig?.sizeMax || Application.SIZE_MAX_DEFAULT,
      );
    }

    this._copyManager = new CopyManager(this);
    this._saveManager = new SaveManager(this);
    this._orientationManager = new OrientationManager(this);
    this._voiceoverManager = new VoiceOverManager(this);

    /**
     * Bind methods from some manager classes to callable methods in the application
     */
    this.startSplashProcess = this._loadManager.startSplashProcess.bind(this._loadManager);
  }

  static get containerElement(): HTMLElement | undefined {
    return document.getElementById(Application.containerID) || undefined;
  }

  static get containerID(): string {
    return 'game-container';
  }

  /**
   * gets the current singleton instance
   */
  static get instance() {
    if (Application._instance === undefined) {
      console.error(
        "You've tried to access the instance of HLF.Application when it hasn't been set. " +
          'Please set the _instance in your Application.',
      );
    }
    return Application._instance;
  }

  /**
   * Creates a container element with the given id and appends it to the DOM.
   * @param pId{string} - The id of the element to create.
   */
  public static createContainer(pId: string) {
    const container = document.createElement('div');
    container.setAttribute('id', pId);
    document.body.appendChild(container);
    return container;
  }

  /**
   * Creates a new instance of the Application class and returns it.
   * @param pElement{string | HTMLElement} - The id of the element to use as the container, or the element itself.
   */
  public static create(pElement: string | HTMLElement = Application.containerID): Application | null {
    let el: HTMLElement | null = null;
    if (typeof pElement === 'string') {
      el = document.getElementById(pElement);
      if (!el) {
        el = Application.createContainer(pElement);
      }
    } else if (pElement instanceof HTMLElement) {
      el = pElement;
    }
    if (!el) {
      // no element to use
      console.error(
        'You passed in a DOM Element, but none was found. If you instead pass in a string, a container will be created for you, using the string for its id.',
      );
      return null;
    }
    return this.instance.create(el);
  }

  // override this to set a custom resolution suffix;
  get resolutionSuffix(): string {
    return '@' + this.renderer.resolution + 'x';
  }

  get add(): Add {
    return this._addFactory;
  }

  get make(): typeof Make {
    return Make;
  }

  get addToStage() {
    return this.stage.addChild.bind(this.stage);
  }

  /**
   * Override to specify assets that should persist between state loads.
   *
   * Note: Splash screen assets are loaded before requiredAssets
   * @override
   */
  public get requiredAssets(): AssetMapData[] {
    // override
    return [];
  }

  public get state(): StateManager {
    return this._stateManager;
  }

  public get keyboard(): KeyboardManager {
    return this._keyboardManager;
  }

  public get popups(): PopupManager {
    return this._popupManager;
  }

  public get audio(): IAudioManager {
    return this._audioManager;
  }

  public get voiceover(): IVoiceOverManager {
    return this._voiceoverManager;
  }

  public get size(): Point {
    return this._size;
  }

  public get hitAreaRenderer(): HitAreaRenderer {
    return this._hitAreaRenderer;
  }

  public get resizer(): ResizeManager {
    return this._resizeManager;
  }

  public get copy(): CopyManager {
    return this._copyManager;
  }

  public get webEvents(): WebEventsManager {
    return this._webEventsManager;
  }

  public get saveManager(): SaveManager {
    return this._saveManager;
  }

  public get orientationManager(): OrientationManager {
    return this._orientationManager;
  }

  public get load(): LoadManager {
    return this._loadManager;
  }

  public get defaultState(): string | typeof State | undefined {
    return undefined;
  }

  public get physics(): PhysicsBase {
    return this._physics;
  }

  public get debugger(): DebuggerType {
    if (!this._debugger) {
      this.addDebugger();
    }
    return this._debugger as DebuggerType;
  }

  public get htmlTextStyles(): typeof HTMLTextStyleManager {
    return HTMLTextStyleManager;
  }

  public async addStats() {
    const Stats = await import('stats.js').then((m) => m.default);
    this.stats = new Stats();
    this.stats.dom.id = 'stats';
    Application.containerElement?.appendChild(this.stats.dom);
    this.stats.dom.style.position = 'absolute';
    this.stats.dom.style.top = '24px';
    this.stats.dom.style.right = '40px';
    this.stats.dom.style.left = 'auto';
  }

  public addFocusManager() {
    this._keyboardFocusManager = new KeyboardFocusManager(DefaultKeyboardFocusManagerSprite);
  }

  public async addPhysics(type: PhysicsEngineType = PhysicsEngineType.MATTER): Promise<PhysicsBase> {
    let PhysicsModule: any;
    switch (type) {
      case PhysicsEngineType.RAPIER:
        PhysicsModule = await import('../physics/rapier').then((m) => m.RapierPhysics);
        break;
      case PhysicsEngineType.MATTER:
      default:
        PhysicsModule = await import('../physics/matter').then((m) => m.MatterPhysics);
        break;
    }
    this._physics = new PhysicsModule(this);
    return this._physics;
  }

  /**
   *
   * @param pGroupIdOrClass
   * @param pAssets
   * proxy function for @link {AssetMap.addAssetGroup}
   */
  public addAssetGroup(pGroupIdOrClass: string | typeof State, pAssets?: AssetMapData[]): void {
    if (typeof pGroupIdOrClass === 'string') {
      return AssetMap.addAssetGroup(pGroupIdOrClass as string, pAssets as AssetMapData[]);
    } else {
      const Klass: typeof State = pGroupIdOrClass as typeof State;
      if (!Klass.NAME) {
        throw new Error(`You tried to add an asset group for ${Klass}, but it has no NAME defined.`);
      }
      if (!Klass.Assets) {
        throw new Error(`You tried to add an asset group for ${Klass.NAME}, but it has no assets defined.`);
      }
      return AssetMap.addAssetGroup(Klass.NAME, pAssets || Klass.Assets);
    }
  }

  public hasAsset(pAssetName: string) {
    return Assets.get(pAssetName) !== undefined;
  }

  /**
   * initialize the Application singleton
   * and append the view to the DOM
   * @param pElement{String|HTMLElement}
   */
  public create(pElement: HTMLElement): Application | null {
    if (pElement) {
      pElement.appendChild(Application.instance.view as HTMLCanvasElement);
    } else {
      console.error('No element found to append the view to.');
      return null;
    }

    Application.instance.init();
    return Application.instance;
  }

  /**
   * Initializes all managers and starts the splash screen process.
   */
  public async init(): Promise<void> {
    this.onPlayAudio = this.onPlayAudio.bind(this);
    this.addToStage(this._stateManager);
    this.addToStage(this._popupManager);
    this.addToStage(this._loadManager);
    this._hitAreaRenderer = this.addToStage(new HitAreaRenderer(this.stage));
    this.addToStage(this._keyboardFocusManager);

    this._audioManager.init();

    Signals.playAudio.connect(this.onPlayAudio);

    this.addAssetGroups();
    this.createAssetMap();

    this.registerStates();
    this.state.statesRegistered();

    this.registerPopups();
    this.registerLoadingScreens();

    await this.loadDocumentFonts();
    await this.loadHTMLTextStyles();

    this.startSplashProcess(this.requiredAssets, this.onRequiredAssetsLoaded);

    this.onResize(0);
    // Delayed to fix incorrect iOS resizing in WKWebView. See: https://bugs.webkit.org/show_bug.cgi?id=170595
    this.onResize(0.5);
    this._webEventsManager.registerResizeCallback(() => this.onResize(0.5));

    this.setup();
  }

  public async loadDocumentFonts(): Promise<void> {
    // check if document.fonts is supported
    if (document?.fonts) {
      await document.fonts.ready;
      await this.allFontsLoaded();
    }
  }

  public listFonts(): FontFace[] {
    if (document?.fonts?.values()) {
      return [...document.fonts.values()];
    }
    return [];
  }

  /**
   * Preload any custom font styles to be used later on with html text
   * currently not sure if there's a better way to do this...
   * @see https://github.com/pixijs/html-text/pull/30
   * @see {HTMLTextStyleManager} for functionality
   * @override
   * @returns {Promise<void>}
   * @async
   * @example
   * // in your Application.ts:
   * import {loadAndAddHTMLTextStyle} from 'dill-pixel';
   *
   * // override loadHTMLTextStyles and do:
   * await loadAndAddHTMLTextStyle('style1', FONT_FAMILY_NAME_1, { fontSize: 16, lineHeight: 19, fill: 'white' }, [{url:'assets/fonts/{fontFile1}.woff2', weight: 'normal'}, {url:'assets/fonts/{fontFile2}.woff2', weight: 'bold'}]);
   *
   * // then later on, from anywhere in your app, you can do:
   * import {getHTMLTextStyle} from 'dill-pixel';
   * this.add.htmlText( 'This is some text', getHTMLTextStyle('{style1}'), ...);
   */
  public async loadHTMLTextStyles(): Promise<void> {
    // override
    return Promise.resolve();
  }

  public async addDebugger() {
    const DebuggerClass = await import('../debug').then((m) => m.Debugger);
    this._debugger = new DebuggerClass(this);
  }

  protected setup() {
    // override me to set up application specific stuff
  }

  /**
   * Called once per frame. Updates the `StateManager`, `PopupManager`, `LoadManager` and `HitAreaRenderer`.
   */
  protected update(): void {
    if (this.stats) {
      this.stats.begin();
    }

    const deltaTime: number = Ticker.shared.elapsedMS / 1000;
    this._stateManager.update(deltaTime);
    this._popupManager.update(deltaTime);
    this._loadManager.update(deltaTime);
    this._hitAreaRenderer.update(deltaTime);
    this._physics?.update(deltaTime);

    if (this.stats) {
      this.stats.end();
    }
  }

  /**
   * Override to return the appropriate splash screen instance to use.
   * @override
   */
  protected createSplashScreen(): SplashScreen {
    // override
    return new SplashScreen();
  }

  /**
   * Override to setup the asset map for this application.
   * @override
   */
  protected addAssetGroups(): void {
    // override
  }

  protected createAssetMap(): void {
    // override
  }

  protected registerDefaultLoadScreen(pIdOrClass: string | typeof LoadScreen, pScreen?: LoadScreenProvider): void {
    this.load.registerLoadScreen(pIdOrClass, pScreen, true);
  }

  /**
   * Override to register any and all loading screens needed for this application.
   * @override
   */
  protected registerLoadingScreens(): void {
    // override
  }

  /**
   * Override to register any and all popups needed for this application.
   * @override
   */
  protected registerPopups(): void {
    // override
  }

  /**
   * Override to register any and all states needed for this application.
   * @override
   */
  protected registerStates(): void {
    // override
  }

  /**
   * Called when the application window is resized.
   * @param pDelay A delay before telling the rest of the application that a resize occured.
   * @default 0
   */
  protected async onResize(pDelay: number = 0): Promise<void> {
    if (pDelay > 0) {
      await delay(pDelay);
    }

    if (this._resizeManager.useAspectRatio) {
      this._size.copyFrom(this._resizeManager.getSize());
      const stageScale: number = this._resizeManager.getStageScale();
      this.stage.scale.set(stageScale);
      this.renderer.resize(this._size.x * stageScale, this._size.y * stageScale);
    } else {
      let w = this._size.x;
      let h = this._size.y;
      if ((this.resizeTo as HTMLElement)?.getBoundingClientRect) {
        const el = this.resizeTo as HTMLElement;
        w = el.getBoundingClientRect().width;
        h = el.getBoundingClientRect().height;
      } else if ((this.resizeTo as Window)?.innerWidth) {
        const el = this.resizeTo as Window;
        w = el.innerWidth;
        h = el.innerHeight;
      }
      this._size = new Point(w, h);
      this._resizeManager.sizeMin = this._size;
      this._resizeManager.sizeMax = this._size;
      this.renderer.resize(w, h);
    }

    this._stateManager.onResize(this._size);
    this._loadManager.onResize(this._size);
    this._popupManager.onResize(this._size);
    this._orientationManager.onResize();

    // emit a global resize signal that anything can listen to
    Signals.onResize.emit(this._size);

    keyboardReFocus();

    if (this._hitAreaRenderer.active) {
      this._hitAreaRenderer.renderHitAreas();
    }

    this.onResizeComplete();
  }

  protected onPlayAudio(token: AudioToken) {
    this.audio.play(token.id, token.volume, token.loop, token.category);
  }

  /**
   * Called when resize is complete after the delay.
   * @override
   */
  protected onResizeComplete() {
    // override
  }

  protected getFontsList(): { family: string; data?: { weight?: number | string } }[] {
    return [];
  }

  protected allFontsLoaded(): Promise<void> {
    const fonts = this.getFontsList();
    if (fonts?.length > 0) {
      return Promise.all(
        fonts.map((ff) => {
          const font = new FontFaceObserver(ff.family, ff.data);
          return font.load();
        }),
      ).catch((e) => {
        console.warn('Error loading fonts', e);
      });
    } else {
      return Promise.resolve();
    }
  }

  /**
   * Override to specify what should happen after all persistent assets have been loaded.
   * @override
   */
  protected async onRequiredAssetsLoaded(): Promise<void> {
    // transition to the default state, if set
    if (this.state.default) {
      this.state.transitionTo(this.state.default);
    }
  }
}
