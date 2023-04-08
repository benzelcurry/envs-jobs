// Profile page component
// Displays user info (name, career rankings, etc.)

import Sidebar from './Sidebar';

const Profile = () => {
  return (
    <div>
      <Sidebar />
      <div className='flex flex-col flex-1 mt-10'>
        <p className='w-[450px] flex md:justify-center mx-auto p-5 text-xl'>
          Profile page contents will go here.
        </p>
      </div>
    </div>
  );
};

export default Profile;