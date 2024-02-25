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

export interface GraphicsProps extends AbstractProps, PositionProps, PivotProps, VisibilityProps {}

export interface SpriteProps extends AbstractProps, TextureProps, PositionProps, VisibilityProps {
  anchor: PointLike;
}

export interface ContainerProps extends AbstractProps, PositionProps, PivotProps, VisibilityProps {}
