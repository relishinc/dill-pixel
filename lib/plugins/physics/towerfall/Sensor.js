import { Actor } from './Actor';
import { System } from './System';
export class Sensor extends Actor {
    type = 'Sensor';
    isSensor = true;
    get collideables() {
        return System.actors;
    }
    added() {
        System.addSensor(this);
    }
    removed() {
        System.removeSensor(this);
    }
}
