import CrunchPhysicsPlugin from './CrunchPhysicsPlugin';

export * from './Actor';
// Don't export from collision-layers.d.ts as it's a declaration file
export * from './Group';
export * from './interfaces';
export * from './Sensor';
export * from './Solid';
export * from './System';
export * from './types';

export type { ICrunchPhysicsPlugin } from './CrunchPhysicsPlugin';

// Export specific types for easier access
export * from './types';

export default CrunchPhysicsPlugin;
