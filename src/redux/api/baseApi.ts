import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { toast } from "sonner";

// const baseUrl = "https://cycle-control-hub-server.vercel.app/api/v1";
const baseUrl = "http://localhost:5000/api/v1";
const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

//* Create custom baseQuery function
const customBaseQuery: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 409) {
    toast.error((result?.error?.data as { message?: string })?.message)
  }
  
  if (result?.error?.status === 404) {
    toast.error((result?.error?.data as { message?: string })?.message)
  }

  if (result?.error?.status === 403) {
    toast.error((result?.error?.data as { message?: string })?.message)
  }

  if (result?.error?.status === 401) {
    toast.error((result?.error?.data as { message?: string })?.message)
  }
  if (result?.error?.status === 400) {
    toast.error((result?.error?.data as { message?: string })?.message)
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Users", "Bike", "Buyer", "Coupon", "ServiceCategory", "Service"],
  endpoints: () => ({}),
});
