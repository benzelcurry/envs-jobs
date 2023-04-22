// Page for allowing admins to add new careers
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './Sidebar';
import Cropper from './ImageCropper';

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

// TODO:
//  1. Allow admins to
//   1.1 Update bio picture (Cloudinary)
//   1.2 Update bio description
//   1.3 Update job photo (Cloudinary)
const AddCareers = ({ user }: { user: User }) => {
  const [careers, setCareers] = useState<Career[]>([]);

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
    </div>
  );
};

// TODO:
//   1. Send in bioPhoto data from <Cropper /> and submit to backend
//    1.1 Figure out how to save image refs in database then pull on front end
//        from Cloudinary, similar to Odinbook
const NewCareerForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newAttributes, setNewAttributes] = useState<
    { id: string; value: string }[]
  >([]);
  const [bioPhoto, setBioPhoto] = useState<File | null>(null);

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
    setNewDescription(e.target.value);
  };

  // Handles change of input fields for attributes
  const changeAttributes = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const index = newAttributes.findIndex((attribute) => attribute.id === id);
    const updatedAttributes = [...newAttributes];
    updatedAttributes[index] = { id, value: e.target.value };
    setNewAttributes(updatedAttributes);
  };

  // Sets file upload for bioPhoto
  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBioPhoto(e.target.files[0]);
    }
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
    if (token) {
      body.append('token', token);
    }
    if (bioPhoto) body.append('bio_photo', bioPhoto);
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
    <form className="grid grid-cols-[100px_auto] gap-5 mt-6">
      <label htmlFor="career-title">Title: </label>
      <input
        type="text"
        id="career-title"
        name="career-title"
        onChange={(e) => changeTitle(e)}
        className="text-black p-2"
      />

      <label htmlFor="career-description">Description: </label>
      <textarea
        id="career-description"
        name="career-description"
        onChange={(e) => changeDescription(e)}
        className="text-black p-2"
      />

      <label htmlFor="career-attributes">Attributes: </label>
      <div className="flex flex-col gap-5">
        {newAttributes.map((attribute) => (
          <div key={attribute.id} className="flex items-center ">
            <input
              type="text"
              defaultValue={attribute.value}
              onChange={(e) => changeAttributes(e, attribute.id)}
              className="text-black p-2 w-[100%]"
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
      {/* <input type="file" onChange={(e) => handlePhoto(e)} /> */}
      <Cropper setBioPhoto={setBioPhoto} />
      {error ? (
        <p className="col-span-2 text-red-500 mx-auto italic">{error}</p>
      ) : null}
      <button
        type='button'
        onClick={(e) => handleUpdate(e)}
        className="btn col-span-2 w-[50%] mx-auto"
      >
        Add Career
      </button>
    </form>
  );
};

export default AddCareers;
