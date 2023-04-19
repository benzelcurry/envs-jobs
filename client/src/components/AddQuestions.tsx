// Page for allowing admins to add new questions

import Sidebar from './Sidebar';

import { User } from '../types';

const AddQuestions = ({ user }: { user: User }) => {
  return (
    <div>
      <Sidebar />
      <div>Add Questions content will go here.</div>
    </div>
  );
};

export default AddQuestions;
