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
  | 'spine'
  | 'splash';

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
  | 'jar'
  | 'jar.png'
  | 'kenney/background/bg_layer1'
  | 'kenney/background/bg_layer1.png'
  | 'kenney/background/bg_layer2'
  | 'kenney/background/bg_layer2.png'
  | 'kenney/background/bg_layer3'
  | 'kenney/background/bg_layer3.png'
  | 'kenney/background/bg_layer4'
  | 'kenney/background/bg_layer4.png'
  | 'required/bitmap-fonts/KumbhSansBlack.png'
  | 'required/jar'
  | 'required/jar.png'
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
 * Available TPS frame names from spritesheets
 * @example
 * const frame: AssetTPSFrames = 'btn/blue';
 */
export type AssetTPSFrames = 
  | 'Enemies/cloud'
  | 'Enemies/flyMan_fly'
  | 'Enemies/flyMan_jump'
  | 'Enemies/flyMan_stand'
  | 'Enemies/flyMan_still_fly'
  | 'Enemies/flyMan_still_jump'
  | 'Enemies/flyMan_still_stand'
  | 'Enemies/spikeBall1'
  | 'Enemies/spikeBall_2'
  | 'Enemies/spikeMan_jump'
  | 'Enemies/spikeMan_stand'
  | 'Enemies/spikeMan_walk1'
  | 'Enemies/spikeMan_walk2'
  | 'Enemies/springMan_hurt'
  | 'Enemies/springMan_stand'
  | 'Enemies/sun1'
  | 'Enemies/sun2'
  | 'Enemies/wingMan1'
  | 'Enemies/wingMan2'
  | 'Enemies/wingMan3'
  | 'Enemies/wingMan4'
  | 'Enemies/wingMan5'
  | 'Environment/cactus'
  | 'Environment/grass1'
  | 'Environment/grass2'
  | 'Environment/grass_brown1'
  | 'Environment/grass_brown2'
  | 'Environment/ground_cake'
  | 'Environment/ground_cake_broken'
  | 'Environment/ground_cake_small'
  | 'Environment/ground_cake_small_broken'
  | 'Environment/ground_grass'
  | 'Environment/ground_grass_broken'
  | 'Environment/ground_grass_small'
  | 'Environment/ground_grass_small_broken'
  | 'Environment/ground_sand'
  | 'Environment/ground_sand_broken'
  | 'Environment/ground_sand_small'
  | 'Environment/ground_sand_small_broken'
  | 'Environment/ground_snow'
  | 'Environment/ground_snow_broken'
  | 'Environment/ground_snow_small'
  | 'Environment/ground_snow_small_broken'
  | 'Environment/ground_stone'
  | 'Environment/ground_stone_broken'
  | 'Environment/ground_stone_small'
  | 'Environment/ground_stone_small_broken'
  | 'Environment/ground_wood'
  | 'Environment/ground_wood_broken'
  | 'Environment/ground_wood_small'
  | 'Environment/ground_wood_small_broken'
  | 'Environment/mushroom_brown'
  | 'Environment/mushroom_red'
  | 'Environment/spike_bottom'
  | 'Environment/spike_top'
  | 'Environment/spikes_bottom'
  | 'Environment/spikes_top'
  | 'HUD/carrots'
  | 'HUD/coin_bronze'
  | 'HUD/coin_gold'
  | 'HUD/coin_silver'
  | 'HUD/lifes'
  | 'Items/bronze_1'
  | 'Items/bronze_2'
  | 'Items/bronze_3'
  | 'Items/bronze_4'
  | 'Items/bubble'
  | 'Items/carrot'
  | 'Items/carrot_gold'
  | 'Items/gold_1'
  | 'Items/gold_2'
  | 'Items/gold_3'
  | 'Items/gold_4'
  | 'Items/jetpack'
  | 'Items/jetpack_item'
  | 'Items/portal_orange'
  | 'Items/portal_yellow'
  | 'Items/powerup_bubble'
  | 'Items/powerup_bunny'
  | 'Items/powerup_empty'
  | 'Items/powerup_jetpack'
  | 'Items/powerup_wings'
  | 'Items/silver_1'
  | 'Items/silver_2'
  | 'Items/silver_3'
  | 'Items/silver_4'
  | 'Items/spring'
  | 'Items/spring_in'
  | 'Items/spring_out'
  | 'Items/wing_left'
  | 'Items/wing_right'
  | 'Particles/flame'
  | 'Particles/lighting_blue'
  | 'Particles/lighting_yellow'
  | 'Particles/particle_beige'
  | 'Particles/particle_blue'
  | 'Particles/particle_brown'
  | 'Particles/particle_darkBrown'
  | 'Particles/particle_darkGrey'
  | 'Particles/particle_green'
  | 'Particles/particle_grey'
  | 'Particles/particle_pink'
  | 'Particles/portal_orangeParticle'
  | 'Particles/portal_yellowParticle'
  | 'Particles/smoke'
  | 'Players/bunny1_hurt'
  | 'Players/bunny1_jump'
  | 'Players/bunny1_ready'
  | 'Players/bunny1_stand'
  | 'Players/bunny1_walk1'
  | 'Players/bunny1_walk2'
  | 'Players/bunny2_hurt'
  | 'Players/bunny2_jump'
  | 'Players/bunny2_ready'
  | 'Players/bunny2_stand'
  | 'Players/bunny2_walk1'
  | 'Players/bunny2_walk2'
  | 'btn/blue'
  | 'btn/green'
  | 'btn/grey'
  | 'btn/orange'
  | 'btn/purple'
  | 'btn/red'
  | 'btn/yellow'
  | 'btn_a/down'
  | 'btn_a/over'
  | 'btn_a/up'
  | 'btn_b/down'
  | 'btn_b/over'
  | 'btn_b/up'
  | 'female/character_femaleAdventurer_attack0'
  | 'female/character_femaleAdventurer_attack1'
  | 'female/character_femaleAdventurer_attack2'
  | 'female/character_femaleAdventurer_attackKick'
  | 'female/character_femaleAdventurer_back'
  | 'female/character_femaleAdventurer_behindBack'
  | 'female/character_femaleAdventurer_cheer0'
  | 'female/character_femaleAdventurer_cheer1'
  | 'female/character_femaleAdventurer_climb0'
  | 'female/character_femaleAdventurer_climb1'
  | 'female/character_femaleAdventurer_down'
  | 'female/character_femaleAdventurer_drag'
  | 'female/character_femaleAdventurer_duck'
  | 'female/character_femaleAdventurer_fall'
  | 'female/character_femaleAdventurer_fallDown'
  | 'female/character_femaleAdventurer_hang'
  | 'female/character_femaleAdventurer_hit'
  | 'female/character_femaleAdventurer_hold'
  | 'female/character_femaleAdventurer_hurt'
  | 'female/character_femaleAdventurer_idle'
  | 'female/character_femaleAdventurer_interact'
  | 'female/character_femaleAdventurer_jump'
  | 'female/character_femaleAdventurer_kick'
  | 'female/character_femaleAdventurer_rope'
  | 'female/character_femaleAdventurer_run0'
  | 'female/character_femaleAdventurer_run1'
  | 'female/character_femaleAdventurer_run2'
  | 'female/character_femaleAdventurer_shove'
  | 'female/character_femaleAdventurer_shoveBack'
  | 'female/character_femaleAdventurer_show'
  | 'female/character_femaleAdventurer_side'
  | 'female/character_femaleAdventurer_slide'
  | 'female/character_femaleAdventurer_switch0'
  | 'female/character_femaleAdventurer_switch1'
  | 'female/character_femaleAdventurer_talk'
  | 'female/character_femaleAdventurer_think'
  | 'female/character_femaleAdventurer_walk0'
  | 'female/character_femaleAdventurer_walk1'
  | 'female/character_femaleAdventurer_walk2'
  | 'female/character_femaleAdventurer_walk3'
  | 'female/character_femaleAdventurer_walk4'
  | 'female/character_femaleAdventurer_walk5'
  | 'female/character_femaleAdventurer_walk6'
  | 'female/character_femaleAdventurer_walk7'
  | 'female/character_femaleAdventurer_wide'
  | 'grassHalfLeft'
  | 'grassHalfMid'
  | 'grassHalfRight'
  | 'green_button00'
  | 'green_button01'
  | 'jar'
  | 'jar2'
  | 'joystick/base'
  | 'joystick/handle'
  | 'left'
  | 'male/character_maleAdventurer_attack0'
  | 'male/character_maleAdventurer_attack1'
  | 'male/character_maleAdventurer_attack2'
  | 'male/character_maleAdventurer_attackKick'
  | 'male/character_maleAdventurer_back'
  | 'male/character_maleAdventurer_behindBack'
  | 'male/character_maleAdventurer_cheer0'
  | 'male/character_maleAdventurer_cheer1'
  | 'male/character_maleAdventurer_climb0'
  | 'male/character_maleAdventurer_climb1'
  | 'male/character_maleAdventurer_down'
  | 'male/character_maleAdventurer_drag'
  | 'male/character_maleAdventurer_duck'
  | 'male/character_maleAdventurer_fall'
  | 'male/character_maleAdventurer_fallDown'
  | 'male/character_maleAdventurer_hang'
  | 'male/character_maleAdventurer_hit'
  | 'male/character_maleAdventurer_hold'
  | 'male/character_maleAdventurer_hurt'
  | 'male/character_maleAdventurer_idle'
  | 'male/character_maleAdventurer_interact'
  | 'male/character_maleAdventurer_jump'
  | 'male/character_maleAdventurer_kick'
  | 'male/character_maleAdventurer_rope'
  | 'male/character_maleAdventurer_run0'
  | 'male/character_maleAdventurer_run1'
  | 'male/character_maleAdventurer_run2'
  | 'male/character_maleAdventurer_shove'
  | 'male/character_maleAdventurer_shoveBack'
  | 'male/character_maleAdventurer_show'
  | 'male/character_maleAdventurer_side'
  | 'male/character_maleAdventurer_slide'
  | 'male/character_maleAdventurer_switch0'
  | 'male/character_maleAdventurer_switch1'
  | 'male/character_maleAdventurer_talk'
  | 'male/character_maleAdventurer_think'
  | 'male/character_maleAdventurer_walk0'
  | 'male/character_maleAdventurer_walk1'
  | 'male/character_maleAdventurer_walk2'
  | 'male/character_maleAdventurer_walk3'
  | 'male/character_maleAdventurer_walk4'
  | 'male/character_maleAdventurer_walk5'
  | 'male/character_maleAdventurer_walk6'
  | 'male/character_maleAdventurer_walk7'
  | 'male/character_maleAdventurer_wide'
  | 'right';

/**
 * Available font names in the asset manifest
 * @example
 * const font: AssetFonts = 'KumbhSans-Regular';
 */
export type AssetFonts = 
  | 'KumbhSans-Bold'
  | 'KumbhSans-Bold.ttf'
  | 'KumbhSans-Medium'
  | 'KumbhSans-Medium.ttf'
  | 'KumbhSans-Regular'
  | 'KumbhSans-Regular.ttf'
  | 'KumbhSans-SemiBold'
  | 'KumbhSans-SemiBold.ttf'
  | 'splash/fonts/KumbhSans-Bold'
  | 'splash/fonts/KumbhSans-Bold.ttf'
  | 'splash/fonts/KumbhSans-Medium'
  | 'splash/fonts/KumbhSans-Medium.ttf'
  | 'splash/fonts/KumbhSans-Regular'
  | 'splash/fonts/KumbhSans-Regular.ttf'
  | 'splash/fonts/KumbhSans-SemiBold'
  | 'splash/fonts/KumbhSans-SemiBold.ttf';

/**
 * Available font names in the asset manifest
 * @example
 * const font: AssetFonts = 'KumbhSans-Regular';
 */
export type AssetBitmapFonts = 
  | 'KumbhSansBlack.fnt'
  | 'required/bitmap-fonts/KumbhSansBlack.fnt';

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
export type AssetRive = never;

/**
 * Available font family names
 * @example
 * const fontFamily: AssetFontFamilies = 'KumbhSans';
 */
export type AssetFontFamilies = 
  | 'KumbhSans';

/**
 * Available font family names
 * @example
 * const fontFamily: AssetFontFamilies = 'KumbhSans';
 */
export type AssetBitmapFontFamilies = 
  | 'KumbhSansBlack.fnt'
  | 'required/bitmap-fonts/KumbhSansBlack.fnt';

/**
 * Union type of all asset names
 * @example
 * const asset: AssetAlias = 'game/wordmark';
 */
export type AssetAlias = 
  | AssetTextures 
  | AssetSpritesheets 
  | AssetTPSFrames
  | AssetFonts 
  | AssetBitmapFonts
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
  tpsFrames: Record<AssetTPSFrames, Texture>;
  fonts: Record<AssetFonts, any>;
  audio: Record<AssetAudio, HTMLAudioElement>;
  json: Record<AssetJson, any>;
  spine: Record<AssetSpine, any>;
  rive: Record<AssetRive, any>;
  fontFamilies: Record<AssetFontFamilies, any>;
  bitmapFonts: Record<AssetBitmapFonts, any>;
  bitmapFontFamilies: Record<AssetBitmapFontFamilies, any>;
}

/**
 * Helper type to get the asset type for a given alias
 * @example
 * type MyTextureType = AssetTypeOf<'game/wordmark'>; // Texture
 */
export type AssetTypeOf<T extends AssetAlias> = 
  T extends AssetTextures ? Texture :
  T extends AssetSpritesheets ? Spritesheet :
  T extends AssetTPSFrames ? Texture :
  T extends AssetFonts ? any :
  T extends AssetBitmapFonts ? any :
  T extends AssetAudio ? HTMLAudioElement :
  T extends AssetJson ? any :
  T extends AssetSpine ? any :
  T extends AssetRive ? any :
  T extends AssetFontFamilies ? any :
  T extends AssetBitmapFontFamilies ? any :
  never;
  

/**
 * Get the bundle name for a given asset
 * @example
 * type MyBundle = AssetBundleOf<'game/wordmark'>; // 'game'
 */
export type AssetBundleOf<T extends AssetAlias> = Extract<AssetBundles, T extends `${infer B}/${string}` ? B : never>;

/**
 * Add type overrides to the framework
 */
declare module 'dill-pixel' {
  interface AssetTypeOverrides {
    Texture: AssetTextures;
    TPSFrames: AssetTPSFrames; 
    SpriteSheet: AssetSpritesheets;
    SpineData: AssetSpine;
    Audio: AssetAudio;
    FontFamily: AssetFontFamilies;
    BitmapFontFamily: AssetBitmapFontFamilies;
  }
}
