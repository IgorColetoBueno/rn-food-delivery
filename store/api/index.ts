import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../model/product";
import { Restaurant } from "../../model/restaurant";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://64cc55ed2eafdcdc8519c345.mockapi.io/api/v1/",
    cache: "force-cache",
  }),
  endpoints: (builder) => ({
    getProductsByRestaurant: builder.query<Product[], string>({
      query: (restaurantId) => `products?restaurantId=${restaurantId}`,
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
    }),
    getRestaurantById: builder.query<Restaurant, string>({
      query: (id) => `restaurants/${id}`,
    }),
    getRestaurants: builder.query<Restaurant[], Partial<Restaurant>>({
      query: (payload) => {
        const params = new URL("restaurants");
        if (payload.name) {
          params.searchParams.append("name", payload.name);
        }
        if (payload.categories?.length) {
          params.searchParams.append("categories", payload.categories[0]);
        }

        return params.toString();
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductByIdQuery,
  useGetProductsByRestaurantQuery,
  useGetRestaurantsQuery,
  useGetRestaurantByIdQuery,
} = api;
