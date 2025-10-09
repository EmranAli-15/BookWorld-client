import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';

// const baseURL = "http://localhost:5000/api"
const baseURL = "https://bookworld-server.vercel.app/api"

export const baseApi = createApi({
  baseQuery: fetchBaseQuery(
    {
      baseUrl: baseURL,
      prepareHeaders: (headers) => {
        const token = Cookies.get("token");

        if (token) {
          headers.set('token', token);
        }

        return headers
      },
    },
  ),
  endpoints: () => ({}),
  tagTypes: ["getUser"]
})