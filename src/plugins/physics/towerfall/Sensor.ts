import { Application } from '../../../core/Application';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { System } from './System';

export class Sensor<T = any, A extends Application = Application> extends Actor<T, A> {
  type = 'Sensor';
  isSensor = true;

  get collideables(): Entity[] {
    return System.actors;
  }

  added() {
    System.addSensor(this);
  }

  removed() {
    System.removeSensor(this);
  }
}
