import { BaseState } from '@/state/BaseState';
import { delay, Signal } from '@relish-studios/dill-pixel';
import { IPoint } from 'pixi.js';

export class SignalsExample extends BaseState {
  public static get NAME(): string {
    return 'SignalsExample';
  }

  public static get Assets() {
    return [];
  }

  async init(pSize: IPoint) {
    super.init(pSize);

    this.setHeaderText('Signals Example');
    this.setMainText('Check the console');

    // register the popup
    this.eventMode = 'static';

    const signal = new Signal<(test: string) => void>();

    this.addSignalConnection(
      signal.connectOnce((test: string) => {
        console.log('ONCE', test);
      }, 1),
    );

    // this.disconnectAllSignals();
    signal.connect((test: string) => {
      console.log('MULTIPLE', test);
    }, 0);

    signal.connectNTimes(
      (test: string) => {
        console.log('N TIMES', test);
      },
      2,
      -1,
    );

    signal.emit('first time');
    await delay(1);
    signal.emit('second time');
    await delay(1);
    signal.emit('third time');
    await delay(1);
    signal.emit('fourth time');
    await delay(1);
    signal.emit('fifth time');
  }
}
