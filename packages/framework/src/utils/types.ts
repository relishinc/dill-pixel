import type { AssetInitOptions, AssetsManifest, AssetsPreferences, UnresolvedAsset } from 'pixi.js';
import { Point, Texture } from 'pixi.js';

/**
 * A generic constructor type.
 * @template T The type of the instance that the constructor creates.
 */
export type Constructor<T = NonNullable<unknown>> = new (...args: any[]) => T;

/**
 * A type that requires certain properties of another type.
 * @template T The original type.
 * @template K The keys of the properties that should be required.
 */
export type WithRequiredProps<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * A type that represents a sprite sheet, which can be a string or undefined.
 */
export type SpriteSheetLike = string | undefined;

/**
 * A type that represents a size, with width and height properties.
 */
export type Size = { width: number; height: number };

/**
 * A type that represents a point, which can be a number, an object with x and y properties, an array of two numbers, or a Point instance.
 */
export type PointLike = number | { x: number; y: number } | [number, number?] | [number] | number[] | Point;
export type Padding = { top: number; right: number; bottom: number; left: number };
export type SizeLike = PointLike | { width: number; height: number } | Size;

/**
 * A type that represents a rectangle, with x, y, width, and height properties.
 */
export type RectLike = Size & { x: number; y: number };

/**
 * A type that maps keys to PointLike values.
 * @template T The keys of the properties that should be PointLike.
 */
export type WithPointLike<T extends keyof any> = { [P in T]: PointLike };

/**
 * A type that represents a container, with position and getGlobalPosition properties, and x, y, width, and height properties.
 */
export type ContainerLike = RectLike & { position: Point; getGlobalPosition: () => Point };

/**
 * A type that represents a texture, which can be a string or a Texture instance.
 */
export type TextureLike = string | Texture;

export type ImportListItemModule<T> = (() => Promise<any>) | Promise<any> | Constructor<T> | T;

/**+
 * A type that represents an item in an import list.
 * @template T The type of the instance that the constructor creates.
 */
export type ImportListItem<T = any> = {
  id: string;
  module: ImportListItemModule<T>;
  namedExport?: string;
  options?: any;
  autoLoad?: boolean;
};

export type AssetExtension =
  | 'png'
  | 'jpg'
  | 'jpeg'
  | 'webp'
  | 'gif'
  | 'avif'
  | 'svg'
  | 'json'
  | 'xml'
  | 'txt'
  | 'mp4'
  | 'm4v'
  | 'webm'
  | 'ogg'
  | 'wav'
  | 'mp3'
  | string;

export type AssetLike = {
  alias?: string;
  src: string | string[];
  ext: AssetExtension;
};
export type BundleTypes = string | string[];

export type AssetTypes = string | string[] | UnresolvedAsset | UnresolvedAsset[] | AssetLike | AssetLike[];

export type AssetLoadingOptions = {
  manifest?: AssetsManifest | Promise<AssetsManifest> | string;
  initOptions?: Partial<AssetInitOptions>;
  assetPreferences?: Partial<AssetsPreferences>;
  preload?: {
    assets?: AssetTypes;
    bundles?: BundleTypes;
  };
  background?: {
    assets?: AssetTypes;
    bundles?: BundleTypes;
  };
};

type SceneItemOptions = {
  debugLabel?: string;
  plugins?: string[];
  assets?: AssetLoadingOptions;
  autoUnloadAssets?: boolean;
};

export type SceneImportListItem<T> = ImportListItem<T> & Partial<SceneItemOptions>;

/**
 * A type that represents an import list.
 * @template T The type of the instance that the constructor creates.
 */
export type ImportList<T> = ImportListItem<T>[];
export type SceneImportList<T> = SceneImportListItem<T>[];

export type AppSize = {
  width: number;
  height: number;
  screenWidth: number;
  screenHeight: number;
};

// from gsap
export type EaseString =
  | 'none'
  | 'power1'
  | 'power1.in'
  | 'power1.out'
  | 'power1.inOut'
  | 'power2'
  | 'power2.in'
  | 'power2.out'
  | 'power2.inOut'
  | 'power3'
  | 'power3.in'
  | 'power3.out'
  | 'power3.inOut'
  | 'power4'
  | 'power4.in'
  | 'power4.out'
  | 'power4.inOut'
  | 'back'
  | 'back.in'
  | 'back.out'
  | 'back.inOut'
  | 'bounce'
  | 'bounce.in'
  | 'bounce.out'
  | 'bounce.inOut'
  | 'circ'
  | 'circ.in'
  | 'circ.out'
  | 'circ.inOut'
  | 'elastic'
  | 'elastic.in'
  | 'elastic.out'
  | 'elastic.inOut'
  | 'expo'
  | 'expo.in'
  | 'expo.out'
  | 'expo.inOut'
  | 'sine'
  | 'sine.in'
  | 'sine.out'
  | 'sine.inOut';


export type KeyboardKey =
  | 'Backspace'
  | 'Tab'
  | 'Enter'
  | 'Shift'
  | 'Control'
  | 'Alt'
  | 'Pause'
  | 'CapsLock'
  | 'Escape'
  | 'Space'
  | 'PageUp'
  | 'PageDown'
  | 'End'
  | 'Home'
  | 'ArrowLeft'
  | 'ArrowUp'
  | 'ArrowRight'
  | 'ArrowDown'
  | 'PrintScreen'
  | 'Insert'
  | 'Delete'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | 'NumLock'
  | 'NumpadDivide'
  | 'NumpadMultiply'
  | 'NumpadSubtract'
  | 'NumpadAdd'
  | 'NumpadEnter'
  | 'Numpad0'
  | 'Numpad1'
  | 'Numpad2'
  | 'Numpad3'
  | 'Numpad4'
  | 'Numpad5'
  | 'Numpad6'
  | 'Numpad7'
  | 'Numpad8'
  | 'Numpad9'
  | 'NumpadDecimal'
  | 'F1'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'F7'
  | 'F8'
  | 'F9'
  | 'F10'
  | 'F11'
  | 'F12'
  | 'Semicolon'
  | 'Equal'
  | 'Comma'
  | 'Minus'
  | 'Period'
  | 'Slash'
  | 'Backquote'
  | 'BracketLeft'
  | 'Backslash'
  | 'BracketRight'
  | 'Quote'
  | 'IntlBackslash'
  | 'MetaLeft'
  | 'MetaRight'
  | 'ContextMenu'

export type { Spine } from '../plugins/spine/pixi-spine';
