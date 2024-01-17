import 'pixi-spine';
import { isDev } from '../functions';
import { Make } from '../utils';
import { Make as SpineMake } from './Make';

Make.spine = SpineMake.spine;

if (isDev()) {
  console.log('pixi-spine added');
}
