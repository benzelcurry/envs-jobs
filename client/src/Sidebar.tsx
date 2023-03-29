import { useState, useEffect } from 'react';

import { AiFillHome } from 'react-icons/ai';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { RiSuitcaseLine } from 'react-icons/ri';
import { RxAvatar } from 'react-icons/rx';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  icon: JSX.Element,
  text?: string,
  dark?: boolean,
  onClick?: {}
};

const Sidebar = () => {
  const [view, setView] = useState('');

  useEffect(() => {
    const viewValue = localStorage.getItem('view');
    if (viewValue) {
      setView(viewValue);
    };
  }, [view])

  const toggleView = () => {
    if (view === '') {
      localStorage.setItem('view', 'light')
    } else {
      localStorage.removeItem('view');
    };
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col 
                  bg-gray-900 text-white shadow-lg">
      <SidebarIcon icon={<AiFillHome size='28' />} text='Home' />
      <SidebarIcon icon={<RiSuitcaseLine size='28' />} text='Careers' />
      <SidebarIcon icon={<RxAvatar size='28' />} text='Profile' />
      <SidebarIcon icon={<BsFillMoonStarsFill size='28' />} text='Dark Mode' dark={true} 
        onClick={() => toggleView()}
      />
    </div>
  );
};

const SidebarIcon = ({ icon, text = 'tooltip', dark = false, onClick }: Props) => {
  return (
    <div 
      className={ dark ? "sidebar-icon group dark" : "sidebar-icon group"}
      onClick={onClick}>
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">
        {text}
      </span>
    </div>
  );
};

export default Sidebar;