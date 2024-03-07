import { TextStyleOptions } from 'pixi.js';
import { PointLike, SpriteSheetLike, TextureLike } from '../../utils/types';

export interface AbstractProps {
  [key: string]: any;
}

export interface TextureProps {
  asset: TextureLike;
  sheet: SpriteSheetLike;
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

export interface ExistingProps extends AbstractProps, PositionProps, ScaleProps, VisibilityProps {}

export interface GraphicsProps extends AbstractProps, PositionProps, ScaleProps, PivotProps, VisibilityProps {}

export interface SpriteProps extends AbstractProps, TextureProps, ScaleProps, PositionProps, VisibilityProps {
  anchor: PointLike;
}

export interface TextProps extends AbstractProps, PositionProps, ScaleProps, VisibilityProps {
  text: string;
  anchor: PointLike;
  resolution: number;
  roundPixels: boolean;
  style: Partial<TextStyleOptions>;
}

export interface ContainerProps extends AbstractProps, PositionProps, ScaleProps, PivotProps, VisibilityProps {}
