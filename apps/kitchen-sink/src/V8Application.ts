import { IGoogleAnalyticsPlugin } from '@dill-pixel/plugin-google-analytics/GoogleAnalyticsPlugin';
import { IFirebaseAdapter } from '@dill-pixel/storage-adapter-firebase';
import { Application } from 'dill-pixel';
import { AnalyticsEvents } from 'dill-pixel.config';
export class V8Application extends Application {
  get firebase(): IFirebaseAdapter {
    return this.store.getAdapter('firebase') as unknown as IFirebaseAdapter;
  }

  get analytics(): IGoogleAnalyticsPlugin<AnalyticsEvents> {
    return this.getPlugin('google-analytics') as unknown as IGoogleAnalyticsPlugin<AnalyticsEvents>;
  }

  setup() {
    this.actions('toggle_pause').connect((detail) => this.togglePause(detail.data), 'highest');
    this.actions('show_popup').connect((detail) => this.popups.showPopup(detail.id, detail.data));
  }
}
