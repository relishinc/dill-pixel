export interface ISelectable {
    isSelected: boolean;
    interactive: boolean;
    onSelected: ((p: ISelectable) => void)[];
    onDeselected: ((p: ISelectable) => void)[];
    select(): void;
    deselect(): void;
    toggleSelected(): void;
}
//# sourceMappingURL=ISelectable.d.ts.map