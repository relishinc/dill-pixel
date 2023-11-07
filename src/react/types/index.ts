import { Container, Graphics, PixiRef, Sprite, Text } from '@pixi/react';
import { FlexContainer } from '../ui';

export type ISprite = PixiRef<typeof Sprite>;
export type IText = PixiRef<typeof Text>;
export type IContainer = PixiRef<typeof Container>;
export type IGraphics = PixiRef<typeof Graphics>;
export type IFlexContainer = PixiRef<typeof FlexContainer>;
