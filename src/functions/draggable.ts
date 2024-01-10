import { Draggable } from '../input';
import { Signals } from '../signals';

export function draggableSelected(draggable: Draggable): void {
  Signals.draggableSelected.emit(draggable);
}

export function draggableDeselected(draggable: Draggable): void {
  Signals.draggableDeselected.emit(draggable);
}

export function dragBegin(draggable: Draggable): void {
  Signals.dragBegin.emit(draggable);
}

export function dragEnd(draggable: Draggable): void {
  Signals.dragEnd.emit(draggable);
}
