// Questionnaire page for determining student attributes

import Sidebar from './Sidebar';

import { User } from '../types';

const Questionnaire = ({ user }: { user: User }) => {
  return (
    <div>
      <Sidebar />
      <div className="flex flex-col flex-1 mt-10 p-10">
        Questionnaire stuff will go here once ready.
      </div>
    </div>
  );
};

export default Questionnaire;
