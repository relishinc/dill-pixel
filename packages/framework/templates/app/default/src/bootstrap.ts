import { __APPLICATION_NAME__ } from '@/__APPLICATION_NAME__';
import { config } from '@/dill-pixel.config';
import { create } from 'dill-pixel';
import 'dill-pixel-globals'; // required for globals like the scenes list

/**
 * UNCOMMENT THIS TO ENABLE PWA
 */
// import { pwaInfo } from 'virtual:pwa-info';
// import { registerSW } from 'virtual:pwa-register';

// registerSW({
//   immediate: true,
//   onNeedRefresh() {
//     console.log('onNeedRefresh message should not appear');
//   },
//   onOfflineReady() {
//     console.log('onOfflineReady message should not appear');
//   },
// });

// console.log({ pwa: pwaInfo });
/**
 * UNCOMMENT THIS TO ENABLE PWA
 */

/**
 * Bootstrap the application
 */
async function bootstrap() {
  await create<__APPLICATION_NAME__>(config, __APPLICATION_NAME__);
}

void bootstrap();
