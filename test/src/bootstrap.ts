import { Test } from '@/Test';
import { config } from '@/dill-pixel.config';
import { create } from 'dill-pixel';
import 'dill-pixel-globals';

/**
 * Bootstrap the application
 */
async function bootstrap() {
  await create<Test>(config, Test);
}

void bootstrap();
