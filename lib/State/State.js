import { Layout } from "@pixi/layout";
import { gsap } from 'gsap';
import { Container, Point } from 'pixi.js';
import { Application } from "../Application";
import * as Factory from "../Utils/Factory";
/**
 * State
 */
export class State extends Container {
    constructor() {
        super();
        this._gsapContext = null;
        this._size = new Point();
        this._addFactory = new Factory.AddFactory(this);
        this.gsapContextRevert = this.gsapContextRevert.bind(this);
    }
    static get ID() {
        return "State";
    }
    static get Assets() {
        return [];
    }
    /**
     * gets the Applicationinstance
     */
    get app() {
        return Application.instance;
    }
    /**
     * gets the Add factory
     */
    get add() {
        return this._addFactory;
    }
    /**
     * gets the Make factory
     */
    get make() {
        return this.app.make;
    }
    /**
     * Gets the GSAP animation context for this state
     */
    get animationContext() {
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
    get layout() {
        return this._layout;
    }
    /**
     * Gets default layout options
     */
    get defaultLayoutOptions() {
        return State.DEFAULT_LAYOUT_OPTIONS;
    }
    getLayoutById(id) {
        if (!this._layout) {
            return null;
        }
        return this._layout.content.getByID(id);
    }
    /**
     * Inits state
     * @param pSize{Point}
     * @param pData
     */
    init(pSize, pData) {
        this.onResize(pSize);
    }
    /**
     * Creates layout
     * see https://pixijs.io/layout/storybook/?path=/story/complex--application-layout for more info
     * @param options
     */
    createLayout(options) {
        const opts = Object.assign({}, this.defaultLayoutOptions, options);
        this._layout = new Layout(opts);
        this.onResize(this._size);
        this.layout.update();
        this.add.existing(this._layout);
    }
    /**
     * Updates state
     * @param pDeltaTime
     */
    update(pDeltaTime) {
        // override
        if (this._layout) {
            this._layout.update();
        }
    }
    /**
     * Determines whether resize on
     * @param pSize
     */
    onResize(pSize) {
        this._size.copyFrom(pSize);
        this.position.set(this._size.x * 0.5, this._size.y * 0.5);
        if (this._layout) {
            this._layout.setStyles({ width: this._size.x, height: this._size.y });
        }
    }
    /**
     * Animates in
     * @param pOnComplete
     */
    animateIn(pOnComplete) {
        pOnComplete();
    }
    /**
     * Animates out
     * @param pOnComplete
     */
    animateOut(pOnComplete) {
        pOnComplete();
    }
    /**
     * Destroys state.
     * @param pOptions
     */
    destroy(pOptions = {
        children: true,
    }) {
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
    gsapContextRevert() {
        // override me to provide custom gsap cleanup function
    }
}
State.NAME = "State";
State.DEFAULT_LAYOUT_STYLES = {
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
};
State.DEFAULT_LAYOUT_OPTIONS = {
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
};
//# sourceMappingURL=State.js.map