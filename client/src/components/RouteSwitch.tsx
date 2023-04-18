// Router component
// Using hash router because some hosting services struggle with default router
import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './Home';
import CareersList from './CareersList';
import Profile from './Profile';
import LogIn from './LogIn';
import SignUp from './SignUp';
import ModifyQuestions from './ModifyQuestions';
import ModifyCareers from './ModifyCareers';
import Questionnaire from './Questionnaire';
import NotFound from './404';

import { User } from '../types';

const RouteSwitch = () => {
  const [currentUser, setCurrentUser] = useState<User>({
    username: '',
    first_name: '',
    family_name: '',
    is_admin: false,
    attributes: []
  });

  // Gets active user if one is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .post('/api/users/info', { token: token })
        .then((response) => {
          setCurrentUser(response.data);
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home user={currentUser} />} />
        <Route path="/careers" element={<CareersList />} />
        <Route path="/profile" element={<Profile user={currentUser} />} />
        <Route path="/log-in" element={<LogIn user={currentUser} />} />
        <Route path="/sign-up" element={<SignUp user={currentUser} />} />
        <Route
          path="/modify-questions"
          element={<ModifyQuestions user={currentUser} />}
        />
        <Route
          path="/modify-careers"
          element={<ModifyCareers user={currentUser} />}
        />
        <Route
          path="/questionnaire"
          element={<Questionnaire user={currentUser} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;
