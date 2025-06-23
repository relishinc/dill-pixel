import { type Ease } from 'dill-pixel';

export enum EaseType {
  Custom = 'custom',
  CustomInOut = 'customInOut',
}

export const Eases: Ease<EaseType> = {
  [EaseType.Custom]: (progress: number): number => {
    return 1 - Math.cos((progress * Math.PI) / 2);
  },
  [EaseType.CustomInOut]: (progress: number): number => {
    return progress ** 2 * (3 - 2 * progress); // smoothstep
  },
};
