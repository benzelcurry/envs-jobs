// Page for allowing admins to add new questions
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './Sidebar';
import PermissionDenied from './PermissionDenied';

import { User, Question } from '../types';

const AddQuestions = ({ user }: { user: User }) => {
  const [questions, setQuestions] = useState<Question[]>();
  const [showTable, setShowTable] = useState('');

  useEffect(() => {
    axios
      .get('/api/questions')
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  const displayTable = (tableID: string) => {
    showTable === tableID ? setShowTable('') : setShowTable(tableID);
  };

  return (
    <div>
      <Sidebar />
      {user.is_admin ? (
        <div>
          <div className="flex flex-col flex-1 mt-10 p-10">
            <h2 className="text-3xl border-b-2 inline-block border-green-500 text-green-500">
              Current Questions
            </h2>
            <ol className="list-decimal">
              {questions &&
                questions.map((question) => (
                  <li key={question._id} className="ml-6 p-2">
                    <h3
                      onClick={() => displayTable(question._id)}
                      className="cursor-pointer hover:text-green-300 inline-block"
                    >
                      {question.prompt}
                    </h3>
                    {question._id === showTable && (
                      <table className="mt-2 table w-full border-collapse border-[2px] border-black dark:border-gray-300">
                        <thead className="bg-gray-200 text-black">
                          <tr>
                            <th className="py-2 px-4">Answer</th>
                            <th className="py-2 px-4 border-l-[2px] border-black">
                              Attribute
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white">
                            <td className="py-2 px-4 text-black">
                              {question.answer_one[0]}
                            </td>
                            <td className="py-2 px-4 text-black border-l-[2px] border-black">
                              {question.answer_one[1]}
                            </td>
                          </tr>
                          <tr className="bg-gray-100">
                            <td className="py-2 px-4 text-black">
                              {question.answer_two[0]}
                            </td>
                            <td className="py-2 px-4 text-black border-l-[2px] border-black">
                              {question.answer_two[1]}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </li>
                ))}
            </ol>

            <h2 className="mt-4 text-3xl border-b-2 inline-block border-green-500 text-green-500">
              Add New Question
            </h2>

            <NewQuestionForm />
          </div>
        </div>
      ) : (
        <PermissionDenied />
      )}
    </div>
  );
};

const NewQuestionForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newQuestion, setNewQuestion] = useState({
    prompt: '',
    answerOne: '',
    attributeOne: '',
    answerTwo: '',
    attributeTwo: '',
    token: localStorage.getItem('token')
  });

  const modifyQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion({
      ...newQuestion,
      [e.target.id]: e.target.value
    });
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('/api/questions', newQuestion)
      .then(() => {
        navigate(0);
      })
      .catch((err) => {
        setError(
          err.response.data.errors[0].msg || err.response.data.errors[0]
        );
        throw new Error(err);
      });
  };

  return (
    <form
      onSubmit={(e) => handleUpdate(e)}
      className="grid grid-cols-[125px_auto] gap-5 mt-6"
    >
      <p className="col-span-2 italic">* indicates required field</p>

      <label htmlFor="prompt">Question*: </label>
      <input
        type="text"
        id="prompt"
        name="prompt"
        onChange={(e) => modifyQuestion(e)}
        className="focus:outline-none text-black p-2 border-2 border-black dark:border-transparent"
      />

      <label htmlFor="answerOne">Answer #1*: </label>
      <input
        type="text"
        id="answerOne"
        name="answerOne"
        onChange={(e) => modifyQuestion(e)}
        className="focus:outline-none text-black p-2 border-2 border-black dark:border-transparent"
      />

      <label htmlFor="attributeOne">Attribute #1*: </label>
      <input
        type="text"
        id="attributeOne"
        name="attributeOne"
        onChange={(e) => modifyQuestion(e)}
        className="focus:outline-none text-black p-2 border-2 border-black dark:border-transparent"
      />

      <label htmlFor="answerTwo">Answer #2*: </label>
      <input
        type="text"
        id="answerTwo"
        name="answerTwo"
        onChange={(e) => modifyQuestion(e)}
        className="focus:outline-none text-black p-2 border-2 border-black dark:border-transparent"
      />

      <label htmlFor="attributeTwo">Attribute #2*: </label>
      <input
        type="text"
        id="attributeTwo"
        name="attributeTwo"
        onChange={(e) => modifyQuestion(e)}
        className="focus:outline-none text-black p-2 border-2 border-black dark:border-transparent"
      />

      {error ? (
        <p className="w-[400px] text-center col-span-2 text-red-500 mx-auto italic">
          {error}
        </p>
      ) : null}
      <button type="submit" className="btn col-span-2 w-[50%] mx-auto">
        Add Career
      </button>
    </form>
  );
};

export default AddQuestions;
