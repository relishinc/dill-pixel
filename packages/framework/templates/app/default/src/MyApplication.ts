import { Application, create, isDev } from 'dill-pixel';

// import { Splash } from '@/Splash';
import manifest from './assets.json';
import { actions, controls, type ActionTypes, type Contexts, type Data } from './definitions';
export class MyApplication extends Application<Data, Contexts, ActionTypes> {}
async function boot() {
  await create<MyApplication, Data>(
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
      data: {
        initial: {
          dill: 'pixel',
        },
        // backupKeys: ['dill'],
        backupAll: false,
      },
      actions,
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
