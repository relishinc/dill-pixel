import { DillPixelApplicationOptions } from './AppConfig';
import { Application } from './Application';
/**
 * Utility function to create an instance of the Application class.
 * @param ApplicationClass - The class of the application.
 * @param config - The configuration options for the application.
 * @param domElement - The DOM element for the application.
 * @param resizeToDOMElement - Whether to resize to the DOM element.
 * @returns An instance of the Application class.
 * @example const app = await create(MyApplication, {
 *   useSpine: true,
 *   resizeOptions: {
 *     minSize: { width: 375, height: 700 },
 *   },
 * });
 */
export declare function create<T extends Application = Application>(ApplicationClass: typeof Application, config?: Partial<DillPixelApplicationOptions>, domElement?: string | HTMLElement, resizeToDOMElement?: boolean): Promise<T> | T;
//# sourceMappingURL=create.d.ts.map