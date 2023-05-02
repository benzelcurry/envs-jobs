// Modal component for displaying Questions
import { useState, useEffect } from 'react';

import { User } from '../types';

interface QuestionProps {
  question: string;
  answerOne: string;
  answerTwo: string;
  attributeOne: string;
  attributeTwo: string;
  user: User;
  setAttributes: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

// TODO
//   1. Modify data models to hold answers and corresponding attributes
//      in either an object or array to easily assign an attribute upon an answer
//   2. Figure out how to store answers as they're solved and then push all
//      attributes at once to user... probably will need to send a setAttributes
//      from <Questionnaire />
//   3. Improve styling of cards in light mode and mobile
const QuestionCard = ({ props }: { props: QuestionProps }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    return () => setShow(false);
  }, []);

  return (
    <div
      className={`md:w-[600px] md:h-[200px] gap-5 p-5 bg-gray-500 flex flex-col items-center rounded-xl transform transition-all duration-500 ease-in-out ${
        show ? 'opacity-100 translate-x-0' : 'opacity-0'
      }`}
    >
      <p>{props.question}</p>
      <div>
        <button type="button" className="btn">
          {props.answerOne}
        </button>
        <button onClick={() => setShow(false)} type="button" className="btn">
          {props.answerTwo}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
