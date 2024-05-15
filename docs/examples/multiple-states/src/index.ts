import { Application } from './Application';
import { create } from '@relish-studios/dill-pixel';
import './index.css';

create(
  Application,
  {
    antialias: false,
    useNewResizeManager: true,
    resizeOptions: {
      minSize: { width: 375, height: 700 },
    },
    autoDensity: false,
  },
  Application.containerID,
);
