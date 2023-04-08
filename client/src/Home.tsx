// Primary App component
import { Link } from 'react-router-dom';

import Sidebar from './Sidebar';

// TODO:
//   1. Make buttons conditionally display if receiving currentUser data from sidebar

const Home = () => {
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
          <Link to={'/log-in'}>
            <button className="btn">Log In</button>
          </Link>
          <Link to={'/sign-up'}>
            <button className="btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
