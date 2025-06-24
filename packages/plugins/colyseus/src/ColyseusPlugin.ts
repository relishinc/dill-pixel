import { Schema } from '@colyseus/schema';
import * as Colyseus from 'colyseus.js';
import { Room } from 'colyseus.js';
import type { IApplication, IPlugin } from 'dill-pixel';
import { Logger, Plugin } from 'dill-pixel';

export type SchemaConstructor<T = Schema> = new (...args: any[]) => T;

export type ColyseusPluginOptions = {
  port: string;
};

export interface IColyseusPlugin extends IPlugin<ColyseusPluginOptions> {
  readonly client: Colyseus.Client;

  initialize(options?: Partial<ColyseusPluginOptions>, app?: IApplication): void;

  joinOrCreate<T>(
    roomName: string,
    options?: Colyseus.JoinOptions,
    rootSchema?: SchemaConstructor<T>,
  ): Promise<Room<T>>;

  create<T>(roomName: string, options?: Colyseus.JoinOptions, rootSchema?: SchemaConstructor<T>): Promise<Room<T>>;

  join<T>(roomName: string, options?: Colyseus.JoinOptions, rootSchema?: SchemaConstructor<T>): Promise<Room<T>>;

  joinById<T>(roomId: string, options?: Colyseus.JoinOptions, rootSchema?: SchemaConstructor<T>): Promise<Room<T>>;
}

export class ColyseusPlugin extends Plugin<ColyseusPluginOptions> implements IColyseusPlugin {
  private _client: Colyseus.Client;

  get client(): Colyseus.Client {
    return this._client;
  }

  async initialize(options?: Partial<ColyseusPluginOptions>, app?: IApplication) {
    if (!app) {
      throw new Error('Application instance is required for ColyseusPlugin initialization.');
    }
    this._options = {
      port: app.env.VITE_COLYSEUS_PORT || app.env.COLYSEUS_PORT || '2567',
      ...(options || {}),
    };
    Logger.log(`Colyseus plugin initialized`);

    if (!this._client) {
      this._client = new Colyseus.Client(`ws://localhost:${this.options.port}`);
    }
  }

  async joinOrCreate<T = any>(
    roomName: string,
    options?: Colyseus.JoinOptions,
    rootSchema?: SchemaConstructor<T>,
  ): Promise<Room<T>> {
    return this._client.joinOrCreate<T>(roomName, options, rootSchema);
  }

  async join<T = any>(
    roomName: string,
    options?: Colyseus.JoinOptions,
    rootSchema?: SchemaConstructor<T>,
  ): Promise<Room<T>> {
    return this._client.join<T>(roomName, options, rootSchema);
  }

  async joinById<T = any>(
    roomId: string,
    options?: Colyseus.JoinOptions,
    rootSchema?: SchemaConstructor<T>,
  ): Promise<Room<T>> {
    return this._client.joinById<T>(roomId, options, rootSchema);
  }

  async create<T = any>(
    roomName: string,
    options?: Colyseus.JoinOptions,
    rootSchema?: SchemaConstructor<T>,
  ): Promise<Room<T>> {
    return this._client.joinById<T>(roomName, options, rootSchema);
  }
}
