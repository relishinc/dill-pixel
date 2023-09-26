import { TextStyle } from 'pixi.js';

export const whiteTextStyle = (size) =>
  new TextStyle({
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: 0xffffff,
    fontSize: size ?? 24,
  });
