// Admin-restricted page for modifying questionnaire
import { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from './Sidebar';
import PermissionDenied from './PermissionDenied';

import { User, Question } from '../types';

const ModifyQuestions = ({ user }: { user: User }) => {
  const [questions, setQuestions] = useState<Question[]>();
  const [clickedQuestion, setClickedQuestion] = useState('');

  useEffect(() => {
    axios
      .get('/api/questions')
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

  const displayForm = (id: string) => {
    clickedQuestion === id ? setClickedQuestion('') : setClickedQuestion(id);
  }

  return (
    <div>
      <Sidebar />
      {user.is_admin ? (
        <div className="flex flex-col flex-1 mt-10 p-10">
          <div>
            <h2 className="text-3xl border-b-2 border-green-500 inline-block text-green-500">
              Current Careers:
            </h2>
            <ul className="list-disc mt-2">
            {questions?.map((question) => (
              <li
                aria-label="Click to modify career details"
                key={question._id}
                className={
                  clickedQuestion === question._id
                    ? 'ml-6 border-2 border-rad rounded-md p-4 transition-all duration-300 border-green-500 lg:w-[60%]'
                    : 'ml-6 p-4'
                }
              >
                <h3
                  className="text-lg cursor-pointer hover:text-green-500 transition-all duration-300 inline-block"
                  onClick={() => displayForm(question._id)}
                >
                  {question.prompt}
                </h3>
                {clickedQuestion === question._id ? (
                  <ModificationForm question={question.prompt} />
                ) : null}
              </li>
            ))}
          </ul>
          </div>
        </div>
      ) : (
        <PermissionDenied />
      )}
    </div>
  );
};

const ModificationForm = (question: any) => {
  return (
    <div>Hello!</div>
  )
}

export default ModifyQuestions;
