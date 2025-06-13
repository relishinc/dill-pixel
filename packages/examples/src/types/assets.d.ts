// This file is auto-generated. Do not edit.
import type { ResolvedAsset, Texture, Spritesheet } from 'pixi.js';

/**
 * Available bundle names in the asset manifest
 * @example
 * const bundle: AssetBundles = 'game';
 */
export type AssetBundles = 
  | 'audio'
  | 'default'
  | 'game'
  | 'kenney'
  | 'platformer'
  | 'required'
  | 'spine';

/**
 * Available texture names in the asset manifest
 * @example
 * const texture: AssetTextures = 'game/wordmark';
 */
export type AssetTextures = 
  | 'KumbhSansBlack.png'
  | 'bg_layer1'
  | 'bg_layer1.png'
  | 'bg_layer2'
  | 'bg_layer2.png'
  | 'bg_layer3'
  | 'bg_layer3.png'
  | 'bg_layer4'
  | 'bg_layer4.png'
  | 'game/wordmark'
  | 'game/wordmark.svg'
  | 'kenney/background/bg_layer1'
  | 'kenney/background/bg_layer1.png'
  | 'kenney/background/bg_layer2'
  | 'kenney/background/bg_layer2.png'
  | 'kenney/background/bg_layer3'
  | 'kenney/background/bg_layer3.png'
  | 'kenney/background/bg_layer4'
  | 'kenney/background/bg_layer4.png'
  | 'logo'
  | 'logo.svg'
  | 'required/bitmap-fonts/KumbhSansBlack.png'
  | 'required/jar'
  | 'required/jar.png'
  | 'static/jar'
  | 'static/jar.png'
  | 'static/logo'
  | 'static/logo.svg'
  | 'wordmark'
  | 'wordmark.svg';

/**
 * Available spritesheet names in the asset manifest
 * @example
 * const spritesheet: AssetSpritesheets = 'game/sheet';
 */
export type AssetSpritesheets = 
  | 'characters'
  | 'game/sheet'
  | 'jumper'
  | 'kenney/jumper'
  | 'platformer/characters'
  | 'platformer/sheet'
  | 'required/ui'
  | 'ui';

/**
 * Available font names in the asset manifest
 * @example
 * const font: AssetFonts = 'KumbhSans-Regular';
 */
export type AssetFonts = 
  | 'KumbhSans-Bold.ttf'
  | 'KumbhSans-Bold.woff2'
  | 'KumbhSans-Medium.ttf'
  | 'KumbhSans-Medium.woff2'
  | 'KumbhSans-Regular.ttf'
  | 'KumbhSans-Regular.woff2'
  | 'KumbhSans-SemiBold.ttf'
  | 'KumbhSans-SemiBold.woff2'
  | 'KumbhSansBlack.fnt'
  | 'required/bitmap-fonts/KumbhSansBlack.fnt'
  | 'required/fonts/KumbhSans-Bold'
  | 'required/fonts/KumbhSans-Bold.ttf'
  | 'required/fonts/KumbhSans-Medium'
  | 'required/fonts/KumbhSans-Medium.ttf'
  | 'required/fonts/KumbhSans-Regular'
  | 'required/fonts/KumbhSans-Regular.ttf'
  | 'required/fonts/KumbhSans-SemiBold'
  | 'required/fonts/KumbhSans-SemiBold.ttf'
  | 'static/fonts/KumbhSans-Bold'
  | 'static/fonts/KumbhSans-Bold.woff2'
  | 'static/fonts/KumbhSans-Medium'
  | 'static/fonts/KumbhSans-Medium.woff2'
  | 'static/fonts/KumbhSans-Regular'
  | 'static/fonts/KumbhSans-Regular.woff2'
  | 'static/fonts/KumbhSans-SemiBold'
  | 'static/fonts/KumbhSans-SemiBold.woff2';

/**
 * Available audio names in the asset manifest
 * @example
 * const audio: AssetAudio = 'click';
 */
export type AssetAudio = 
  | 'Cheerful Annoyance'
  | 'Cheerful Annoyance.ogg'
  | 'Drumming Sticks'
  | 'Drumming Sticks.ogg'
  | 'Game Over'
  | 'Game Over.ogg'
  | 'Mishief Stroll'
  | 'Mishief Stroll.ogg'
  | 'Night at the Beach'
  | 'Night at the Beach.ogg'
  | 'audio/music/Cheerful Annoyance'
  | 'audio/music/Cheerful Annoyance.ogg'
  | 'audio/music/Drumming Sticks'
  | 'audio/music/Drumming Sticks.ogg'
  | 'audio/music/Game Over'
  | 'audio/music/Game Over.ogg'
  | 'audio/music/Mishief Stroll'
  | 'audio/music/Mishief Stroll.ogg'
  | 'audio/music/Night at the Beach'
  | 'audio/music/Night at the Beach.ogg'
  | 'audio/sfx/click'
  | 'audio/sfx/click.ogg'
  | 'audio/sfx/clonk'
  | 'audio/sfx/clonk.wav'
  | 'audio/sfx/hover'
  | 'audio/sfx/hover.ogg'
  | 'audio/vo/en/vo_intro_0_en'
  | 'audio/vo/en/vo_intro_0_en.mp3'
  | 'audio/vo/en/vo_intro_1_en'
  | 'audio/vo/en/vo_intro_1_en.mp3'
  | 'audio/vo/en/vo_intro_2_en'
  | 'audio/vo/en/vo_intro_2_en.mp3'
  | 'audio/vo/fr/vo_intro_0_fr'
  | 'audio/vo/fr/vo_intro_0_fr.mp3'
  | 'audio/vo/fr/vo_intro_1_fr'
  | 'audio/vo/fr/vo_intro_1_fr.mp3'
  | 'audio/vo/fr/vo_intro_2_fr'
  | 'audio/vo/fr/vo_intro_2_fr.mp3'
  | 'click'
  | 'click.ogg'
  | 'clonk'
  | 'clonk.wav'
  | 'hover'
  | 'hover.ogg'
  | 'vo_intro_0_en'
  | 'vo_intro_0_en.mp3'
  | 'vo_intro_0_fr'
  | 'vo_intro_0_fr.mp3'
  | 'vo_intro_1_en'
  | 'vo_intro_1_en.mp3'
  | 'vo_intro_1_fr'
  | 'vo_intro_1_fr.mp3'
  | 'vo_intro_2_en'
  | 'vo_intro_2_en.mp3'
  | 'vo_intro_2_fr'
  | 'vo_intro_2_fr.mp3';

/**
 * Available JSON file names in the asset manifest
 * @example
 * const json: AssetJson = 'locales/en';
 */
export type AssetJson = 
  | 'audio/vo/en/cc'
  | 'audio/vo/en/cc.json'
  | 'audio/vo/fr/cc'
  | 'audio/vo/fr/cc.json'
  | 'fr'
  | 'fr.json'
  | 'locales/fr'
  | 'locales/fr.json';

/**
 * Available Spine animation names in the asset manifest
 * @example
 * const spine: AssetSpine = 'spine/hero';
 */
export type AssetSpine = 
  | 'spine/spineboy-pro.atlas'
  | 'spine/spineboy-pro.skel'
  | 'spineboy-pro.atlas'
  | 'spineboy-pro.skel';

/**
 * Available Rive animation names in the asset manifest
 * @example
 * const rive: AssetRive = 'static/marty';
 */
export type AssetRive = 
  | 'cup'
  | 'cup.riv'
  | 'marty'
  | 'marty.riv'
  | 'reactions_v3'
  | 'reactions_v3.riv'
  | 'skins_demo'
  | 'skins_demo.riv'
  | 'static/cup'
  | 'static/cup.riv'
  | 'static/marty'
  | 'static/marty.riv'
  | 'static/reactions_v3'
  | 'static/reactions_v3.riv'
  | 'static/skins_demo'
  | 'static/skins_demo.riv';

/**
 * Union type of all asset names
 * @example
 * const asset: AssetAlias = 'game/wordmark';
 */
export type AssetAlias = 
  | AssetTextures 
  | AssetSpritesheets 
  | AssetFonts 
  | AssetAudio 
  | AssetJson
  | AssetSpine
  | AssetRive;

/**
 * Type-safe manifest structure
 */
export interface AssetManifest {
  bundles: {
    [K in AssetBundles]: {
      name: K;
      assets: ResolvedAsset[];
    }
  };
}

/**
 * Type-safe asset types after loading
 */
export interface AssetTypes {
  textures: Record<AssetTextures, Texture>;
  spritesheets: Record<AssetSpritesheets, Spritesheet>;
  fonts: Record<AssetFonts, any>;
  audio: Record<AssetAudio, HTMLAudioElement>;
  json: Record<AssetJson, any>;
  spine: Record<AssetSpine, any>;
  rive: Record<AssetRive, any>;
}

/**
 * Helper type to get the asset type for a given alias
 * @example
 * type MyTextureType = AssetTypeOf<'game/wordmark'>; // Texture
 */
export type AssetTypeOf<T extends AssetAlias> = 
  T extends AssetTextures ? Texture :
  T extends AssetSpritesheets ? Spritesheet :
  T extends AssetFonts ? any :
  T extends AssetAudio ? HTMLAudioElement :
  T extends AssetJson ? any :
  T extends AssetSpine ? any :
  T extends AssetRive ? any :
  never;

/**
 * Get the bundle name for a given asset
 * @example
 * type MyBundle = AssetBundleOf<'game/wordmark'>; // 'game'
 */
export type AssetBundleOf<T extends AssetAlias> = Extract<AssetBundles, T extends `${infer B}/${string}` ? B : never>;
