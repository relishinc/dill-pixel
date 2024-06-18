import { Application, create, LocalStorageAdapter } from 'dill-pixel';

import EN from '@/locales/en';
import { ExampleOutliner } from './ui/ExampleOutliner';
import { IFirebaseAdapter } from '@dill-pixel/storage-adapter-firebase';
import { controls } from '@/controls';
import manifest from './assets.json';

export class V8Application extends Application {
  get firebase(): IFirebaseAdapter {
    return this.store.getAdapter('firebase') as unknown as IFirebaseAdapter;
  }
}

async function boot() {
  const app = await create(
    {
      id: 'V8Application',
      antialias: true,
      resizer: {
        minSize: { width: 500, height: 800 },
      },
      defaultSceneLoadMethod: 'exitEnter',
      useSpine: true,
      showStats: true,
      showSceneDebugMenu: true,
      useHash: true,
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
        { id: 'local', module: LocalStorageAdapter, options: { namespace: 'v8app' } },
        {
          id: 'firebase',
          namedExport: 'FirebaseAdapter',
          module: () => import('@dill-pixel/storage-adapter-firebase'),
        },
      ],
      scenes: [
        {
          id: 'ui',
          debugLabel: 'UI',
          namedExport: 'UIScene',
          module: () => import('@/scenes/UIScene'),
        },
        {
          id: 'assets',
          debugLabel: 'Assets',
          namedExport: 'AssetScene',
          module: () => import('@/scenes/AssetScene'),
        },
        {
          id: 'audio',
          debugLabel: 'Audio',
          namedExport: 'AudioScene',
          module: () => import('@/scenes/AudioScene'),
        },
        {
          id: 'voiceover',
          debugLabel: 'Voiceover / Captions',
          namedExport: 'VoiceoverScene',
          module: () => import('@/scenes/VoiceoverScene'),
        },
        {
          id: 'focus',
          debugLabel: 'Focus Management',
          namedExport: 'FocusScene',
          module: () => import('@/scenes/FocusScene'),
        },
        {
          id: 'firebase',
          debugLabel: 'Firebase Adapter',
          namedExport: 'FirebaseAdapterScene',
          module: () => import('@/scenes/FirebaseAdapterScene'),
        },
        {
          id: 'popups',
          debugLabel: 'Popup Management',
          namedExport: 'PopupScene',
          module: () => import('@/scenes/PopupScene'),
        },
        {
          id: 'animated-sprites',
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
          debugLabel: 'Spine Testing',
          namedExport: 'SpineScene',
          assets: {
            preload: {
              bundles: ['spine'],
            },
          },
          module: () => import('@/scenes/SpineScene'),
        },
        {
          id: 'flexContainer',
          debugLabel: 'Flex Container',
          namedExport: 'FlexContainerScene',
          module: () => import('@/scenes/FlexContainerScene'),
        },
        {
          id: 'uiCanvas',
          debugLabel: 'UICanvas',
          namedExport: 'UICanvasScene',
          module: () => import('@/scenes/UICanvasScene'),
        },
        {
          id: 'snap-physics',
          debugLabel: 'Snap Physics',
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
          id: 'snap-endless-runner',
          debugLabel: 'Snap Physics - Endless Runner',
          namedExport: 'EndlessRunnerScene',
          module: () => import('@/scenes/EndlessRunnerScene'),
          plugins: ['physics'],
          assets: {
            preload: {
              bundles: ['spine'],
            },
          },
        },
        {
          id: 'arcade-physics',
          debugLabel: 'Arcade Physics',
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
          debugLabel: 'Matter Physics',
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
          debugLabel: 'Rive',
          namedExport: 'RiveScene',
          module: () => import('@/scenes/RiveScene'),
          plugins: ['rive'],
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

  // populate sidebar
  const sidebar = document.getElementById('sidebar');
  const nav = sidebar?.querySelector('nav');

  const scenes = app.scenes.ids.filter((scene: string) => scene !== 'Interstitial');

  const defaultScene = app.scenes.defaultScene;

  if (nav) {
    // add examples to sidebar nav
    scenes.forEach((scene: string) => {
      const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
      const item = app.scenes.list.find((s) => s.id === scene);
      if (!item) {
        return;
      }
      a.innerText = item.debugLabel || item.id;
      a.href = `#${scene}`;
      nav.appendChild(a);
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

void boot();
