"use client"
import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputBarCode: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const inputId = inputValue;

    try {
      const response = await fetch('api/user/list/1');
      if (response.ok) {
        const data = await response.json();
        const matchedUser = data.userList.find((user: { barcode: string }) => user.barcode === inputId);

        if (matchedUser) {
          console.log('Email Match:', matchedUser.email);
          router.push(`?email=${matchedUser.email}`);
        } else {

          console.error('No user found with the provided ID');
          toast.error('No user found with the provided ID');
        }
      } else {

        console.error(`Request failed with status ${response.status}: ${response.statusText}`);
      }
    } catch (error) {

      console.error('Error:', error);
    }
    setInputValue("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Bar Code"
            className="input input-bordered w-5/6"
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className="btn btn-square bg-black w-1/6  text-white" type="submit">
            ENTER
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default InputBarCode;
