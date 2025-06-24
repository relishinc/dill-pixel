/* eslint-disable @typescript-eslint/no-empty-interface, @typescript-eslint/no-explicit-any */

import { AppTypeOverrides } from '../utils';

/**
 * An interface for custom GSAP eases.
 * This interface can be augmented in your application to provide strong typing for your custom eases.
 *
 * @example
 * ```ts
 * // src/types/custom-eases.d.ts
 * declare module 'dill-pixel/types/gsap' {
 *   interface CustomEase {
 *     'my-custom-ease': any;
 *     'another-ease': any;
 *   }
 * }
 * ```
 */

declare module 'gsap/gsap-core' {
  // We can't directly augment the EaseString type alias, so we'll augment TweenVars instead.
  interface TweenVars {
    ease?: EaseString | AppTypeOverrides['CustomEases'];
  }
}
