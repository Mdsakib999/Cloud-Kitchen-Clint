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
  tagTypes: ["Category", "Product", "Blog"],
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

    // Product (Admin)
    addProduct: builder.mutation({
      query: (formData) => ({
        url: "/admin/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    editProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // Public
    getAllProducts: builder.query({
      query: () => "/user/products",
      providesTags: (result) =>
        result
          ? [
              { type: "Product", id: "LIST" },
              ...result.map(({ _id }) => ({ type: "Product", id: _id })),
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProductById: builder.query({
      query: (id) => `/user/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    getMenuCategories: builder.query({
      query: () => "/user/get-categories",
      providesTags: (result, error) =>
        result && Array.isArray(result)
          ? [
              { type: "Category", id: "LIST" },
              ...result.map((cat) => ({ type: "Category", id: cat._id })),
            ]
          : [{ type: "Category", id: "LIST" }],
    }),

    // Blogs
    getAllBlogs: builder.query({
      query: () => "/admin/all-blogs",
      transformResponse: (response) => response.blogs,
      providesTags: (blogs = []) => [
        { type: "Blog", id: "LIST" },
        ...blogs.map((b) => ({ type: "Blog", id: b._id })),
      ],
    }),
    getBlogById: builder.query({
      query: (id) => `/admin/blog/${id}`,
      providesTags: (result, error, id) => [{ type: "Blog", id }],
    }),
    createBlog: builder.mutation({
      query: (formData) => ({
        url: "/admin/create-blog",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Blog", id: "LIST" }],
    }),
    updateBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/blog/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Blog", id },
        { type: "Blog", id: "LIST" },
      ],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/admin/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Blog", id },
        { type: "Blog", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetMenuCategoriesQuery,
  // Blogs
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = apiSlice;
