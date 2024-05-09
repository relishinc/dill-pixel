import { Rectangle } from 'pixi.js';
import { Entity } from './Entity';
import { System } from './System';
import { checkCollision } from './utils';
export class Actor extends Entity {
    type = 'Actor';
    isActor = true;
    passThroughTypes = [];
    passingThrough = new Set();
    get collideables() {
        return System.getNearbyEntities(this, (e) => e.isSolid);
    }
    added() {
        System.addActor(this);
    }
    removed() {
        System.removeActor(this);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    squish(_collision, _pushingEntity) { }
    moveX(amount, onCollide, onNoCollisions, pushingEntity) {
        this.xRemainder += amount;
        let move = Math.round(this.xRemainder);
        const sign = Math.sign(move);
        while (move !== 0) {
            const nextX = this.x + (move ? sign : 0); // Predict the next X position
            const collisions = this.collideAt(nextX - this.x, 0, this.getBoundingBox());
            if (collisions) {
                if (onCollide) {
                    collisions.forEach((collision) => onCollide(collision, pushingEntity));
                }
                this.xRemainder = 0; // Reset the remainder to prevent sliding
                break;
            }
            else {
                this.x = nextX;
                move -= sign;
                this.xRemainder -= sign;
                if (onNoCollisions) {
                    onNoCollisions();
                }
            }
        }
        System.updateEntity(this);
    }
    moveY(amount, onCollide, onNoCollisions, pushingEntity) {
        this.yRemainder += amount;
        let move = Math.round(this.yRemainder);
        const sign = Math.sign(move);
        while (move !== 0) {
            const nextY = this.y + (move ? sign : 0); // Predict the next Y position
            const collisions = this.collideAt(0, nextY - this.y, this.getBoundingBox());
            if (collisions) {
                if (onCollide) {
                    collisions.forEach((collision) => onCollide(collision, pushingEntity));
                }
                this.yRemainder = 0;
                break;
            }
            else {
                this.y = nextY;
                move -= sign;
                this.yRemainder -= sign;
                if (onNoCollisions) {
                    onNoCollisions();
                }
            }
        }
        System.updateEntity(this);
    }
    // Simple bounding box collision check
    collideAt(x, y, box) {
        const nextPosition = new Rectangle(box.x + x, box.y + y, box.width, box.height);
        const collisions = [];
        // Iterate through all solids in the level to check for collisions
        for (const entity of this.collideables) {
            if (!entity.isCollideable || this.passThroughTypes.includes(entity.type)) {
                continue;
            }
            const solidBounds = entity.getBoundingBox();
            const collisionResult = checkCollision(nextPosition, solidBounds, this, entity);
            if (collisionResult) {
                System.collide(collisionResult);
                // if the collision resolver returns true,
                // we should stop and return this collision
                // this will stop actor movement if returned
                if (System.resolveCollision(collisionResult)) {
                    collisions.push(collisionResult);
                }
            }
        }
        return collisions.length ? collisions : false;
    }
    isRiding(solid) {
        const actorBounds = this.getBoundingBox();
        const solidBounds = solid.getBoundingBox();
        // Basic check if actor is directly on top of the solid
        return (actorBounds.bottom >= solidBounds.top - 2 &&
            actorBounds.bottom <= solidBounds.top &&
            actorBounds.left < solidBounds.right &&
            actorBounds.right > solidBounds.left);
    }
    setPassingThrough(entity) {
        this.passingThrough.add(entity);
    }
    removePassingThrough(entity) {
        this.passingThrough.delete(entity);
    }
    isPassingThrough(entity) {
        return this.passingThrough.has(entity);
    }
}
