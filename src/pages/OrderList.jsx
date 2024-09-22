import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { REACT_APP_API_PORT } from '../Api';
import { toast } from 'react-toastify';
import moment from 'moment/moment';
import { FaEye } from 'react-icons/fa';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';


const OrderList = () => {
  const navigate = useNavigate()
  const [data,setData] = useState([])
  const [isLoading,setisLoading] = useState(false)
  const token = localStorage.getItem("token")
  const getData = async() =>{
    try{
      setisLoading(true)
      const res = await axios.get(`${REACT_APP_API_PORT}api/order/order-list`,{
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

  // Columns for the DataTable
const columns = [
  {
    name: 'Order ID',
    selector: row => row.id,
    sortable: true,
    cell: row => <span className="font-semibold text-primary">{row.order_id}</span>,
  },
  {
    name: 'Customer',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Tax(10%)',
    selector: row => row.tax,
    sortable: true,
  },
  {
    name: 'Total',
    selector: row => row.total,
    sortable: true,
  },
  {
    name: 'Date',
    selector: row => moment(row.createdAt).format("l"),
    sortable: true,
  },
  {
    name: 'Status',
    selector: row => row.status,
    sortable: true,
    cell: row => (
      <span
        className={`py-1 px-3 rounded-full text-xs ${
          row.status === 'Delivered'
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    name: 'Actions',
    cell: row => (
      <button
        className="flex items-center text-primary hover:text-primary-dark focus:outline-none"
        onClick={()=>navigate(`/order-view/${row._id}`)}
      >
        <FaEye className="mr-2" />
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

  return (
    <>
    {
      isLoading ? 
      <Loader/>
      :
      <>
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#003C83] mb-6">Order List</h2>
        
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          customStyles={{
            headCells: {
              style: {
                backgroundColor: '#003C83',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 'bold',
              },
            },
            rows: {
              style: {
                fontSize: '14px',
                color: '#333',
              },
            },
          }}
        />
      </div>
    </div>
    </>
    }
    </>
  );
};

export default OrderList;
