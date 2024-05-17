/******************************************************************************
 * Spine Runtimes License Agreement
 * Last updated July 28, 2023. Replaces all prior versions.
 *
 * Copyright (c) 2013-2023, Esoteric Software LLC
 *
 * Integration of the Spine Runtimes into software or otherwise creating
 * derivative works of the Spine Runtimes is permitted under the terms and
 * conditions of Section 2 of the Spine Editor License Agreement:
 * http://esotericsoftware.com/spine-editor-license
 *
 * Otherwise, it is permitted to integrate the Spine Runtimes into software or
 * otherwise create derivative works of the Spine Runtimes (collectively,
 * "Products"), provided that each user of the Products must obtain their own
 * Spine Editor license and redistribution of the Products in any form must
 * include this license and copyright notice.
 *
 * THE SPINE RUNTIMES ARE PROVIDED BY ESOTERIC SOFTWARE LLC "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ESOTERIC SOFTWARE LLC BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES,
 * BUSINESS INTERRUPTION, OR LOSS OF USE, DATA, OR PROFITS) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE
 * SPINE RUNTIMES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *****************************************************************************/
import { Attachment } from './attachments/Attachment';
import { BoneData } from './BoneData';
import { ConstraintData } from './ConstraintData';
import { Skeleton } from './Skeleton';
import { StringMap } from './Utils';
/** Stores an entry in the skin consisting of the slot index, name, and attachment **/
export declare class SkinEntry {
    slotIndex: number;
    name: string;
    attachment: Attachment;
    constructor(slotIndex: number, name: string, attachment: Attachment);
}
/** Stores attachments by slot index and attachment name.
 *
 * See SkeletonData {@link SkeletonData#defaultSkin}, Skeleton {@link Skeleton#skin}, and
 * [Runtime skins](http://esotericsoftware.com/spine-runtime-skins) in the Spine Runtimes Guide. */
export declare class Skin {
    /** The skin's name, which is unique across all skins in the skeleton. */
    name: string;
    attachments: StringMap<Attachment>[];
    bones: BoneData[];
    constraints: ConstraintData[];
    constructor(name: string);
    /** Adds an attachment to the skin for the specified slot index and name. */
    setAttachment(slotIndex: number, name: string, attachment: Attachment): void;
    /** Adds all attachments, bones, and constraints from the specified skin to this skin. */
    addSkin(skin: Skin): void;
    /** Adds all bones and constraints and copies of all attachments from the specified skin to this skin. Mesh attachments are not
     * copied, instead a new linked mesh is created. The attachment copies can be modified without affecting the originals. */
    copySkin(skin: Skin): void;
    /** Returns the attachment for the specified slot index and name, or null. */
    getAttachment(slotIndex: number, name: string): Attachment | null;
    /** Removes the attachment in the skin for the specified slot index and name, if any. */
    removeAttachment(slotIndex: number, name: string): void;
    /** Returns all attachments in this skin. */
    getAttachments(): Array<SkinEntry>;
    /** Returns all attachments in this skin for the specified slot index. */
    getAttachmentsForSlot(slotIndex: number, attachments: Array<SkinEntry>): void;
    /** Clears all attachments, bones, and constraints. */
    clear(): void;
    /** Attach each attachment in this skin if the corresponding attachment in the old skin is currently attached. */
    attachAll(skeleton: Skeleton, oldSkin: Skin): void;
}
