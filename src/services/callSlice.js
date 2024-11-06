
import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
    endpoints: builder => ({
        getCalls: builder.query({ query: () => `call`, keepUnusedDataFor: 0 }),
        getCall: builder.query({ query: (id) => `call?id=${id}`, keepUnusedDataFor: 0 }),
    }),
})


export const { useGetCallQuery, useGetCallsQuery } = extendedApiSlice
