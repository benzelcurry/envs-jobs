// Navbar component
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';
import { BiUserPlus } from 'react-icons/bi';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { RiSuitcaseLine } from 'react-icons/ri';
import { RxAvatar } from 'react-icons/rx';

import { User } from '../types';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  icon: JSX.Element;
  text?: string;
  view?: boolean;
  onClick?: () => void;
};

const Sidebar = () => {
  const navigate = useNavigate();

  const [firstRender, setFirstRender] = useState(true);
  const [view, setView] = useState('');
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
    } else {
      // Prevents profile icon from flickering on page change
      setFirstRender(false);
    }
  }, []);

  // Gets and sets user's view (light/dark) preference
  useEffect(() => {
    const viewMode = localStorage.getItem('view');
    if (viewMode) {
      setView(viewMode);
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [view]);

  // Handles logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    navigate(0);
  };

  // Toggles view (light/dark) mode
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
    <div
      className="sticky top-0 left-0 md:h-screen md:w-16 m-0 flex md:flex-col 
                  bg-white dark:bg-gray-900 text-white shadow-lg p-2"
    >
      <Link to="/" aria-label="Home page" className="sidebar-icon">
        <SidebarIcon icon={<AiFillHome size="28" />} text="Home" />
      </Link>
      <Link to={'/careers'} aria-label="Careers page" className="sidebar-icon">
        <SidebarIcon icon={<RiSuitcaseLine size="28" />} text="Careers" />
      </Link>
      {firstRender || currentUser.username ? (
        <Link
          to={`/profile`}
          aria-label="Profile page"
          className="sidebar-icon"
        >
          <SidebarIcon icon={<RxAvatar size="28" />} text="Profile" />
        </Link>
      ) : (
        <Link
          to={'/log-in'}
          aria-label="Log in or sign up"
          className="sidebar-icon"
        >
          <SidebarIcon
            icon={<BiUserPlus size="28" />}
            text="Log In / Sign Up"
          />
        </Link>
      )}
      {firstRender || currentUser.username ? (
        <SidebarIcon
          icon={<AiOutlineLogout size="28" />}
          text="Logout"
          onClick={() => handleLogout()}
        />
      ) : null}
      <SidebarIcon
        icon={
          document.documentElement.classList.contains('dark') ? (
            <BsFillSunFill size="28" />
          ) : (
            <BsFillMoonStarsFill size="28" />
          )
        }
        aria-label="Toggle light or dark mode"
        text={
          document.documentElement.classList.contains('dark')
            ? 'Light Mode'
            : 'Dark Mode'
        }
        view={true}
        onClick={() => toggleView()}
      />
    </div>
  );
};

const SidebarIcon = ({
  icon,
  text = 'tooltip',
  view = false,
  onClick
}: Props) => {
  return (
    <div
      className={view ? 'sidebar-icon group view' : 'sidebar-icon group'}
      onClick={onClick}
    >
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

export default Sidebar;
