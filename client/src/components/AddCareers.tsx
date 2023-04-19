// Page for allowing admins to add new careers

import Sidebar from './Sidebar';

import { User } from '../types';

const AddCareers = ({ user }: { user: User }) => {
  return (
    <div>
      <Sidebar />
      <div>Add Careers content will go here.</div>
    </div>
  );
};

export default AddCareers;
