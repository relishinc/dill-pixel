import { Signals } from '../signals';
export function draggableSelected(draggable) {
    Signals.draggableSelected.emit(draggable);
}
export function draggableDeselected(draggable) {
    Signals.draggableDeselected.emit(draggable);
}
export function dragBegin(draggable) {
    Signals.dragBegin.emit(draggable);
}
export function dragEnd(draggable) {
    Signals.dragEnd.emit(draggable);
}
//# sourceMappingURL=draggable.js.map