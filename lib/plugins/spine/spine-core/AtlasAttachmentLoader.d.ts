import { AttachmentLoader, BoundingBoxAttachment, ClippingAttachment, MeshAttachment, PathAttachment, PointAttachment, RegionAttachment } from './attachments';
import { Sequence } from './attachments/Sequence';
import { Skin } from './Skin';
import { TextureAtlas } from './TextureAtlas';

/** An {@link AttachmentLoader} that configures attachments using texture regions from an {@link TextureAtlas}.
 *
 * See [Loading skeleton data](http://esotericsoftware.com/spine-loading-skeleton-data#JSON-and-binary-data) in the
 * Spine Runtimes Guide. */
export declare class AtlasAttachmentLoader implements AttachmentLoader {
    atlas: TextureAtlas;
    constructor(atlas: TextureAtlas);
    newRegionAttachment(skin: Skin, name: string, path: string, sequence: Sequence): RegionAttachment;
    newMeshAttachment(skin: Skin, name: string, path: string, sequence: Sequence): MeshAttachment;
    newBoundingBoxAttachment(skin: Skin, name: string): BoundingBoxAttachment;
    newPathAttachment(skin: Skin, name: string): PathAttachment;
    newPointAttachment(skin: Skin, name: string): PointAttachment;
    newClippingAttachment(skin: Skin, name: string): ClippingAttachment;
    loadSequence(name: string, basePath: string, sequence: Sequence): void;
}
//# sourceMappingURL=AtlasAttachmentLoader.d.ts.map