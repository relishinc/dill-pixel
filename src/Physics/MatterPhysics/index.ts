export type MatterBodyLike =
	Matter.Body
	| Matter.Composite
	| Matter.Constraint
	| Matter.MouseConstraint
	| Matter.World;

export interface IMatterPhysicsObject {
	body: MatterBodyLike;
	debugColor: number

	update(): void;
}


