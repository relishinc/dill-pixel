import { create } from 'dill-pixel';
import { Application } from './Application';
import './index.css';

create(
  Application,
  {
    antialias: false,
    useNewResizeManager: true,
    autoDensity: false,
    resizeOptions: {
      minSize: { width: 375, height: 700 },
    },
    resolution: Math.max(window.devicePixelRatio, 2),
    backgroundColor: 0x0,
  },
  Application.containerID,
  false,
);
