// convenience methods for all the orientation manager signals
import { Signals } from '../signals';
export function orientationPortrait() {
    Signals.orientationPortrait.emit();
}
export function orientationLandscape() {
    Signals.orientationLandscape.emit();
}
//# sourceMappingURL=orientation.js.map