import { SpineProps } from '../mixins/factory/props';
import type { Spine } from '../plugins/spine/pixi-spine';
declare const _SpineAnimation: (new () => import("../mixins/factory").IFactoryContainer<{
    existing: <TEntity>(entity: TEntity, props?: Partial<import("../mixins/factory/props").ExistingProps> | undefined) => TEntity;
    texture: typeof import("src/mixins/factory/utils").resolveTexture;
    container: (props?: Partial<import("../mixins/factory/props").ContainerProps> | undefined) => import("src").Container<import("src").Application<import("pixi.js").Renderer>>;
    sprite: (props?: Partial<import("../mixins/factory/props").SpriteProps> | undefined) => import("pixi.js").Sprite;
    graphics: (props?: Partial<import("../mixins/factory/props").GraphicsProps> | undefined) => import("pixi.js").Graphics;
    text: (props?: Partial<import("../mixins/factory/props").TextProps> | undefined) => import("pixi.js").Text;
    bitmapText: (props?: Partial<import("../mixins/factory/props").TextProps> | undefined) => import("pixi.js").BitmapText;
    button: (props?: Partial<import("../mixins/factory/props").ButtonProps> | undefined) => import("src").Button;
    flexContainer: (props?: Partial<import("../mixins/factory/props").FlexContainerProps> | undefined) => import("src").FlexContainer<import("src").Application<import("pixi.js").Renderer>>;
    uiCanvas: (props?: Partial<import("../mixins/factory/props").UICanvasFactoryProps> | undefined) => import("src").UICanvas<import("src").Application<import("pixi.js").Renderer>>;
    spine: (props?: Partial<SpineProps> | undefined) => Spine;
    spineAnimation: (props?: Partial<SpineProps> | undefined) => ISpineAnimation;
}>) & import("src").Constructor<import("../mixins/signals").ISignalContainer>;
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
