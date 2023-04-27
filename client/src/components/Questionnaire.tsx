// Questionnaire page for determining student attributes

import Sidebar from './Sidebar';

import { User } from '../types';

const Questionnaire = ({ user }: { user: User }) => {
  return (
    <div>
      <Sidebar />
      <div className="flex flex-col flex-1 mt-10 p-10">
        {
          user.attributes ?
          <div className='md:w-[600px] md:h-[200px] gap-5 p-5 bg-gray-500 flex flex-col items-center rounded-xl'>
            <p>You've already taken the questionnaire.</p>
            <p>Click below to take it again.</p>
            <div>
              <button type='button' className='btn'>Retake Questionnaire</button>
            </div>
          </div>
          : null
        }
      </div>
    </div>
  );
};

export default Questionnaire;
