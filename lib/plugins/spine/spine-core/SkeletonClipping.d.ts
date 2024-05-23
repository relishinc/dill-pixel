import { ClippingAttachment } from './attachments/ClippingAttachment';
import { Slot } from './Slot';
import { Color, NumberArrayLike } from './Utils';

export declare class SkeletonClipping {
    clippedVertices: number[];
    clippedTriangles: number[];
    private triangulator;
    private clippingPolygon;
    private clipOutput;
    private scratch;
    private clipAttachment;
    private clippingPolygons;
    static makeClockwise(polygon: NumberArrayLike): void;
    clipStart(slot: Slot, clip: ClippingAttachment): number;
    clipEndWithSlot(slot: Slot): void;
    clipEnd(): void;
    isClipping(): boolean;
    clipTriangles(vertices: NumberArrayLike, verticesLength: number, triangles: NumberArrayLike, trianglesLength: number, uvs: NumberArrayLike, light: Color, dark: Color, twoColor: boolean): void;
    /** Clips the input triangle against the convex, clockwise clipping area. If the triangle lies entirely within the clipping
     * area, false is returned. The clipping area must duplicate the first vertex at the end of the vertices list. */
    clip(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, clippingArea: Array<number>, output: Array<number>): boolean;
}
//# sourceMappingURL=SkeletonClipping.d.ts.map