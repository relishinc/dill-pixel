import { V8Application } from '@/V8Application';
import { create, LocalStorageAdapter, Logger } from 'dill-pixel';
import manifest from './assets.json';

const app = await create(V8Application, {
  id: 'V8Application',
  backgroundColor: 0x0,
  backgroundAlpha: 1,
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
    // { id: 'rive', namedExport: 'RiveScene', module: () => import('@/scenes/RiveScene') },
    // { id: 'spine', namedExport: 'SpineScene', module: () => import('@/scenes/SpineScene') },
  ],
  defaultSceneLoadMethod: 'exitEnter',
});

Logger.log('V8Application created', app);
Logger.log('V8Application renderer', app.renderer);
Logger.log('global signals', app.globalSignals);
Logger.log('global functions', app.globalFunctions);

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
