import { Application } from '../../../core/Application';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { World } from './World';

export class Sensor<T = any, A extends Application = Application> extends Actor<T, A> {
  type = 'Sensor';

  get collideables(): Entity[] {
    return World.actors;
  }

  added() {
    World.addSensor(this);
  }

  removed() {
    World.removeSensor(this);
  }
}
