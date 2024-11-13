import { Application, create, DataSchema, isDev } from 'dill-pixel';

// import { Splash } from '@/Splash';
import { Actions, controls } from '@/controls';
import manifest from './assets.json';

interface DataSchema extends DataSchema {
  dill?: string;
}

export class MyApplication extends Application<DataSchema, Actions> {}

async function boot() {
  await create<MyApplication, DataSchema>(
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
        //backupAll: true,
        //backupKeys: ['dill'],
      },
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
