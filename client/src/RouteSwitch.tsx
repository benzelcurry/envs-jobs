// Router component
// Using hash router because some hosting services struggle with default router

import { HashRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import CareersList from './CareersList';
import Profile from './Profile';

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/careers' element={<CareersList />} />
        <Route path='/profile/:username' element={<Profile />} />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;
