import type { Application } from '../core/Application';
import type { Action, ActionContext } from '../plugins';
import type { DataSchema } from '../store';

declare module '../utils/types' {
  export interface AppTypeOverrides {
    App: Application;
    Data: DataSchema;
    Contexts: ActionContext;
    Actions: Action;
    ActionMap: Record<string, Action>;
    Scenes: string;
    Plugins: string;
    StorageAdapters: string;
  }
  export interface AssetTypeOverrides {
    Texture: string;
    TPSFrames: string;
    SpriteSheet: string;
    SpineData: string;
    Audio: string;
    FontFamily: string;
    BitmapFontFamily: string;
    Bundles: string;
  }
}

declare module 'dill-pixel' {
  export interface AppTypeOverrides {
    App: Application;
    Data: DataSchema;
    Contexts: ActionContext;
    Actions: Action;
    ActionMap: Record<string, Action>;
    Scenes: string;
    Plugins: string;
    StorageAdapters: string;
  }
  export interface AssetTypeOverrides {
    Texture: string;
    TPSFrames: string;
    SpriteSheet: string;
    SpineData: string;
    Audio: string;
    FontFamily: string;
    BitmapFontFamily: string;
    Bundles: string;
  }
}
