import { TextureSource } from 'pixi.js';

export function createGradientTexture(
  width: number,
  colorStops: {
    offset: number;
    color: string;
  }[],
) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = 1;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, width, 0);

    colorStops.forEach((cs) => {
      grd.addColorStop(cs.offset, cs.color);
    });

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, 1);

    return Texture.from(canvas as TextureSource);
  }
}
