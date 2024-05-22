import { Attachment, VertexAttachment } from './attachments/Attachment';
import { HasTextureRegion } from './attachments/HasTextureRegion';
import { SequenceMode } from './attachments/Sequence';
import { Event } from './Event';
import { Skeleton } from './Skeleton';
import { Slot } from './Slot';
import { NumberArrayLike, StringSet } from './Utils';

/** A simple container for a list of timelines and a name. */
export declare class Animation {
    /** The animation's name, which is unique across all animations in the skeleton. */
    name: string;
    timelines: Array<Timeline>;
    timelineIds: StringSet;
    /** The duration of the animation in seconds, which is the highest time of all keys in the timeline. */
    duration: number;
    constructor(name: string, timelines: Array<Timeline>, duration: number);
    setTimelines(timelines: Array<Timeline>): void;
    hasTimeline(ids: string[]): boolean;
    /** Applies all the animation's timelines to the specified skeleton.
     *
     * See Timeline {@link Timeline#apply(Skeleton, float, float, Array, float, MixBlend, MixDirection)}.
     * @param loop If true, the animation repeats after {@link #getDuration()}.
     * @param events May be null to ignore fired events. */
    apply(skeleton: Skeleton, lastTime: number, time: number, loop: boolean, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
}
/** Controls how a timeline value is mixed with the setup pose value or current pose value when a timeline's `alpha`
 * < 1.
 *
 * See Timeline {@link Timeline#apply(Skeleton, float, float, Array, float, MixBlend, MixDirection)}. */
export declare enum MixBlend {
    /** Transitions from the setup value to the timeline value (the current value is not used). Before the first key, the setup
     * value is set. */
    setup = 0,
    /** Transitions from the current value to the timeline value. Before the first key, transitions from the current value to
     * the setup value. Timelines which perform instant transitions, such as {@link DrawOrderTimeline} or
     * {@link AttachmentTimeline}, use the setup value before the first key.
     *
     * `first` is intended for the first animations applied, not for animations layered on top of those. */
    first = 1,
    /** Transitions from the current value to the timeline value. No change is made before the first key (the current value is
     * kept until the first key).
     *
     * `replace` is intended for animations layered on top of others, not for the first animations applied. */
    replace = 2,
    /** Transitions from the current value to the current value plus the timeline value. No change is made before the first key
     * (the current value is kept until the first key).
     *
     * `add` is intended for animations layered on top of others, not for the first animations applied. Properties
     * keyed by additive animations must be set manually or by another animation before applying the additive animations, else
     * the property values will increase continually. */
    add = 3
}
/** Indicates whether a timeline's `alpha` is mixing out over time toward 0 (the setup or current pose value) or
 * mixing in toward 1 (the timeline's value).
 *
 * See Timeline {@link Timeline#apply(Skeleton, float, float, Array, float, MixBlend, MixDirection)}. */
export declare enum MixDirection {
    mixIn = 0,
    mixOut = 1
}
/** The interface for all timelines. */
export declare abstract class Timeline {
    propertyIds: string[];
    frames: NumberArrayLike;
    static search1(frames: NumberArrayLike, time: number): number;
    static search(frames: NumberArrayLike, time: number, step: number): number;
    constructor(frameCount: number, propertyIds: string[]);
    getPropertyIds(): string[];
    getFrameEntries(): number;
    getFrameCount(): number;
    getDuration(): number;
    abstract apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event> | null, alpha: number, blend: MixBlend, direction: MixDirection): void;
}
export interface BoneTimeline {
    /** The index of the bone in {@link Skeleton#bones} that will be changed. */
    boneIndex: number;
}
export interface SlotTimeline {
    /** The index of the slot in {@link Skeleton#slots} that will be changed. */
    slotIndex: number;
}
/** The base class for timelines that use interpolation between key frame values. */
export declare abstract class CurveTimeline extends Timeline {
    protected curves: NumberArrayLike;
    constructor(frameCount: number, bezierCount: number, propertyIds: string[]);
    /** Sets the specified key frame to linear interpolation. */
    setLinear(frame: number): void;
    /** Sets the specified key frame to stepped interpolation. */
    setStepped(frame: number): void;
    /** Shrinks the storage for Bezier curves, for use when <code>bezierCount</code> (specified in the constructor) was larger
     * than the actual number of Bezier curves. */
    shrink(bezierCount: number): void;
    /** Stores the segments for the specified Bezier curve. For timelines that modify multiple values, there may be more than
     * one curve per frame.
     * @param bezier The ordinal of this Bezier curve for this timeline, between 0 and <code>bezierCount - 1</code> (specified
     *           in the constructor), inclusive.
     * @param frame Between 0 and <code>frameCount - 1</code>, inclusive.
     * @param value The index of the value for this frame that this curve is used for.
     * @param time1 The time for the first key.
     * @param value1 The value for the first key.
     * @param cx1 The time for the first Bezier handle.
     * @param cy1 The value for the first Bezier handle.
     * @param cx2 The time of the second Bezier handle.
     * @param cy2 The value for the second Bezier handle.
     * @param time2 The time for the second key.
     * @param value2 The value for the second key. */
    setBezier(bezier: number, frame: number, value: number, time1: number, value1: number, cx1: number, cy1: number, cx2: number, cy2: number, time2: number, value2: number): void;
    /** Returns the Bezier interpolated value for the specified time.
     * @param frameIndex The index into {@link #getFrames()} for the values of the frame before <code>time</code>.
     * @param valueOffset The offset from <code>frameIndex</code> to the value this curve is used for.
     * @param i The index of the Bezier segments. See {@link #getCurveType(int)}. */
    getBezierValue(time: number, frameIndex: number, valueOffset: number, i: number): number;
}
export declare abstract class CurveTimeline1 extends CurveTimeline {
    constructor(frameCount: number, bezierCount: number, propertyId: string);
    getFrameEntries(): number;
    /** Sets the time and value for the specified frame.
     * @param frame Between 0 and <code>frameCount</code>, inclusive.
     * @param time The frame time in seconds. */
    setFrame(frame: number, time: number, value: number): void;
    /** Returns the interpolated value for the specified time. */
    getCurveValue(time: number): number;
}
/** The base class for a {@link CurveTimeline} which sets two properties. */
export declare abstract class CurveTimeline2 extends CurveTimeline {
    /** @param bezierCount The maximum number of Bezier curves. See {@link #shrink(int)}.
     * @param propertyIds Unique identifiers for the properties the timeline modifies. */
    constructor(frameCount: number, bezierCount: number, propertyId1: string, propertyId2: string);
    getFrameEntries(): number;
    /** Sets the time and values for the specified frame.
     * @param frame Between 0 and <code>frameCount</code>, inclusive.
     * @param time The frame time in seconds. */
    setFrame(frame: number, time: number, value1: number, value2: number): void;
}
/** Changes a bone's local {@link Bone#rotation}. */
export declare class RotateTimeline extends CurveTimeline1 implements BoneTimeline {
    boneIndex: number;
    constructor(frameCount: number, bezierCount: number, boneIndex: number);
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event> | null, alpha: number, blend: MixBlend, direction: MixDirection): void;
}
/** Changes a bone's local {@link Bone#x} and {@link Bone#y}. */
export declare class TranslateTimeline extends CurveTimeline2 implements BoneTimeline {
    boneIndex: number;
    constructor(frameCount: number, bezierCount: number, boneIndex: number);
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
}
/** Changes a bone's local {@link Bone#x}. */
export declare class TranslateXTimeline extends CurveTimeline1 implements BoneTimeline {
    boneIndex: number;
    constructor(frameCount: number, bezierCount: number, boneIndex: number);
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
}
/** Changes a bone's local {@link Bone#x}. */
export declare class TranslateYTimeline extends CurveTimeline1 implements BoneTimeline {
    boneIndex: number;
    constructor(frameCount: number, bezierCount: number, boneIndex: number);
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
}
/** Changes a bone's local {@link Bone#scaleX)} and {@link Bone#scaleY}. */
export declare class ScaleTimeline extends CurveTimeline2 implements BoneTimeline {
    boneIndex: number;
    constructor(frameCount: number, bezierCount: number, boneIndex: number);
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
}
/** Changes a bone's local {@link Bone#scaleX)} and {@link Bone#scaleY}. */
export declare class ScaleXTimeline extends CurveTimeline1 implements BoneTimeline {
    boneIndex: number;
    constructor(frameCount: number, bezierCount: number, boneIndex: number);
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
}
/** Changes a bone's local {@link Bone#scaleX)} and {@link Bone#scaleY}. */
export declare class ScaleYTimeline extends CurveTimeline1 implements BoneTimeline {
    boneIndex: number;
    constructor(frameCount: number, bezierCount: number, boneIndex: number);
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
}
/** Changes a bone's local {@link Bone#shearX} and {@link Bone#shearY}. */
export declare class ShearTimeline extends CurveTimeline2 implements BoneTimeline {
    boneIndex: number;
    constructor(frameCount: number, bezierCount: number, boneIndex: number);
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
}
/** Changes a bone's local {@link Bone#shearX} and {@link Bone#shearY}. */
export declare class ShearXTimeline extends CurveTimeline1 implements BoneTimeline {
    boneIndex: number;
    constructor(frameCount: number, bezierCount: number, boneIndex: number);
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
}
/** Changes a bone's local {@link Bone#shearX} and {@link Bone#shearY}. */
export declare class ShearYTimeline extends CurveTimeline1 implements BoneTimeline {
    boneIndex: number;
    constructor(frameCount: number, bezierCount: number, boneIndex: number);
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
}
/** Changes a slot's {@link Slot#color}. */
export declare class RGBATimeline extends CurveTimeline implements SlotTimeline {
    slotIndex: number;
    constructor(frameCount: number, bezierCount: number, slotIndex: number);
    getFrameEntries(): number;
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
    /** Sets the time in seconds, red, green, blue, and alpha for the specified key frame. */
    setFrame(frame: number, time: number, r: number, g: number, b: number, a: number): void;
}
/** Changes a slot's {@link Slot#color}. */
export declare class RGBTimeline extends CurveTimeline implements SlotTimeline {
    slotIndex: number;
    constructor(frameCount: number, bezierCount: number, slotIndex: number);
    getFrameEntries(): number;
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
    /** Sets the time in seconds, red, green, blue, and alpha for the specified key frame. */
    setFrame(frame: number, time: number, r: number, g: number, b: number): void;
}
/** Changes a bone's local {@link Bone#shearX} and {@link Bone#shearY}. */
export declare class AlphaTimeline extends CurveTimeline1 implements SlotTimeline {
    slotIndex: number;
    constructor(frameCount: number, bezierCount: number, slotIndex: number);
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
}
/** Changes a slot's {@link Slot#color} and {@link Slot#darkColor} for two color tinting. */
export declare class RGBA2Timeline extends CurveTimeline implements SlotTimeline {
    slotIndex: number;
    constructor(frameCount: number, bezierCount: number, slotIndex: number);
    getFrameEntries(): number;
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
    /** Sets the time in seconds, light, and dark colors for the specified key frame. */
    setFrame(frame: number, time: number, r: number, g: number, b: number, a: number, r2: number, g2: number, b2: number): void;
}
/** Changes a slot's {@link Slot#color} and {@link Slot#darkColor} for two color tinting. */
export declare class RGB2Timeline extends CurveTimeline implements SlotTimeline {
    slotIndex: number;
    constructor(frameCount: number, bezierCount: number, slotIndex: number);
    getFrameEntries(): number;
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
    /** Sets the time in seconds, light, and dark colors for the specified key frame. */
    setFrame(frame: number, time: number, r: number, g: number, b: number, r2: number, g2: number, b2: number): void;
}
/** Changes a slot's {@link Slot#attachment}. */
export declare class AttachmentTimeline extends Timeline implements SlotTimeline {
    slotIndex: number;
    /** The attachment name for each key frame. May contain null values to clear the attachment. */
    attachmentNames: Array<string | null>;
    constructor(frameCount: number, slotIndex: number);
    getFrameCount(): number;
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
    /** Sets the time in seconds and the attachment name for the specified key frame. */
    setFrame(frame: number, time: number, attachmentName: string | null): void;
    setAttachment(skeleton: Skeleton, slot: Slot, attachmentName: string | null): void;
}
/** Changes a slot's {@link Slot#deform} to deform a {@link VertexAttachment}. */
export declare class DeformTimeline extends CurveTimeline implements SlotTimeline {
    slotIndex: number;
    /** The attachment that will be deformed. */
    attachment: VertexAttachment;
    /** The vertices for each key frame. */
    vertices: Array<NumberArrayLike>;
    constructor(frameCount: number, bezierCount: number, slotIndex: number, attachment: VertexAttachment);
    getFrameCount(): number;
    /** @param value1 Ignored (0 is used for a deform timeline).
     * @param value2 Ignored (1 is used for a deform timeline). */
    setBezier(bezier: number, frame: number, value: number, time1: number, value1: number, cx1: number, cy1: number, cx2: number, cy2: number, time2: number, value2: number): void;
    apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
    /** Sets the time in seconds and the vertices for the specified key frame.
     * @param vertices Vertex positions for an unweighted VertexAttachment, or deform offsets if it has weights. */
    setFrame(frame: number, time: number, vertices: NumberArrayLike): void;
    getCurvePercent(time: number, frame: number): number;
}
/** Fires an {@link Event} when specific animation times are reached. */
export declare class EventTimeline extends Timeline {
    static propertyIds: string[];
    /** The event for each key frame. */
    events: Array<Event>;
    constructor(frameCount: number);
    getFrameCount(): number;
    /** Fires events for frames > `lastTime` and <= `time`. */
    apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
    /** Sets the time in seconds and the event for the specified key frame. */
    setFrame(frame: number, event: Event): void;
}
/** Changes a skeleton's {@link Skeleton#drawOrder}. */
export declare class DrawOrderTimeline extends Timeline {
    static propertyIds: string[];
    /** The draw order for each key frame. See {@link #setFrame(int, float, int[])}. */
    drawOrders: Array<Array<number> | null>;
    constructor(frameCount: number);
    getFrameCount(): number;
    apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
    /** Sets the time in seconds and the draw order for the specified key frame.
     * @param drawOrder For each slot in {@link Skeleton#slots}, the index of the new draw order. May be null to use setup pose
     *           draw order. */
    setFrame(frame: number, time: number, drawOrder: Array<number> | null): void;
}
/** Changes an IK constraint's {@link IkConstraint#mix}, {@link IkConstraint#softness},
 * {@link IkConstraint#bendDirection}, {@link IkConstraint#stretch}, and {@link IkConstraint#compress}. */
export declare class IkConstraintTimeline extends CurveTimeline {
    /** The index of the IK constraint slot in {@link Skeleton#ikConstraints} that will be changed. */
    ikConstraintIndex: number;
    constructor(frameCount: number, bezierCount: number, ikConstraintIndex: number);
    getFrameEntries(): number;
    apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
    /** Sets the time in seconds, mix, softness, bend direction, compress, and stretch for the specified key frame. */
    setFrame(frame: number, time: number, mix: number, softness: number, bendDirection: number, compress: boolean, stretch: boolean): void;
}
/** Changes a transform constraint's {@link TransformConstraint#rotateMix}, {@link TransformConstraint#translateMix},
 * {@link TransformConstraint#scaleMix}, and {@link TransformConstraint#shearMix}. */
export declare class TransformConstraintTimeline extends CurveTimeline {
    /** The index of the transform constraint slot in {@link Skeleton#transformConstraints} that will be changed. */
    transformConstraintIndex: number;
    constructor(frameCount: number, bezierCount: number, transformConstraintIndex: number);
    getFrameEntries(): number;
    apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
    /** The time in seconds, rotate mix, translate mix, scale mix, and shear mix for the specified key frame. */
    setFrame(frame: number, time: number, mixRotate: number, mixX: number, mixY: number, mixScaleX: number, mixScaleY: number, mixShearY: number): void;
}
/** Changes a path constraint's {@link PathConstraint#position}. */
export declare class PathConstraintPositionTimeline extends CurveTimeline1 {
    /** The index of the path constraint slot in {@link Skeleton#pathConstraints} that will be changed. */
    pathConstraintIndex: number;
    constructor(frameCount: number, bezierCount: number, pathConstraintIndex: number);
    apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
}
/** Changes a path constraint's {@link PathConstraint#spacing}. */
export declare class PathConstraintSpacingTimeline extends CurveTimeline1 {
    /** The index of the path constraint slot in {@link Skeleton#getPathConstraints()} that will be changed. */
    pathConstraintIndex: number;
    constructor(frameCount: number, bezierCount: number, pathConstraintIndex: number);
    apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
}
/** Changes a transform constraint's {@link PathConstraint#getMixRotate()}, {@link PathConstraint#getMixX()}, and
 * {@link PathConstraint#getMixY()}. */
export declare class PathConstraintMixTimeline extends CurveTimeline {
    /** The index of the path constraint slot in {@link Skeleton#getPathConstraints()} that will be changed. */
    pathConstraintIndex: number;
    constructor(frameCount: number, bezierCount: number, pathConstraintIndex: number);
    getFrameEntries(): number;
    apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
    setFrame(frame: number, time: number, mixRotate: number, mixX: number, mixY: number): void;
}
/** Changes a slot's {@link Slot#getSequenceIndex()} for an attachment's {@link Sequence}. */
export declare class SequenceTimeline extends Timeline implements SlotTimeline {
    slotIndex: number;
    static ENTRIES: number;
    static MODE: number;
    static DELAY: number;
    attachment: HasTextureRegion;
    constructor(frameCount: number, slotIndex: number, attachment: HasTextureRegion);
    getFrameEntries(): number;
    apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, blend: MixBlend, direction: MixDirection): void;
    getSlotIndex(): number;
    getAttachment(): Attachment;
    /** Sets the time, mode, index, and frame time for the specified frame.
     * @param frame Between 0 and <code>frameCount</code>, inclusive.
     * @param time Seconds between frames. */
    setFrame(frame: number, time: number, mode: SequenceMode, index: number, delay: number): void;
}
//# sourceMappingURL=Animation.d.ts.map