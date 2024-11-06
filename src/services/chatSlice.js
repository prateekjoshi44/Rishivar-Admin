
import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
    endpoints: builder => ({
        getChats: builder.query({ query: () => `chat`, keepUnusedDataFor: 0 }),
        getChat: builder.query({ query: (id) => `chat?id=${id}`, keepUnusedDataFor: 0 }),
    }),
})


export const { useGetChatsQuery, useGetChatQuery } = extendedApiSlice
