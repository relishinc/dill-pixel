export enum DillPixelEvent {
  REQUIRED_ASSETS_START = 'dill-pixel-required-assets-start',
  REQUIRED_ASSETS_PROGRESS = 'dill-pixel-required-assets-progress',
  REQUIRED_ASSETS_COMPLETE = 'dill-pixel-required-assets-complete',
  ASSETS_START = 'dill-pixel-assets-start',
  ASSETS_PROGRESS = 'dill-pixel-assets-progress',
  ASSETS_COMPLETE = 'dill-pixel-assets-complete',
}

export type DillPixelProgressEvent = CustomEvent<{ progress: number }>;
