import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

import {
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useEditProductMutation,
} from "../../../redux/apiSlice";

import ImageUploader from "../AddFood/ImageUploader";
import DynamicFieldArray from "../AddFood/DynamicFieldArray";

export default function EditFoodForm() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const productFromState = location.state?.product;

  const {
    data: fetchedProduct,
    isLoading: prodLoading,
    isError: prodError,
    error: prodErrorObj,
  } = useGetProductByIdQuery(id, { skip: !!productFromState });

  const product = productFromState || fetchedProduct;

  useEffect(() => {
    if (!product && prodLoading === false && prodError) {
      alert("Unable to load product for editing");
      navigate(-1);
    }
  }, [product, prodLoading, prodError, navigate]);

  const { data: categories = [], isLoading: catLoading } =
    useGetCategoriesQuery();

  const [editProduct, { isLoading: isSaving, isError, error }] =
    useEditProductMutation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      category: product?.category?._id || "",
      cookTime: product?.cookTime || "",
      servings: product?.servings || 1,
      ingredients: product?.ingredients || [""],
      sizes: product?.sizes || [{ label: "", price: 0, discountPrice: 0 }],
      addons: product?.addons || [],
      options: product?.options || [],
      images: [],
    },
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  useEffect(() => {
    if (product?.images) {
      const initial = product.images.map((url) => ({
        file: null,
        preview: url,
      }));
      setUploadedImages(initial);
      setValue("images", []);
    }
  }, [product, setValue]);

  // field arrays
  const ingredientsArray = useFieldArray({ name: "ingredients", control });
  const sizesArray = useFieldArray({ name: "sizes", control });
  const addonsArray = useFieldArray({ name: "addons", control });
  const optionsArray = useFieldArray({ name: "options", control });

  // submission handler
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("cookTime", data.cookTime);
    formData.append("servings", data.servings.toString());
    formData.append(
      "ingredients",
      JSON.stringify(data.ingredients.filter(Boolean))
    );
    formData.append("sizes", JSON.stringify(data.sizes));
    formData.append("addons", JSON.stringify(data.addons));
    formData.append("options", JSON.stringify(data.options));

    uploadedImages
      .filter((u) => u.file)
      .forEach(({ file }) => formData.append("images", file));

    try {
      await editProduct({ id: product._id, data: formData }).unwrap();
      alert("Product updated!");
      navigate(-1);
    } catch {
      alert("Update failed");
    }
  };

  if (prodLoading) return <p>Loading product…</p>;
  if (prodError) return <p>Error: {prodErrorObj.toString()}</p>;

  return (
    <div className="p-8  min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl lg:max-w-4xl mx-auto bg-white p-6 rounded "
      >
        {/* — Title & Category — */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Title *</label>
            <input
              {...register("title", { required: "Required" })}
              className="w-full border border-gray-200 p-2 rounded"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Category *</label>
            {catLoading ? (
              <p>Loading categories…</p>
            ) : (
              <select
                {...register("category", { required: "Required" })}
                className="w-full border border-gray-200 p-2 rounded"
              >
                <option value="">Select one</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
        </div>
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows={4}
            className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors resize-none"
            placeholder="Enter a brief description of the food"
            {...register("description")}
          />
        </div>

        {/* — Sizes — */}
        <DynamicFieldArray
          name="sizes"
          label="Sizes"
          control={control}
          register={register}
          errors={errors}
          fieldDefs={[
            {
              name: "label",
              type: "text",
              placeholder: "Small / Medium / Large",
            },
            { name: "price", type: "number", placeholder: "Price" },
            {
              name: "discountPrice",
              type: "number",
              placeholder: "Discount Price",
            },
          ]}
        />

        {/* — Images — */}
        <div>
          <input type="hidden" {...register("images")} />
          <ImageUploader
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
            setValue={setValue}
          />
        </div>

        {/* — CookTime & Servings — */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Cook Time</label>
            <input
              {...register("cookTime")}
              className="w-full border border-gray-200 p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Servings</label>
            <input
              type="number"
              {...register("servings", { min: 1 })}
              className="w-full border border-gray-200 p-2 rounded"
            />
          </div>
        </div>

        {/* — Ingredients — */}
        <fieldset>
          <legend className="flex justify-between items-center mb-2">
            <span className="font-semibold">Ingredients</span>
            <button
              type="button"
              onClick={() => ingredientsArray.append("")}
              className="text-blue-600 flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" /> Add
            </button>
          </legend>
          <div className="space-y-2">
            {ingredientsArray.fields.map((f, i) => (
              <div key={f.id} className="flex gap-2">
                <input
                  {...register(`ingredients.${i}`, { required: true })}
                  className="flex-1 border border-gray-200 p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => ingredientsArray.remove(i)}
                  className="text-red-600"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
        </fieldset>

        <DynamicFieldArray
          name="addons"
          label="Add‑ons"
          control={control}
          register={register}
          errors={errors}
          noRequired
          fieldDefs={[
            { name: "label", type: "text" },
            { name: "price", type: "number" },
          ]}
        />
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Option Groups
            </h3>
            <button
              type="button"
              onClick={() =>
                optionsArray.append({
                  name: "",
                  type: "single",
                  required: false,
                  choices: [{ label: "", price: 0 }],
                })
              }
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Option Group
            </button>
          </div>
          <div className="space-y-6">
            {optionsArray.fields.map((item, index) => (
              <div
                key={item.id}
                className="border-2 border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <input
                    placeholder="Option group name (e.g., Spice Level, Toppings)"
                    className="flex-1 border-2 border-gray-200 rounded-lg p-3 font-medium focus:border-blue-500 focus:outline-none transition-colors"
                    {...register(`options.${index}.name`, { required: true })}
                  />
                  <select
                    {...register(`options.${index}.type`)}
                    className="border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="single">Single Choice</option>
                    <option value="multiple">Multiple Choice</option>
                  </select>
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <input
                      type="checkbox"
                      {...register(`options.${index}.required`)}
                      className="w-4 h-4 text-blue-600"
                    />
                    Required
                  </label>
                  <button
                    type="button"
                    onClick={() => optionsArray.remove(index)}
                    className="p-2 text-red-600 hover:text-red-700 border-2 border-red-200 hover:border-red-300 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <Controller
                  name={`options.${index}.choices`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-3">
                        Choices
                      </p>
                      <div className="space-y-2">
                        {field.value.map((choice, cIndex) => (
                          <div key={cIndex} className="flex gap-3">
                            <input
                              placeholder="Choice label"
                              className="flex-1 border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none transition-colors"
                              value={choice.label}
                              onChange={(e) => {
                                const newChoices = [...field.value];
                                newChoices[cIndex].label = e.target.value;
                                field.onChange(newChoices);
                              }}
                            />
                            <input
                              type="number"
                              step="0.01"
                              placeholder="Price"
                              className="w-28 border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none transition-colors"
                              value={choice.price}
                              onChange={(e) => {
                                const newChoices = [...field.value];
                                newChoices[cIndex].price =
                                  parseFloat(e.target.value) || 0;
                                field.onChange(newChoices);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          field.onChange([
                            ...field.value,
                            { label: "", price: 0 },
                          ])
                        }
                        className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <Plus className="w-3 h-3" />
                        Add Choice
                      </button>
                    </div>
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        {/* — Submit — */}
        <div className="flex justify-end mt-4 space-x-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {isSaving ? "Saving…" : "Save Changes"}
          </button>
        </div>

        {isError && <p className="text-red-500 mt-2">{error.toString()}</p>}
      </form>
    </div>
  );
}
