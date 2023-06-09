import "@pixi-spine/base";
import {sayHello} from "./hello"; // (window as any).PIXI = PIXI; // for pixi-spine

// (window as any).PIXI = PIXI; // for pixi-spine
declare global {
	var Matter: typeof import('matter-js');
}

export * from "./Application";
export * from "./Audio";
export * from "./Copy";
export * from "./Data";
export * from "./GameObjects";
export * as Input from "./Input";
export * from "./Load";
export * from "./Popup";
export * from "./State";
export * from "./Utils";
export * from "./version";

sayHello();
