import { Application, Container as DillPixelContainer, IPlugin, Plugin } from 'dill-pixel';
import Matter, { IEngineDefinition, IRunnerOptions } from 'matter-js';
import { Container, Rectangle } from 'pixi.js';
import { System } from './System';
import { matterVersion, version } from './version';
export interface IMatterPhysicPlugin extends IPlugin {}
export interface IMatterPhysicsPlugin extends IPlugin<MatterPhysicsPluginOptions> {
  readonly system: typeof System;
  readonly matter: typeof Matter;
  pause(): void;
  resume(): void;
}

export type MatterPhysicsPluginOptions = {
  debug: boolean;
  autoInit: boolean;
  container?: Container;
  worldBounds?: Rectangle;
  createWalls?: { thickness: number; top?: boolean; bottom?: boolean; left?: boolean; right?: boolean };
  engine: Partial<IEngineDefinition>;
  runner: Partial<IRunnerOptions>;
};

const defaultOptions = {
  debug: false,
  autoInit: false,
  engine: {},
  runner: {
    delta: 1000 / 60,
    isFixed: false,
    enabled: true,
  },
};

export class MatterPhysicsPlugin
  extends Plugin<Application, MatterPhysicsPluginOptions>
  implements IMatterPhysicPlugin
{
  get system(): typeof System {
    return System;
  }

  get matter(): typeof Matter {
    return Matter;
  }

  pause() {
    this.matter.Runner.stop(this.system.runner);
    this.system.enabled = false;
  }

  resume() {
    this.system.enabled = true;
    this.matter.Runner.start(this.system.runner, this.system.engine);
  }

  get add() {
    if (!this.system.container) {
      throw new Error('Container not set');
    }
    try {
      return (this.system.container as DillPixelContainer).add;
    } catch (e) {
      throw new Error('Container is not a Dill Pixel Container');
    }
  }

  private hello() {
    const hello = `%c Dill Pixel Matter Physics Plugin v${version} | %cMatter.js v${matterVersion}`;
    console.log(
      hello,
      'background: rgba(31, 41, 55, 1);color: #74b64c',
      'background: rgba(31, 41, 55, 1);color: #e91e63',
    );
  }

  initialize(options?: Partial<MatterPhysicsPluginOptions>): void | Promise<void> {
    this._options = {
      ...defaultOptions,
      ...options,
      runner: { ...defaultOptions.runner, ...options?.runner },
      engine: { ...defaultOptions.engine, ...options?.engine },
    };

    if (this._options.autoInit) {
      this.system.initialize(this._options);
    }

    this.hello();
  }

  destroy() {
    if (this.system) {
      this.system.destroy();
    }
    super.destroy();
  }
}
