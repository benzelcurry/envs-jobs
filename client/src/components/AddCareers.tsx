// Page for allowing admins to add new careers
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './Sidebar';
import Cropper from './ImageCropper';
import PermissionDenied from './PermissionDenied';

import { v4 as uuidv4 } from 'uuid';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { User } from '../types';

interface Career {
  title: string;
  description: string;
  attributes: string[];
}

// TODO:
//   1. Make career description textarea increase to fit contents
const AddCareers = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Redirects user to another page if they aren't an admin
  useEffect(() => {
    if ((!user || !user.is_admin) && !isLoading) {
      navigate('/404');
    } else {
      setIsLoading(false);
    }
  }, [user]);

  // Pulls careers from DB and stores them in state
  useEffect(() => {
    axios
      .get('/api/careers')
      .then((response) => {
        setCareers(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  return (
    <div>
      <Sidebar />
      {user.is_admin ? (
        <div>
          <div className="flex flex-col flex-1 mt-10 p-10">
            <h2 className="text-3xl border-b-2 inline-block border-green-500 text-green-500">
              Current Careers
            </h2>
            <ul className="list-disc mt-2">
              {careers
                ? careers.map((career) => (
                    <li key={uuidv4()} className="ml-6 p-2">
                      {career.title}
                    </li>
                  ))
                : null}
            </ul>

            <h2 className="text-3xl border-b-2 inline-block border-green-500 text-green-500">
              Add New Career
            </h2>
            <NewCareerForm />
          </div>
        </div>
      ) : (
        <PermissionDenied />
      )}
    </div>
  );
};

const NewCareerForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newAttributes, setNewAttributes] = useState<
    { id: string; value: string }[]
  >([]);
  const [newCerts, setNewCerts] = useState<{ id: string; value: string }[]>([]);
  const [bioPhoto, setBioPhoto] = useState<File | null>(null);
  const [careerPhoto, setCareerPhoto] = useState<File | null>(null);
  const [bioQuote, setBioQuote] = useState('');

  // Adds three blank attribute fields to start off with
  useEffect(() => {
    if (newAttributes.length === 0) {
      const tempAttributes: { id: string; value: string }[] = [];
      for (let i = 0; i < 3; i++) {
        tempAttributes.push({
          id: uuidv4(),
          value: ''
        });
      }
      setNewAttributes(tempAttributes);
    }
  }, []);

  // Adds a blank certification field to start off with
  useEffect(() => {
    if (newCerts.length === 0) {
      setNewCerts([{ id: uuidv4(), value: '' }]);
    }
  }, []);

  // Increments fields for totalAttributes on click
  const addAttributes = () => {
    setNewAttributes([...newAttributes, { id: uuidv4(), value: '' }]);
  };

  // Deletes an attribute field for totalAttributes on click
  const deleteAttributes = (id: string) => {
    setNewAttributes(newAttributes.filter((attribute) => attribute.id !== id));
  };

  // Handles change of input field for title
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  // Handles change of input field for description
  const changeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const str = e.target.value;
    const strHTML = str
      .split(/\n\n+/)
      .map((x) => `<p> ${x} </p>`)
      .join('');
    setNewDescription(strHTML);
  };

  // Handles change of input field for biography quote
  const changeQuote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBioQuote(e.target.value);
  };

  // Handles change of input fields for attributes
  const changeAttributes = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const index = newAttributes.findIndex((attribute) => attribute.id === id);
    const updatedAttributes = [...newAttributes];
    updatedAttributes[index] = { id, value: e.target.value };
    setNewAttributes(updatedAttributes);
  };

  // Increments fieds for certifications on click
  const addCerts = () => {
    if (newCerts === undefined) {
      setNewCerts([{ id: uuidv4(), value: '' }]);
    } else {
      setNewCerts([...newCerts, { id: uuidv4(), value: '' }]);
    }
  };

  // Deletes an attribute field for newCerts on click
  const deleteCerts = (id: string) => {
    setNewCerts(newCerts!.filter((cert) => cert.id !== id));
  };

  // Handles change of input fields for newCerts
  const changeCerts = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const index = newCerts!.findIndex((cert) => cert.id === id);
    const updatedCerts = [...newCerts!];
    updatedCerts[index] = { id, value: e.target.value };
    setNewCerts(updatedCerts);
  };

  // Updates career on form submit
  const handleUpdate = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const body = new FormData();
    body.append('title', newTitle);
    body.append('description', newDescription);
    newAttributes.forEach((attribute) => {
      body.append('attributes', attribute.value);
    });
    newCerts?.forEach((cert) => {
      body.append('certifications', cert.value);
    });
    if (token) body.append('token', token);
    if (bioPhoto) body.append('bio_photo', bioPhoto);
    if (careerPhoto) body.append('job_photo', careerPhoto);
    if (bioQuote) body.append('quote', bioQuote);
    axios
      .post('/api/careers', body)
      .then(() => {
        navigate(0);
      })
      .catch((err) => {
        setError(err.response.data.errors[0].msg);
        throw new Error(err);
      });
  };

  return (
    <form className="grid grid-cols-[125px_auto] gap-5 mt-6">
      <p className="col-span-2 italic">* indicates required field</p>

      <label htmlFor="career-title">Title*: </label>
      <input
        type="text"
        id="career-title"
        name="career-title"
        onChange={(e) => changeTitle(e)}
        className="focus:outline-none text-black p-2 border-2 border-black dark:border-transparent"
      />

      <label htmlFor="career-description">Description*: </label>
      <div>
        <textarea
          id="career-description"
          name="career-description"
          onChange={(e) => changeDescription(e)}
          className="w-[100%] focus:outline-none text-black p-2 border-2 border-black dark:border-transparent"
        />
        <p className="text-sm">Hit 'enter' twice to start a new paragraph.</p>
      </div>

      <label htmlFor="career-attributes">Attributes*: </label>
      <div className="flex flex-col gap-5">
        {newAttributes.map((attribute) => (
          <div key={attribute.id} className="flex items-center ">
            <input
              type="text"
              defaultValue={attribute.value}
              onChange={(e) => changeAttributes(e, attribute.id)}
              className="focus:outline-none text-black p-2 w-[100%] border-2 border-black dark:border-transparent"
            />
            <RxCross1
              size="28"
              onClick={() => deleteAttributes(attribute.id)}
              className="ml-auto pl-2 cursor-pointer text-red-500 hover:text-red-300"
            />
          </div>
        ))}
        <AiOutlinePlusCircle
          size="40"
          onClick={() => addAttributes()}
          className="self-center text-green-500 cursor-pointer hover:text-green-300 transition-all delay-100"
        />
      </div>

      <label htmlFor="career-certs">Helpful Certifications: </label>
      <div className="flex flex-col gap-5">
        {newCerts!.map((cert) => (
          <div key={cert.id} className="flex items-center ">
            <input
              type="text"
              defaultValue={cert.value}
              onChange={(e) => changeCerts(e, cert.id)}
              className="text-black p-2 w-[100%] border-2 border-black dark:border-transparent"
            />
            <RxCross1
              size="28"
              onClick={() => deleteCerts(cert.id)}
              className="ml-auto pl-2 cursor-pointer text-red-500 hover:text-red-300"
            />
          </div>
        ))}
        <AiOutlinePlusCircle
          size="40"
          onClick={() => addCerts()}
          className="self-center text-green-500 cursor-pointer hover:text-green-300 transition-all delay-100"
        />
      </div>

      <label>Career Photo: </label>
      <Cropper setPhoto={setCareerPhoto} circle={false} />

      <label>Headshot: </label>
      <Cropper setPhoto={setBioPhoto} circle={true} />

      <label htmlFor="pro-quote">Professional Quote: </label>
      <textarea
        id="pro-quote"
        name="pro-quote"
        onChange={(e) => changeQuote(e)}
        className="focus:outline-none text-black p-2 border-2 border-black dark:border-transparent"
      />

      {error ? (
        <p className="col-span-2 text-red-500 mx-auto italic">{error}</p>
      ) : null}
      <button
        type="button"
        onClick={(e) => handleUpdate(e)}
        className="btn col-span-2 w-[50%] mx-auto"
      >
        Add Career
      </button>
    </form>
  );
};

export default AddCareers;
