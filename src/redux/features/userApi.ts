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
        updataUser: build.mutation({
            query: ({ id, data }) => ({
                url: `/user/updateUser/${id}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["getUser"]
        }),
    }),
})

export const { useGetUserQuery, useUpdataUserMutation } = booksApi;