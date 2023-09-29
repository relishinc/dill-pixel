import {ISelectable} from './ISelectable';

/**
 * Radio group
 * @template T
 */
export class RadioGroup<T extends ISelectable> {
  private _elements: ISelectable[];
  private _selectedIndex: number;

  constructor() {
    this._elements = new Array<T>();
    this._selectedIndex = -1;
  }

  /**
   * Adds element
   * @param pElement
   */
  public addElement(pElement: T): void {
    if (this._elements.indexOf(pElement) === -1) {
      this._elements.push(pElement);
      pElement.onSelected.push(this.onElementSelected.bind(this));
      pElement.onDeselected.push(this.onElementDeselected.bind(this));
    }
  }

  /**
   * Removes element
   * @param pElement
   */
  public removeElement(pElement: T): void {
    const index: number = this._elements.indexOf(pElement);
    if (index !== -1) {
      if (index === this._selectedIndex) {
        this._selectedIndex = -1;
      } else if (index < this._selectedIndex) {
        --this._selectedIndex;
      }
      this._elements.splice(index, 1);
    }
  }

  /**
   * Deselects radio group
   */
  public deselect(): void {
    if (this._selectedIndex !== -1) {
      this._elements[this._selectedIndex].deselect();
      this._selectedIndex = -1;
    }
  }

  /**
   * Disables radio group
   * @param pExcept
   */
  public disable(pExcept: T): void {
    this.deselect();
    for (let i = 0; i < this._elements.length; ++i) {
      if (this._elements[i] !== pExcept) {
        this._elements[i].interactive = false;
      }
    }
  }

  /**
   * Enables radio group
   */
  public enable(): void {
    for (let i = 0; i < this._elements.length; ++i) {
      this._elements[i].interactive = false;
    }
  }

  /**
   * onElementSelected
   * @param pElement
   */
  private onElementSelected(pElement: ISelectable): void {
    this.deselect();
    this._selectedIndex = this._elements.indexOf(pElement);
  }

  /**
   * onElementDeselected
   * @param pElement
   */
  private onElementDeselected(pElement: ISelectable): void {
    if (this._selectedIndex === this._elements.indexOf(pElement)) {
      this._selectedIndex = -1;
    }
  }
}
