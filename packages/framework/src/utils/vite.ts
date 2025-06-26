import { Logger } from './console';

interface ViteError {
  message: string;
  stack?: string;
  /**
   * The file path that caused the error, e.g., /src/main.ts
   */
  id?: string;
  /**
   * The line number of the error
   */
  line?: number;
  /**
   * The column number of the error
   */
  column?: number;
}

/**
 * Triggers the Vite error overlay with a custom error during development.
 * This is a no-op in production builds.
 *
 * @param error The error object or a simple message string to display.
 */
export function triggerViteError(error: ViteError | string): void {
  // Only run in development mode

  if (import.meta.env.DEV) {
    const errorData = typeof error === 'string' ? { message: error } : error;

    // Use Vite's HMR API to send a custom event to the server
    if (import.meta.hot) {
      import.meta.hot.send('dill-pixel:show-error', { error: errorData });
    } else {
      console.error('Vite HMR is not available. Could not show error overlay.', errorData);
    }
  }

  Logger.error(error);
}
