import { TextStyleOptions } from 'pixi.js';
import { ButtonConfig } from '../../display/Button';
import { FlexContainerConfig } from '../../display/FlexContainer';
import { UICanvasProps } from '../../display/UICanvas';
import { PointLike, SpriteSheetLike, TextureLike, WithRequiredProps } from '../../utils/types';

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
export interface ExistingProps extends AbstractProps, PositionProps, ScaleProps, VisibilityProps {
}
export interface GraphicsProps extends AbstractProps, PositionProps, ScaleProps, PivotProps, VisibilityProps {
}
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
export interface OmittedTextProps extends AbstractProps, PositionProps, ScaleProps, VisibilityProps {
}
export declare const TextPropsKeys: (keyof TextProps)[];
export interface ContainerProps extends AbstractProps, PositionProps, ScaleProps, PivotProps, VisibilityProps {
}
export interface FlexContainerProps extends ContainerProps, FlexContainerConfig {
}
export interface UICanvasFactoryProps extends ContainerProps, UICanvasProps {
}
type SpineData = {
    skeleton: string;
    atlas: string;
};
export interface SpineProps extends AbstractProps, ScaleProps, PositionProps, VisibilityProps {
    data: string | SpineData;
    autoUpdate: boolean;
    animationName: string;
    trackIndex: number;
    loop: boolean;
}
interface _ButtonProps extends AbstractProps, ScaleProps, PositionProps, PivotProps, VisibilityProps, ButtonConfig {
}
export type ButtonProps = WithRequiredProps<_ButtonProps, 'textures'>;
export {};
//# sourceMappingURL=props.d.ts.map