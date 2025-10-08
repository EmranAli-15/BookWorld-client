import Cookies from 'js-cookie';
import { baseApi } from "../baseApi"

export const booksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userLogin: build.mutation({
            query: (data) => ({
                url: "/user/loginUser",
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    const accessToken = result.data.data;
                    Cookies.set('token', accessToken);

                } catch (error) { }
            }
        }),
        userRegister: build.mutation({
            query: (data) => ({
                url: "/user/registerUser",
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    const accessToken = result.data.data;
                    Cookies.set('token', accessToken);

                } catch (error) { }
            }
        })
    }),
})

export const { useUserLoginMutation, useUserRegisterMutation } = booksApi;