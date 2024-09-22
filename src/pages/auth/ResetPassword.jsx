import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { REACT_APP_API_PORT } from '../../Api';
import ApiLoader from '../../components/ApiLoader';

const ResetPassword = () => {
    const { token } = useParams(); 
    const navigate = useNavigate();
    const [apiIsLoading, setApiIsLoading] = useState(false);

    const validationSchema = yup.object().shape({
        newPassword: yup.string()
            .min(6, 'Password must be at least 6 characters')
            .max(16, 'Password cannot exceed 16 characters')
            .required('New password is required'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm password is required')
    });

    const handleSubmit = async (values) => {
        try {
            setApiIsLoading(true);
            const { newPassword } = values;

            // Call API to reset password
            const res = await axios.post(`${REACT_APP_API_PORT}api/auth/reset-password`, {
                token,
                password:newPassword
            });

            setApiIsLoading(false);
            if (res.data.status) {
                toast.success(res.data.message);
                navigate('/login'); // Redirect to login after success
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            setApiIsLoading(false);
            toast.error(err.response.data.message || 'An error occurred');
        }
    };

    return (
        <>
            {apiIsLoading && <ApiLoader />}
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
                    <h2 className="text-3xl font-bold text-center text-primary mb-6">Reset Password</h2>
                    <Formik
                        initialValues={{ newPassword: '', confirmPassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleChange, handleBlur }) => (
                            <Form>
                                {/* New Password Input */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="newPassword">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="New Password"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <ErrorMessage name="newPassword" component="p" className="italic text-red-500" />
                                </div>

                                {/* Confirm Password Input */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Confirm Password"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <ErrorMessage name="confirmPassword" component="p" className="italic text-red-500" />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition duration-300"
                                >
                                    Reset Password
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
