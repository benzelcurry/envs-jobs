// Questionnaire page for determining student attributes
import { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from './Sidebar';
import QuestionCard from './QuestionCard';

import { User, Question } from '../types';

// TODO:
//   1. Fill out ModifyQuestions component
const Questionnaire = ({ user }: { user: User }) => {
  const [attributes, setAttributes] = useState<string[]>();
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

  const handleNextQuestion = () => {
    setIterator(iterator + 1);
  };

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
          /*
          TODO:
            1. Map these Questions to a list of questions that get
               pulled in from the database using a useEffect hook
            2. Figure out how to toggle the display of the next question 
               once the previous question has been answered
             2.1 Move show/setShow to this component and pass to Question?
              2.1.1 Toggle which one is shown using uuidv4 or something similar?
            3. Add a new page/component that users are redirected to once
               they finish the questionnaire
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
                  setIterator={handleNextQuestion}
                  question={q.prompt}
                  answerOne={q.answer_one[0]}
                  attributeOne={q.answer_one[0]}
                  answerTwo={q.answer_two[0]}
                  attributeTwo={q.answer_two[1]}
                  setAttributes={setAttributes}
                />
              )
          )
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
