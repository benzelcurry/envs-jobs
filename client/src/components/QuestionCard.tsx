// Modal component for displaying Questions
import { useState, useEffect } from 'react';

import { User } from '../types';

interface QuestionProps {
  handleNext: (attribute: string) => void;
  question: string;
  answerOne: string;
  answerTwo: string;
  attributeOne: string;
  attributeTwo: string;
}

// TODO
//   1. Modify data models to hold answers and corresponding attributes
//      in either an object or array to easily assign an attribute upon an answer
//   2. Figure out how to store answers as they're solved and then push all
//      attributes at once to user... probably will need to send a setAttributes
//      from <Questionnaire />
//   3. Improve styling of cards in light mode and mobile
const QuestionCard = (props: QuestionProps) => {
  const [show, setShow] = useState(true);

  // Makes question card fade out upon being answered
  const handleNextQ = (attribute: string) => {
    setShow(false);
    setTimeout(() => {
      props.handleNext(attribute);
    }, 800);
  };

  return (
    // TODO: FIX THIS DISPLAY ON MOBILE
    <div
      className={`w-[90%] p-4 md:w-[600px] md:h-[200px] gap-5 bg-green-200 mx-auto my-auto dark:bg-gray-500 flex flex-col items-center rounded-xl transform transition-all duration-500 ease-in-out ${
        show ? 'opacity-100 translate-x-0' : 'opacity-0'
      }`}
    >
      <p>{props.question}</p>
      <div className="flex flex-col gap-10 md:gap-auto md:flex-row">
        <button
          type="button"
          className="btn w-[200px] md:w-[125px]"
          onClick={() => handleNextQ(props.attributeOne)}
        >
          {props.answerOne}
        </button>
        <button
          type="button"
          className="btn w-[200px] md:w-[125px]"
          onClick={() => handleNextQ(props.attributeOne)}
        >
          No Preference
        </button>
        <button
          type="button"
          className="btn w-[200px] md:w-[125px]"
          onClick={() => handleNextQ(props.attributeTwo)}
        >
          {props.answerTwo}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
