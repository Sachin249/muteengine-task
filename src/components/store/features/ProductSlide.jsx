// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//     items:[],
//     status:null
// }

// export const productsFetch = createAsyncThunk(
//     "products/productsFetch",
//     async()=>{
//         try{
//             const response =await axios.get('http://localhost:5000/api/product/list')
//             return response?.data.data
//         }
//         catch(error){
//             console.log(error)
//         }
        
//     }
// )

// const ProductSlice = createSlice({
//     name:'products',
//     initialState,
//     reducers:{
       
//     },
//     extraReducers:{
//         [productsFetch.pending] : (state,action)=>{
//             state.status = "pending"
//         },
//         [productsFetch.fulfilled] : (state,action)=>{
//             state.status = "success",
//             state.items = action.payload
//         },
//         [productsFetch.rejected] : (state,action)=>{
//             state.status = "rejected"
//         }
//     }
// })

// export {ProductSlice}

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/backend/api/product/list");
      return response?.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(productsFetch.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export default productSlice; // Use default export for consistency