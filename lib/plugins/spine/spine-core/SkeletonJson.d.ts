import { Attachment, VertexAttachment } from './attachments/Attachment';
import { AttachmentLoader } from './attachments/AttachmentLoader';
import { Sequence } from './attachments/Sequence';
import { SkeletonData } from './SkeletonData';
import { Skin } from './Skin';

/** Loads skeleton data in the Spine JSON format.
 *
 * See [Spine JSON format](http://esotericsoftware.com/spine-json-format) and
 * [JSON and binary data](http://esotericsoftware.com/spine-loading-skeleton-data#JSON-and-binary-data) in the Spine
 * Runtimes Guide. */
export declare class SkeletonJson {
    attachmentLoader: AttachmentLoader;
    /** Scales bone positions, image sizes, and translations as they are loaded. This allows different size images to be used at
     * runtime than were used in Spine.
     *
     * See [Scaling](http://esotericsoftware.com/spine-loading-skeleton-data#Scaling) in the Spine Runtimes Guide. */
    scale: number;
    private linkedMeshes;
    constructor(attachmentLoader: AttachmentLoader);
    readSkeletonData(json: string | any): SkeletonData;
    readAttachment(map: any, skin: Skin, slotIndex: number, name: string, skeletonData: SkeletonData): Attachment | null;
    readSequence(map: any): Sequence | null;
    readVertices(map: any, attachment: VertexAttachment, verticesLength: number): void;
    readAnimation(map: any, name: string, skeletonData: SkeletonData): void;
}
//# sourceMappingURL=SkeletonJson.d.ts.map