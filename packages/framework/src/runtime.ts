import 'dill-pixel-globals';
import { create } from './core/create';
import type { AppConfig } from './core/types';
import type { AppTypeOverrides } from './utils';

type App = AppTypeOverrides['App'];

async function bootstrap() {
  // 1. Find and load dill-pixel.config.ts
  const configs = import.meta.glob('/dill-pixel.config.ts', {
    eager: true,
    import: 'default',
  });

  const configPath = Object.keys(configs)[0];

  if (!configPath) {
    throw new Error('dill-pixel.config.ts not found in project root.');
  }
  const config = configs[configPath] as Partial<AppConfig>;

  // 2. Create the application
  const app = await create(config);

  // 3. Find and load src/main.ts
  const mains = import.meta.glob('/src/main.ts', {
    eager: true,
  });

  const mainPath = Object.keys(mains)[0];

  if (mainPath) {
    const mainModule = mains[mainPath] as { default?: unknown };

    if (mainModule && typeof mainModule.default === 'function') {
      const main = mainModule.default;
      await (main as (app: App) => Promise<void> | void)(app);
    }
  }
}

void bootstrap();
