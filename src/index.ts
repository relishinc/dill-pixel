import "@pixi-spine/base";
import {sayHello} from "./hello";
// (window as any).PIXI = PIXI; // for pixi-spine
export * from "./Application";
export * from "./Audio";
export * from "./Copy";
export * from "./Data";
export * from "./GameObjects";
export * as Input from "./Input";
export {KeyCodes} from "./Input";
export * from "./Load";
export * from "./Physics"
export * from "./Popup";
export * from "./State";
export * from "./Utils";
export * from "./Signals";
export {Add, Make} from "./Utils/Factory";


sayHello();
