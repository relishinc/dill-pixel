import { V8Application } from '@/V8Application';
import { create, LocalStorageAdapter, Logger } from 'dill-pixel';

const app = await create(V8Application, {
  id: 'V8Application',
  backgroundColor: 0x0,
  backgroundAlpha: 1,
  storageAdapters: [LocalStorageAdapter],
  scenes: [
    { id: 'TestScene', module: await import('@/scenes/TestScene') },
    { id: 'TestScene2', module: await import('@/scenes/TestScene2') },
  ],
});

Logger.log('V8Application created', app);
