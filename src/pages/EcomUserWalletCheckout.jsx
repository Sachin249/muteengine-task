import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartSlice } from "../components/store/features/CartSlice";
import ApiLoader from "../components/ApiLoader";

export default function EcomUserWalletCheckout() {
  const navigate = useNavigate() 
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const token = localStorage.getItem("token")

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error,paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/ecomwalletpaymentsuccess`,
      },
      redirect:"if_required"
    });

    if(error){
      setMessage(error.message);
    }
    else if(paymentIntent && paymentIntent.status==="succeeded"){
      console.log("spaymentIntent",paymentIntent)
      setMessage("Payment Status" + paymentIntent.status)
      try{
        let orderId = localStorage.getItem("order_id")
        const res = await axios.post("http://localhost:5000/backend/api/stripe/generate-payment",
          {paymentIntentId :paymentIntent.id,orderId:orderId },
        {
          headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
        }
        )
        console.log("payment api",res)
        if(res.data.status===true){
            localStorage.removeItem("order_id")
            dispatch(CartSlice.actions.clearCart());
            toast.success(res.data.message)
            navigate("/orders")
        }
      }
      catch(err){
        console.log(err)
        if(err.response.data.status===false){
          toast.error(err.response.data.message)
        }
      }
      // toast.success("Payment Successfull,Thanks for ordering!")
    }
    else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <>
      {isProcessing && <ApiLoader />}

    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
    
      <button disabled={isProcessing || !stripe || !elements} id="submit" className="bg-primary text-white w-full mt-6 py-2.5 rounded-lg font-semibold hover:bg-primary-light transition">
      
          {isProcessing ? "Processing ... " : <>
            
                Pay Now
           
          </>}
       
      </button>
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
    </form>
    </>
  );
}
