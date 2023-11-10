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

  // use canvas2d API to create gradient
  const grd = ctx.createLinearGradient(0, 0, width, 0);

  colorStops.forEach((cs) => {
    grd.addColorStop(cs.offset, cs.color);
  });
  grd.addColorStop(0, 'black');
  grd.addColorStop(1, 'rgba(0,0,0, 0)');

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, width, 1);

  return Texture.from(canvas as TextureSource);
}
