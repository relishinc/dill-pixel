import EN from '@/locales/en';
import { scenes } from '@/scenes';
import { V8Application } from '@/V8Application';
import { create, LocalStorageAdapter, Logger } from 'dill-pixel';
import manifest from './assets.json';

const app = await create(V8Application, {
  id: 'V8Application',
  manifest: manifest,
  plugins: [
    {
      id: 'physics',
      namedExport: 'TowerFallPhysicsPlugin',
      module: () => import('../../src/plugins/physics/towerfall'),
      autoLoad: false,
    },
  ],
  storageAdapters: [
    { id: 'local', module: LocalStorageAdapter, options: { namespace: 'v8app' } },
    { id: 'test', module: () => import('@/adapters/TestAdapter'), options: { foo: 'bar' } },
  ],
  scenes: scenes,
  i18n: {
    loadAll: true,
    locales: ['en', 'fr', 'fr-json'],
    files: [
      { id: 'en', module: EN },
      { id: 'fr', module: () => import('@/locales/fr') },
      { id: 'fr-json', json: '/locales/fr.json' },
    ],
  },
  resizer: {
    minSize: { width: 960, height: 600 },
  },
  defaultSceneLoadMethod: 'exitEnter',
  useSpine: true,
  showStats: true,
});

// Core signals / functions testing
Logger.log('V8Application created', app);
Logger.log('global signals', app.globalSignals);
Logger.log('global functions', app.globalFunctions);

// i18n testing
/*
Logger.log('en:', app.i18n.t('foo', { variant: 'random' }), 'fr:', app.i18n.t('foo', null, 'fr'));
Logger.log(app.i18n.t('replace', { test: 'win' }));
Logger.log(app.i18n.t('obj'));
Logger.log(app.i18n.t('foo', null, 'fr-json'));
Logger.log(app.i18n.parse(`This is some cool {foo}.`));
*/

/*
// global signal registry
app.on('sceneChangeComplete').connect(() => {
  console.log('sceneChangeComplete');
});

// global function registry
app.func('onKeyDown', 'enter').connect(() => {
  console.log('global onKeyDown: enter pressed');
}, -1);
*/
