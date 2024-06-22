import { Assets, Graphics, GraphicsContext } from 'pixi.js';

export class Svg extends Graphics {
  constructor(ctx: string | GraphicsContext) {
    super(typeof ctx === 'string' ? Assets.get(ctx) : ctx);
    const bounds = this.getLocalBounds();
    this.pivot.set((bounds.x + bounds.width) / 2, (bounds.y + bounds.height) / 2);
  }
}
