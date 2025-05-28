import BaseScene from '@/scenes/BaseScene';
import { FONT_KUMBH_SANS } from '@/utils/Constants';
import { FlexContainer, formatTime, SceneAssets, Timer, UICanvas, wait } from 'dill-pixel';
import { Text } from 'pixi.js';

export const id = 'timer';
export const debug = {
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
        bundles: ['required/ui'],
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
        width: this.app.size.width,
      }),
      { align: 'center' },
    );

    // Stopwatch Section
    const stopwatchContainer = this.container.add.flexContainer({
      gap: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: this.app.size.width,
    });

    stopwatchContainer.add.text({
      text: 'Stopwatch',
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 24, align: 'right' },
    });

    this.stopwatchDisplay = stopwatchContainer.add.text({
      text: '00:00:00',
      anchor: 0.5,
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    // Countdown Section
    const countdownContainer = this.container.add.flexContainer({
      gap: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: this.app.size.width,
    });

    countdownContainer.add.text({
      text: 'Countdown',
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 24, align: 'right' },
    });

    this.countdownDisplay = countdownContainer.add.text({
      text: '00:00:00',
      anchor: 0.5,
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    // Button Container
    this.buttonContainer = this.ui.addElement(
      this.make.flexContainer({
        flexDirection: 'column',
        gap: 20,
      }),
      { align: 'bottom right', padding: { bottom: 60, right: 20 } },
    );

    // Stopwatch Controls

    const addStopwatchBtn = stopwatchContainer.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: {
        default: 'btn/blue',
        hover: 'btn/yellow',
      },
      sheet: 'required/ui',
      accessibleTitle: 'Add 5 seconds to stopwatch',
      accessibleHint: 'Press to add 5 seconds to the stopwatch',
    });

    addStopwatchBtn.add.text({
      text: '+5s',
      anchor: 0.5,
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    const removeStopwatchBtn = stopwatchContainer.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: {
        default: 'btn/red',
        hover: 'btn/yellow',
      },
      sheet: 'required/ui',
      accessibleTitle: 'Remove 5 seconds from stopwatch',
      accessibleHint: 'Press to remove 5 seconds from the stopwatch',
    });

    removeStopwatchBtn.add.text({
      text: '-5s',
      anchor: 0.5,
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    // Countdown Controls

    const addCountdownBtn = countdownContainer.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: {
        default: 'btn/blue',
        hover: 'btn/yellow',
      },
      sheet: 'required/ui',
      accessibleTitle: 'Add 5 seconds to countdown',
      accessibleHint: 'Press to add 5 seconds to the countdown',
    });

    addCountdownBtn.add.text({
      text: '+5s',
      anchor: 0.5,
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    const removeCountdownBtn = countdownContainer.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: {
        default: 'btn/red',
        hover: 'btn/yellow',
      },
      sheet: 'required/ui',
      accessibleTitle: 'Remove 5 seconds from countdown',
      accessibleHint: 'Press to remove 5 seconds from the countdown',
    });

    removeCountdownBtn.add.text({
      text: '-5s',
      anchor: 0.5,
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 48, align: 'center' },
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
    this.logTime();
  }

  resize() {
    super.resize();
    this.container.containerWidth = this.app.size.width;
    this.stopwatchContainer.containerWidth = this.app.size.width;
    this.countdownContainer.containerWidth = this.app.size.width;
    this.stopwatchContainer.layout();
    this.countdownContainer.layout();
    this.container.layout();
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
