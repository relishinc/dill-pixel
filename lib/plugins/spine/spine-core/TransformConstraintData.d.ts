import { BoneData } from './BoneData';
import { ConstraintData } from './ConstraintData';

/** Stores the setup pose for a {@link TransformConstraint}.
 *
 * See [Transform constraints](http://esotericsoftware.com/spine-transform-constraints) in the Spine User Guide. */
export declare class TransformConstraintData extends ConstraintData {
    /** The bones that will be modified by this transform constraint. */
    bones: BoneData[];
    mixRotate: number;
    mixX: number;
    mixY: number;
    mixScaleX: number;
    mixScaleY: number;
    mixShearY: number;
    /** An offset added to the constrained bone rotation. */
    offsetRotation: number;
    /** An offset added to the constrained bone X translation. */
    offsetX: number;
    /** An offset added to the constrained bone Y translation. */
    offsetY: number;
    /** An offset added to the constrained bone scaleX. */
    offsetScaleX: number;
    /** An offset added to the constrained bone scaleY. */
    offsetScaleY: number;
    /** An offset added to the constrained bone shearY. */
    offsetShearY: number;
    relative: boolean;
    local: boolean;
    /** The target bone whose world transform will be copied to the constrained bones. */
    private _target;
    constructor(name: string);
    get target(): BoneData;
    set target(boneData: BoneData);
}
//# sourceMappingURL=TransformConstraintData.d.ts.map