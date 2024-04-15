import { IApplicationOptions } from 'pixi.js';
import { ResizeManagerOptions } from '../utils/ResizeManagerNew';
export declare class AppConfig {
    [key: string]: any;
    autoStart?: boolean;
    useSpine?: boolean;
    width?: number;
    height?: number;
    view?: HTMLCanvasElement;
    transparent?: boolean;
    autoDensity?: boolean;
    antialias?: boolean;
    preserveDrawingBuffer?: boolean;
    resolution?: number;
    forceCanvas?: boolean;
    backgroundColor?: number;
    clearBeforeRender?: boolean;
    forceFXAA?: boolean;
    powerPreference?: 'default' | 'high-performance' | 'low-power';
    sharedTicker?: boolean;
    sharedLoader?: boolean;
    resizeTo?: Window | HTMLElement;
    useNewResizeManager?: boolean;
    resizeOptions?: Partial<ResizeManagerOptions>;
    constructor(pConfig?: Partial<IApplicationOptions> & {
        [key: string]: any;
    });
}
//# sourceMappingURL=AppConfig.d.ts.map