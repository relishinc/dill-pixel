import { Texture, TextureSource } from 'pixi.js';

export function createLinearGradientTexture(
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

export const createGradientTexture = createLinearGradientTexture;

export function createRadialGradientTexture(
  radius: number,
  colorStops: {
    offset: number;
    color: string;
  }[],
) {
  const canvas = document.createElement('canvas');
  canvas.width = radius * 2;
  canvas.height = radius * 2;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    // use canvas2d API to create gradient
    const grd = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius * 2);

    colorStops.forEach((cs) => {
      grd.addColorStop(cs.offset, cs.color);
    });

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, radius * 2, radius * 2);

    return Texture.from(canvas as TextureSource);
  }
}
