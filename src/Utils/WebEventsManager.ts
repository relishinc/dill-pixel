import {Application} from "../Application";

/**
 * Alias for the function signature of a visibility change callback.
 */
type VisibilityChangedCallback = (pVisible: boolean) => void;
/**
 * Alias for the function signature of a resize callback.
 */
type ResizeCallback = () => void;

/**
 * Maintains a list of callbacks for specific web events and invokes callbacks when event occurs.
 */
export class WebEventsManager {
	/**
	 * The callbacks interested in visibility change of the browser.
	 */
	private _visibilityChangedCallbacks: VisibilityChangedCallback[];
	/**
	 * The callbacks interested in the resizing of the browser.
	 */
	private _resizeCallbacks: ResizeCallback[];

	/**
	 * Creates callback arrays and registers to web events.
	 */
	constructor(private app: Application) {
		this._visibilityChangedCallbacks = new Array<VisibilityChangedCallback>();
		document.addEventListener(
			"visibilitychange",
			this.onVisibilityChanged.bind(this),
			false
		);

		this._resizeCallbacks = new Array<ResizeCallback>();
		window.addEventListener("resize", this.onResize.bind(this));
		document.addEventListener("fullscreenchange", this.onResize.bind(this));
	}

	/**
	 * Registers a callback interested in visibility changes. Callbacks will be told if the page is visible.
	 * @param pCallback The callback to register.
	 * @returns False if the callback was previously added.
	 */
	public registerVisibilityChangedCallback(
		pCallback: VisibilityChangedCallback
	): boolean {
		const index = this._visibilityChangedCallbacks.indexOf(pCallback);

		if (index === -1) {
			this._visibilityChangedCallbacks.push(pCallback);
			return true;
		}

		return false;
	}

	/**
	 * Unregisters a visibility change callback.
	 * @param pCallback The callback to unregister.
	 */
	public unregisterVisibilityChangedCallback(
		pCallback: VisibilityChangedCallback
	): void {
		const index = this._visibilityChangedCallbacks.indexOf(pCallback);

		if (index > -1) {
			this._visibilityChangedCallbacks.splice(index, 1);
		}
	}

	/**
	 * Registers a callback interested in browser resize.
	 * @param pCallback The callback to register.
	 * @returns False if the callback was previously added.
	 */
	public registerResizeCallback(pCallback: ResizeCallback): boolean {
		const index = this._resizeCallbacks.indexOf(pCallback);

		if (index === -1) {
			this._resizeCallbacks.push(pCallback);
			return true;
		}

		return false;
	}

	/**
	 * Unregisters a resize callback.
	 * @param pCallback The callback to unregister.
	 */
	public unregisterResizeCallback(pCallback: ResizeCallback): void {
		const index = this._resizeCallbacks.indexOf(pCallback);

		if (index > -1) {
			this._resizeCallbacks.splice(index, 1);
		}
	}

	/**
	 * Called when the browser visibility changes. Passes the `hidden` flag of the document to all callbacks.
	 */
	private onVisibilityChanged(): void {
		this._visibilityChangedCallbacks.forEach((callback) => {
			// We are sending a ! param so that the registered functions get pVisible instead of pHidden
			callback(!document.hidden);
		});
	}

	/**
	 * Called when the browser resizes.
	 */
	private onResize(): void {
		this._resizeCallbacks.forEach((callback) => {
			callback();
		});
	}
}
