// Questionnaire page for determining student attributes
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './Sidebar';
import QuestionCard from './QuestionCard';

import { User, Question } from '../types';

const Questionnaire = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  const [attributes, setAttributes] = useState<string[]>([]);
  const [retake, setRetake] = useState(false);
  const [questions, setQuestions] = useState<Question[]>();
  const [showQ, setShowQ] = useState<string[]>();
  const [iterator, setIterator] = useState(0);

  // Pulls list of question from database
  useEffect(() => {
    axios
      .get('/api/questions')
      .then((response) => {
        setQuestions(response.data);
        setShowQ(response.data.map((item: Question) => item._id));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  // Checks to see if user has completed the questionnaire
  useEffect(() => {
    if (iterator === showQ?.length) {
      const token = localStorage.getItem('token');
      axios
        .put('/api/users/', { token, attributes })
        .then(() => {
          navigate('/profile');
          navigate(0);
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  }, [iterator]);

  // Displays the next question and assigns attributes upon answers
  const handleNextQuestion = (attribute: string) => {
    const updatedAttributes = [...attributes];
    updatedAttributes.push(attribute);
    setAttributes(updatedAttributes);
    setIterator(iterator + 1);
  };

  return (
    <div>
      <Sidebar />
      <div className="flex flex-col flex-1 mt-10 p-10">
        {user.attributes.length > 0 && !retake ? (
          <div className="md:w-[600px] md:h-[200px] gap-5 p-5 bg-green-200 dark:bg-gray-500 flex flex-col items-center rounded-xl mx-auto my-auto">
            <p>You've already taken the questionnaire.</p>
            <p>Click below to take it again.</p>
            <div>
              <button
                type="button"
                className="btn"
                onClick={() => setRetake(true)}
              >
                Retake Questionnaire
              </button>
            </div>
          </div>
        ) : (
          /*
          TODO:
            3. Add a new page/component that users are redirected to once
               they finish the questionnaire; MAKE IT PATCH USER PROFILE TO
               UPDATE THEIR ATTRIBUTES ONCE FINISHED
             3.1 Show their attributes and job matches
              3.1.1 Let them know they can find this info on their profile
                    in the future
              3.1.2 Make jobs link to respective pages
          */
          showQ &&
          questions?.map(
            (q) =>
              showQ[iterator] === q._id && (
                <QuestionCard
                  key={q._id}
                  handleNext={handleNextQuestion}
                  question={q.prompt}
                  answerOne={q.answer_one[0]}
                  attributeOne={q.answer_one[1]}
                  answerTwo={q.answer_two[0]}
                  attributeTwo={q.answer_two[1]}
                />
              )
          )
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
