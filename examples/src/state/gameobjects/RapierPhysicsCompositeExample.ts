import { RapierPhysicsComposite } from 'dill-pixel';
import { PhysicsBodyType } from '../../../../src';

export class RapierPhysicsCompositeExample extends RapierPhysicsComposite {
  onAdded() {
    this.createBody();
    super.onAdded();
  }

  createBody() {
    const main = this.createPiece(0x00fff0, [50, 150], [0, 0], 0, PhysicsBodyType.RECTANGLE, { isMain: true });

    // head
    const head = this.createPiece(0x0ff0000, [25, 25], [0, -100], 0, PhysicsBodyType.CIRCLE);
    const headParams = RAPIER.JointData.fixed(
      { x: 0, y: -75 },
      0.0,
      {
        x: 0,
        y: 25,
      },
      0.0,
    );

    this.world.createImpulseJoint(headParams, main.body, head.body, true);

    // left arm
    const leftArm = this.createPiece(0xff0000, [20, 60], [-35, 20]);
    this.world.createImpulseJoint(
      RAPIER.JointData.revolute(
        { x: -25, y: -75 },
        {
          x: 0,
          y: -30,
        },
      ),
      main.body,
      leftArm.body,
      true,
    );

    // right arm
    const rightArm = this.createPiece(0xff0000, [20, 60], [35, 20]);
    this.world.createImpulseJoint(
      RAPIER.JointData.revolute(
        { x: 25, y: -75 },
        {
          x: 0,
          y: -30,
        },
      ),
      main.body,
      rightArm.body,
      true,
    );

    // left leg
    const leftLeg = this.createPiece(0xff0000, [20, 80], [-35, 115]);
    this.world.createImpulseJoint(
      RAPIER.JointData.revolute(
        { x: -25, y: 75 },
        {
          x: 0,
          y: -40,
        },
      ),
      main.body,
      leftLeg.body,
      true,
    );

    // right leg
    const rightLeg = this.createPiece(0xff0000, [20, 80], [35, 115]);
    this.world.createImpulseJoint(
      RAPIER.JointData.revolute(
        { x: 25, y: 75 },
        {
          x: 0,
          y: -40,
        },
      ),
      main.body,
      rightLeg.body,
      true,
    );

    this.visual = this.visuals[0];
    this.body = this.bodies[0];
    this.collider = this.colliders[0];
  }
}
