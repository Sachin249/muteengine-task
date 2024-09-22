import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { REACT_APP_API_PORT } from '../Api';
import { toast } from 'react-toastify';
import axios from 'axios';

const PaymentView = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [data,setData] = useState([])
    const [isLoading,setisLoading] = useState(false)
    const token = localStorage.getItem("token")
    const getData = async() =>{
      try{
        setisLoading(true)
        const res = await axios.get(`${REACT_APP_API_PORT}api/order/payment-details/${id}`,{
          headers:{
            'Content-Type':"application/json",
            'x-access-token':token
          }
        })
        setisLoading(false)
        console.log(res)
        if(res.data.status===true){
          setData(res.data.data)
        }
      }
      catch(err){
        setisLoading(false)
        console.log(err)
        if(err.response.data.status===false){
          toast.error(err.response.data.message || "An error occured!")
        }
      }
      
    }
  
    useEffect(()=>{
      getData()
    },[])
    const paymentData = {
        _id: "66efda9cc8fa86d2afe5515e",
        user_id: "66ef0b2380a2250effa281c3",
        seller_id: "",
        order_id: "66efc6414e977a9bd267d825",
        payment_by: "Stripe",
        transection_id: "txn_3Q1A4FESMnxzWQfk18YsO7KJ",
        payment_type: "card",
        country: "US",
        currency: "usd",
        amount: 100,
        brand: "visa",
        last_digit: "4242",
        expiry_month: "12",
        expiry_year: "2026",
        payment_recipt: "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTDZkMTdFU01ueHpXUWZrKJ61v7cGMgYzpgemL8s6LBarOrRN-ps4oq6MDLLrVSaZP3EEuH8qGrKHsqft4hdWXK9_mvPqfVWFPxrc",
        status: "succeeded",
        createdAt: "2024-09-22T08:51:40.899Z",
        updatedAt: "2024-09-22T08:51:40.899Z",
        __v: 0
    };
    

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Payment Details</h2>

        {/* Payment Information */}
        <div className="mb-6">
          <div className="flex flex-col mb-4">
            <label className="font-semibold">Payment Method:</label>
            <span className="text-gray-700">{data.payment_by || 'N/A'}</span>
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold">Transaction ID:</label>
            <span className="text-gray-700">{data.transection_id || 'N/A'}</span>
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold">Payment Type:</label>
            <span className="text-gray-700">{data.payment_type || 'N/A'}</span>
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold">Status:</label>
            <span
              className={`font-semibold text-white rounded px-2 py-1 w-fit 
              ${data.status === 'succeeded' ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {data.status || 'N/A'}
            </span>
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold">Amount:</label>
            <span className="text-gray-700">${data.amount || 'N/A'}</span>
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold">Card Brand:</label>
            <span className="text-gray-700">{data.brand || 'N/A'}</span>
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold">Last 4 Digits:</label>
            <span className="text-gray-700">{data.last_digit || 'N/A'}</span>
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold">Expiry Date:</label>
            <span className="text-gray-700">
              {data.expiry_month}/{data.expiry_year}
            </span>
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold">Country:</label>
            <span className="text-gray-700">{data.country || 'N/A'}</span>
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-semibold">Payment Receipt:</label>
            <a
              href={data.payment_recipt}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Receipt
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentView;
