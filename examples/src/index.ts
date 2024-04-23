import EN from '@/locales/en';
import { V8Application } from '@/V8Application';
import { create, LocalStorageAdapter, Logger } from 'dill-pixel';
import { InputContext } from '../../src/modules/input/InputManager.ts';
import manifest from './assets.json';

const app = await create(V8Application, {
  id: 'V8Application',
  backgroundColor: 0x0,
  backgroundAlpha: 1,
  resizeToContainer: false,
  manifest,
  modules: [
    { id: 'test', module: () => import('@/modules/TestModule'), options: { foo: 'bar' } },
    { id: 'rive', module: () => import('@/modules/RiveModule') },
  ],
  storageAdapters: [
    { id: 'local', module: LocalStorageAdapter, options: { namespace: 'v8app' } },
    { id: 'test', module: () => import('@/adapters/TestAdapter'), options: { foo: 'bar' } },
  ],
  scenes: [
    { id: 'audio', namedExport: 'AudioScene', module: () => import('@/scenes/AudioScene.ts') },
    { id: 'focus', namedExport: 'FocusScene', module: () => import('@/scenes/FocusScene') },
    { id: 'cam', namedExport: 'CameraScene', module: () => import('@/scenes/CameraScene') },
    { id: 'popups', namedExport: 'PopupScene', module: () => import('@/scenes/PopupScene') },
    { id: 'spine', namedExport: 'SpineScene', module: () => import('@/scenes/SpineScene') },
    { id: 'flexContainer', namedExport: 'FlexContainerScene', module: () => import('@/scenes/FlexContainerScene') },
    { id: 'uiCanvas', namedExport: 'UICanvasScene', module: () => import('@/scenes/UICanvasScene') },
    // { id: 'rive', namedExport: 'RiveScene', module: () => import('@/scenes/RiveScene') },
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
  resizer: {
    minSize: { width: 960, height: 600 },
  },
  defaultSceneLoadMethod: 'exitEnter',
  useSpine: true,
});

// Core signals / functions testing
Logger.log('V8Application created', app);
Logger.log('V8Application renderer', app.renderer);
Logger.log('global signals', app.globalSignals);
Logger.log('global functions', app.globalFunctions);

// actions testing
app.actions('up').connect(() => {
  console.log('up action');
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    app.sendAction('up');
  }
});

app.signal.onControllerActivated.connect((controller: string) => {
  console.log('controller activated:', controller);
});

app.actionContext = InputContext.Game;

app.signal.onSceneChangeComplete.connect(async (detail: { current: string }) => {
  console.log('sceneChangeComplete', detail.current);
});


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
