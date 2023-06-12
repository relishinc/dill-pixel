"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
const gsap_1 = require("gsap");
const pixi_js_1 = require("pixi.js");
const Application_1 = require("../Application");
const Factory = __importStar(require("../Utils/Factory"));
const layout_1 = require("@pixi/layout");
/**
 * State
 */
class State extends pixi_js_1.Container {
    constructor() {
        super();
        this._gsapContext = null;
        this._size = new pixi_js_1.Point();
        this._addFactory = new Factory.AddFactory(this);
        this.gsapContextRevert = this.gsapContextRevert.bind(this);
    }
    /**
     * gets the Applicationinstance
     */
    get app() {
        return Application_1.Application.instance;
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
            this._gsapContext = gsap_1.gsap.context(() => {
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
    getLayoutById(id) {
        if (!this._layout) {
            return null;
        }
        return this._layout.content.getByID(id);
    }
    /**
     * Gets default layout options
     */
    get defaultLayoutOptions() {
        return State.DEFAULT_LAYOUT_OPTIONS;
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
        this._layout = new layout_1.Layout(opts);
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
exports.State = State;
//# sourceMappingURL=State.js.map