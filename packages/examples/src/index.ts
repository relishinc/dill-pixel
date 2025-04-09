import { pwaInfo } from 'virtual:pwa-info';
import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('onNeedRefresh message should not appear');
  },
  onOfflineReady() {
    console.log('onOfflineReady message should not appear');
  },
});

console.log({ pwa: pwaInfo });

import('@/bootstrap');
