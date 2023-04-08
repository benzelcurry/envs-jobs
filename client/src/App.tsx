// Primary App component
// Don't forget to format using Prettier before commits!
import { useState, useEffect } from 'react';

import Sidebar from './Sidebar';

// WILL WANT TO IMPLEMENT REACT-ROUTER-DOM FOR SEPARATE PAGES
const App = () => {
  return (
    <div>
      <Sidebar />
      <div className="flex flex-col flex-1 mt-10">
        <p className="w-[450px] flex md:justify-center mx-auto p-5 text-xl">
          Welcome to ENVS Matcher, a website geared towards helping both current
          and prospective ENVS students with finding a career in the field that
          matches their needs!
        </p>
        <p className="w-[450px] flex md:justify-center mx-auto p-5 text-xl">
          To begin, choose one of the options below.
        </p>
        <div className="w-[450px] flex justify-center mx-auto p-5">
          <button className="btn">Log In</button>
          <button className="btn">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default App;
