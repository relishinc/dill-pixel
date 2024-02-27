import { TextStyleOptions } from 'pixi.js';
import { PointLike, SpriteSheetLike, TextureLike } from '../../utils';

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

export interface PivotProps {
  pivot: PointLike;
}

export interface VisibilityProps {
  alpha: number;
  visible: boolean;
}

export interface ExistingProps extends AbstractProps, PositionProps, VisibilityProps {}

export interface GraphicsProps extends AbstractProps, PositionProps, PivotProps, VisibilityProps {}

export interface SpriteProps extends AbstractProps, TextureProps, PositionProps, VisibilityProps {
  anchor: PointLike;
}

export interface TextProps extends AbstractProps, PositionProps, VisibilityProps {
  text: string;
  anchor: PointLike;
  resolution: number;
  roundPixels: boolean;
  style: Partial<TextStyleOptions>;
}

export interface ContainerProps extends AbstractProps, PositionProps, PivotProps, VisibilityProps {}
