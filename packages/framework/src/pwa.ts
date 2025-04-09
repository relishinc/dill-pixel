import { pwaInfo } from 'virtual:pwa-info';
import { registerSW } from 'virtual:pwa-register';
import { Logger } from './utils';

/**
 * Register the PWA
 */
export function registerPWA() {
  Logger.log({ pwa: pwaInfo });
  registerSW({
    immediate: true,
    onNeedRefresh() {
      console.log('onNeedRefresh message should not appear');
    },
    onOfflineReady() {
      console.log('onOfflineReady message should not appear');
    },
  });
}
