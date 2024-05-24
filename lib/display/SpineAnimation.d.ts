import { SpineProps } from '../mixins/factory/props';
import { Spine } from '../utils';

declare const _SpineAnimation: (new () => import('../mixins/factory').IFactoryContainer<{
    existing: <TEntity>(entity: TEntity, props?: Partial<import('../mixins/factory/props').ExistingProps> | undefined) => TEntity;
    texture: typeof import('../mixins/factory/utils').resolveTexture;
    container: (props?: Partial<import('../mixins/factory/props').ContainerProps> | undefined) => import('./Container').Container<import('..').Application<import('pixi.js').Renderer>>;
    sprite: (props?: Partial<import('../mixins/factory/props').SpriteProps> | undefined) => import('pixi.js').Sprite;
    graphics: (props?: Partial<import('../mixins/factory/props').GraphicsProps> | undefined) => import('pixi.js').Graphics;
    text: (props?: Partial<import('../mixins/factory/props').TextProps> | undefined) => import('pixi.js').Text;
    bitmapText: (props?: Partial<import('../mixins/factory/props').TextProps> | undefined) => import('pixi.js').BitmapText;
    button: (props?: Partial<import('../mixins/factory/props').ButtonProps> | undefined) => import('./Button').Button;
    flexContainer: (props?: Partial<import('../mixins/factory/props').FlexContainerProps> | undefined) => import('./FlexContainer').FlexContainer<import('..').Application<import('pixi.js').Renderer>>;
    uiCanvas: (props?: Partial<import('../mixins/factory/props').UICanvasFactoryProps> | undefined) => import('./UICanvas').UICanvas<import('..').Application<import('pixi.js').Renderer>>;
    spine: (props?: Partial<SpineProps> | undefined) => Spine;
    spineAnimation: (props?: Partial<SpineProps> | undefined) => ISpineAnimation;
}>) & import('../utils').Constructor<import('../mixins').ISignalContainer>;
export interface ISpineAnimation extends InstanceType<typeof _SpineAnimation> {
    spine: Spine;
    animationNames: string[];
    setAnimation(name: string, loop?: boolean, tracklndex?: number): void;
    getCurrentAnimation(tracklndex?: number): string;
}
export declare class SpineAnimation extends _SpineAnimation {
    spine: Spine;
    constructor(props?: Partial<SpineProps>);
    get animationNames(): string[];
    getCurrentAnimation(trackIndex?: number): string;
    setAnimation(name: string, loop?: boolean, tracklndex?: number): void;
}
export {};
//# sourceMappingURL=SpineAnimation.d.ts.map