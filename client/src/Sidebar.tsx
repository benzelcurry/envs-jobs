import { AiFillHome } from 'react-icons/ai';
import { RiSuitcaseLine } from 'react-icons/ri';
import { RxAvatar } from 'react-icons/rx';

type Props = {
  icon: JSX.Element;
};

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col 
                  bg-gray-900 text-white shadow-lg">
      <SidebarIcon icon={<AiFillHome size='28' />} />
      <SidebarIcon icon={<RiSuitcaseLine size='28' />} />
      <SidebarIcon icon={<RxAvatar size='28' />} />
    </div>
  );
};

const SidebarIcon = ({ icon }: Props) => {
  return (
    <div className="sidebar-icon">
      {icon}
    </div>
  );
};

export default Sidebar;