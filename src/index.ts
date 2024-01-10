// import '@pixi-spine/base';
import { sayHello } from './hello';
// (window as any).PIXI = PIXI; // for pixi-spine
export * from './core';
export * from './audio';
export * from './copy';
export * from './gameobjects';
export * from './input';
export { KeyCodes } from './input';
export * from './load';
export * from './physics';
export * from './popup';
export * from './save';
export * from './state';
export * from './utils';
export * from './signals';
export * from './functions';
export { Add, Make } from './utils/factory';

sayHello();
