import { Application } from '@/Application';
import { create } from 'dill-pixel';
import './index.css';

// create app
const app = await create(Application, {
  useSpine: true,
  showStats: true,
  showStateDebugMenu: false,
  useHashChange: true,
  resizeDebounce: 0.2,
  resizeOptions: {
    minSize: { width: 375, height: 700 },
  },
});

// populate sidebar
const sidebar = document.getElementById('sidebar');
const nav = sidebar?.querySelector('nav');
const states = app.state
  .getRegisteredStateIds()
  .filter((state) => state !== 'Interstitial')
  .sort((a, b) => a.localeCompare(b));
const defaultState = app.state.default;

if (nav) {
  // add examples to sidebar nav
  states.forEach((state) => {
    const a = document.createElement('a');
    a.innerText = state;
    a.href = `#${state}`;
    nav.appendChild(a);
    a.addEventListener('click', (e) => {
      if (e.target.classList.contains('active')) {
        return;
      }
      nav.classList.add('disabled');
    });
  });

  // update active nav item
  const setActiveNavItem = (state: string | undefined) => {
    const active = nav?.querySelector('.active');
    if (active) {
      active.classList.remove('active');
    }

    const a = nav?.querySelector(`a[href="#${state}"]`);
    if (a) {
      a.classList.add('active');
    }
  };

  // check hash for active example and update nav
  const checkHash = () => {
    const state = app.state.getStateFromHash();
    setActiveNavItem(state ?? defaultState);
  };
  window.addEventListener('hashchange', checkHash);

  // disable nav initially
  nav.classList.add('disabled');

  app.signals.stateTransitionComplete.connect(() => {
    nav?.classList.remove('disabled');
  });

  checkHash();
}
