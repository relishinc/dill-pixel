import { V8Application } from '@/V8Application';
import { create, LocalStorageAdapter } from 'dill-pixel/v8';

const app = await create(V8Application, {
  id: 'V8Application',
  backgroundColor: 0x0,
  backgroundAlpha: 1,
  storageAdapters: [LocalStorageAdapter],
});
