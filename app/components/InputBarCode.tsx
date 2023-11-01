"use client"
import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

const InputBarCode: React.FC = () => { 
  const inputRef = useRef<HTMLInputElement | null>(null); 
  const router = useRouter();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleFormSubmit = async (event: React.FormEvent) => { 
    event.preventDefault();

    const inputId = inputRef.current?.value;

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
        }
      } else {
        console.error(`Request failed with status ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Bar Code"
            className="input input-bordered"
            ref={inputRef}
          />
          <button className="btn btn-square" type="submit">
            ENTER
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputBarCode;
