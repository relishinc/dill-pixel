import { Application, create, isDev, LocalStorageAdapter } from 'dill-pixel';

// import { Splash } from '@/Splash';
import { ActionName, controls } from '@/controls';
import manifest from './assets.json';

export class MyApplication extends Application {
  // strongly type actions (wip)
  actions(name: ActionName) {
    return super.actions(name);
  }
}

async function boot() {
  await create(
    {
      id: 'MyApplication',
      // splash: {
      //   view: Splash,
      //   hideWhen: 'firstSceneEnter',
      // },
      showStats: isDev,
      showSceneDebugMenu: isDev,
      useHash: isDev,
      useSpine: false,
      useVoiceover: false,
      defaultSceneLoadMethod: 'immediate',
      input: {
        controls,
      },
      assets: {
        manifest,
        preload: {
          bundles: ['required'],
        },
        background: {
          bundles: [],
        },
      },
      plugins: [],
      storageAdapters: [{ id: 'local', module: LocalStorageAdapter, options: { namespace: 'myDillPixelApp' } }],
      scenes: [
        {
          id: 'start',
          debugLabel: 'Start',
          namedExport: 'StartScene',
          module: () => import('@/scenes/StartScene'),
        },
      ],
    },
    MyApplication,
  );
}

void boot();
