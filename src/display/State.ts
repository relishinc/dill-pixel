import { Ticker } from 'pixi.js';
import { Size } from '../utils';
import type { IContainer } from './Container';
import { Container } from './Container';

export interface IState extends IContainer {
  id: string;
}

export class State extends Container implements IState {
  public readonly id: string;

  constructor() {
    super(true, true, -9999);
  }

  onResize(size: Size): void {}

  update(ticker: Ticker) {}
}
