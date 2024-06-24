import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/' }),
    tagTypes: ['Orders'],
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => 'history',
            providedTags: ['Orders'],
        }),
        createOrder: builder.mutation({
            query: order => ({
                url: 'order',
                method: 'POST',
                body: order,
            }),
            invalidatesTags: ['Orders'],
        }),
    })
});

export const { useGetOrdersQuery, useCreateOrderMutation } = pizzaApi;
