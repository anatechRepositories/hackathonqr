"use client"
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  verified: boolean;
  guest1: string;
  guest1tshirt: string;
  guest2: string;
  guest2tshirt: string;
  guest3: string;
  guest3tshirt: string;
  tsize: string;
  barcode:string;
  updatedAt:any;
}

function formatMalaysiaDate(dateString:any) {
  if (!dateString) return 'N/A';

  const utcDate = new Date(dateString);
  const myTimezone = 'Asia/Kuala_Lumpur';

  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: myTimezone,
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const myTime = formatter.format(utcDate);

  return myTime;
}

const Stat: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [countUserList, setCountUserList] = useState<number>(0);
  const [searchEmail, setSearchEmail] = useState<string>('');
  const [filteredUserList, setFilteredUserList] = useState<User[]>([]);

  useEffect(() => {
    const url = `api/user/list/1`;

    async function fetchUserList() {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const responseData = await response.json();
          setUserList(responseData.userList);
          setCountUserList(responseData.count);
          setFilteredUserList(responseData.userList);
        } else {
          console.error("Error while fetching data");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    const intervalId = setInterval(fetchUserList, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = () => {
    const searchTerm = searchEmail.toLowerCase();
    const filteredUsers = userList.filter((user) =>
      user.email.toLowerCase().includes(searchTerm)
    );
    setFilteredUserList(filteredUsers);
  };

  console.log(userList);

  const sortedUserList = userList.slice().sort((a, b) => (a.verified === b.verified ? 0 : a.verified ? -1 : 1));

  return (
    <>
      <div>
        <div className="mockup-window border shadow-lg bg-base-300 w-full">
          <div>
            <div className="overflow-x-auto w-full"></div>
            <div className="flex justify-center items-center h-full">
              <div className="stats shadow m-auto">
                <div className="stat">
                  <div className="stat-title">Attendance</div>
                  <div className="stat-value">
                    {sortedUserList.filter((user) => user.verified).length}/{countUserList}
                  </div>
                  <div className="stat-desc">Date Placeholder</div>
                </div>
                <div className="stat">
                  <div className="stat-title">-</div>
                  <div className="stat-value">0,000</div>
                </div>
                <div className="stat">
                  <div className="stat-title">-</div>
                  <div className="stat-value">0,000</div>
                </div>
              </div>
            </div>
            <div className="search-container input w-1/2 mx-auto justify-center flex m-4">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
<div className="indicator">
    <button className="btn join-item" onClick={handleSearch}>Search</button>
  </div>        </div>
            <div className="h-96 overflow-x-auto px-8 overflow-y-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Verified</th>
                    <th>T-Size</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                {Array.isArray(filteredUserList) && filteredUserList.length > 0 ? (
              filteredUserList.map((user, index) => (
                <tr key={user.id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.verified ? 'Verified' : 'Not Verified'}</td>
                  <td>{user.tsize}</td>
                  <td>{formatMalaysiaDate(user.updatedAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td><span className="loading loading-ring loading-lg"></span></td>
              </tr>
            )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stat;
