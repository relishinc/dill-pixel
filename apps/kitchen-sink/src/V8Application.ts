import { IGoogleAnalyticsPlugin } from '@dill-pixel/plugin-google-analytics/GoogleAnalyticsPlugin';
import { IFirebaseAdapter } from '@dill-pixel/storage-adapter-firebase';
import { Application } from 'dill-pixel';
import { type ActionTypes, type AnalyticsEvents, type Contexts, type Data } from './dill-pixel.config';
export class V8Application extends Application<Data, Contexts, ActionTypes> {
  get firebase(): IFirebaseAdapter {
    return this.store.getAdapter('firebase') as unknown as IFirebaseAdapter;
  }

  get analytics(): IGoogleAnalyticsPlugin<AnalyticsEvents> {
    return this.getPlugin('analytics') as unknown as IGoogleAnalyticsPlugin<AnalyticsEvents>;
  }

  setup() {
    this.actions('toggle_pause').connect((detail) => this.togglePause(detail.data), 'highest');
    this.actions('show_popup').connect((detail) => this.popups.showPopup(detail.id, detail.data));
  }
}
