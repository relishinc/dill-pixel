import { create } from 'dill-pixel';
import { Application } from './Application';
import './index.css';

// Create the application
create(Application, {
  antialias: false,
  resizeOptions: {
    minSize: { width: 375, height: 700 },
  },
  resolution: Math.max(window.devicePixelRatio, 2),
  backgroundColor: 0x0,
});
