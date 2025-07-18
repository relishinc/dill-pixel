import type { IPlugin } from 'dill-pixel';

import { isDev, Logger, Plugin, Signal } from 'dill-pixel';
import * as springroll from 'springroll';
import { pluginVersion, version } from './version';

export interface SpringRollPluginOptions extends springroll.ApplicationConfig {
  debug?: boolean;
}

export interface ISpringRollPlugin extends IPlugin<SpringRollPluginOptions> {
  // signals
  onPause: Signal<(result: boolean) => void>;
  onCaptionsMuted: Signal<(result: boolean) => void>;
  onSoundVolume: Signal<(result: number) => void>;
  onVoVolume: Signal<(result: number) => void>;
  onMusicVolume: Signal<(result: number) => void>;
  onSfxVolume: Signal<(result: number) => void>;
  onPointerSize: Signal<(result: number) => void>;
  onButtonSize: Signal<(result: number) => void>;
  onControlSensitivity: Signal<(result: number) => void>;
  onRemovableLayers: Signal<(result: number) => void>;
  onHudPosition: Signal<(result: string) => void>;
  onHitAreaScale: Signal<(result: number) => void>;
  onDragThresholdScale: Signal<(result: number) => void>;
  onHealth: Signal<(result: number) => void>;
  onObjectCount: Signal<(result: number) => void>;
  onCompletionPercentage: Signal<(result: number) => void>;
  onSpeedScale: Signal<(result: number) => void>;
  onTimersScale: Signal<(result: number) => void>;
  onInputCount: Signal<(result: number) => void>;
  onKeyBinding: Signal<(result: object) => void>;
  onColorVision: Signal<(result: string) => void>;
  onFullScreen: Signal<(result: boolean) => void>;

  initialize(options: Partial<SpringRollPluginOptions>): void;
}

const defaultOptions: Partial<SpringRollPluginOptions> = {
  features: {
    captions: true,
    sound: true,
    vo: true,
    music: true,
    sfx: true,
    soundVolume: true,
    voVolume: true,
    musicVolume: true,
    sfxVolume: true,
  },
  debug: isDev,
};

export class SpringRollPlugin extends Plugin<SpringRollPluginOptions> implements ISpringRollPlugin {
  protected _options: SpringRollPluginOptions;
  private _springrollApplication: springroll.Application;

  // signals
  onPause: Signal<(result: boolean) => void> = new Signal();
  onCaptionsMuted: Signal<(result: boolean) => void> = new Signal();
  onSoundVolume: Signal<(result: number) => void> = new Signal();
  onVoVolume: Signal<(result: number) => void> = new Signal();
  onMusicVolume: Signal<(result: number) => void> = new Signal();
  onSfxVolume: Signal<(result: number) => void> = new Signal();
  onPointerSize: Signal<(result: number) => void> = new Signal();
  onButtonSize: Signal<(result: number) => void> = new Signal();
  onControlSensitivity: Signal<(result: number) => void> = new Signal();
  onRemovableLayers: Signal<(result: number) => void> = new Signal();
  onHudPosition: Signal<(result: string) => void> = new Signal();
  onHitAreaScale: Signal<(result: number) => void> = new Signal();
  onDragThresholdScale: Signal<(result: number) => void> = new Signal();
  onHealth: Signal<(result: number) => void> = new Signal();
  onObjectCount: Signal<(result: number) => void> = new Signal();
  onCompletionPercentage: Signal<(result: number) => void> = new Signal();
  onSpeedScale: Signal<(result: number) => void> = new Signal();
  onTimersScale: Signal<(result: number) => void> = new Signal();
  onInputCount: Signal<(result: number) => void> = new Signal();
  onKeyBinding: Signal<(result: object) => void> = new Signal();
  onColorVision: Signal<(result: string) => void> = new Signal();
  onFullScreen: Signal<(result: boolean) => void> = new Signal();

  async initialize(options: Partial<SpringRollPluginOptions>) {
    this._options = {
      features: { ...defaultOptions.features, ...(options?.features ?? {}) },
      hintPlayer: options?.hintPlayer ?? defaultOptions.hintPlayer,
      debug: options?.debug ?? defaultOptions.debug,
    };

    this._springrollApplication = new springroll.Application({
      features: this._options.features,
      hintPlayer: this._options.hintPlayer,
    });
    this.hello();
    this._subscribeToSpringrollFeatures();

    await new Promise<void>((resolve) => {
      this._springrollApplication.state.ready.subscribe(() => {
        resolve();
      });
    });
  }

  private hello() {
    const hello = `%c Dill Pixel SpringRoll Plugin v${version} | %cSpringRoll v${pluginVersion}`;
    console.log(
      hello,
      'background: rgba(31, 41, 55, 1);color: #74b64c',
      'background: rgba(31, 41, 55, 1);color: #e91e63',
    );

    if (this._options.debug) {
      Logger.log(this._options);
    }

    if (this._options.features && Object.keys(this._options.features)?.length > 0) {
      console.log(
        `%c Subscribed to the following SpringRoll features: ${Object.keys(this._options.features).join(', ')}.`,
        'background: rgba(31, 41, 55, 1);color: #74b64c',
      );
    }
  }

  private _subscribeToSpringrollFeatures() {
    if (this._options.features?.captions) {
      this._springrollApplication.state.captionsMuted.subscribe(this._handleCaptionsMuted);
    }
    if (this._options.features?.sound) {
      this._springrollApplication.state.soundVolume.subscribe(this._handleSoundVolume);
    }
    if (this._options.features?.vo) {
      this._springrollApplication.state.voVolume.subscribe(this._handleVoVolume);
    }
    if (this._options.features?.music) {
      this._springrollApplication.state.musicVolume.subscribe(this._handleMusicVolume);
    }
    if (this._options.features?.sfx) {
      this._springrollApplication.state.sfxVolume.subscribe(this._handleSfxVolume);
    }
    if (this._options.features?.pointerSize) {
      this._springrollApplication.state.pointerSize.subscribe(this._handlePointerSize);
    }
    if (this._options.features?.buttonSize) {
      this._springrollApplication.state.buttonSize.subscribe(this._handleButtonSize);
    }
    if (this._options.features?.controlSensitivity) {
      this._springrollApplication.state.controlSensitivity.subscribe(this._handleControlSensitivity);
    }
    if (this._options.features?.removableLayers) {
      this._springrollApplication.state.removableLayers.subscribe(this._handleRemovableLayers);
    }
    if (this._options.features?.hudPosition) {
      this._springrollApplication.state.hudPosition.subscribe(this._handleHudPosition);
    }
    if (this._options.features?.hitAreaScale) {
      this._springrollApplication.state.hitAreaScale.subscribe(this._handleHitAreaScale);
    }
    if (this._options.features?.dragThresholdScale) {
      this._springrollApplication.state.dragThresholdScale.subscribe(this._handleDragThresholdScale);
    }
    if (this._options.features?.health) {
      this._springrollApplication.state.health.subscribe(this._handleHealth);
    }
    if (this._options.features?.objectCount) {
      this._springrollApplication.state.objectCount.subscribe(this._handleObjectCount);
    }
    if (this._options.features?.completionPercentage) {
      this._springrollApplication.state.completionPercentage.subscribe(this._handleCompletionPercentage);
    }
    if (this._options.features?.speedScale) {
      this._springrollApplication.state.speedScale.subscribe(this._handleSpeedScale);
    }
    if (this._options.features?.timersScale) {
      this._springrollApplication.state.timersScale.subscribe(this._handleTimersScale);
    }
    if (this._options.features?.inputCount) {
      this._springrollApplication.state.inputCount.subscribe(this._handleInputCount);
    }
    if (this._options.features?.keyBinding) {
      this._springrollApplication.state.keyBinding.subscribe(this._handleKeyBinding);
    }
    if (this._options.features?.colorVision) {
      this._springrollApplication.state.colorVision.subscribe(this._handleColorVision);
    }
    if (this._options.features?.fullScreen) {
      this._springrollApplication.state.fullScreen.subscribe(this._handleFullScreen);
    }
    this._springrollApplication.state.pause.subscribe(this._handlePause);
  }

  private _handleCaptionsMuted(result: boolean) {
    this._debug('Are captions muted?', result);
    this.app.captions.enabled = !result;
    this.onCaptionsMuted.emit(result);
  }

  private _handleSoundVolume(result: number) {
    this._debug('Sound volume', result);
    this.app.audio.masterVolume = result;
    this.onSoundVolume.emit(result);
  }

  private _handleVoVolume(result: number) {
    this._debug('Vo volume', result);
    this.app.audio.setChannelVolume('voiceover', result);
    this.onVoVolume.emit(result);
  }

  private _handleMusicVolume(result: number) {
    this._debug('Music volume', result);
    this.app.audio.setChannelVolume('music', result);
    this.onMusicVolume.emit(result);
  }

  private _handleSfxVolume(result: number) {
    this._debug('Sfx volume', result);
    this.app.audio.setChannelVolume('sfx', result);
    this.onSfxVolume.emit(result);
  }

  private _handlePointerSize(result: number) {
    this._debug('Pointer size', result);
    this.onPointerSize.emit(result);
  }

  private _handleButtonSize(result: number) {
    this._debug('Button size', result);
    this.onButtonSize.emit(result);
  }

  private _handleControlSensitivity(result: number) {
    this._debug('Control sensitivity', result);
    this.onControlSensitivity.emit(result);
  }

  private _handleRemovableLayers(result: number) {
    this._debug('Removable layers', result);
    this.onRemovableLayers.emit(result);
  }

  private _handleHudPosition(result: string) {
    this._debug('Hud position', result);
    this.onHudPosition.emit(result);
  }

  private _handleHitAreaScale(result: number) {
    this._debug('Hit area scale', result);
    this.onHitAreaScale.emit(result);
  }

  private _handleDragThresholdScale(result: number) {
    this._debug('Drag threshold scale', result);
    this.onDragThresholdScale.emit(result);
  }

  private _handleHealth(result: number) {
    this._debug('Health', result);
    this.onHealth.emit(result);
  }

  private _handleObjectCount(result: number) {
    this._debug('Object count', result);
    this.onObjectCount.emit(result);
  }

  private _handleCompletionPercentage(result: number) {
    this._debug('Completion percentage', result);
    this.onCompletionPercentage.emit(result);
  }

  private _handleSpeedScale(result: number) {
    this._debug('Speed scale', result);
    this.onSpeedScale.emit(result);
  }

  private _handleTimersScale(result: number) {
    this._debug('Timers scale', result);
    this.onTimersScale.emit(result);
  }

  private _handleInputCount(result: number) {
    this._debug('Input count', result);
    this.onInputCount.emit(result);
  }

  private _handleKeyBinding(result: object) {
    this._debug('Key binding', result);
    this.onKeyBinding.emit(result);
  }

  private _handleColorVision(result: string) {
    this._debug('Color vision', result);
    this.onColorVision.emit(result);
  }

  private _handleFullScreen(result: boolean) {
    this._debug('Full screen', result);
    this.onFullScreen.emit(result);
  }

  private _handlePause(result: boolean) {
    this._debug('Pause', result);
    this.onPause.emit(result);
  }

  private _debug(...message: any[]) {
    if (this._options.debug) {
      Logger.log(...message);
    }
  }
}
