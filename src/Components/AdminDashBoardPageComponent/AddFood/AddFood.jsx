import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import {
  useAddProductMutation,
  useGetCategoriesQuery,
} from "../../../redux/apiSlice";
import ImageUploader from "./ImageUploader";
import DynamicFieldArray from "./DynamicFieldArray";

export default function AddFood() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const { data: categories = [], isLoading: catLoading } =
    useGetCategoriesQuery();
  const [addProduct, { isLoading, isError, error }] = useAddProductMutation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      cookTime: "",
      servings: 1,
      ingredients: [""],
      sizes: [{ label: "", price: 0 }],
      addons: [{ label: "", price: 0 }],
      options: [
        {
          name: "",
          type: "single",
          required: false,
          choices: [{ label: "", price: 0 }],
        },
      ],
      images: [],
    },
  });

  const ingredientsArray = useFieldArray({ name: "ingredients", control });
  const sizesArray = useFieldArray({ name: "sizes", control });
  const addonsArray = useFieldArray({ name: "addons", control });
  const optionsArray = useFieldArray({ name: "options", control });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("cookTime", data.cookTime);
    formData.append("servings", data.servings.toString());
    formData.append(
      "ingredients",
      JSON.stringify(data.ingredients.filter((i) => i))
    );
    formData.append("sizes", JSON.stringify(data.sizes));
    formData.append("addons", JSON.stringify(data.addons));
    formData.append("options", JSON.stringify(data.options));
    uploadedImages.forEach(({ file }) => formData.append("images", file));
    try {
      await addProduct(formData).unwrap();
      uploadedImages.forEach((u) => URL.revokeObjectURL(u.preview));
      setUploadedImages([]);
      reset();
      alert("Product added successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl"
      >
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Add New Food
          </h2>
          <p className="text-gray-600">Create a new food item for your menu</p>
        </div>

        {/* Basic Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Food Title *
            </label>
            <input
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Enter food name"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            {catLoading ? (
              <div className="w-full border-2 border-gray-200 rounded-lg p-3">
                Loading categories...
              </div>
            ) : (
              <select
                className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                {...register("category", {
                  required: "Please select a category",
                })}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="mb-8">
          <input type="hidden" {...register("images")} />
          <ImageUploader
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
            setValue={setValue}
          />
        </div>

        {/* Cook Time and Servings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cook Time
            </label>
            <input
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              {...register("cookTime")}
              placeholder="e.g. 20 mins"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Servings
            </label>
            <input
              type="number"
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              {...register("servings", {
                min: { value: 1, message: "At least 1 serving required" },
              })}
            />
            {errors.servings && (
              <p className="text-red-500 text-sm mt-1">
                {errors.servings.message}
              </p>
            )}
          </div>
        </div>

        {/* Ingredients */}
        <DynamicFieldArray
          name="ingredients"
          label="Ingredients"
          control={control}
          register={register}
          errors={errors}
          fieldDefs={[{ name: "0", type: "text", placeholder: "Ingredient" }]}
        />

        {/* Sizes */}
        <DynamicFieldArray
          name="sizes"
          label="Sizes"
          control={control}
          register={register}
          errors={errors}
          fieldDefs={[
            { name: "label", type: "text" },
            { name: "price", type: "number" },
          ]}
        />

        {/* Add-ons */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Add-ons</h3>
            <button
              type="button"
              onClick={() => addonsArray.append({ label: "", price: 0 })}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Add-on
            </button>
          </div>
          <div className="space-y-3">
            {addonsArray.fields.map((item, index) => (
              <div key={item.id} className="flex gap-3">
                <input
                  placeholder="Add-on name (e.g., Extra Cheese, Bacon)"
                  className="flex-1 border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                  {...register(`addons.${index}.label`, { required: true })}
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  className="w-32 border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                  {...register(`addons.${index}.price`, {
                    valueAsNumber: true,
                    min: 0,
                  })}
                />
                <button
                  type="button"
                  onClick={() => addonsArray.remove(index)}
                  className="px-4 py-3 text-red-600 hover:text-red-700 border-2 border-red-200 hover:border-red-300 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Options */}
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors text-lg"
        >
          {isLoading ? "Saving..." : "Save Food Item"}
        </button>

        {isError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-medium">{error?.toString()}</p>
          </div>
        )}
      </form>
    </div>
  );
}
