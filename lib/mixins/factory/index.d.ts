import { BitmapText, Container as PIXIContainer, Graphics, Sprite, Text } from 'pixi.js';
import { Button } from '../../display/Button';
import { Container } from '../../display/Container';
import { FlexContainer } from '../../display/FlexContainer';
import { ISpineAnimation } from '../../display/SpineAnimation';
import { UICanvas } from '../../display/UICanvas';
import { ButtonProps, ContainerProps, ExistingProps, FlexContainerProps, GraphicsProps, SpineProps, SpriteProps, TextProps, UICanvasFactoryProps } from './props';
import { resolveTexture } from './utils';

export declare const defaultFactoryMethods: {
    existing: <TEntity>(entity: TEntity, props?: Partial<ExistingProps>) => TEntity;
    texture: typeof resolveTexture;
    container: (props?: Partial<ContainerProps>) => Container<import('../..').Application<import('pixi.js').Renderer>>;
    sprite: (props?: Partial<SpriteProps>) => Sprite;
    graphics: (props?: Partial<GraphicsProps>) => Graphics;
    text: (props?: Partial<TextProps>) => Text;
    bitmapText: (props?: Partial<TextProps>) => BitmapText;
    button: (props?: Partial<ButtonProps>) => Button;
    flexContainer: (props?: Partial<FlexContainerProps>) => FlexContainer;
    uiCanvas: (props?: Partial<UICanvasFactoryProps>) => UICanvas;
    spine: (props?: Partial<SpineProps>) => import('../../plugins/spine/pixi-spine').Spine;
    spineAnimation: (props?: Partial<SpineProps>) => ISpineAnimation;
};
export interface IFactoryContainer<T extends typeof defaultFactoryMethods = typeof defaultFactoryMethods> extends PIXIContainer {
    add: T;
    make: T;
}
export declare function FactoryContainer<T extends typeof defaultFactoryMethods = typeof defaultFactoryMethods>(extensions?: Partial<T>): new () => IFactoryContainer<T>;
export declare class Factory {
    static get: {
        existing: <TEntity>(entity: TEntity, props?: Partial<ExistingProps> | undefined) => TEntity;
        texture: typeof resolveTexture;
        container: (props?: Partial<ContainerProps> | undefined) => Container<import('../..').Application<import('pixi.js').Renderer>>;
        sprite: (props?: Partial<SpriteProps> | undefined) => Sprite;
        graphics: (props?: Partial<GraphicsProps> | undefined) => Graphics;
        text: (props?: Partial<TextProps> | undefined) => Text;
        bitmapText: (props?: Partial<TextProps> | undefined) => BitmapText;
        button: (props?: Partial<ButtonProps> | undefined) => Button;
        flexContainer: (props?: Partial<FlexContainerProps> | undefined) => FlexContainer<import('../..').Application<import('pixi.js').Renderer>>;
        uiCanvas: (props?: Partial<UICanvasFactoryProps> | undefined) => UICanvas<import('../..').Application<import('pixi.js').Renderer>>;
        spine: (props?: Partial<SpineProps> | undefined) => import('../../plugins/spine/pixi-spine').Spine;
        spineAnimation: (props?: Partial<SpineProps> | undefined) => ISpineAnimation;
    };
}
//# sourceMappingURL=index.d.ts.map