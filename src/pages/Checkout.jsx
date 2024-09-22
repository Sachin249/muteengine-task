import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import EcomUserWalletCheckout from './EcomUserWalletCheckout';
import axios from 'axios';
import * as yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { toast } from 'react-toastify';
import ApiLoader from '../components/ApiLoader';
import Loader from '../components/Loader';
import {REACT_APP_API_PORT} from "../Api"
const Checkout = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [apiIsLoading, setapiIsLoading] = useState(false);
  const [isOrderConfirm, setisOrderConfirm] = useState(false);
  const token = localStorage.getItem("token") || "";
  const user = localStorage.getItem("admin");
  const admin = JSON.parse(user);

  const renderError = (message) => (
    <p className="italic text-[#dd1212]">{message}</p>
  );

  const validate = yup.object({
    name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters").max(50, "Name cannot exceed 50 characters"),
    email: yup.string().required("Email is required").email("Invalid email format"),
    phone: yup.string().required("Phone number is required").matches(/^\d{10}$/, "Phone number must be 10 digits"),
    address: yup.string().required("Address is required").min(2, "Address must be at least 2 characters").max(200, "Address cannot exceed 200 characters"),
    city: yup.string().required("City is required").min(2, "City must be at least 2 characters").max(50, "City cannot exceed 50 characters"),
    state: yup.string().required("State is required").min(2, "State must be at least 2 characters").max(50, "State cannot exceed 50 characters"),
    zipcode: yup.string().required("Zip code is required").matches(/^\d{5}$/, "Zip code must be 5 digits"),
    country: yup.string().required("Country is required").min(2, "Country must be at least 2 characters").max(50, "Country cannot exceed 50 characters"),
  });

  const getData = async () => {
    setisLoading(true);
    try {
      const res = await axios.get(`${REACT_APP_API_PORT}api/stripe/get-stripe-details`, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });
      if (res.data.status === true) {
        setStripePromise(loadStripe(res?.data?.data.stripeKey));
      }
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.log(error);
      if (error.response.data.status === false) {
        alert(error.response.data.message);
      }
    }
  };

  const createPaymentIntent = async () => {
    setisLoading(true);
    let totalAmount = parseInt(cart.cartTotalAmount + (cart.cartTotalAmount * 0.1));
    try {
      const res = await axios.post(`${REACT_APP_API_PORT}api/stripe/create-payment-intent`, {
        amount: totalAmount
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });
      setClientSecret(res?.data?.data.client_secret);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.log(error);
      if (error.response.data.status === false) {
        alert(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getData();
    createPaymentIntent();
  }, []);

  const cart = useSelector((state) => state.cart);

  const saveOrder = async (values) => {
    const { name, email, phone, address, country, state, city, zipcode } = values;
    const data = {
      name,
      email,
      phone,
      address,
      country,
      state,
      city,
      zipcode,
      products: cart.cartItems
    };

    setapiIsLoading(true);
    try {
      const res = await axios.post(`${REACT_APP_API_PORT}api/order/create-order`, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });
      setapiIsLoading(false);
      if (res.data.status === true) {
        localStorage.setItem("order_id", res.data.data._id);
        toast.success(res.data.message);
        setisOrderConfirm(true);
      }
    } catch (error) {
      setapiIsLoading(false);
      console.log(error);
      if (error.response.data.status === false) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <>
      {apiIsLoading && <ApiLoader />}

      {
        isLoading ?
        <Loader/>
        :
        <>
      {
        (!isOrderConfirm) ? (
          <div className="bg-gray-50 min-h-screen">
            <section className="container mx-auto px-4 py-16">
              <h1 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-8">Checkout</h1>
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    country: "",
                    state: "",
                    city: "",
                    zipcode: ""
                  }}
                  validationSchema={validate}
                  onSubmit={(values, actions) => {
                    saveOrder(values);
                  }}
                >
                  {({ handleChange, handleBlur }) => (
                    <Form>
                      <div className="bg-white p-6 shadow-md rounded-lg">
                        <h2 className="text-2xl font-semibold text-primary mb-4">Billing Details</h2>
                        <div className="mb-6">
                <label className="block text-gray-700 mb-2">Name <span className='text-danger'>*</span></label>
                <input
                  type="text"
                  name='name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Full Name"
                />
                <ErrorMessage name="name" render={renderError} />

              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Email <span className='text-danger'>*</span></label>
                <input
                  type="email"
                  name='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Email Address"
                />
                <ErrorMessage name="email" render={renderError} />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Phone <span className='text-danger'>*</span></label>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Phone Number"
                />
                <ErrorMessage name="phone" render={renderError} />

              </div>

              <h2 className="text-2xl font-semibold text-primary mb-4">Shipping Address</h2>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Address <span className='text-danger'>*</span></label>
                <input
                  type="text"
                  name='address'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Street Address"
                />
                <ErrorMessage name="address" render={renderError} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">City <span className='text-danger'>*</span></label>
                  <input
                    type="text"
                    name='city'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="City"
                  />
                <ErrorMessage name="city" render={renderError} />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">State <span className='text-danger'>*</span></label>
                  <input
                    type="text"
                    name='state'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="State"
                  />
                <ErrorMessage name="state" render={renderError} />
                  
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Zip Code <span className='text-danger'>*</span></label>
                  <input
                    type="text"
                    name='zipcode'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Zip Code"
                  />
                <ErrorMessage name="zipcode" render={renderError} />

                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Country <span className='text-danger'>*</span></label>
                  <input
                    type="text"
                    name='country'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Country"
                  />
                <ErrorMessage name="country" render={renderError} />

                </div>
              </div>
          
            </div>
            <div className="my-2 bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold text-primary mb-4">Order Summary</h2>
              <ul>
                {cart.cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <img src={item.img} alt={item.title} className="w-16 h-16 object-cover mr-4 rounded-md" />
                      <div>
                        <div>{item.title} (x{item.quantity})</div>
                        <div className="text-sm text-gray-500">${item.price.toFixed(2)} each</div>
                      </div>
                    </div>
                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <p className="text-lg text-gray-700">Subtotal: <span className="font-bold">${parseInt(cart.cartTotalAmount)}</span></p>
                <p className="text-lg text-gray-700">Tax (10%): <span className="font-bold">${parseInt(cart.cartTotalAmount * 0.1)}</span></p>
                <p className="text-xl font-semibold text-primary mt-4">Total: <span className="font-bold">${parseInt(cart.cartTotalAmount + (cart.cartTotalAmount * 0.1))}</span></p>
              </div>

              <button
              type='submit'
                className="mb-2 bg-primary text-white w-full mt-6 py-2.5 rounded-lg font-semibold hover:bg-primary-light transition"
              >
                Confirm & Place Order
              </button>
              
            </div>
                        
              
                    </Form>
                  )}
                </Formik>
              </div>
            </section>
          </div>
        ) : (
          <div className='container mx-auto px-4 py-16'>
            {clientSecret && stripePromise && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <EcomUserWalletCheckout />
              </Elements>
            )}
          </div>
        )
      }
      </>
      }

    </>
  );
};

export default Checkout;
