import React from 'react';
import ReactDOM from 'react-dom/client';
import RouteSwitch from './RouteSwitch';
import './index.css';

// TODO
// 1. Update proxy in vite.config.ts to set new target once
//    site is hosted at a dedicated URL
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>
);
