import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('game-container');

ReactDOM.createRoot(container!).render(
  <React.StrictMode>
    <App el={container} />
  </React.StrictMode>,
);
