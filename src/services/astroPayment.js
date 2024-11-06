
import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
    endpoints: builder => ({
        getAstroPayments: builder.query({ query: () => `astroPayment`, keepUnusedDataFor: 0 }),
        getAstroPayment: builder.query({ query: (id) => `astroPayment?id=${id}`, keepUnusedDataFor: 0 }),
        patchAstroPayment: builder.mutation({ query: (body) => ({ url: `astroPayment`, method: "PATCH", body }) }),
        createAstroPayment: builder.mutation({ query: (body) => ({ url: `astroPayment`, method: "POST", body }) }),

    }),
})


export const { useGetAstroPaymentQuery, useGetAstroPaymentsQuery, usePatchAstroPaymentMutation, useCreateAstroPaymentMutation } = extendedApiSlice
