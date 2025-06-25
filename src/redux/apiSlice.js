import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
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
  tagTypes: ["Category", "Product"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/admin/categories",
      providesTags: (result, error) =>
        result && Array.isArray(result)
          ? [
              { type: "Category", id: "LIST" },
              ...result.map((cat) => ({ type: "Category", id: cat._id })),
            ]
          : [{ type: "Category", id: "LIST" }],
    }),

    addCategory: builder.mutation({
      query: ({ name, imageFile }) => {
        const form = new FormData();
        form.append("name", name);
        if (imageFile) form.append("image", imageFile);
        return {
          url: "/admin/categories",
          method: "POST",
          body: form,
        };
      },
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    editCategory: builder.mutation({
      query: ({ id, name, imageFile }) => {
        const form = new FormData();
        if (name) form.append("name", name);
        if (imageFile) form.append("image", imageFile);
        return {
          url: `/admin/categories/${id}`,
          method: "PUT",
          body: form,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Category", id: arg.id },
        { type: "Category", id: "LIST" },
      ],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),

    // Product
    addProduct: builder.mutation({
      query: (formData) => ({
        url: "/admin/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useAddProductMutation,
} = apiSlice;
