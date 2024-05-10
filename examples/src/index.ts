import { Application } from '@/Application';
import { create } from '@relish-studios/dill-pixel'; // no auto scaling

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
      minSize: { width: 375, height: 700 },
    },
    autoDensity: false,
  },
  Application.containerID,
  false,
);
