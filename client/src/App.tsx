// Primary App component
// Don't forget to format using Prettier before commits!
import { useState, useEffect } from 'react';

import Sidebar from './Sidebar';

// WILL WANT TO IMPLEMENT REACT-ROUTER-DOM FOR SEPARATE PAGES
const App = () => {
  const [view, setView] = useState('');

  useEffect(() => {
    const viewMode = localStorage.getItem('view');
    if (viewMode) {
      setView(viewMode);
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [view]);

  const toggleView = () => {
    if (!view) {
      localStorage.setItem('view', 'light');
      setView('dark');
      document.documentElement.classList.remove('dark');
    } else {
      localStorage.removeItem('view');
      setView('');
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div>
      <Sidebar toggle={toggleView} />
      <div className='flex flex-col flex-1 mt-10'>
        <div className='w-[450px] flex md:justify-center mx-auto p-5 text-xl'>
          Welcome to ENVS Matcher, a website geared towards helping both current
          and prospective ENVS students with finding a career in the field that
          matches their needs!
        </div>
        <div className='w-[450px] flex md:justify-center mx-auto p-5 text-xl'>
          To begin, choose one of the options below.
        </div>
        <div className='w-[450px] flex justify-center mx-auto p-5'>
          <button className='btn'>Log In</button>
          <button className='btn'>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default App;
