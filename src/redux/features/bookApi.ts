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
    }),
})

export const { useGetBooksQuery } = booksApi;