import { create, Logger } from 'dill-pixel';
import { Application } from './Application';
import { StartScene } from './scenes/StartScene';

const app = await create(Application, {
  id: 'MyApplication',
  backgroundColor: 0x0,
  backgroundAlpha: 1,
  defaultSceneLoadMethod: 'exitEnter',
  scenes: [{ id: 'start', module: StartScene }],
});

Logger.log('Dill Pixel Application created', app);
