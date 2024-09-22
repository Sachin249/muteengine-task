import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { REACT_APP_API_PORT } from '../Api';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import Loader from '../components/Loader';

const OrderView = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [data,setData] = useState([])
  const [products,setProducts] = useState([])
  const [isLoading,setisLoading] = useState(false)
  const token = localStorage.getItem("token")
  const getData = async() =>{
    try{
      setisLoading(true)
      const res = await axios.get(`${REACT_APP_API_PORT}api/order/order-details/${id}`,{
        headers:{
          'Content-Type':"application/json",
          'x-access-token':token
        }
      })
      setisLoading(false)
      console.log(res)
      if(res.data.status===true){
        setData(res.data.data)
        setProducts(res.data.products)
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
  const orderDetails = {
    id: 1,
    customerName: 'John Doe',
    orderDate: '2024-09-01',
    totalAmount: '$150',
    status: 'Paid',
    paymentStatus: 'Completed',
    tax: '$10',
    total: '$160',
    email: 'johndoe@example.com',
    phone: '+1 234 567 890',
    address: '123 Main St',
    country: 'USA',
    state: 'California',
    city: 'Los Angeles',
    products: [
      { id: 101, name: 'Product A', quantity: 2, price: '$50' },
      { id: 102, name: 'Product B', quantity: 1, price: '$50' },
    ],
  };


  return (
    <>
    {
        isLoading ?
        <Loader/>
        :
        <>
        <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-6">Order Details</h2>
        
        {/* Order Info */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-primary mb-4">Order Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="font-semibold">Order ID:</span>
              <span>{(data.order_id) ? data.order_id : "NA"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Customer Name:</span>
              <span>{(data.name) ? data.name : "NA"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Order Date:</span>
              <span>{moment(data.createAt).format("l")}</span>
            </div>
            <div className="flex flex-col">
            <label className="font-semibold">Order Status:</label>
            <span className={`font-semibold ${data.status === 'Delivered' ? 'text-green-500' : 'text-red-500'}`}>
                {data.status || "NA"}
            </span>
            </div>
            
            <div className="flex flex-col">
            <label className="font-semibold">Payment Status:</label>
            <span className={`font-semibold ${data.payment_status === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>
                {data.payment_status || "NA"}
            </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Email:</span>
              <span>{(data.email) ? data.email : "NA"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Phone:</span>
              <span>{(data.phone) ? data.phone : "NA"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Address:</span>
              <span>{data.address}, {data.city}, {data.state}, {data.country}</span>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div>
          <h3 className="text-2xl font-semibold text-primary mb-4">Products</h3>
          <table className="min-w-full table-auto bg-gray-50 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-4 font-semibold">S.No</th>
                <th className="p-4 font-semibold">Product Name</th>
                <th className="p-4 font-semibold">Quantity</th>
                <th className="p-4 font-semibold">Price ($)</th>
              </tr>
            </thead>
            <tbody>

              {products.map((product,index) => (
                <tr key={index} className="border-t">
                  <td className="p-4">{index+1}</td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.quantity}</td>
                  <td className="p-4">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tax and Total */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-primary mb-4">Summary</h3>
          <div className="flex justify-between">
            <div className="text-lg font-semibold">Tax:</div>
            <div className="text-lg">${data.tax || 0}</div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="text-lg font-semibold">Total (including tax):</div>
            <div className="text-lg">${data.total || 0}</div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <button
            className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark transition duration-300"
            onClick={() => navigate("/orders")}
          >
            Back to Orders
          </button>
        </div>
      </div>
        </div>
      </>
    }
    </>
  );
};

export default OrderView;
