import BaseScene from '@/scenes/BaseScene';
import { FONT_KUMBH_SANS } from '@/utils/Constants';
import { Button, FlexContainer, formatTime, PauseConfig, SceneAssets, UICanvas } from 'dill-pixel';
import { gsap } from 'gsap';
import { HTMLText, Sprite, Text } from 'pixi.js';
export const id = 'pause';
export const debug = {
  group: 'Framework',
  label: 'Pause',
};

export default class PauseScene extends BaseScene {
  title = 'Pause Scene';
  subtitle = 'Pause and resume the game, with different configurations';
  ui: UICanvas;
  container: FlexContainer;
  buttonContainer: FlexContainer;

  gsapAnimated: Sprite;
  tickerAnimated: Sprite;
  stopwatchDisplay: Text;
  countdownDisplay: Text;
  pauseInfo: HTMLText;

  tickerAnimationConfig: {
    direction: number;
    startX: number;
  } = {
    direction: 1,
    startX: 0,
  };

  protected config = {
    pauseAudio: false,
    pauseAnimations: false,
    pauseTicker: false,
    pauseTimers: false,
    isPaused: false,
  };

  public get assets(): SceneAssets {
    return {
      preload: {
        assets: [
          {
            src: 'static/jar',
            ext: 'png',
          },
        ],
        bundles: ['audio', 'required/ui'],
      },
    };
  }

  public async initialize() {
    await super.initialize();
    this.ui = this.add.uiCanvas({ useAppSize: true });

    this.container = this.add.flexContainer({
      flexDirection: 'column',
      gap: 20,
      justifyContent: 'center',
    });

    const gsapContainer = this.container.add.container();

    this.gsapAnimated = gsapContainer.add.sprite({ asset: 'static/jar', scale: 0.25, anchor: 0.5 });

    gsapContainer.add.text({
      text: 'Animated with GSAP',
      anchor: [1, 0.5],
      pivot: [140, 0],
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 24, align: 'right' },
    });

    const tickerContainer = this.container.add.container();

    this.tickerAnimated = tickerContainer.add.sprite({ asset: 'static/jar', scale: 0.25, anchor: 0.5 });

    tickerContainer.add.text({
      text: 'Animated with Pixi Ticker',
      anchor: [1, 0.5],
      pivot: [140, 0],
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 24, align: 'right' },
    });

    gsap.to(this.gsapAnimated.pivot, {
      x: 200,
      duration: 1,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Add button container
    this.buttonContainer = this.ui.addElement(
      this.make.flexContainer({
        flexDirection: 'column',
        gap: 20,
      }),
      { align: 'bottom right', padding: { bottom: 60, right: 20 } },
    );

    // Add music button
    const musicButton = this.buttonContainer.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: {
        default: 'btn/blue',
        hover: 'btn/yellow',
        disabled: 'btn/grey',
        active: 'btn/red',
      },
      sheet: 'required/ui',
      accessibleTitle: 'Toggle Music',
      accessibleHint: 'Press to toggle background music',
    });

    musicButton.add.text({
      text: 'Toggle Music',
      anchor: 0.5,
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    musicButton.onClick.connect(async () => {
      if (this.app.audio.isPlaying('Night at the Beach', 'music')) {
        await this.app.audio.stop('Night at the Beach', 'music');
      } else {
        await this.app.audio.play('Night at the Beach', 'music', { singleInstance: true, loop: true });
      }
      this.onMusicToggle(musicButton);
    });

    // Add pause toggle button
    const pauseButton = this.buttonContainer.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: {
        default: 'btn/blue',
        hover: 'btn/yellow',
        disabled: 'btn/grey',
        active: 'btn/red',
      },
      sheet: 'required/ui',
      accessibleTitle: 'Toggle Pause',
      accessibleHint: 'Press to toggle pause state',
    });

    pauseButton.add.text({
      text: 'Toggle Pause',
      anchor: 0.5,
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    pauseButton.onClick.connect(() => {
      this.config.isPaused = !this.config.isPaused;
      this.app.togglePause({
        pauseAudio: this.config.pauseAudio,
        pauseAnimations: this.config.pauseAnimations,
        pauseTicker: this.config.pauseTicker,
        pauseTimers: this.config.pauseTimers,
      });
      this.onPauseToggle(pauseButton);
    });

    this.onMusicToggle(musicButton);
    this.onPauseToggle(pauseButton);

    // timers

    // Create a count-up timer
    const timerContainer = this.container.add.container();
    const stopwatch = this.app.timers.createTimer({
      autoStart: true,
      onTick: this._updateStopWatch,
    });

    timerContainer.add.text({
      text: 'Stopwatch (TimerPlugin)',
      anchor: [1, 0.5],
      pivot: [140, 0],
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 24, align: 'right' },
    });

    this.stopwatchDisplay = timerContainer.add.text({
      text: '00:00:00',
      anchor: 0.5,
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    // Create a countdown timer
    const countdownContainer = this.container.add.container();
    const countdown = this.app.timers.createTimer({
      duration: 5000, // 5 seconds
      autoStart: true,
      useWorker: true,
      loop: true,
      onTick: this._updateCountdown,
      onComplete: () => {
        console.log('Timer completed!');
      },
    });

    countdownContainer.add.text({
      text: 'Countdown (TimerPlugin)',
      anchor: [1, 0.5],
      pivot: [140, 0],
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 24, align: 'right' },
    });

    this.countdownDisplay = countdownContainer.add.text({
      text: '00:00:00',
      anchor: 0.5,
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    this.pauseInfo = this.make.htmlText({
      text: ``,
      anchor: 0,
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontSize: 24, align: 'left' },
    });

    this.ui.addElement(this.pauseInfo, { align: 'bottom left', padding: { bottom: 30, left: 20 } });
  }

  _updatePauseInfo() {
    this.pauseInfo.text = `<p style="background-color: #000000; backround-opacity: 0.5; padding: 10px; border-radius: 5px;">App is paused with the following configuration:<br><strong>Audio:</strong> <span style="color: #00ff00;">${this.config.pauseAudio}</span><br><strong>Animations:</strong> <span style="color: #00ff00;">${this.config.pauseAnimations}</span> <br><strong>Ticker:</strong> <span style="color: #00ff00;">${this.config.pauseTicker}</span> <br><strong>Timers:</strong> <span style="color: #00ff00;">${this.config.pauseTimers}</span></p>`;

    this.pauseInfo.visible = this.app.paused;

    this.ui.layout();
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

  onPauseToggle(pauseButton: Button) {
    (pauseButton.getChildAt(1) as Text).text = this.config.isPaused ? 'Resume App' : 'Pause App';
    pauseButton.setTexture('default', this.config.isPaused ? 'btn/red' : 'btn/blue');
  }

  onPause(config: PauseConfig): void {
    console.log('onPause', config);
    this._updatePauseInfo();
  }

  onResume(config: PauseConfig): void {
    console.log('onResume', config);
    this._updatePauseInfo();
  }

  onMusicToggle(musicButton: Button) {
    if (this.app.audio.isPlaying('Night at the Beach', 'music')) {
      (musicButton.getChildAt(1) as Text).text = 'Stop Music';
      musicButton.setTexture('default', 'btn/red');
    } else {
      (musicButton.getChildAt(1) as Text).text = 'Play Music';
      musicButton.setTexture('default', 'btn/blue');
    }
  }

  configureGUI() {
    const folder = this.gui.addFolder('Pause Configuration');
    folder.open();
    folder.add(this.config, 'pauseAudio').name('Audio');
    folder.add(this.config, 'pauseAnimations').name('Animations');
    folder.add(this.config, 'pauseTicker').name('Ticker');
    folder.add(this.config, 'pauseTimers').name('Timers');
  }

  update() {
    this.tickerAnimated.pivot.x += 3 * this.tickerAnimationConfig.direction;
    if (this.tickerAnimated.pivot.x >= 200) {
      this.tickerAnimationConfig.direction = -1;
    } else if (this.tickerAnimated.pivot.x <= 0) {
      this.tickerAnimationConfig.direction = 1;
    }
  }

  resize() {
    super.resize();
    this.container.x = 200;
  }

  destroy() {
    super.destroy();
    this.app.audio.stopAll(true, 0.5, { ease: 'sine.in' });
  }
}
