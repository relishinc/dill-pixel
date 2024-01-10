// convenience pause / unpause signals
import { Signals } from '../signals';
export function pause() {
    Signals.pause.emit();
}
export function unpause() {
    Signals.unpause.emit();
}
//# sourceMappingURL=game.js.map