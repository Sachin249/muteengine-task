import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import * as yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { toast } from 'react-toastify';
import { REACT_APP_API_PORT } from '../../Api';
import ApiLoader from '../../components/ApiLoader';
import GoogleButton from 'react-google-button';
import { auth, provider } from '../../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
const SignUp = () => {
  const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [apiIsLoading, setapiIsLoading] = useState(false);


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderError = (message) => (
    <p className="italic text-[#dd1212]">{message}</p>
  );

  const validate = yup.object({
    name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters").max(50, "Name cannot exceed 50 characters"),
    email: yup.string().required("Email is required").email("Invalid email format"),
    password: yup.string().min(6).max(16).required("Password is required")
  });

  const handleSubmit = async(values) =>{
    try{
      const {name,email,password} = values
      let data = {
        name,email,password
      }
      setapiIsLoading(true)
      const res =await axios.post(`${REACT_APP_API_PORT}api/auth/user-signup`,data)
      console.log(res)
      setapiIsLoading(false)
      if(res.data.status===true){
        toast.success(res.data.message)
        navigate("/login")
      }
    }
    catch(err){
      setapiIsLoading(false)
      if(err.response.data.status===false){
        toast.error(err.response.data.message)
      }
    }
  }

  const handleGoogleSignUp = async()=>{
    try{
      const data =await signInWithPopup(auth,provider)
      console.log(data)
      try {
        if(!data){
          return false
        }
        setapiIsLoading(true);
        const res = await axios.post(`${REACT_APP_API_PORT}api/auth/user-signup-with-google`, {
          email:data.user.email,
          name:(data?.user?.displayName) ? data?.user?.displayName :""
        });
        setapiIsLoading(false);
        if (res.data.status === true) {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.jwttoken);
          localStorage.setItem("admin", JSON.stringify(res.data.data));
          window.location.href = "/";
        }
      } catch (err) {
        setapiIsLoading(false);
        if (err.response.data.status === false) {
          toast.error(err.response.data.message);
        }
      }
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <>
    {
      (apiIsLoading) && <ApiLoader />
    }
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Sign Up</h2>
        <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password:""
                  }}
                  validationSchema={validate}
                  onSubmit={(values, actions) => {
                      console.log(values)
                      handleSubmit(values)
                  }}
                >
         {({ handleChange, handleBlur }) => (
        <Form>
        
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <ErrorMessage name="name" render={renderError} />
          </div>

       
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <ErrorMessage name="email" render={renderError} />
          </div>

       
          <div className=" relative">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div
              className="absolute inset-y-0 top-6 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </div>
          </div>
          <ErrorMessage name="password" render={renderError} />

       
          <button
            type="submit"
            className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition duration-300"
          >
            Sign Up
          </button>
        </Form>
      )}
      </Formik>
        {/* Divider */}
        <div className="mt-4 text-center flex justify-center">
                <GoogleButton
                  label='Sign up with Google'
                  onClick={handleGoogleSignUp}
                />
        </div>
        <div className="mt-6 text-center text-gray-600">
          <span>Already have an account? </span>
          <NavLink to="/login" className="text-primary hover:underline">
            Login
          </NavLink>
        </div>
      </div>
    </div>
    </>

  );
};

export default SignUp;
