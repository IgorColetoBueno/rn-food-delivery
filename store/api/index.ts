import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../model/product";
import { Restaurant } from "../../model/restaurant";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://64cc55ed2eafdcdc8519c345.mockapi.io/api/v1/",
  }),
  endpoints: (builder) => ({
    getProductsByRestaurant: builder.query<Product[], string>({
      query: (restaurantId) => `products?restaurantId=${restaurantId}`,
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
    }),
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => "restaurants",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductByIdQuery,
  useGetProductsByRestaurantQuery,
  useGetRestaurantsQuery,
} = api;
