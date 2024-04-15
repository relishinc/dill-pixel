import { Application } from '@/Application';
import { create } from '@relish-studios/dill-pixel';

// no auto scaling
// create(Application, {
//   useSpine: true,
//   showStatsInProduction: true,
//   antialias: false,
// });

// auto scales after min size threshold (better)
create(
  Application,
  {
    useSpine: true,
    showStatsInProduction: true,
    antialias: false,
    useNewResizeManager: true,
    resizeOptions: {
      minSize: { width: 960, height: 600 },
    },
    autoDensity: false,
  },
  Application.containerID,
  false,
);
