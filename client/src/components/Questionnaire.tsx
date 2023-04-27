// Questionnaire page for determining student attributes
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

import { User } from '../types';

const Questionnaire = ({ user }: { user: User }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    return () => setShow(false);
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="flex flex-col flex-1 mt-10 p-10">
        {user.attributes.length > 0 ? (
          <div className="md:w-[600px] md:h-[200px] gap-5 p-5 bg-gray-500 flex flex-col items-center rounded-xl">
            <p>You've already taken the questionnaire.</p>
            <p>Click below to take it again.</p>
            <div>
              <button type="button" className="btn">
                Retake Questionnaire
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`md:w-[600px] md:h-[200px] gap-5 p-5 bg-gray-500 flex flex-col items-center rounded-xl transform transition-all duration-500 ease-in-out ${show ? 'opacity-100 translate-x-0' : 'opacity-0'}`}
          >
            <p>What is your favorite flavor of ice cream?</p>
            <div>
              <button type="button" className="btn">
                Vanilla
              </button>
              <button
                onClick={() => setShow(false)}
                type="button"
                className="btn"
              >
                Chocolate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
