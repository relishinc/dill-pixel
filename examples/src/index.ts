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
const defaultState = app.state.default;
const states = app.state.getRegisteredStateIds();

if ( nav ) {
  states.forEach((state) => {
    const a = document.createElement('a');
    a.innerText = state;
    a.href = `#${state}`;
    nav.appendChild(a);
  });  
}

const setActiveExample = (state: string | null) => {
  const active = nav?.querySelector('.active');
  if ( active ) {
    active.classList.remove('active');
  }

  const a = nav?.querySelector(`a[href="#${state}"]`);
  if ( a ) {
    a.classList.add('active');
  }
}

const checkHash = () => {
  const state = app.state.getStateFromHash();
  setActiveExample(state ?? defaultState);
}

window.addEventListener('hashchange', checkHash);

checkHash();
