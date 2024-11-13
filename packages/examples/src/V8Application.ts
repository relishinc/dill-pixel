import { Application, create, DataSchema } from 'dill-pixel';

import { Actions, controls } from '@/controls';
import EN from '@/locales/en';
import { Transition } from '@/Transition';
import { IGoogleAnalyticsPlugin } from '@dill-pixel/plugin-google-analytics/GoogleAnalyticsPlugin';
import { IFirebaseAdapter } from '@dill-pixel/storage-adapter-firebase';
import manifest from './assets.json';
import { ExampleOutliner } from './ui/ExampleOutliner';

interface MyDataSchema extends DataSchema {
  foo?: string;
  bar?: number;
  saved?: string;
  baz?: {
    qux?: boolean;
    quux?: string[];
  };
}

type MyEvents = {
  foo: { bar: string; baz: number; qux: boolean };
};

// interface MyEvents extends GAEvents {
//   foo: { bar: string; baz: number; qux: boolean };
// }

export class V8Application extends Application<MyDataSchema, Actions> {
  get firebase(): IFirebaseAdapter {
    return this.store.getAdapter('firebase') as IFirebaseAdapter;
  }

  get analytics(): IGoogleAnalyticsPlugin<MyEvents> {
    return this.getPlugin('analytics') as IGoogleAnalyticsPlugin<MyEvents>;
  }
}

async function boot() {
  const app = await create<V8Application, MyDataSchema>(
    {
      id: 'V8Application',
      // splash: {
      //   view: Splash,
      //   hideWhen: 'firstSceneEnter',
      // },
      sceneTransition: Transition,
      defaultSceneLoadMethod: 'transitionExitEnter',
      useSpine: true,
      showStats: true,
      showSceneDebugMenu: true,
      useHash: true,
      useVoiceover: true,
      data: {
        initial: {
          saved: 'QUX',
        },
        backupKeys: ['saved'],
      },
      focus: {
        outliner: ExampleOutliner,
      },
      input: {
        controls,
      },
      assets: {
        manifest: manifest,
        preload: {
          bundles: ['required', 'game'],
        },
        background: {
          bundles: ['audio', 'spine'],
        },
      },
      plugins: [
        {
          id: 'analytics',
          module: () => import('@dill-pixel/plugin-google-analytics'),
        },
        {
          id: 'springroll',
          module: () => import('@dill-pixel/plugin-springroll'),
        },
        {
          id: 'physics',
          module: () => import('@dill-pixel/plugin-snap-physics'),
          options: {
            useSpatialHashGrid: false,
            gridCellSize: 300,
          },
          autoLoad: false,
        },
        {
          id: 'arcade',
          module: () => import('@dill-pixel/plugin-arcade-physics'),
          options: {
            debug: true,
            useTree: true,
          },
          autoLoad: false,
        },
        {
          id: 'matter',
          module: () => import('@dill-pixel/plugin-matter-physics'),
          options: {
            debug: true,
          },
          autoLoad: false,
        },
        {
          id: 'rive',
          module: () => import('@dill-pixel/plugin-rive'),
          autoLoad: false,
        },
        {
          id: 'rollbar',
          module: () => import('@dill-pixel/plugin-rollbar'),
          options: {
            isDev: import.meta.env.MODE === 'development',
            environment: import.meta.env.MODE,
          },
        },
      ],
      storageAdapters: [
        {
          id: 'firebase',
          namedExport: 'FirebaseAdapter',
          module: () => import('@dill-pixel/storage-adapter-firebase'),
        },
      ],
      scenes: [
        {
          id: 'assets',
          debugGroup: 'Framework',
          debugLabel: 'Assets',
          namedExport: 'AssetScene',
          module: () => import('@/scenes/AssetScene'),
        },
        {
          id: 'audio',
          debugGroup: 'Audio',
          debugLabel: 'Music & SFX',
          namedExport: 'AudioScene',
          module: () => import('@/scenes/AudioScene'),
        },
        {
          id: 'voiceover',
          debugGroup: 'Audio',
          debugLabel: 'Voiceover & Captions',
          namedExport: 'VoiceoverScene',
          module: () => import('@/scenes/VoiceoverScene'),
        },
        {
          id: 'focus',
          debugGroup: 'Accessibility',
          debugLabel: 'Focus Management',
          namedExport: 'FocusScene',
          module: () => import('@/scenes/FocusScene'),
        },
        {
          id: 'ui-input',
          debugGroup: 'UI',
          debugLabel: 'Input',
          namedExport: 'UIScene',
          module: () => import('@/scenes/UIScene'),
        },
        {
          id: 'ui-flexContainer',
          debugGroup: 'UI',
          debugLabel: 'Flex Container',
          namedExport: 'FlexContainerScene',
          module: () => import('@/scenes/FlexContainerScene'),
        },
        {
          id: 'ui-canvas',
          debugGroup: 'UI',
          debugLabel: 'UICanvas',
          namedExport: 'UICanvasScene',
          module: () => import('@/scenes/UICanvasScene'),
        },
        {
          id: 'ui-popup',
          debugGroup: 'UI',
          debugLabel: 'Popups',
          namedExport: 'PopupScene',
          module: () => import('@/scenes/PopupScene'),
        },
        {
          id: 'animated-sprites',
          debugGroup: 'Display',
          debugLabel: 'Animated Sprites',
          namedExport: 'AnimatedSpriteScene',
          module: () => import('@/scenes/AnimatedSpriteScene'),
          assets: {
            preload: {
              bundles: ['platformer'],
            },
          },
        },
        {
          id: 'spine',
          debugGroup: 'Display',
          debugLabel: 'Spine Animations',
          namedExport: 'SpineScene',
          assets: {
            preload: {
              bundles: ['spine'],
            },
          },
          module: () => import('@/scenes/SpineScene'),
        },

        {
          id: 'firebase',
          debugGroup: 'Storage Adapters',
          debugLabel: 'Firebase',
          namedExport: 'FirebaseAdapterScene',
          module: () => import('@/scenes/FirebaseAdapterScene'),
        },
        {
          id: 'snap-physics',
          debugGroup: 'Physics',
          debugLabel: 'Snap - Level & Camera',
          namedExport: 'SnapPhysicsScene',
          module: () => import('@/scenes/SnapPhysicsScene'),
          plugins: ['physics'],
          assets: {
            preload: {
              bundles: ['spine'],
            },
          },
        },
        {
          id: 'snap-collisions',
          debugGroup: 'Physics',
          debugLabel: 'Snap - Body types & Collisions',
          namedExport: 'SnapCollisionsScene',
          module: () => import('@/scenes/SnapCollisionsScene'),
          plugins: ['physics'],
        },
        {
          id: 'snap-projectiles',
          debugGroup: 'Physics',
          debugLabel: 'Snap - Projectiles',
          namedExport: 'SnapProjectileScene',
          module: () => import('@/scenes/SnapProjectileScene'),
          plugins: ['physics'],
        },
        {
          id: 'snap-endless-runner',
          debugGroup: 'Physics',
          debugLabel: 'Snap - Endless Runner',
          namedExport: 'SnapEndlessRunnerScene',
          module: () => import('@/scenes/SnapEndlessRunnerScene'),
          plugins: ['physics'],
          assets: {
            preload: {
              bundles: ['spine'],
            },
          },
        },
        {
          id: 'arcade-physics',
          debugGroup: 'Physics',
          debugLabel: 'Arcade',
          namedExport: 'ArcadePhysicsScene',
          module: () => import('@/scenes/ArcadePhysicsScene'),
          plugins: ['arcade'],
          assets: {
            preload: {
              bundles: ['spine', 'game'],
            },
          },
        },
        {
          id: 'matter-physics',
          debugGroup: 'Physics',
          debugLabel: 'Matter JS',
          namedExport: 'MatterPhysicsScene',
          module: () => import('@/scenes/MatterPhysicsScene'),
          plugins: ['matter'],
          assets: {
            preload: {
              bundles: ['spine', 'game'],
            },
          },
        },
        {
          id: 'rive',
          debugGroup: 'Rive',
          debugLabel: 'Rive (Various)',
          namedExport: 'RiveScene',
          module: () => import('@/scenes/RiveScene'),
          plugins: ['rive'],
          autoUnloadAssets: true,
          assets: {
            preload: {
              assets: [
                {
                  alias: 'vehicles',
                  src: 'https://cdn.rive.app/animations/vehicles.riv',
                },
                { alias: 'reactions', src: 'static/reactions_v3.riv' },
                { alias: 'skins', src: 'static/skins_demo.riv' },
                { alias: 'cup', src: 'static/cup.riv' },
                { alias: 'marty', src: 'static/marty.riv' },
              ],
            },
          },
        },
      ],
      i18n: {
        loadAll: true,
        locales: ['en', 'fr', 'fr-json'],
        files: [
          { id: 'en', module: EN },
          { id: 'fr', module: () => import('@/locales/fr') },
          { id: 'fr-json', json: '/locales/fr.json' },
        ],
      },
      captions: {
        files: [
          { id: 'en', json: 'audio/vo/en/cc.json' },
          { id: 'fr', json: 'audio/vo/fr/cc.json' },
        ],
        backgroundAlpha: 0.5,
        backgroundColor: 0x0,
        textColor: 0xffffff,
        maxWidth: 0.4,
      },
    },
    V8Application,
  );

  // test data adapter
  console.log('data', JSON.stringify(app.data.get(), null, 2));
  app.data.set({ baz: { quux: ['a', 'b', 'c'] } });
  console.log('data', JSON.stringify(app.data.get(), null, 2));
  app.data.clear('baz');
  console.log('data', JSON.stringify(app.data.get(), null, 2));
  app.data.save('saved', 'FOOBARBAZ');
  console.log('data', JSON.stringify(app.data.get(), null, 2));

  app.analytics.trackEvent('foo', { bar: 'baz', baz: 1, qux: true });

  function populateSidebar() {
    // populate sidebar
    const sidebar = document.getElementById('sidebar');
    const nav = sidebar?.querySelector('nav');

    const scenes = app.scenes.ids.filter((scene: string) => scene !== 'Interstitial');

    const defaultScene = app.scenes.defaultScene;

    if (nav) {
      // add examples to sidebar nav
      // get list groups
      const groups: Set<string> = new Set();
      const groupLists: Map<string, HTMLUListElement> = new Map();
      scenes.forEach((scene) => {
        const item = app.scenes.list.find((s) => s.id === scene);
        const group = item?.debugGroup;
        if (group) {
          groups.add(group);
        }
      });
      if (groups.has('Other')) {
        // move 'Other' to the end of the set
        groups.delete('Other');
        groups.add('Other');
      }
      Array.from(groups).forEach((groupName) => {
        const ul = document.createElement('ul');
        ul.id = groupName;
        groupLists.set(groupName, ul);
        const li: HTMLLIElement = document.createElement('li');
        const h3: HTMLHeadingElement = document.createElement('h3');
        h3.innerHTML = groupName;
        ul.appendChild(li);
        li.appendChild(h3);
        nav.appendChild(ul);
      });
      scenes.forEach((scene: string) => {
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        const item = app.scenes.list.find((s) => s.id === scene);
        if (!item) {
          return;
        }
        a.innerHTML = item.debugLabel || item.id;
        a.href = `#${scene}`;
        if (item.debugGroup && groupLists.has(item.debugGroup)) {
          const li: HTMLLIElement = document.createElement('li');
          li.appendChild(a);
          groupLists.get(item.debugGroup)?.appendChild(li);
        } else {
          nav.appendChild(a);
        }
        a.addEventListener('click', () => {
          if (a.classList.contains('active')) {
            return;
          }
          nav.classList.add('disabled');
        });
      });

      // update active nav item
      const setActiveNavItem = (state: string | undefined) => {
        const active = nav?.querySelector('.active');
        if (active) {
          active.classList.remove('active');
        }

        const a = nav?.querySelector(`a[href="#${state}"]`);
        if (a) {
          a.classList.add('active');
        }
      };

      // check hash for active example and update nav
      const checkHash = () => {
        const scene = app.scenes.getSceneFromHash();
        setActiveNavItem(scene ?? defaultScene);
      };
      window.addEventListener('hashchange', checkHash);

      // disable nav initially
      nav.classList.add('disabled');

      app.signal.onSceneChangeComplete.connect(() => {
        nav?.classList.remove('disabled');
      });
      checkHash();
    }
  }
  populateSidebar();
}

void boot();
