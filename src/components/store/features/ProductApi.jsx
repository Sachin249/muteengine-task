import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath:"productsApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000/backend"}),
    endpoints:(builder) =>({
        getAllProducts:builder.query({
            query:()=> "/api/product/list"
        })
    })
})

export const { useGetAllProductsQuery } = productsApi