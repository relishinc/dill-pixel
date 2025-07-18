import BaseScene from '@/scenes/BaseScene';
import { FlexContainer, formatTime, type SceneAssets, type SceneDebug, Timer, UICanvas, wait } from 'dill-pixel';
import { Text } from 'pixi.js';

export const id = 'timer';
export const debug: SceneDebug = {
  group: 'Framework',
  label: 'Timer',
};

export default class TimerScene extends BaseScene {
  title = 'Timer Scene';
  subtitle = 'Demonstrates timer manipulation with add/remove functionality';
  ui: UICanvas;
  container: FlexContainer;
  buttonContainer: FlexContainer;
  stopwatchContainer: FlexContainer;
  countdownContainer: FlexContainer;
  stopwatchDisplay: Text;
  countdownDisplay: Text;
  stopwatchTimer: Timer;
  countdownTimer: Timer;

  _paused: boolean = false;

  public get assets(): SceneAssets {
    return {
      preload: {
        bundles: ['required'],
      },
    };
  }

  public async initialize() {
    await super.initialize();

    this.ui = this.add.uiCanvas({ useAppSize: true });

    this.container = this.ui.addElement(
      this.make.flexContainer({
        flexDirection: 'column',
        gap: 50,
        layout: { width: '100%', paddingLeft: 30, paddingRight: 30 },
      }),
      { align: 'center' },
    );

    // Stopwatch Section
    const stopwatchContainer = this.container.add.flexContainer({
      layout: {
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexWrap: 'wrap',
      },
    });

    stopwatchContainer.add.text({
      text: 'Stopwatch',
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontWeight: 'bold', fontSize: 24, align: 'right' },
      layout: { width: 200 },
    });

    this.stopwatchDisplay = stopwatchContainer.add.text({
      text: '00:00:00',
      anchor: 0.5,
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontWeight: 'bold', fontSize: 48, align: 'center' },
      layout: { width: 300 },
    });

    // Countdown Section
    const countdownContainer = this.container.add.flexContainer({
      layout: {
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexWrap: 'wrap',
      },
    });

    countdownContainer.add.text({
      text: 'Countdown',
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontWeight: 'bold', fontSize: 24, align: 'right' },
      layout: { width: 200 },
    });

    this.countdownDisplay = countdownContainer.add.text({
      text: '00:00:00',
      anchor: 0.5,
      style: {
        fill: 0xffffff,
        fontFamily: 'KumbhSans',
        fontWeight: 'bold',
        fontSize: 48,
        align: 'center',
      },
      layout: { width: 300 },
    });

    // Stopwatch Controls
    const addStopwatchBtn = stopwatchContainer.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: {
        default: 'btn/blue',
        hover: 'btn/yellow',
      },
      sheet: 'ui',
      accessibleTitle: 'Add 5 seconds to stopwatch',
      accessibleHint: 'Press to add 5 seconds to the stopwatch',
      layout: { width: 256, height: 70 },
    });

    addStopwatchBtn.addLabel({
      text: '+5s',
      anchor: 0.5,
      resolution: 2,
      style: {
        fill: 0xffffff,
        fontFamily: 'KumbhSans',
        fontWeight: 'bold',
        fontSize: 48,
        align: 'center',
      },
    });

    const removeStopwatchBtn = stopwatchContainer.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: {
        default: 'btn/red',
        hover: 'btn/yellow',
      },
      sheet: 'ui',
      accessibleTitle: 'Remove 5 seconds from stopwatch',
      accessibleHint: 'Press to remove 5 seconds from the stopwatch',
      layout: { width: 256, height: 70 },
    });

    removeStopwatchBtn.addLabel({
      text: '-5s',
      anchor: 0.5,
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    // Countdown Controls

    const addCountdownBtn = countdownContainer.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: {
        default: 'btn/blue',
        hover: 'btn/yellow',
      },
      sheet: 'ui',
      accessibleTitle: 'Add 5 seconds to countdown',
      accessibleHint: 'Press to add 5 seconds to the countdown',
      layout: { width: 256, height: 70 },
    });

    addCountdownBtn.addLabel({
      text: '+5s',
      anchor: 0.5,
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    const removeCountdownBtn = countdownContainer.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: {
        default: 'btn/red',
        hover: 'btn/yellow',
      },
      sheet: 'ui',
      accessibleTitle: 'Remove 5 seconds from countdown',
      accessibleHint: 'Press to remove 5 seconds from the countdown',
      layout: { width: 256, height: 70 },
    });

    removeCountdownBtn.addLabel({
      text: '-5s',
      anchor: 0.5,
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    // Button Event Handlers
    addStopwatchBtn.onClick.connect(() => {
      if (this.stopwatchTimer) {
        this.stopwatchTimer.start();
        this.stopwatchTimer.addTime(5000);
        this._paused = false;
      }
    });

    removeStopwatchBtn.onClick.connect(() => {
      if (this.stopwatchTimer) {
        this.stopwatchTimer.start();
        this.stopwatchTimer.addTime(-5000);
        this._paused = false;
      }
    });

    addCountdownBtn.onClick.connect(() => {
      if (this.countdownTimer) {
        this.countdownTimer.start();
        this.countdownTimer.addTime(5000);
        this._paused = false;
      }
    });

    removeCountdownBtn.onClick.connect(() => {
      if (this.countdownTimer) {
        this.countdownTimer.start();
        this.countdownTimer.addTime(-5000);
        this._paused = false;
      }
    });

    // Initialize Timers
    this.stopwatchTimer = this.app.timers.createTimer({
      onTick: this._updateStopWatch,
    });

    this.countdownTimer = this.app.timers.createTimer({
      duration: 30000, // 30 seconds initial duration
      useWorker: true,
      loop: true,
      onTick: this._updateCountdown,
      onComplete: () => {
        console.log('Countdown completed!');
      },
    });

    this.stopwatchContainer = stopwatchContainer;
    this.countdownContainer = countdownContainer;

    this.ui.updateLayout();
  }

  async start() {
    this.logTime();
    this.stopwatchTimer.start();
    this.countdownTimer.start();
    await wait(2);
    this.stopwatchTimer.pause();
    this.countdownTimer.pause();
    this._paused = true;
  }

  _updateStopWatch(elapsed: number) {
    const timeString = formatTime(elapsed, 'ms');
    this.stopwatchDisplay.text = timeString;
  }

  _updateCountdown(elapsed: number) {
    const timeString = formatTime(elapsed, 'ms');
    this.countdownDisplay.text = timeString;
    if (this.app.paused) {
      this.app.render(); // needed to update the display
    }
  }

  logTime() {
    if (this.stopwatchTimer && this.countdownTimer) {
      console.log(
        'stopwatchTimer',
        this.stopwatchTimer.getTime(),
        'countdownTimer',
        this.countdownTimer.getRemainingTime(),
      );
    }
  }

  update() {
    if (this._paused) return;
    // this.logTime();
  }

  resize() {
    super.resize();
  }

  destroy() {
    super.destroy();
    if (this.stopwatchTimer) {
      this.stopwatchTimer.destroy();
    }
    if (this.countdownTimer) {
      this.countdownTimer.destroy();
    }
  }
}
