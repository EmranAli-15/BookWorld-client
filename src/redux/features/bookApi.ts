import { baseApi } from "../baseApi"

export const booksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBooks: build.query({
            query: ({ page, limit }) => (
                {
                    url: `/book/getAllBooks?page=${page}&limit=${limit}`,
                    method: 'GET',
                }
            )
        }),
        getMyCart: build.query({
            query: (id) => (
                {
                    url: `/cart/myCart/${id}`,
                    method: 'GET',
                }
            )
        }),
        getLocalCartBooks: build.mutation({
            query: (data) => (
                {
                    url: `/cart/getLocalCartBooks`,
                    method: 'POST',
                    body: data
                }
            )
        }),
        addToCart: build.mutation({
            query: (data) => (
                {
                    url: "/cart/addToCart",
                    method: 'POST',
                    body: data
                }
            )
        }),
    }),
})

export const { useGetBooksQuery, useGetMyCartQuery, useAddToCartMutation, useGetLocalCartBooksMutation } = booksApi;