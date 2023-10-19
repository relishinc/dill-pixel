import { Container } from 'pixi.js';
import { Application } from '../../../core';
import { resolvePointLike } from '../../../utils';
import { PhysicsBodyType } from '../../index';
export class RapierPhysicsComposite extends Container {
    static { this.DEFAULT_DEBUG_COLOR = 0x29c5f6; }
    constructor() {
        super();
        this.visuals = [];
        this.bodies = [];
        this.colliders = [];
        this.colliderRef = [];
        this.onAdded = this.onAdded.bind(this);
        this.on('added', this.onAdded);
        this.on('removed', this.onRemoved);
    }
    get physics() {
        return this.app.physics;
    }
    get app() {
        return Application.instance;
    }
    get world() {
        return this.app.physics.world;
    }
    get activeCollisionTypes() {
        // tslint:disable-next-line:no-bitwise
        return RAPIER.ActiveCollisionTypes.DEFAULT | RAPIER.ActiveCollisionTypes.KINEMATIC_FIXED;
    }
    get activeEvents() {
        // tslint:disable-next-line:no-bitwise
        return RAPIER.ActiveEvents.COLLISION_EVENTS;
    }
    get activeHooks() {
        return RAPIER.ActiveHooks.FILTER_CONTACT_PAIRS;
    }
    get debugColor() {
        return 0xff0000;
    }
    addVisual(color, size, position = [0, 0], type = PhysicsBodyType.RECTANGLE) {
        const visual = this.app.make.coloredSprite(color, size, type === PhysicsBodyType.CIRCLE ? 'circle' : 'rectangle');
        visual.position = resolvePointLike(position);
        visual.anchor.set(0.5, 0.5);
        this.addChild(visual);
        return visual;
    }
    onAdded() {
        this.createBody();
        this.physics.addToWorld(this);
    }
    onRemoved() {
        this.physics.removeFromWorld(this.body);
    }
    createCollider(visual, body, type = PhysicsBodyType.RECTANGLE) {
        let colliderDesc;
        switch (type) {
            case PhysicsBodyType.CIRCLE:
                colliderDesc = RAPIER.ColliderDesc.ball(visual.width / 2)
                    .setDensity(visual.width * visual.width)
                    .setTranslation(0, 0);
                break;
            case PhysicsBodyType.RECTANGLE:
            default:
                colliderDesc = RAPIER.ColliderDesc.cuboid(visual.width / 2, visual.height / 2)
                    .setDensity(visual.width * visual.height)
                    .setTranslation(0, 0);
                break;
        }
        let collider;
        if (colliderDesc) {
            // tslint:disable-next-line:no-bitwise
            colliderDesc.setActiveEvents(this.activeEvents);
            colliderDesc.setActiveCollisionTypes(this.activeCollisionTypes);
            colliderDesc.setActiveHooks(this.activeHooks);
            collider = this.world.createCollider(colliderDesc, body);
        }
        return collider;
    }
    createPiece(color, size, position = [0, 0], angle = 0, type = PhysicsBodyType.RECTANGLE, data) {
        const visual = this.addVisual(color, size, position, type);
        const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
            .setTranslation(this.x + position[0], this.y + position[1])
            .setRotation(this.angle + angle);
        const body = this.world.createRigidBody(bodyDesc);
        const collider = this.createCollider(visual, body, type);
        this.visuals.push(visual);
        this.bodies.push(body);
        this.colliders.push(collider);
        this.colliderRef.push({ collider, visual, data });
        return { visual, body, collider };
    }
    createBody() {
        const main = this.createPiece(0x00fff0, [50, 150], [0, 0], 0, PhysicsBodyType.RECTANGLE, { isMain: true });
        // head
        const head = this.createPiece(0x0ff000, [25, 25], [0, -100], 0, PhysicsBodyType.CIRCLE);
        const headParams = RAPIER.JointData.fixed({ x: 0, y: -75 }, 0.0, {
            x: 0,
            y: 25,
        }, 0.0);
        this.world.createImpulseJoint(headParams, main.body, head.body, true);
        // left arm
        const leftArm = this.createPiece(0x00ff00, [20, 60], [-35, 20]);
        this.world.createImpulseJoint(RAPIER.JointData.revolute({ x: -25, y: -75 }, {
            x: 0,
            y: -30,
        }), main.body, leftArm.body, true);
        // right arm
        const rightArm = this.createPiece(0x00ff00, [20, 60], [35, 20]);
        this.world.createImpulseJoint(RAPIER.JointData.revolute({ x: 25, y: -75 }, {
            x: 0,
            y: -30,
        }), main.body, rightArm.body, true);
        // left leg
        const leftLeg = this.createPiece(0x00ff00, [20, 80], [-35, 115]);
        this.world.createImpulseJoint(RAPIER.JointData.revolute({ x: -25, y: 75 }, {
            x: 0,
            y: -40,
        }), main.body, leftLeg.body, true);
        // right leg
        const rightLeg = this.createPiece(0x00ff00, [20, 80], [35, 115]);
        this.world.createImpulseJoint(RAPIER.JointData.revolute({ x: 25, y: 75 }, {
            x: 0,
            y: -40,
        }), main.body, rightLeg.body, true);
        this.visual = this.visuals[0];
        this.body = this.bodies[0];
        this.collider = this.colliders[0];
    }
    update() {
        if (this.visuals && this.body) {
            this.colliderRef.forEach(({ collider, visual, data }) => {
                visual.rotation = collider.rotation();
                if (data?.isMain) {
                    this.x = collider.translation().x;
                    this.y = collider.translation().y;
                }
                else {
                    visual.x = collider.translation().x - this.x;
                    visual.y = collider.translation().y - this.y;
                }
            });
        }
    }
}
//# sourceMappingURL=RapierPhysicsComposite.js.map