import { useState, useEffect } from 'react'

import Sidebar from './Sidebar';
import './App.css'

function App() {
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
    } else {
      localStorage.removeItem('view');
      setView('');
    };
  };

  return (
    <div className={!view ? 'dark' : ''}>
      <Sidebar toggle={toggleView} />
    </div>
  )
}

export default App
