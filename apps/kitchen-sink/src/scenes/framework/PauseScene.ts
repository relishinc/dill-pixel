import BaseScene from '@/scenes/BaseScene';
import {
  Button,
  FlexContainer,
  formatTime,
  PauseConfig,
  type SceneAssets,
  type SceneDebug,
  UICanvas,
} from 'dill-pixel';
import { gsap } from 'gsap';
import { HTMLText, Sprite, Text } from 'pixi.js';
export const id = 'pause';
export const debug: SceneDebug = {
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
            alias: 'staticJar',
            src: '/static/jar.png',
          },
        ],
        bundles: ['audio', 'required'],
      },
    };
  }

  public async initialize() {
    await super.initialize();
    this.ui = this.add.uiCanvas({ label: 'UI', useAppSize: true });

    this.container = this.ui.addElement(
      this.make.flexContainer({
        layout: {
          flexDirection: 'column',
          justifyContent: 'center',
          width: 800,
          gap: 20,
        },
        label: 'Main Container',
      }),
      { align: 'center' },
    );

    const animatedContainer = this.container.add.flexContainer({
      layout: { gap: 50, width: 500, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' },
    });

    animatedContainer.add.text({
      text: 'Animated with GSAP',
      anchor: [1, 0.5],
      pivot: [140, 0],
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontWeight: 'bold', fontSize: 24, align: 'right' },
    });

    this.gsapAnimated = animatedContainer.add.sprite({
      asset: 'staticJar',
      scale: 0.25,
      anchor: 0.5,
      layout: { applySizeDirectly: true },
    });

    animatedContainer.add.text({
      text: 'Animated with Pixi Ticker',
      anchor: [1, 0.5],
      pivot: [140, 0],
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontWeight: 'bold', fontSize: 24, align: 'right' },
    });

    this.tickerAnimated = animatedContainer.add.sprite({
      asset: 'staticJar',
      scale: 0.25,
      anchor: 0.5,
      layout: { applySizeDirectly: true },
    });

    this.addAnimation(
      gsap.to(this.gsapAnimated, {
        x: 200,
        duration: 1,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
      }),
    );

    // Add button container
    this.buttonContainer = this.ui.addElement(
      this.make.flexContainer({
        label: 'Button Container',
        x: -20,
        layout: {
          flexDirection: 'column',
          gap: 20,

          paddingBottom: 30,
          paddingRight: 100,
          width: 256,
        },
      }),
      { align: 'bottom right' },
    );

    // Add music button
    const musicButton = this.buttonContainer.add.button({
      scale: 0.5,
      cursor: 'pointer',
      label: 'Music Button',
      textures: {
        default: 'btn/blue',
        hover: 'btn/yellow',
        disabled: 'btn/grey',
        active: 'btn/red',
      },
      layout: { height: 70, width: 256 },
      sheet: 'ui',
      accessibleTitle: 'Toggle Music',
      accessibleHint: 'Press to toggle background music',
      textLabel: {
        text: 'Toggle Music',
        anchor: 0.5,
        resolution: 2,
        style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontWeight: 'bold', fontSize: 48, align: 'center' },
      },
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
      label: 'Pause Button',
      textures: {
        default: 'btn/blue',
        hover: 'btn/yellow',
        disabled: 'btn/grey',
        active: 'btn/red',
      },
      layout: { height: 70 },
      sheet: 'ui',
      accessibleTitle: 'Toggle Pause',
      accessibleHint: 'Press to toggle pause state',
    });

    pauseButton.addLabel({
      text: 'Toggle Pause',
      anchor: 0.5,
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontWeight: 'bold', fontSize: 48, align: 'center' },
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
    const timerContainer = this.container.add.flexContainer({
      layout: {
        gap: 20,
        width: 600,
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingTop: 80,
      },
    });

    this.app.timers.createTimer({
      autoStart: true,
      onTick: this._updateStopWatch,
    });

    timerContainer.add.text({
      text: 'Stopwatch (TimerPlugin)',
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontWeight: 'bold', fontSize: 24, align: 'right' },
      layout: true,
    });

    this.stopwatchDisplay = timerContainer.add.text({
      text: '00:00:00',
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontWeight: 'bold', fontSize: 48, align: 'center' },
      layout: true,
    });

    // Create a countdown timer
    this.app.timers.createTimer({
      duration: 5000, // 5 seconds
      autoStart: true,
      useWorker: true,
      loop: true,
      onTick: this._updateCountdown,
      onComplete: () => {
        console.log('Timer completed!');
      },
    });

    timerContainer.add.text({
      text: 'Countdown (TimerPlugin)',
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontWeight: 'bold', fontSize: 24, align: 'right' },
    });

    this.countdownDisplay = timerContainer.add.text({
      text: '00:00:00',
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontWeight: 'bold', fontSize: 48, align: 'center' },
      layout: true,
    });

    this.pauseInfo = this.ui.addElement(
      this.make.htmlText({
        text: 'Pause information',
        style: {
          fill: 0xffffff,
          fontFamily: 'KumbhSans',
          fontWeight: 'bold',
          fontSize: 24,
          align: 'left',
        },
      }),
      { align: 'left' },
    );
  }

  _updatePauseInfo() {
    this.pauseInfo.text = `<p style="background-color: #000000; backround-opacity: 0.5; padding: 10px; border-radius: 5px;">App is paused with the following configuration:<br><strong>Audio:</strong> <span style="color: #00ff00;">${this.config.pauseAudio}</span><br><strong>Animations:</strong> <span style="color: #00ff00;">${this.config.pauseAnimations}</span> <br><strong>Ticker:</strong> <span style="color: #00ff00;">${this.config.pauseTicker}</span> <br><strong>Timers:</strong> <span style="color: #00ff00;">${this.config.pauseTimers}</span></p>`;

    this.pauseInfo.visible = this.app.paused;

    this.ui.updateLayout();
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
    const text = pauseButton.getChildAt(1) as Text;
    if (!text) {
      return;
    }
    text.text = this.config.isPaused ? 'Resume App' : 'Pause App';
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
    console.log('onMusicToggle', musicButton);
    const text = musicButton.getChildAt(1) as Text;
    if (this.app.audio.isPlaying('Night at the Beach', 'music')) {
      if (text) {
        text.text = 'Stop Music';
      }
      musicButton.setTexture('default', 'btn/red');
    } else {
      if (text) {
        text.text = 'Play Music';
      }
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
    this.tickerAnimated.x += 3 * this.tickerAnimationConfig.direction;
    if (this.tickerAnimated.x >= 200) {
      this.tickerAnimationConfig.direction = -1;
    } else if (this.tickerAnimated.x <= 0) {
      this.tickerAnimationConfig.direction = 1;
    }
  }

  resize() {
    super.resize();
    this.container.x = 200;
    this.pauseInfo.x = -this.app.size.width * 0.5 + 10;
    this.pauseInfo.y = this.app.size.height * 0.5;
    this.ui.updateLayout();
  }

  destroy() {
    super.destroy();
    this.app.audio.stopAll(true, 0.5, { ease: 'sine.in' });
  }
}
