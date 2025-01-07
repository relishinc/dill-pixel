import { __APPLICATION_NAME__ } from '@/__APPLICATION_NAME__';
import { config } from '@/dill-pixel.config';
import { create } from 'dill-pixel';
import 'dill-pixel-globals'; // required for globals like the scenes list

/**
 * Bootstrap the application
 */
async function bootstrap() {
  await create<__APPLICATION_NAME__>(config, __APPLICATION_NAME__);
}

void bootstrap();
