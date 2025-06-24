import { type Eases } from 'dill-pixel';

export enum Ease {
  Custom = 'custom',
  CustomInOut = 'customInOut',
}

export const CustomEases: Eases = {
  [Ease.Custom]: (progress: number): number => {
    return 1 - Math.cos((progress * Math.PI) / 2);
  },
  [Ease.CustomInOut]: (progress: number): number => {
    return progress ** 2 * (3 - 2 * progress); // smoothstep
  },
};
