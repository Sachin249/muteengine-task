import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { REACT_APP_API_PORT } from '../../../Api'

export const productsApi = createApi({
    reducerPath:"productsApi",
    baseQuery:fetchBaseQuery({baseUrl:REACT_APP_API_PORT}),
    endpoints:(builder) =>({
        getAllProducts:builder.query({
            query:()=> "/api/product/list"
        })
    })
})

export const { useGetAllProductsQuery } = productsApi