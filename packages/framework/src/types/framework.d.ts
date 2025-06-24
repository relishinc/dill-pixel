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
  }
  export interface AssetTypeOverrides {
    TextureLike: string;
    TPSFrames: string;
    SpriteSheetLike: string;
    SpineData: string;
    AudioLike: string;
    FontFamily: string;
    BitmapFontFamily: string;
  }
}

declare module 'dill-pixel' {
  export interface AppTypeOverrides {
    App: Application;
    Data: DataSchema;
    Contexts: ActionContext;
    Actions: Action;
    ActionMap: Record<string, Action>;
  }
  export interface AssetTypeOverrides {
    TextureLike: string;
    TPSFrames: string;
    SpriteSheetLike: string;
    SpineData: string;
    AudioLike: string;
    FontFamily: string;
    BitmapFontFamily: string;
  }
}
