// convenience methods for all the orientation manager signals
import { Signals } from '../signals';

export function orientationPortrait(): void {
  Signals.orientationPortrait.emit();
}

export function orientationLandscape(): void {
  Signals.orientationLandscape.emit();
}
