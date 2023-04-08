// Router component
// Using hash router because some hosting services struggle with default router

import { HashRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import CareersList from './CareersList';

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/careers' element={<CareersList />} />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;
