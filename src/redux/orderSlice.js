import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "/order/all-orders",
      providesTags: (result) =>
        result && Array.isArray(result)
          ? [
            { type: "Order", id: "LIST" },
            ...result.map((order) => ({ type: "Order", id: order._id })),
          ]
          : [{ type: "Order", id: "LIST" }],
    }),

    getOrderById: builder.query({
      query: (orderId) => `/order/${orderId}`,
      providesTags: (result, error, orderId) => [
        { type: "Order", id: orderId },
      ],
    }),

    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order/create-order",
        method: "POST",
        body: orderData,
      }),
      // Invalidate both general list and user-specific list
      invalidatesTags: [
        { type: "Order", id: "LIST" },
        { type: "Order", id: "USER_LIST" }
      ],
    }),

    updateOrder: builder.mutation({
      query: ({ id, orderData }) => ({
        url: `/order/${id}`,
        method: "PUT",
        body: orderData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
        { type: "Order", id: "USER_LIST" }
      ],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
        { type: "Order", id: "USER_LIST" }
      ],
    }),

    getOrdersByUser: builder.query({
      query: (userId) => `/order/user/${userId}`,
      providesTags: (result, error, userId) =>
        result && Array.isArray(result)
          ? [
            { type: "Order", id: "USER_LIST" },
            { type: "Order", id: `USER_LIST_${userId}` },
            ...result.map((order) => ({ type: "Order", id: order._id })),
          ]
          : [
            { type: "Order", id: "USER_LIST" },
            { type: "Order", id: `USER_LIST_${userId}` }
          ],
    }),

    // Additional mutations that might affect orders
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/order/${orderId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Order", id: orderId },
        { type: "Order", id: "LIST" },
        { type: "Order", id: "USER_LIST" }
      ],
    }),

    updatePaymentStatus: builder.mutation({
      query: ({ orderId, paymentStatus }) => ({
        url: `/order/${orderId}/payment-status`,
        method: "PATCH",
        body: { paymentStatus },
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Order", id: orderId },
        { type: "Order", id: "LIST" },
        { type: "Order", id: "USER_LIST" }
      ],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrdersByUserQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
  useUpdatePaymentStatusMutation,
} = orderApi;