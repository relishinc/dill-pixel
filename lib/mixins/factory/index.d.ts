import { Container as PIXIContainer, Graphics, Sprite, Text } from 'pixi.js';
import { Button } from '../../display/Button';
import { Container } from '../../display/Container';
import { FlexContainer } from '../../display/FlexContainer';
import { UICanvas } from '../../display/UICanvas';
import { ButtonProps, ContainerProps, ExistingProps, FlexContainerProps, GraphicsProps, SpineProps, SpriteProps, TextProps, UICanvasFactoryProps } from './props';
import { resolveTexture } from './utils';
export declare const defaultFactoryMethods: {
    existing: <TEntity>(entity: TEntity, props?: Partial<ExistingProps>) => TEntity;
    texture: typeof resolveTexture;
    container: (props?: Partial<ContainerProps>) => Container<import("../..").Application<import("pixi.js").Renderer>>;
    sprite: (props?: Partial<SpriteProps>) => Sprite;
    graphics: (props?: Partial<GraphicsProps>) => Graphics;
    text: (props?: Partial<TextProps>) => Text;
    button: (props?: Partial<ButtonProps>) => Button;
    flexContainer: (props?: Partial<FlexContainerProps>) => FlexContainer;
    uiCanvas: (props?: Partial<UICanvasFactoryProps>) => UICanvas;
    spine: (props?: Partial<SpineProps>) => import('@pixi/spine-pixi').Spine;
};
export interface IFactoryContainer<T extends typeof defaultFactoryMethods = typeof defaultFactoryMethods> extends PIXIContainer {
    add: T;
    make: T;
}
export declare function FactoryContainer<T extends typeof defaultFactoryMethods = typeof defaultFactoryMethods>(extensions?: Partial<T>): new () => IFactoryContainer<T>;
//# sourceMappingURL=index.d.ts.map