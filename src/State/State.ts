import {gsap} from 'gsap';
import {Container, Point} from 'pixi.js';
import {Application} from "../Application";
import * as Factory from "../Utils/Factory";
import {Layout, LayoutStyles} from "@pixi/layout";
import {LayoutOptions} from "@pixi/layout/lib/utils/types";

/**
 * State
 */
export abstract class State extends Container {
    public static DEFAULT_LAYOUT_STYLES: LayoutStyles = {
        root: {
            position: "center",
            textAlign: "center"
        },
        main: {
            display: 'block',
            height: '100%',
            width: "100%",
            position: "center",
            verticalAlign: "center",
        },
        header: {
            display: 'block',
            height: '10%',
            width: "100%",
            position: "top",
            verticalAlign: "top",
        },
        footer: {
            display: 'block',
            height: '5%',
            width: "100%",
            position: "bottom",
            textAlign: "right",
            verticalAlign: "bottom",
        },
    }
    public static DEFAULT_LAYOUT_OPTIONS: LayoutOptions = {
        id: "root",
        content: {
            header: {
                id: "header",
                content: {}
            },
            main: {
                id: "main",
                content: {}
            },
            footer: {
                id: "footer",
                content: {}
            },
        },
        globalStyles: State.DEFAULT_LAYOUT_STYLES
    }

    protected _layout: Layout;
    protected _size: Point;
    protected _addFactory: Factory.AddFactory;
    private _gsapContext: gsap.Context | null = null;

    protected constructor() {
        super();
        this._size = new Point();
        this._addFactory = new Factory.AddFactory(this);

        this.gsapContextRevert = this.gsapContextRevert.bind(this);
    }

    /**
     * gets the Applicationinstance
     */
    public get app(): Application {
        return Application.instance;
    }

    /**
     * gets the Add factory
     */
    public get add(): Factory.AddFactory {
        return this._addFactory;
    }

    /**
     * gets the Make factory
     */
    public get make(): Factory.MakeFactory {
        return this.app.make;
    }

    /**
     * Gets the GSAP animation context for this state
     */
    public get animationContext(): gsap.Context {
        if (!this._gsapContext) {
            this._gsapContext = gsap.context(() => {
                // add to the gsap context later if desired
                return this.gsapContextRevert;
            });
        }
        return this._gsapContext;
    }

    /**
     * Gets the current layout for the state, if it exists
     */
    get layout(): Layout {
        return this._layout;
    }

    getLayoutById(id: string): Layout | null {
        if (!this._layout) {
            return null;
        }
        return this._layout.content.getByID(id) as Layout;
    }

    /**
     * Gets default layout options
     */
    get defaultLayoutOptions(): LayoutOptions {
        return State.DEFAULT_LAYOUT_OPTIONS;
    }

    /**
     * Inits state
     * @param pSize{Point}
     * @param pData
     */
    public init(pSize: Point, pData?: any): void {
        this.onResize(pSize);
    }

    /**
     * Creates layout
     * see https://pixijs.io/layout/storybook/?path=/story/complex--application-layout for more info
     * @param options
     */
    public createLayout(options?: LayoutOptions) {
        const opts = Object.assign({}, this.defaultLayoutOptions, options);
        this._layout = new Layout(opts);
        this.onResize(this._size);
        this.layout.update()
        this.add.existing(this._layout);
    }

    /**
     * Updates state
     * @param pDeltaTime
     */
    public update(pDeltaTime: number): void {
        // override
        if (this._layout) {
            this._layout.update()
        }
    }

    /**
     * Determines whether resize on
     * @param pSize
     */
    public onResize(pSize: Point): void {
        this._size.copyFrom(pSize);
        this.position.set(this._size.x * 0.5, this._size.y * 0.5);
        if (this._layout) {
            this._layout.setStyles({width: this._size.x, height: this._size.y})
        }
    }

    /**
     * Animates in
     * @param pOnComplete
     */
    public animateIn(pOnComplete: () => void): void {
        pOnComplete();
    }

    /**
     * Animates out
     * @param pOnComplete
     */
    public animateOut(pOnComplete: () => void): void {
        pOnComplete();
    }

    /**
     * Destroys state.
     * @param pOptions
     */
    public destroy(
        pOptions: Parameters<typeof Container.prototype.destroy>[0] = {
            children: true,
        }
    ): void {
        super.destroy(pOptions);
        if (this._gsapContext) {
            this._gsapContext.revert();
        }
    }

    /**
     * Reverts the gsap context
     * override this to provide custom cleanup
     * @protected
     */
    protected gsapContextRevert() {
        // override me to provide custom gsap cleanup function
    }
}
