// import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// const initialState = {
//     cartItems:localStorage.getItem("cartItems")
//      ? JSON.parse(localStorage.getItem("cartItems")) : [],
//     cartTotalQuentity:0,
//     cartTotalAmount:0,
//     status:null
// }
// const CartSlice = createSlice({
//     name:'cart',
//     initialState,
//     reducers:{
//             addToCart(state,action){
//                 const itemIndex = state.cartItems.findIndex((item)=>item.id === action.payload.id)
//                 if(itemIndex >= 0){
//                     state.cartItems[itemIndex].cartQuantity += 1 ;
//                     toast.info(`Increased ${state.cartItems[itemIndex].title} cart quantity`,{
//                         position:"bottom-left"
//                     })
//                 }else{
//                     const tempProduct = {...action.payload , cartQuantity:1}
//                     state.cartItems.push(tempProduct)
//                     toast.success(`${action.payload.title} to cart`,{
//                         position:"bottom-left"
//                     })
//                 }
//                 localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
                
//             },
//             removeFromCart(state,action){
//                 const newCartItems = state.cartItems.filter((item)=>{
//                   return (item.id !== action.payload.id) && item
//                 })
                
//                 state.cartItems = newCartItems
//                 localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
//                 toast.warning(`${action.payload.title} removed from cart`,{
//                     position:"bottom-left"
//                 })
//             },
//             decreaseCartQuantity(state,action){
//                 const itemIndex = state.cartItems.findIndex((cartItem)=>{
//                     return cartItem.id === action.payload.id
//                 }) 
//                 if(state.cartItems[itemIndex].cartQuantity > 1){
//                     state.cartItems[itemIndex].cartQuantity -=1
//                     toast.info(`Decreased ${action.payload.title} cart quantity`,{
//                         position:"bottom-left"
//                     })
//                 }else if(state.cartItems[itemIndex].cartQuantity === 1){
//                     const newCartItems = state.cartItems.filter((item)=>{
//                         return (item.id !== action.payload.id) && item
//                       })
                      
//                       state.cartItems = newCartItems
                     
//                       toast.warning(`${action.payload.title} removed from cart`,{
//                           position:"bottom-left"
//                       })
//                 }
//                 localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
//             }
//     },
    
// })

// export {CartSlice}

// import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

// const initialState = {
//     cartItems: localStorage.getItem("cartItems")
//         ? JSON.parse(localStorage.getItem("cartItems"))
//         : [],
//     cartTotalQuantity: 0,
//     cartTotalAmount: 0,
//     status: null
// };

// const calculateTotals = (cartItems) => {
//     let totalQuantity = 0;
//     let totalAmount = 0;

//     cartItems.forEach(item => {
//         totalQuantity += item.cartQuantity;
//         totalAmount += item.price * item.cartQuantity;
//     });

//     return { totalQuantity, totalAmount };
// };

// const CartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         addToCart(state, action) {
//             const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
//             if (itemIndex >= 0) {
//                 state.cartItems[itemIndex].cartQuantity += 1;
//                 toast.info(`Increased ${state.cartItems[itemIndex].title} cart quantity`, {
//                     position: "bottom-left"
//                 });
//             } else {
//                 const tempProduct = { ...action.payload, cartQuantity: 1 };
//                 state.cartItems.push(tempProduct);
//                 toast.success(`${action.payload.title} added to cart`, {
//                     position: "bottom-left"
//                 });
//             }
//             const { totalQuantity, totalAmount } = calculateTotals(state.cartItems);
//             state.cartTotalQuantity = totalQuantity;
//             state.cartTotalAmount = totalAmount;
//             localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//         },
//         removeFromCart(state, action) {
//             const newCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
//             state.cartItems = newCartItems;
//             const { totalQuantity, totalAmount } = calculateTotals(state.cartItems);
//             state.cartTotalQuantity = totalQuantity;
//             state.cartTotalAmount = totalAmount;
//             localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//             toast.warning(`${action.payload.title} removed from cart`, {
//                 position: "bottom-left"
//             });
//         },
//         decreaseCartQuantity(state, action) {
//             const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === action.payload.id);
//             if (state.cartItems[itemIndex].cartQuantity > 1) {
//                 state.cartItems[itemIndex].cartQuantity -= 1;
//                 toast.info(`Decreased ${action.payload.title} cart quantity`, {
//                     position: "bottom-left"
//                 });
//             } else if (state.cartItems[itemIndex].cartQuantity === 1) {
//                 const newCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
//                 state.cartItems = newCartItems;
//                 toast.warning(`${action.payload.title} removed from cart`, {
//                     position: "bottom-left"
//                 });
//             }
//             const { totalQuantity, totalAmount } = calculateTotals(state.cartItems);
//             state.cartTotalQuantity = totalQuantity;
//             state.cartTotalAmount = totalAmount;
//             localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//         },
//         clearCart(state) {
//             state.cartItems = [];
//             state.cartTotalQuantity = 0;
//             state.cartTotalAmount = 0;
//             localStorage.removeItem("cartItems");
//             toast.info("Cart has been cleared", {
//                 position: "bottom-left"
//             });
//         }
//     }
// });

// export { CartSlice };



import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getInitialState = () => {
    const cartItems = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];
    const cartTotalQuantity = localStorage.getItem("cartTotalQuantity")
        ? JSON.parse(localStorage.getItem("cartTotalQuantity"))
        : 0;
    const cartTotalAmount = localStorage.getItem("cartTotalAmount")
        ? JSON.parse(localStorage.getItem("cartTotalAmount"))
        : 0;

    return { cartItems, cartTotalQuantity, cartTotalAmount, status: null };
};

const calculateTotals = (cartItems) => {
    let totalQuantity = 0;
    let totalAmount = 0;

    cartItems.forEach(item => {
        totalQuantity += item.cartQuantity;
        totalAmount += item.price * item.cartQuantity;
    });

    return { totalQuantity, totalAmount };
};

const CartSlice = createSlice({
    name: 'cart',
    initialState: getInitialState(),
    reducers: {
        addToCart(state, action) {
            
    
            // Check if total quantity exceeds the limit
            if (state.cartTotalQuantity >= 10) {
                toast.error("Maximum of 10 products allowed in cart", {
                    position: "bottom-left"
                });
                return; // Prevent adding more products
            }
            const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`Increased ${state.cartItems[itemIndex].title} cart quantity`, {
                    position: "bottom-left"
                });
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.title} added to cart`, {
                    position: "bottom-left"
                });
            }
            const { totalQuantity, totalAmount } = calculateTotals(state.cartItems);
            state.cartTotalQuantity = totalQuantity;
            state.cartTotalAmount = totalAmount;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("cartTotalQuantity", JSON.stringify(state.cartTotalQuantity));
            localStorage.setItem("cartTotalAmount", JSON.stringify(state.cartTotalAmount));
        },
        removeFromCart(state, action) {
            const newCartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
            state.cartItems = newCartItems;
            const { totalQuantity, totalAmount } = calculateTotals(state.cartItems);
            state.cartTotalQuantity = totalQuantity;
            state.cartTotalAmount = totalAmount;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("cartTotalQuantity", JSON.stringify(state.cartTotalQuantity));
            localStorage.setItem("cartTotalAmount", JSON.stringify(state.cartTotalAmount));
            toast.warning(`${action.payload.title} removed from cart`, {
                position: "bottom-left"
            });
        },
        decreaseCartQuantity(state, action) {
            const itemIndex = state.cartItems.findIndex((cartItem) => cartItem._id === action.payload._id);
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
                toast.info(`Decreased ${action.payload.title} cart quantity`, {
                    position: "bottom-left"
                });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const newCartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
                state.cartItems = newCartItems;
                toast.warning(`${action.payload.title} removed from cart`, {
                    position: "bottom-left"
                });
            }
            const { totalQuantity, totalAmount } = calculateTotals(state.cartItems);
            state.cartTotalQuantity = totalQuantity;
            state.cartTotalAmount = totalAmount;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("cartTotalQuantity", JSON.stringify(state.cartTotalQuantity));
            localStorage.setItem("cartTotalAmount", JSON.stringify(state.cartTotalAmount));
        },
        clearCart(state) {
            state.cartItems = [];
            state.cartTotalQuantity = 0;
            state.cartTotalAmount = 0;
            localStorage.removeItem("cartItems");
            localStorage.removeItem("cartTotalQuantity");
            localStorage.removeItem("cartTotalAmount");
            toast.info("Cart has been cleared", {
                position: "bottom-left"
            });
        }
    }
});

export {CartSlice}

