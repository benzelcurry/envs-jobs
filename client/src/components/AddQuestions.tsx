// Page for allowing admins to add new questions
import { useState, useEffect } from 'react';
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
                  <li key={question.id} className="ml-6 p-2">
                    <h3
                      onClick={() => displayTable(question.id)}
                      className="cursor-pointer hover:text-green-300 inline-block"
                    >
                      {question.prompt}
                    </h3>
                    {question.id === showTable && (
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
          </div>
        </div>
      ) : (
        <PermissionDenied />
      )}
    </div>
  );
};

export default AddQuestions;
