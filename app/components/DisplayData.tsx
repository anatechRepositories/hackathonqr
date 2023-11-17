"use client"
import React, {useState,useEffect} from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Skeleton from './Skeleton'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserData {
  name: string;
  email: string;
  verified: boolean | null;
  guest1: string;
  guest1tshirt: string;
  guest2: string;
  guest2tshirt: string;
  guest3: string;
  guest3tshirt: string;
  tsize: string;
  updatedAt: any;

}

const DisplayData = () => {

  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [data, setData] = useState<UserData | null>(null); 
  const[isLoading,setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(()=> {
    const url = `api/user/find/${email}`
    setIsLoading(true);
    async function fetchData() {
      try {
        const response = await fetch(url)
        if(response.ok) {
          const dataUser = await response.json();
          setData(dataUser.user);
          const urlVerify = `api/user/verify/${email}`
          try {
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: `${email}` }),
            };
          
            const responseVerify = await fetch(urlVerify, requestOptions);
            const responseText = await responseVerify.text(); 
            console.log(responseText)
            if (responseText === `{"error":"Email is already verified"}`) {
              toast.info("Email is already verified.");
            }

            if (responseVerify.ok) {
              toast.success(`${email} Verified Successfully`);
            }  else {
              console.error("Error occurred while accessing", urlVerify);
            }
          } catch (error) {
            console.error("Error: ", error);
          } finally {
            router.push('/');
          }
          

        }
        else {
          console.error("An error occured while fetching");
        }
       
      }
      catch(error) {
        console.error(error)
      }
      finally {
        setIsLoading(false);
      }

    }
    fetchData();

  },[searchParams])

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
  


  return (
    <div className="h-auto p-6 card bg-base-300 rounded-box text-left">
      {isLoading ? (
        <>
        <Skeleton />
        </>
      ):(
    
      <div className='bg-white p-2 border rounded-lg'>
      <p className=''>Name: {data?.name}</p>
        <p>Email: {data?.email}</p>

        {data?.verified === true && data?.updatedAt !== null && (
      <p>Updated At: {formatMalaysiaDate(data?.updatedAt)}</p>
      )}       

        {data?.verified !== null ? (
          <p>Verification Status: {data?.verified ? "Verified" : "Not Verified"}</p>
        ) : (
          <p>Verification Status: N/A</p>
        )}        

        <p className='text-red-500'>T-Size: {data?.tsize}</p>
      </div>
      )}
      <ToastContainer position="top-right" autoClose={5000} className={'text-sm'} />
    </div>  
    )
}

export default DisplayData