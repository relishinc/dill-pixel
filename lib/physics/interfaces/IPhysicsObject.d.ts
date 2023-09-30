import { Container, DisplayObject } from 'pixi.js';
export interface IPhysicsObject extends Container {
    visual: DisplayObject;
    visuals?: DisplayObject[];
    body: any;
}
//# sourceMappingURL=IPhysicsObject.d.ts.map