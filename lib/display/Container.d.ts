import { DestroyOptions, Ticker } from 'pixi.js';
import { SignalConnection, SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { Size } from '../utils';
declare const _Container: {
    new (...args: any[]): {
        [x: string]: any;
        onAnimationStart: import("../signals/Signal").Signal<(entity: gsap.core.Tween | gsap.core.Timeline) => void>;
        onAnimationUpdate: import("../signals/Signal").Signal<(entity: gsap.core.Tween | gsap.core.Timeline) => void>;
        onAnimationComplete: import("../signals/Signal").Signal<(entity: gsap.core.Tween | gsap.core.Timeline) => void>;
        _activeTweens: gsap.core.Tween[];
        _activeTimeline?: gsap.core.Timeline | undefined;
        animate(animationProps: import("../mixins/animated").GSAPAnimationConfigExtended, instance?: any): gsap.core.Tween;
        animateSequence(sequences: import("../mixins/animated").GSAPAnimationConfigExtended[], instance?: any): gsap.core.Timeline;
        playAnimation(): void;
        pauseAnimation(): void;
        resumeAnimation(): void;
        reverseAnimation(): void;
        restartAnimation(): void;
        clearAnimations(): void;
        _onAnimationStart(animationEntity: (gsap.core.Tween | gsap.core.Timeline) | undefined): void;
        _onAnimationUpdate(animationEntity: (gsap.core.Tween | gsap.core.Timeline) | undefined): void;
        _onAnimationComplete(animationEntity: (gsap.core.Tween | gsap.core.Timeline) | undefined): void;
    };
} & (new () => import("../mixins/factory").IExtendedContainer<{
    texture: (props: Partial<import("../mixins/factory").TextureProps>) => import("pixi.js").Texture;
    container: (props?: Partial<import("../mixins/factory").ContainerProps> | undefined) => Container<Application<import("pixi.js").Renderer>>;
    sprite: (props?: Partial<import("../mixins/factory").SpriteProps> | undefined) => import("pixi.js").Sprite;
    graphics: (props?: Partial<import("../mixins/factory").GraphicsProps> | undefined) => import("pixi.js").Graphics;
}>);
export interface IContainer {
    app: Application;
    destroy(options?: DestroyOptions): void;
    initialize(): Promise<void> | void;
    addSignalConnection(...args: SignalConnection[]): void;
    onResize(size: Size): void;
    update(ticker: Ticker): void;
}
export declare class Container<T extends Application = Application> extends _Container implements IContainer {
    protected _signalConnections: SignalConnections;
    constructor(autoResize?: boolean, autoUpdate?: boolean, priority?: number);
    get app(): T;
    destroy(options?: DestroyOptions): void;
    initialize(): void;
    addSignalConnection(...args: SignalConnection[]): void;
    onResize(size: Size): void;
    update(ticker: Ticker): void;
}
export {};
//# sourceMappingURL=Container.d.ts.map