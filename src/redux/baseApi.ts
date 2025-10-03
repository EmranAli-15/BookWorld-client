// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';

const baseURL = "http://localhost:5000/api"

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: fetchBaseQuery(
    {
      baseUrl: baseURL,
      prepareHeaders: (headers, { getState }) => {
        const token = Cookies.get("token");

        // If we have a token set in state, let's assume that we should be passing it.
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