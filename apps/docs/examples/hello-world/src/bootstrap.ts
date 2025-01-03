import { config } from '@/dill-pixel.config';
import { create } from 'dill-pixel';
import 'dill-pixel-globals';

/**
 * Bootstrap the application
 */
async function bootstrap() {
  await create<MyApplication>(config, MyApplication);
}

void bootstrap();
