import { baseApi } from "../baseApi"

export const booksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => ({
                url: `/user/getUser/${id}`,
                method: 'GET',
            }),
            providesTags: ["getUser"]
        }),
    }),
})

export const { useGetUserQuery } = booksApi;