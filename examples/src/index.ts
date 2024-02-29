import { V8Application } from '@/V8Application';
import { create, LocalStorageAdapter, Logger } from 'dill-pixel';
import manifest from './assets.json';

const app = await create(V8Application, {
  id: 'V8Application',
  backgroundColor: 0x0,
  backgroundAlpha: 1,
  manifest,
  modules: [
    { id: 'TestModule', module: () => import('@/modules/TestModule'), options: { foo: 'bar' } },
    // { id: 'test', module: TestModule, options: { test: 'bar' } },
  ],
  storageAdapters: [
    { id: 'local', module: LocalStorageAdapter, options: { namespace: 'v8app' } },
    { id: 'TestAdapter', module: () => import('@/adapters/TestAdapter'), options: { foo: 'bar' } },
    // { id: 'test', module: TestAdapter, options: { test: 'bar' } },
  ],
  scenes: [
    { id: 'TestScene', module: () => import('@/scenes/TestScene') },
    { id: 'TestScene2', module: () => import('@/scenes/TestScene2') },
  ],
  defaultSceneLoadMethod: 'exitEnter',
});

Logger.log('V8Application created', app);
Logger.log('global signals', app.globalSignals);
Logger.log('global functions', app.globalFunctions);

// global signal registry
app.on('sceneChangeComplete').connect(() => {
  console.log('sceneChangeComplete');
});

// global function registry
app.func('onKeyDown', 'enter').connect(() => {
  console.log('global onKeyDown: enter pressed');
});
