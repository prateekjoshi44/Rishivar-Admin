
import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
    endpoints: builder => ({
        getAstros: builder.query({ query: () => `astro`, keepUnusedDataFor: 0 }),
        getAstro: builder.query({ query: (id) => `astro?id=${id}`, keepUnusedDataFor: 0 }),
        patchAstro: builder.mutation({ query: (body) => ({ url: `astro`, method: "PATCH", body }) }),
        createAstro: builder.mutation({ query: (body) => ({ url: `astro`, method: "POST", body }) }),
    }),
})


export const { useGetAstroQuery, useGetAstrosQuery, usePatchAstroMutation, useCreateAstroMutation } = extendedApiSlice
