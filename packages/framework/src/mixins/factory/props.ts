import type { LayoutOptions } from '@pixi/layout';
import { GraphicsContext, HTMLTextStyleOptions, TextStyleOptions } from 'pixi.js';
import { ContainerConfig } from '../../display';
import { ParticleContainerConfig } from '../../display/ParticleContainer';
import { ButtonConfig, FlexContainerConfig, UICanvasProps } from '../../ui';
import type {
  BitmapFontFamilyAsset,
  FontFamilyAsset,
  PointLike,
  SpineAsset,
  SpritesheetAsset,
  TextureAsset,
  WithRequiredProps,
} from '../../utils';

export interface AbstractProps {
  [key: string]: any;
}

export interface TextureProps {
  asset: TextureAsset;
  sheet: SpritesheetAsset;
}

export interface PositionProps {
  x: number;
  y: number;
  position: PointLike;
}

export interface ScaleProps {
  scaleX: number;
  scaleY: number;
  scale: PointLike;
}

export interface PivotProps {
  pivot: PointLike;
}

export interface VisibilityProps {
  alpha: number;
  visible: boolean;
}

export interface LayoutProps {
  layout?: Omit<LayoutOptions, 'target'> | null | boolean;
}

export interface ExistingProps extends AbstractProps, PositionProps, ScaleProps, VisibilityProps, LayoutProps {}

export interface GraphicsProps extends AbstractProps, PositionProps, ScaleProps, PivotProps, VisibilityProps {}

export interface SvgProps extends GraphicsProps {
  ctx: string | GraphicsContext;
}

export interface SpriteProps
  extends AbstractProps,
    TextureProps,
    ScaleProps,
    PositionProps,
    VisibilityProps,
    LayoutProps {
  anchor: PointLike;
}

export interface TilingSpriteProps extends SpriteProps {
  tilePosition?: PointLike;
  /**
   * Scaling of the image that is being tiled.
   * @default {x: 1, y: 1}
   */
  tileScale?: PointLike;
  /**
   * The rotation of the image that is being tiled.
   * @default 0
   */
  tileRotation?: number;
  /**
   * The texture to use for the sprite.
   * @default Texture.WHITE
   */
  /**
   * The width of the tiling sprite. #
   * @default 256
   */
  width?: number;
  /**
   * The height of the tiling sprite.
   * @default 256
   */
  height?: number;
  /**
   * @default false
   */
  applyAnchorToTexture?: boolean;
  /** Whether or not to round the x/y position. */
  roundPixels?: boolean;
}

export interface AnimatedSpriteAnimationProps
  extends AbstractProps,
    ScaleProps,
    PositionProps,
    VisibilityProps,
    LayoutProps {
  texturePrefix: string;
  sheet: SpritesheetAsset;
  startIndex: number;
  numFrames: number;
  zeroPad: number;
  autoUpdate: boolean;
  updateAnchor: boolean;
  loop: boolean;
  animationSpeed: number;
}

export interface AnimatedSpriteProps extends AbstractProps, ScaleProps, PositionProps, VisibilityProps, LayoutProps {
  sheet: SpritesheetAsset;
  texturePrefix: string;
  zeroPad: number;
  animations: { [animationName: string]: Partial<AnimatedSpriteAnimationProps> };
  autoPlay: boolean;
  autoUpdate: boolean;
  defaultAnimation: string;
  reversible: boolean;
  animationSpeed: number;
  startIndex: number;
}

export type TextStyle = Partial<Omit<TextStyleOptions, 'fontFamily'> & { fontFamily: FontFamilyAsset }>;

export interface TextProps extends AbstractProps, PositionProps, ScaleProps, VisibilityProps, LayoutProps {
  text: string;
  anchor: PointLike;
  resolution: number;
  roundPixels: boolean;
  style: TextStyle;
}

export interface BitmapTextProps extends AbstractProps, PositionProps, ScaleProps, VisibilityProps, LayoutProps {
  text: string;
  anchor: PointLike;
  resolution: number;
  roundPixels: boolean;
  style: Partial<Omit<TextStyleOptions, 'fontFamily'> & { fontFamily: BitmapFontFamilyAsset }>;
}

export interface HTMLTextProps extends AbstractProps, PositionProps, ScaleProps, VisibilityProps, LayoutProps {
  text: string;
  anchor: PointLike;
  resolution: number;
  roundPixels: boolean;
  style: Partial<Omit<HTMLTextStyleOptions, 'fontFamily'> & { fontFamily: FontFamilyAsset }>;
}

export interface OmittedTextProps extends AbstractProps, PositionProps, ScaleProps, VisibilityProps {}

export const TextPropsKeys: (keyof TextProps)[] = ['text', 'anchor', 'roundPixels', 'style', 'pivot'];

export interface ContainerProps
  extends AbstractProps,
    PositionProps,
    ScaleProps,
    PivotProps,
    VisibilityProps,
    LayoutProps,
    ContainerConfig {}

export interface ParticleContainerProps extends AbstractProps, ParticleContainerConfig {}

export interface FlexContainerProps extends ContainerProps, FlexContainerConfig {}

export interface UICanvasFactoryProps extends ContainerProps, UICanvasProps {}

// spine
export interface SpineProps extends AbstractProps, ScaleProps, PositionProps, VisibilityProps, LayoutProps {
  data: SpineAsset;
  autoUpdate: boolean;
  animationName: string;
  trackIndex: number;
  loop: boolean;
  paused: boolean;
}

interface _ButtonProps
  extends AbstractProps,
    ScaleProps,
    PositionProps,
    PivotProps,
    VisibilityProps,
    ButtonConfig,
    LayoutProps {}

export type ButtonProps = WithRequiredProps<_ButtonProps, 'textures'>;
