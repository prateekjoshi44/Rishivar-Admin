
import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({ query: () => `user`, keepUnusedDataFor: 0 }),
        getUser: builder.query({ query: (id) => `user?id=${id}`, keepUnusedDataFor: 0 }),
    }),
})


export const { useGetUsersQuery, useGetUserQuery } = extendedApiSlice
