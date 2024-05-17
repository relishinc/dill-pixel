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
import { Bone } from './Bone';
import { IkConstraintData } from './IkConstraintData';
import { Skeleton } from './Skeleton';
import { Updatable } from './Updatable';
/** Stores the current pose for an IK constraint. An IK constraint adjusts the rotation of 1 or 2 constrained bones so the tip of
 * the last bone is as close to the target bone as possible.
 *
 * See [IK constraints](http://esotericsoftware.com/spine-ik-constraints) in the Spine User Guide. */
export declare class IkConstraint implements Updatable {
    /** The IK constraint's setup pose data. */
    data: IkConstraintData;
    /** The bones that will be modified by this IK constraint. */
    bones: Array<Bone>;
    /** The bone that is the IK target. */
    target: Bone;
    /** Controls the bend direction of the IK bones, either 1 or -1. */
    bendDirection: number;
    /** When true and only a single bone is being constrained, if the target is too close, the bone is scaled to reach it. */
    compress: boolean;
    /** When true, if the target is out of range, the parent bone is scaled to reach it. If more than one bone is being constrained
     * and the parent bone has local nonuniform scale, stretch is not applied. */
    stretch: boolean;
    /** A percentage (0-1) that controls the mix between the constrained and unconstrained rotations. */
    mix: number;
    /** For two bone IK, the distance from the maximum reach of the bones that rotation will slow. */
    softness: number;
    active: boolean;
    constructor(data: IkConstraintData, skeleton: Skeleton);
    isActive(): boolean;
    update(): void;
    /** Applies 1 bone IK. The target is specified in the world coordinate system. */
    apply1(bone: Bone, targetX: number, targetY: number, compress: boolean, stretch: boolean, uniform: boolean, alpha: number): void;
    /** Applies 2 bone IK. The target is specified in the world coordinate system.
     * @param child A direct descendant of the parent bone. */
    apply2(parent: Bone, child: Bone, targetX: number, targetY: number, bendDir: number, stretch: boolean, uniform: boolean, softness: number, alpha: number): void;
}
