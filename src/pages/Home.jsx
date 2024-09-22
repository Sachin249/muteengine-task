import React from 'react'

import { useGetAllProductsQuery } from '../components/store/features/ProductApi'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartSlice } from '../components/store/features/CartSlice';
import Loader from '../components/Loader';


function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {data , error , isLoading} = useGetAllProductsQuery()
    const handleAddToCart = (product) =>{
        console.log("clicked!")
        dispatch(CartSlice.actions.addToCart(product))
        navigate("/cart")
      }
  return (
    <>
   
    <div className="container mx-auto">
    
      <section className="bg-gray-100 text-center pt-16 ">
        <h2 className="text-4xl font-bold mb-4">Welcome to E-Shop</h2>
        <p className="text-lg mb-6">Find the best products at unbeatable prices</p>
      </section>


      <section className="py-16">
        <h3 className="text-2xl font-bold mb-8 text-center">Featured Products</h3>
        {
            (isLoading) ? <Loader/> : error ? <p>An error occured</p> :
            <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {
                (data) && data.data.map((item,index)=>{
                    return <>
                        <div key={index}  className="border p-4 rounded-lg shadow-md">
                            <img src={(item.img) ? item.img :"https://via.placeholder.com/150" }alt="Product 1" className="w-full h-55 object-cover mb-4" />
                            <h4 className="text-xl font-bold mb-2">{item?.title}</h4>
                            <p className="text-lg mb-4">$ {item?.price}</p>
                            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90" onClick={()=>handleAddToCart(item)}>Add to Cart</button>
                        </div>
                        
                  </>
                }) 
            }
            </div>
            
        
        </>
        }
      </section>
    </div>


    </>
  )
}

export default Home