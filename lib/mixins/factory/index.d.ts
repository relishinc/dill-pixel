import { Container as PIXIContainer, Graphics, Sprite, Texture } from 'pixi.js';
import { Container } from '../../display';
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
export interface GraphicsProps extends AbstractProps, PositionProps, PivotProps, VisibilityProps {
}
export interface SpriteProps extends AbstractProps, TextureProps, PositionProps, VisibilityProps {
    anchor: PointLike;
}
export interface ContainerProps extends AbstractProps, PositionProps, PivotProps, VisibilityProps {
}
export interface IFactoryMethods {
    texture: (props: Partial<TextureProps>) => Texture;
    container: (props?: Partial<ContainerProps>) => Container;
    sprite: (props?: Partial<SpriteProps>) => Sprite;
    graphics: (props?: Partial<GraphicsProps>) => Graphics;
}
export declare const defaultFactoryMethods: IFactoryMethods;
export interface IExtendedContainer<T extends IFactoryMethods = IFactoryMethods> extends PIXIContainer {
    add: T;
    make: T;
}
export { Factory } from './mixin';
//# sourceMappingURL=index.d.ts.map