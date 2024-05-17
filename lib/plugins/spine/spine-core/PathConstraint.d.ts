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
import { PathAttachment } from './attachments/PathAttachment';
import { Bone } from './Bone';
import { PathConstraintData } from './PathConstraintData';
import { Skeleton } from './Skeleton';
import { Slot } from './Slot';
import { Updatable } from './Updatable';
/** Stores the current pose for a path constraint. A path constraint adjusts the rotation, translation, and scale of the
 * constrained bones so they follow a {@link PathAttachment}.
 *
 * See [Path constraints](http://esotericsoftware.com/spine-path-constraints) in the Spine User Guide. */
export declare class PathConstraint implements Updatable {
    static NONE: number;
    static BEFORE: number;
    static AFTER: number;
    static epsilon: number;
    /** The path constraint's setup pose data. */
    data: PathConstraintData;
    /** The bones that will be modified by this path constraint. */
    bones: Array<Bone>;
    /** The slot whose path attachment will be used to constrained the bones. */
    target: Slot;
    /** The position along the path. */
    position: number;
    /** The spacing between bones. */
    spacing: number;
    mixRotate: number;
    mixX: number;
    mixY: number;
    spaces: number[];
    positions: number[];
    world: number[];
    curves: number[];
    lengths: number[];
    segments: number[];
    active: boolean;
    constructor(data: PathConstraintData, skeleton: Skeleton);
    isActive(): boolean;
    update(): void;
    computeWorldPositions(path: PathAttachment, spacesCount: number, tangents: boolean): number[];
    addBeforePosition(p: number, temp: Array<number>, i: number, out: Array<number>, o: number): void;
    addAfterPosition(p: number, temp: Array<number>, i: number, out: Array<number>, o: number): void;
    addCurvePosition(p: number, x1: number, y1: number, cx1: number, cy1: number, cx2: number, cy2: number, x2: number, y2: number, out: Array<number>, o: number, tangents: boolean): void;
}
