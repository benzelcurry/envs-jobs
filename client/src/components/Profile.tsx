// Profile page component
// Displays user info (name, career rankings, etc.)

import Sidebar from './Sidebar';

// TODO:
//   1. Make page redirect to 404 page if user isn't logged in or 
//      tries visiting someone else's page
//   2. Display links to add/remove-career pages on admin page

const Profile = () => {
  return (
    <div>
      <Sidebar />
      <div className="flex flex-col flex-1 mt-10">
        <p className="w-[450px] flex md:justify-center mx-auto p-5 text-xl">
          Profile page contents will go here.
        </p>
      </div>
    </div>
  );
};

export default Profile;
