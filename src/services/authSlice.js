import { rishivarSlice } from "../redux/rishivarSlice";


export const extendedApiSlice = rishivarSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({ query: (body) => ({ url: `auth/signIn`, method: "POST", body }) }),
    profile: builder.query({ query: () => `profile`, keepUnusedDataFor: 0 }),
    resetPassword: builder.mutation({ query: (body) => ({ url: `password/reset`, method: "POST", body }) }),


  }),
});

export const {
  useSignInMutation,
  useProfileQuery,
  useResetPasswordMutation

} = extendedApiSlice;
