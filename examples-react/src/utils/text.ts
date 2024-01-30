import { TextStyle } from 'pixi.js';

export const whiteTextStyle = (size: number) =>
  new TextStyle({
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: 0xffffff,
    fontSize: size ?? 24,
  });

export const titleTextStyle = new TextStyle({ fontFamily: 'Arial', fontWeight: 'bold', fill: 0xffffff, fontSize: 48 });
