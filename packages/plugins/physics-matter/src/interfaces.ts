import { MatterBodyLike } from "./types";

export interface IMatterPhysicsObject {
    body: MatterBodyLike;
    debugColor: number;

    update(): void;
}