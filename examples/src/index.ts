import { Application } from '@/Application';
import { create } from 'dill-pixel';

create(Application, {
  useSpine: true,
  showStatsInProduction: true,
  antialias: false,
});
