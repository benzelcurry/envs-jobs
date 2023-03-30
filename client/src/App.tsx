import { useState, useEffect } from 'react'

import Sidebar from './Sidebar';
import Home from './Home';

// WILL WANT TO IMPLEMENT REACT-ROUTER-DOM FOR SEPARATE PAGES
const App = () => {
  const [view, setView] = useState('');

  useEffect(() => {
    const viewMode = localStorage.getItem('view');
    if (viewMode) {
      setView(viewMode);
    }
  }, [view])

  const toggleView = () => {
    if (!view) {
      localStorage.setItem('view', 'light')
      setView('dark');
      document.documentElement.classList.remove('dark');
    } else {
      localStorage.removeItem('view');
      setView('');
      document.documentElement.classList.add('dark');
    };
  };

  return (
    <div>
      <Sidebar toggle={toggleView} />
      <Home />
    </div>
  );
};

export default App;