import {Texture, TextureSource} from 'pixi.js';

/**
 * Creates a linear gradient texture.
 *
 * @param {number} width - The width of the texture.
 * @param {Array<{offset: number, color: string}>} colorStops - An array of objects, each with an offset and a color.
 * @returns {Texture} - A PIXI texture of the linear gradient.
 */
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

// Alias for createLinearGradientTexture
export const createGradientTexture = createLinearGradientTexture;

/**
 * Creates a radial gradient texture.
 *
 * @param {number} radius - The radius of the texture.
 * @param {Array<{offset: number, color: string}>} colorStops - An array of objects, each with an offset and a color.
 * @returns {Texture} - A PIXI texture of the radial gradient.
 */
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
