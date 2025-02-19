import { Application } from 'dill-pixel';

import { type ActionTypes, type Contexts, type Data } from './dill-pixel.config';

/**
 * Custom application class
 * this is a nice way to add custom logic to the application
 * Example:
 * export class __APPLICATION_NAME__ extends Application<Data, Contexts, ActionTypes> {
 *   // Example: access a plugin app-wide
 *   get physics(): ICrunchPhysicsPlugin {
 *     return this.plugins.get('crunch-physics') as ICrunchPhysicsPlugin;
 *   }
 *   setup() {
 *     // add custom setup logic here
 *   }
 * }
 */

export class __APPLICATION_NAME__ extends Application<Data, Contexts, ActionTypes> {}
