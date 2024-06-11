import { PointLike } from 'dill-pixel';
import { Cursor } from 'pixi.js';

export type Fit = 'cover' | 'contain' | 'fill' | 'fitWidth' | 'fitHeight' | 'none' | 'scaleDown';

export type Alignment =
  | 'center'
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'centerLeft'
  | 'centerRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight';

export type RiveOptions = {
  asset: string | Uint8Array;
  debug?: boolean;
  autoPlay?: boolean;
  interactive?: boolean;
  artboard?: string;
  animation?: string | string[];
  stateMachine?: string | string[];
  anchor?: PointLike;
  scale?: PointLike;
  autoInit?: boolean;
  cursor?: Cursor;
  fit?: Fit;
  align?: Alignment;
  maxWidth?: number;
  maxHeight?: number;
};
