export {};
export type RAPIER = typeof import('@dimforge/rapier2d');
export type Matter = typeof import('matter-js');

declare global {
  const RAPIER: typeof import('@dimforge/rapier2d');
  const Matter: typeof import('matter-js');
}
