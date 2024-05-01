import 'pixi-spine';
import { isDev } from '../functions/pipeline';
import { Make } from '../utils/factory/Make';
import { Make as SpineMake } from './Make';

Make.spine = SpineMake.spine;

if (isDev()) {
  console.log('pixi-spine added');
}
