// Router component
// Using hash router because some hosting services struggle with default router

import { HashRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import CareersList from './CareersList';
import Profile from './Profile';
import LogIn from './LogIn';
import SignUp from './SignUp';

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/careers' element={<CareersList />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='/log-in' element={<LogIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;
