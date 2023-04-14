// Admin-restricted page for modifying careers

import Sidebar from './Sidebar';

// TODO:
//   1. Restrict non-admins from viewing this page even if JS disabled
//   2. Make sure to restrict routes to admins on the back-end as well
const ModifyCareers = () => {
  return (
    <div>
      <Sidebar />
      <div className="flex flex-col flex-1 mt-10 p-10">
        Contents will go here.
      </div>
    </div>
  );
};

export default ModifyCareers;
