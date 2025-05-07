export type Orientation = 'portrait' | 'landscape';

export function getOrientation(): Orientation {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return width > height ? 'landscape' : 'portrait';
}
