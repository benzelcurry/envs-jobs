// Admin-restricted page for modifying questionnaire
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
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
  };

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
                    <ModificationForm question={question} />
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

const ModificationForm = ({ question }: { question: Question }) => {
  const navigate = useNavigate();

  const [newQuestion, setNewQuestion] = useState({
    token: localStorage.getItem('token'),
    _id: question._id,
    prompt: question.prompt,
    answerOne: question.answer_one[0],
    attributeOne: question.answer_one[1],
    answerTwo: question.answer_two[0],
    attributeTwo: question.answer_two[1]
  });
  const [error, setError] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewQuestion({
      ...newQuestion,
      [e.target.id]: e.target.value
    });
  };

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put('/api/questions', newQuestion)
      .then(() => {
        navigate(0);
      })
      .catch((err) => {
        setError(err.response.data.errors[0].msg);
        throw new Error(err);
      });
  };

  return (
    <form
      onSubmit={(e) => handleUpdate(e)}
      className="grid grid-cols-[150px_auto] gap-5 mt-6"
    >
      <p className="col-span-2 italic">* indicates required field</p>

      <label htmlFor="prompt">Prompt*: </label>
      <input
        type="text"
        id="prompt"
        name="prompt"
        defaultValue={question.prompt}
        onChange={(e) => handleInput(e)}
        className="text-black p-2 border-2 border-black dark:border-transparent"
      />

      <label htmlFor="answerOne">Answer #1*: </label>
      <input
        type="text"
        id="answerOne"
        name="answerOne"
        defaultValue={question.answer_one[0]}
        onChange={(e) => handleInput(e)}
        className="text-black p-2 border-2 border-black dark:border-transparent"
      />

      <label htmlFor="attributeOne">Attribute #1*: </label>
      <input
        type="text"
        id="attributeOne"
        name="attributeOne"
        defaultValue={question.answer_one[1]}
        onChange={(e) => handleInput(e)}
        className="text-black p-2 border-2 border-black dark:border-transparent"
      />

      <label htmlFor="answerTwo">Answer #2*: </label>
      <input
        type="text"
        id="answerTwo"
        name="answerTwo"
        defaultValue={question.answer_two[0]}
        onChange={(e) => handleInput(e)}
        className="text-black p-2 border-2 border-black dark:border-transparent"
      />

      <label htmlFor="attributetwo">Attribute #2*: </label>
      <input
        type="text"
        id="attributeTwo"
        name="attributeTwo"
        defaultValue={question.answer_two[1]}
        onChange={(e) => handleInput(e)}
        className="text-black p-2 border-2 border-black dark:border-transparent"
      />

      {error ? (
        <p className="col-span-2 text-red-500 mx-auto italic">{error}</p>
      ) : null}
      <button type="submit" className="btn col-span-2 w-[50%] mx-auto">
        Update Career
      </button>
    </form>
  );
};

export default ModifyQuestions;
