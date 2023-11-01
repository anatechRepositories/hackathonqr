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
  barcode:string
}

const Stat: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [countUserList, setCountUserList] = useState<number>(0);

  useEffect(() => {
    const url = `api/user/list/1`;

    async function fetchUserList() {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const responseData = await response.json();
          setUserList(responseData.userList);
          setCountUserList(responseData.count);
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
            <div className="h-96 overflow-x-auto px-8 overflow-y-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Verified</th>
                    <th>Guest 1(T-Shirt Size)</th>
                    <th>Guest 2(T-Shirt Size)</th>
                    <th>Guest 3(T-Shirt Size)</th>
                    <th>T-Size</th>
                    <th>Barcode</th>

                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(sortedUserList) && sortedUserList.length > 0 ? (
                    sortedUserList.map((user, index) => (
                      <tr key={user.id}>
                        <th>{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.verified ? 'Verified' : 'Not Verified'}</td>
                        <td>
                          {user.guest1} ({user.guest1tshirt})
                        </td>
                        <td>
                          {user.guest2} ({user.guest2tshirt})
                        </td>
                        <td>
                          {user.guest3} ({user.guest3tshirt})
                        </td>
                        <td>{user.tsize}</td>
                        <td>{user.barcode}</td>
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
