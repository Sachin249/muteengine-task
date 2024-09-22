import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CartSlice } from '../components/store/features/CartSlice';
import { toast } from 'react-toastify';
const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = localStorage.getItem("admin")
  const admin = JSON.parse(user)
  const handleCheckout = ()=>{
    if(admin){
      navigate("/checkout")
    }
    else{
      toast.warn("Login required!")
      navigate("/login")
    }
    
  }

  const products = [
    {
      id: 1,
      title: "Product 1",
      description: "I am a product 1",
      price: 10,
      quantity: 2,
      img: "https://source.unsplash.com/collection/928424/480x480"
    },
    {
      id: 2,
      title: "Product 2",
      description: "I am a product 2",
      price: 15,
      quantity: 1,
      img: "https://source.unsplash.com/collection/928423/480x480"
    },
    {
      id: 3,
      title: "Product 3",
      description: "I am a product 3",
      price: 10,
      quantity: 2,
      img: "https://source.unsplash.com/collection/928424/480x480"
    },
    {
      id: 4,
      title: "Product 4",
      description: "I am a product 4",
      price: 15,
      quantity: 1,
      img: "https://source.unsplash.com/collection/928423/480x480"
    }
  ];

  const handleRemoveCartProduct = (item) => {
    dispatch(CartSlice.actions.removeFromCart(item));
  }

  const handleDecreaseQuantity = (item) => {
    dispatch(CartSlice.actions.decreaseCartQuantity(item));
  }

  const handleIncreaseQuantity = (item) => {
    dispatch(CartSlice.actions.addToCart(item));
  }

  const handleClearCart = ()=>{
    dispatch(CartSlice.actions.clearCart());

  }

  
  return (
    <>

    <div className="container mx-auto my-12 px-4">
      <div className='flex justify-between items-center my-6'>
        <h2 className='text-2xl font-bold'>Your Cart</h2>
        <button
          className='flex items-center text-gray-800 border border-gray-800 py-1 px-3 rounded hover:bg-gray-200'
          onClick={() => navigate('/')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-skip-backward" viewBox="0 0 16 16">
            <path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z"/>
          </svg>
          <span className='ml-2'>
            Continue Shopping
          </span>
        </button>
      </div>
      {
        cart?.cartItems.length === 0 ?
        <div className="flex flex-col items-center my-6">
          <h2 className="text-2xl font-bold mb-4">Your Cart is <span className='text-red-600'>Empty!</span></h2>
          <img
            src="https://i0.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?fit=603%2C288&ssl=1"
            alt="Empty Cart"
            className="w-64 mb-4"
          />
          <button
            onClick={() => navigate("/")}
            className='bg-primary text-white py-2 px-4 rounded hover:bg-secondary'
          >
            Start Shopping
          </button>
        </div>
        :
        <>
          <div className="overflow-y-auto max-h-56">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className='border-b border-gray-200'>
                  <th className='py-2 px-4 text-left'>Image</th>
                  <th className='py-2 px-4 text-left'>Product Name</th>
                  <th className='py-2 px-4 text-left'>Price</th>
                  <th className='py-2 px-4 text-left'>Quantity</th>
                  <th className='py-2 px-4 text-left'>Total</th>
                  <th className='py-2 px-4 text-left'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart?.cartItems.map((item) => (
                  <tr key={item.id} className='border-b border-gray-200'>
                    <td className='py-2 px-4'>
                      <img src={item.img} alt={item.title} className="w-20 h-20 object-cover" />
                    </td>
                    <td className='py-2 px-4'>
                      <p className='max-w-xs truncate'>{item.title}</p>
                    </td>
                    <td className='py-2 px-4'>${item.price.toFixed(2)}</td>
                    <td className='py-2 px-4'>
                      <div className="flex items-center">
                        <button
                          className="bg-blue-500 text-white text-sm py-1 px-2 rounded mr-2"
                          title='Decrease Quantity'
                          onClick={() => handleDecreaseQuantity(item)}
                        >
                          -
                        </button>
                        <span className='mx-2'>{item.cartQuantity}</span>
                        <button
                          className="bg-blue-500 text-white text-sm py-1 px-2 rounded ml-2"
                          title='Increase Quantity'
                          onClick={() => handleIncreaseQuantity(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className='py-2 px-4'>${(item.price * item.quantity).toFixed(2)}</td>
                    <td className='py-2 px-4'>
                      <button
                        className="bg-red-600 text-white text-sm py-1 px-2 rounded"
                        title='Remove'
                        onClick={() => handleRemoveCartProduct(item)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-end my-4">
            <h3 className='text-xl font-bold'>Sub Total: ${cart.cartTotalAmount.toFixed(2)}</h3>
            <div className='flex space-x-4 mt-4'>
              <button 
               onClick={() => handleClearCart()}
               className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500">
                Clear Cart
              </button>
              <button 
              onClick={handleCheckout}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500">
                Checkout
              </button>
            </div>
          </div>
        </>
      }
    </div>
    
    </>
  );
};

export default Cart;
