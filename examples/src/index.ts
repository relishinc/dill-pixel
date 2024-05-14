import { Application } from '@/Application';
import { create } from '@relish-studios/dill-pixel';
import './index.css';

// create app
const app = await create(
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

// populate sidebar
const sidebar = document.getElementById('sidebar');
const nav = sidebar?.querySelector('nav');
const states = app.state.getRegisteredStateIds().filter((state) => state !== 'Interstitial').sort((a, b) => a.localeCompare(b));
const defaultState = app.state.default;

if ( nav ) {

  // add examples to sidebar nav
  states.forEach((state) => {
    const a = document.createElement('a');
    a.innerText = state;
    a.href = `#${state}`;
    nav.appendChild(a);
    a.addEventListener('click', (e) => {
      nav.classList.add('disabled');
    });
  }); 

  // update active nav item
  const setActiveNavItem = (state: string | undefined) => {
    const active = nav?.querySelector('.active');
    if ( active ) {
      active.classList.remove('active');
    }
  
    const a = nav?.querySelector(`a[href="#${state}"]`);
    if ( a ) {
      a.classList.add('active');
    }
  }

  // check hash for active example and update nav
  const checkHash = () => {
    const state = app.state.getStateFromHash();
    setActiveNavItem(state ?? defaultState);
  }
  window.addEventListener('hashchange', checkHash);

  // when interstitial is done loading, re-enable nav
  document.body.addEventListener('loadComplete', () => {
    nav?.classList.remove('disabled');
  });

  checkHash();
}