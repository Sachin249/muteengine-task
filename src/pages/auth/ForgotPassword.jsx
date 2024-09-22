import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { toast } from 'react-toastify';
import { REACT_APP_API_PORT } from '../../Api';
import ApiLoader from '../../components/ApiLoader';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [apiIsLoading, setapiIsLoading] = useState(false);

  const validate = yup.object({
    email: yup.string().required("Email is required").email("Invalid email format"),
  });

  const handleSubmit = async (values) => {
    try {
      const { email } = values;
      setapiIsLoading(true);
      const res = await axios.post(`${REACT_APP_API_PORT}api/auth/send-user-password-reset-mail`, { email });
      setapiIsLoading(false);
      
      if (res.data.status === true) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      setapiIsLoading(false);
      if (err.response && err.response.data.status === false) {
        toast.error(err.response.data.message);
      }
    }
  };

  const renderError = (message) => (
    <p className="italic text-[#dd1212]">{message}</p>
  );

  return (
    <>
      {apiIsLoading && <ApiLoader />}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">Reset Password</h2>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validate}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur }) => (
              <Form>
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

                <button
                  type="submit"
                  className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition duration-300"
                >
                  Send Reset Link
                </button>
              </Form>
            )}
          </Formik>
          {/* Divider */}
          <div className="mt-6 text-center text-gray-600">
            <span>Remembered your password? </span>
            <NavLink to="/login" className="text-primary hover:underline">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
