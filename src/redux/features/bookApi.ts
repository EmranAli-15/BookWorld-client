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
        getSingleBook: build.query({
            query: ({ id }) => (
                {
                    url: `/book/getSingleBook/${id}`,
                    method: 'GET',
                }
            )
        }),
        updateBook: build.mutation({
            query: ({ id, data }) => (
                {
                    url: `/book/updateBook/${id}`,
                    method: 'PUT',
                    body: data
                }
            )
        }),
        getCategoryBooks: build.query({
            query: ({ id, page }) => (
                {
                    url: `/book/getCategoryBook/${id}?page=${page}`,
                    method: 'GET',
                }
            )
        }),
        searchBook: build.query({
            query: ({ text }) => (
                {
                    url: `/book/searchBook?text=${text}`,
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
            ),
            providesTags: ["myCart"]
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
        deleteFromCart: build.mutation({
            query: (data) => (
                {
                    url: "/cart/deleteProductFromCart",
                    method: 'DELETE',
                    body: data
                }
            ),
            invalidatesTags: ["myCart"]
        }),
    }),
})

export const {
    useGetBooksQuery,
    useGetMyCartQuery,
    useAddToCartMutation,
    useGetCategoryBooksQuery,
    useGetSingleBookQuery,
    useUpdateBookMutation,
    useDeleteFromCartMutation
} = booksApi;