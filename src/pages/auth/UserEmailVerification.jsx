import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Assuming you're using React Router for navigation
import DataLoading from '../../components/DataLoading';
import { REACT_APP_API_PORT } from '../../Api';

const UserEmailVerification = (props) => {
  const navigate = useNavigate();
  const {id} = useParams()
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(null);

  const verifyEmail = async()=>{
    try{
        setisLoading(true)
        const res =  await axios.post(`${REACT_APP_API_PORT}api/auth/user-email-verification`,{token:id})
        setisLoading(false)
        console.log("res",res)
        if(res.data.status===200){
            props.setAlertBox(true)
            props.showAlert(res.data.message,"green")
        }

    }
    catch(err){
        setisLoading(false)
        console.log("err",err)
        setisError(true)
        if(err.response.data.status===false){
            props.setAlertBox(true)
            props.showAlert(err.response.data.message,"red")
        }

    }
  }

  useEffect(()=>{
    verifyEmail()
  },[])

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
    {isLoading ? (
          <DataLoading />
        ) :
    (
    <>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
      {
        (isError===true)
        ?
        <>
        <h1 className="text-2xl font-semibold text-danger-500 mb-4">Something went wrong!</h1>
        <p className="text-gray-700 mb-6">Please try again later.</p>
        </>
        :
        <>
        <h1 className="text-2xl font-semibold text-green-500 mb-4">Email Verified Successfully!</h1>
        <p className="text-gray-700 mb-6">Your email has been successfully verified. You can now log in to your account.</p>
        <button
          onClick={handleLoginClick}
          className="bg-primary hover:primary-600 text-white font-semibold py-2 px-4 rounded"
        >
          Go to Login
        </button>
        </>
      }
      </div>
    </div>
    </>
    )}
    </>
  );
};

export default UserEmailVerification;
