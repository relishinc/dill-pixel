export interface ISelectable {
    isSelected: boolean;
    interactive: boolean;
    onSelected: Array<(p: ISelectable) => void>;
    onDeselected: Array<(p: ISelectable) => void>;
    select(): void;
    deselect(): void;
    toggleSelected(): void;
}
//# sourceMappingURL=ISelectable.d.ts.map