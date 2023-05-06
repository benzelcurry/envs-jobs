// Modal component for displaying Questions
import { useState, useEffect } from 'react';

import { User } from '../types';

interface QuestionProps {
  handleNext: (attribute: string | string[]) => void;
  question: string;
  answerOne: string;
  answerTwo: string;
  attributeOne: string;
  attributeTwo: string;
}

const QuestionCard = (props: QuestionProps) => {
  const [show, setShow] = useState(true);

  // Makes question card fade out upon being answered
  const handleNextQ = (attribute: string | string[]) => {
    setShow(false);
    setTimeout(() => {
      props.handleNext(attribute);
    }, 800);
  };

  return (
    <div
      className={`w-[90%] p-4 md:w-[600px] md:h-[200px] gap-5 bg-green-200 mx-auto my-auto dark:bg-gray-500 flex flex-col items-center rounded-xl transform transition-all duration-500 ease-in-out ${
        show ? 'opacity-100 translate-x-0' : 'opacity-0'
      }`}
    >
      <p>{props.question}</p>
      <div className="flex flex-col gap-10 md:gap-5 md:gap-auto md:flex-row">
        <button
          type="button"
          className="btn w-[200px] md:w-[150px]"
          onClick={() => handleNextQ(props.attributeOne)}
        >
          {props.answerOne}
        </button>
        <button
          type="button"
          className="btn w-[200px] md:w-[150px]"
          onClick={() => handleNextQ([props.attributeOne, props.attributeTwo])}
        >
          No Preference
        </button>
        <button
          type="button"
          className="btn w-[200px] md:w-[150px]"
          onClick={() => handleNextQ(props.attributeTwo)}
        >
          {props.answerTwo}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
