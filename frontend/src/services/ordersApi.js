import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: (params) => ({
                url: '/orders',
                params,
            }),
            providesTags: ['Orders'],
        }),
        getOrderById: builder.query({
            query: (id) => `/orders/${id}`,
        }),
    }),
});

export const { useGetOrdersQuery, useGetOrderByIdQuery } = ordersApi;
