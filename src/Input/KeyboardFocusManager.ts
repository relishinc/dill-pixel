import {Container, DisplayObject} from "pixi.js";
import {SignalConnections} from "typed-signals";
import {Signals} from "../Signals";
import {IFocusable} from "./IFocusable";
import {IKeyboardFocus} from "./IKeyboardFocus";

export class KeyboardFocusManager<T extends DisplayObject & IKeyboardFocus> extends Container {
	protected _activeFocus?: T;
	protected _focusPool: T[];
	private _connections: SignalConnections;

	constructor(protected _T: new (...args: any[]) => T) {
		super();

		this.onFocusBegin = this.onFocusBegin.bind(this);
		this.onFocusEnd = this.onFocusEnd.bind(this);
		this.reFocus = this.reFocus.bind(this);

		this._focusPool = [];

		this._connections = new SignalConnections();
		this._connections.add(Signals.keyboardFocusBegin.connect(this.onFocusBegin))
		this._connections.add(Signals.keyboardFocusEnd.connect(this.onFocusEnd));
		this._connections.add(Signals.keyboardReFocus.connect(this.reFocus))
	}

	public destroy(pOptions?: Parameters<typeof Container.prototype.destroy>[0]): void {
		this._connections.disconnectAll();
		super.destroy(pOptions);
	}

	protected onFocusBegin(pFocusable: IFocusable): void {
		const focus = this.getFocus();
		this.addChild(focus);
		(focus as unknown as IKeyboardFocus).show(pFocusable);
		this._activeFocus = focus;
	}

	protected onFocusEnd(pFocusable: IFocusable): void {
		if (this._activeFocus === undefined) {
			return;
		}
		if (this._activeFocus.target !== pFocusable) {
			return;
		}

		const focus = this._activeFocus;

		focus.hide(() => {
			this.removeChild(focus);
			this._focusPool.push(focus);
		});

		this._activeFocus = undefined;
	}

	protected reFocus(): void {
		if (this._activeFocus !== undefined) {
			this._activeFocus.redraw();
		}
	}

	protected getFocus(): T {
		let focus: T;
		if (this._focusPool.length > 0) {
			focus = this._focusPool.pop()!;
		} else {
			focus = new this._T();
		}
		return focus;
	}
}
