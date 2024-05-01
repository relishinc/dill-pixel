// convenience pause / unpause signals
import { Signals } from '../signals/Signals';

export function pause(): void {
  Signals.pause.emit();
}

export function unpause(): void {
  Signals.unpause.emit();
}
