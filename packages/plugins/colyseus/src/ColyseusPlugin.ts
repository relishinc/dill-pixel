import { Schema } from '@colyseus/schema';
import * as Colyseus from 'colyseus.js';
import { Room } from 'colyseus.js';
import type { IApplication, IPlugin } from 'dill-pixel';
import { Logger, Plugin } from 'dill-pixel';

export type SchemaConstructor<T = Schema> = new (...args: any[]) => T;

export type ColyseusPluginOptions = {
  port: string;
};

export interface IColyseusPlugin extends IPlugin {
  readonly client: Colyseus.Client;

  initialize(app: IApplication, options?: Partial<ColyseusPluginOptions>): void;

  joinOrCreate<T>(
    roomName: string,
    options?: Colyseus.JoinOptions,
    rootSchema?: SchemaConstructor<T>,
  ): Promise<Room<T>>;

  create<T>(roomName: string, options?: Colyseus.JoinOptions, rootSchema?: SchemaConstructor<T>): Promise<Room<T>>;

  join<T>(roomName: string, options?: Colyseus.JoinOptions, rootSchema?: SchemaConstructor<T>): Promise<Room<T>>;

  joinById<T>(roomId: string, options?: Colyseus.JoinOptions, rootSchema?: SchemaConstructor<T>): Promise<Room<T>>;
}

export class ColyseusPlugin extends Plugin implements IColyseusPlugin {
  private _options: ColyseusPluginOptions;

  private _client: Colyseus.Client;

  get client(): Colyseus.Client {
    return this._client;
  }

  async initialize(_app: IApplication, options: Partial<ColyseusPluginOptions>) {
    this._options = {
      port: _app.env.VITE_COLYSEUS_PORT || _app.env.COLYSEUS_PORT || '2567',
      ...options,
    };
    Logger.log(`Colyseus plugin initialized`);

    if (!this._client) {
      this._client = new Colyseus.Client(`ws://localhost:${this._options.port}`);
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
