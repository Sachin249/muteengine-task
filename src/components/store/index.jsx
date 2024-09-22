import {configureStore} from '@reduxjs/toolkit'
// import { ProductSlice, } from './features/ProductSlide'
import { productsApi } from './features/ProductApi'
import { CartSlice } from './features/CartSlice'
import productSlice from './features/ProductSlide'


const store = configureStore({
    reducer:{
        products:productSlice.reducer,
        cart:CartSlice.reducer,
        [productsApi.reducerPath] : productsApi.reducer
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(productsApi.middleware)
    }
})



export default store