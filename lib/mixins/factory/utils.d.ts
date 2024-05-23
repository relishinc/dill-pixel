import { Texture } from 'pixi.js';
import { PointLike } from '../../utils/types';
import { PositionProps, ScaleProps, TextureProps } from './props';

export declare function resolveUnknownKeys(props: any, entity: any): void;
export declare function resolveTexture(props?: Partial<TextureProps>): Texture;
export declare function resolvePosition(props: Partial<PositionProps>, entity: any): void;
export declare function resolveScale(props: Partial<ScaleProps>, entity: any): void;
export declare function resolveAnchor(anchor: PointLike | undefined, entity: any): void;
export declare function resolvePivot(pivot: PointLike | undefined, entity: any): void;
//# sourceMappingURL=utils.d.ts.map