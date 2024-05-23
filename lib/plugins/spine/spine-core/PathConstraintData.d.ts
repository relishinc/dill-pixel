import { BoneData } from './BoneData';
import { ConstraintData } from './ConstraintData';
import { SlotData } from './SlotData';

/** Stores the setup pose for a {@link PathConstraint}.
 *
 * See [path constraints](http://esotericsoftware.com/spine-path-constraints) in the Spine User Guide. */
export declare class PathConstraintData extends ConstraintData {
    /** The bones that will be modified by this path constraint. */
    bones: BoneData[];
    /** The mode for positioning the first bone on the path. */
    positionMode: PositionMode;
    /** The mode for positioning the bones after the first bone on the path. */
    spacingMode: SpacingMode;
    /** The mode for adjusting the rotation of the bones. */
    rotateMode: RotateMode;
    /** An offset added to the constrained bone rotation. */
    offsetRotation: number;
    /** The position along the path. */
    position: number;
    /** The spacing between bones. */
    spacing: number;
    mixRotate: number;
    mixX: number;
    mixY: number;
    /** The slot whose path attachment will be used to constrained the bones. */
    private _target;
    constructor(name: string);
    get target(): SlotData;
    set target(slotData: SlotData);
}
/** Controls how the first bone is positioned along the path.
 *
 * See [position](http://esotericsoftware.com/spine-path-constraints#Position) in the Spine User Guide. */
export declare enum PositionMode {
    Fixed = 0,
    Percent = 1
}
/** Controls how bones after the first bone are positioned along the path.
 *
 * See [spacing](http://esotericsoftware.com/spine-path-constraints#Spacing) in the Spine User Guide. */
export declare enum SpacingMode {
    Length = 0,
    Fixed = 1,
    Percent = 2,
    Proportional = 3
}
/** Controls how bones are rotated, translated, and scaled to match the path.
 *
 * See [rotate mix](http://esotericsoftware.com/spine-path-constraints#Rotate-mix) in the Spine User Guide. */
export declare enum RotateMode {
    Tangent = 0,
    Chain = 1,
    ChainScale = 2
}
//# sourceMappingURL=PathConstraintData.d.ts.map