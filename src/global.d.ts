export {};
export type RAPIER = import('@dimforge/rapier2d');
export type Matter = import('matter-js');
export type Spine = import('pixi-spine').Spine;
export type SkeletonData = import('pixi-spine').SkeletonData;

declare module 'react-fps-stats';
declare module 'spectorjs';
declare module 'fontfaceobserver';

declare global {
  const RAPIER: RAPIER;
  const Matter: Matter;
  const Spine: Spine;
  const SkeletonData: SkeletonData;
}
