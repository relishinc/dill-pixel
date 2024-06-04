import { Body as ArcadeBody } from 'arcade-physics/lib/physics/arcade/Body';
import { StaticBody as ArcadeStaticBody } from 'arcade-physics/lib/physics/arcade/StaticBody';
import { HasEntity } from './mixins';

export class Body extends HasEntity(ArcadeBody) {}

export class StaticBody extends HasEntity(ArcadeStaticBody) {}
