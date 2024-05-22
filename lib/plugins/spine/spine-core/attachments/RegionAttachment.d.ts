import { Slot } from '../Slot';
import { TextureRegion } from '../Texture';
import { Color, NumberArrayLike } from '../Utils';
import { Attachment } from './Attachment';
import { HasTextureRegion } from './HasTextureRegion';
import { Sequence } from './Sequence';

/** An attachment that displays a textured quadrilateral.
 *
 * See [Region attachments](http://esotericsoftware.com/spine-regions) in the Spine User Guide. */
export declare class RegionAttachment extends Attachment implements HasTextureRegion {
    /** The color to tint the region attachment. */
    color: Color;
    /** The name of the texture region for this attachment. */
    path: string;
    region: TextureRegion | null;
    sequence: Sequence | null;
    /** The local x translation. */
    x: number;
    /** The local y translation. */
    y: number;
    /** The local scaleX. */
    scaleX: number;
    /** The local scaleY. */
    scaleY: number;
    /** The local rotation. */
    rotation: number;
    /** The width of the region attachment in Spine. */
    width: number;
    /** The height of the region attachment in Spine. */
    height: number;
    /** For each of the 4 vertices, a pair of <code>x,y</code> values that is the local position of the vertex.
     *
     * See {@link #updateOffset()}. */
    offset: NumberArrayLike;
    uvs: NumberArrayLike;
    tempColor: Color;
    static X1: number;
    static Y1: number;
    static C1R: number;
    static C1G: number;
    static C1B: number;
    static C1A: number;
    static U1: number;
    static V1: number;
    static X2: number;
    static Y2: number;
    static C2R: number;
    static C2G: number;
    static C2B: number;
    static C2A: number;
    static U2: number;
    static V2: number;
    static X3: number;
    static Y3: number;
    static C3R: number;
    static C3G: number;
    static C3B: number;
    static C3A: number;
    static U3: number;
    static V3: number;
    static X4: number;
    static Y4: number;
    static C4R: number;
    static C4G: number;
    static C4B: number;
    static C4A: number;
    static U4: number;
    static V4: number;
    constructor(name: string, path: string);
    /** Calculates the {@link #offset} using the region settings. Must be called after changing region settings. */
    updateRegion(): void;
    copy(): Attachment;
    /** Transforms the attachment's four vertices to world coordinates. If the attachment has a {@link #sequence}, the region may
     * be changed.
     * <p>
     * See <a href="http://esotericsoftware.com/spine-runtime-skeletons#World-transforms">World transforms</a> in the Spine
     * Runtimes Guide.
     * @param worldVertices The output world vertices. Must have a length >= <code>offset</code> + 8.
     * @param offset The <code>worldVertices</code> index to begin writing values.
     * @param stride The number of <code>worldVertices</code> entries between the value pairs written. */
    computeWorldVertices(slot: Slot, worldVertices: NumberArrayLike, offset: number, stride: number): void;
}
//# sourceMappingURL=RegionAttachment.d.ts.map