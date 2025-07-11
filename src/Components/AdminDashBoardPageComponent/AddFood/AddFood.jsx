import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import {
  useAddProductMutation,
  useGetCategoriesQuery,
} from "../../../redux/apiSlice";
import ImageUploader from "./ImageUploader";
import DynamicFieldArray from "./DynamicFieldArray";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
      description: "",
      category: "",
      cookTime: "",
      servings: 1,
      ingredients: [""],
      sizes: [{ label: "", price: 0 }],
      addons: [],
      options: [],
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
    formData.append("description", data.description);
    formData.append("longDescription", data.longDescription);
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
      toast.success(
        <h1 className="text-center font-serif">Food added successfully</h1>
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 mt-20 md:mt-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto p-2 sm:p-4 md:p-8 bg-white shadow-lg rounded-xl"
      >
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">
            Add New Food
          </h2>
          <p className="text-gray-600 text-xs sm:text-base">
            Create a new food item for your menu
          </p>
        </div>

        {/* Basic Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-8">
          {/* Title */}
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

          {/* Category */}
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

          {/* Description */}
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
        </div>
        {/* Long Description */}
        <div className=" mt-4 mb-14">
          <Controller
            name="longDescription"
            control={control}
            render={({ field }) => (
              <div className="mt-4 mb-14">
                <label className="text-lg font-semibold block mb-2">
                  Long Description
                </label>
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                  className="rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none h-[200px] max-w-full"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      [{ font: ["serif", "monospace", "sans-serif"] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ color: [] }, { background: [] }],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      [{ align: [] }, "blockquote", "code-block"],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "font",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "color",
                    "background",
                    "list",
                    "bullet",
                    "indent",
                    "align",
                    "blockquote",
                    "code-block",
                  ]}
                />
              </div>
            )}
          />
        </div>

        {/* Ingredients */}
        <div className="mb-2 sm:mb-8">
          <fieldset className="">
            <legend className="flex flex-col lg:flex-row justify-between items-start sm:items-center mb-2 sm:mb-4 gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                Ingredients
              </h3>
              <button
                type="button"
                onClick={() => ingredientsArray.append("")}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-base"
              >
                <Plus className="w-4 h-4" /> Add Ingredient
              </button>
            </legend>

            <div className="space-y-2 lg:space-y-3">
              {ingredientsArray.fields.map((field, idx) => (
                <div key={field.id} className="flex flex-col lg:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Ingredient"
                    className="flex-1 border-2 border-gray-200 rounded-lg p-2 sm:p-3 focus:border-blue-500 transition-colors text-xs sm:text-base"
                    {...register(`ingredients.${idx}`, {
                      required: "Ingredient is required",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => ingredientsArray.remove(idx)}
                    className="px-2 py-2  sm:px-4 sm:py-3 text-red-600 hover:text-red-700 border-2 border-red-200 rounded-lg transition-colors text-xs sm:text-base"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {errors.ingredients && (
              <p className="text-red-500 text-xs sm:text-sm mt-2">
                {errors.ingredients.message}
              </p>
            )}
          </fieldset>
        </div>

        {/* Size & Price */}
        <div className="mb-6 sm:mb-8">
          <fieldset>
            <legend className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Sizes</h3>
              <button
                type="button"
                onClick={() =>
                  sizesArray.append({ label: "", price: 0, discountPrice: 0 })
                }
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" /> Add Size
              </button>
            </legend>

            <div className="space-y-4">
              {sizesArray.fields.map((field, idx) => (
                <div
                  key={field.id}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start"
                >
                  {/* Label (required) */}
                  <div className="flex-1">
                    <label
                      htmlFor={`sizes.${idx}.label`}
                      className="block text-sm font-medium mb-1"
                    >
                      Size name *
                    </label>
                    <input
                      id={`sizes.${idx}.label`}
                      type="text"
                      placeholder="e.g. Small"
                      className="w-full border border-gray-200 rounded p-2 focus:outline-none "
                      {...register(`sizes.${idx}.label`, {
                        required: "Label is required",
                      })}
                    />
                    {errors.sizes?.[idx]?.label && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.sizes[idx].label.message}
                      </p>
                    )}
                  </div>

                  {/* Price (required) */}
                  <div className="flex-1">
                    <label
                      htmlFor={`sizes.${idx}.price`}
                      className="block text-sm font-medium mb-1"
                    >
                      Price *
                    </label>
                    <input
                      id={`sizes.${idx}.price`}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full border border-gray-200 rounded p-2 focus:outline-none"
                      {...register(`sizes.${idx}.price`, {
                        required: "Price is required",
                        valueAsNumber: true,
                        min: { value: 0, message: "Must be ≥ 0" },
                      })}
                    />
                    {errors.sizes?.[idx]?.price && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.sizes[idx].price.message}
                      </p>
                    )}
                  </div>

                  {/* Discount Price (optional) */}
                  <div className="flex-1">
                    <label
                      htmlFor={`sizes.${idx}.discountPrice`}
                      className="block text-sm font-medium mb-1"
                    >
                      Discount Price
                    </label>
                    <input
                      id={`sizes.${idx}.discountPrice`}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full border border-gray-200 rounded p-2 focus:outline-none"
                      {...register(`sizes.${idx}.discountPrice`, {
                        valueAsNumber: true,
                        min: { value: 0, message: "Must be ≥ 0" },
                      })}
                    />
                    {errors.sizes?.[idx]?.discountPrice && (
                      <p className="text-red-500 text-xs mt-2">
                        {errors.sizes[idx].discountPrice.message}
                      </p>
                    )}
                  </div>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => sizesArray.remove(idx)}
                    className="text-red-600 hover:text-red-700 p-2"
                    aria-label="Remove size"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
        {/* Image Upload Section */}
        <div className="mb-6 sm:mb-8">
          <input type="hidden" {...register("images")} />
          <ImageUploader
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
            setValue={setValue}
          />
        </div>
        {/* Cook Time and Servings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-8">
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
              min={1}
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

        {/* Add-ons */}
        <div className="mb-6 sm:mb-8">
          <DynamicFieldArray
            name="addons"
            label="Add-ons"
            control={control}
            register={register}
            errors={errors}
            noRequired
            fieldDefs={[
              { name: "label", type: "text", placeholder: "e.g. Extra Cheese" },
              { name: "price", type: "number", placeholder: "e.g. 1.50" },
            ]}
            inputClassName="p-2 text-xs min-w-0 w-full focus:border-blue-500 border-gray-200 rounded-lg"
            rowClassName="flex flex-col xs:flex-row gap-2 w-full"
            colClassName="flex-1 min-w-0 w-full xs:min-w-[100px]"
          />
        </div>
        {/* Options */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-4 gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
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
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-base"
            >
              <Plus className="w-4 h-4" /> Add Option Group
            </button>
          </div>
          <div className="space-y-3 sm:space-y-6">
            {optionsArray.fields.map((item, index) => (
              <div
                key={item.id}
                className="border-2 border-gray-200 rounded-lg p-2 sm:p-6"
              >
                <div className="flex flex-col lg:flex-row items-stretch xs:items-center gap-2 xs:gap-4 mb-2 sm:mb-4">
                  <input
                    placeholder="Option group name (e.g., Spice Level, Toppings)"
                    className="flex-1 border-2 border-gray-200 rounded-lg p-2 sm:p-3 font-medium focus:border-blue-500 focus:outline-none transition-colors text-xs sm:text-base"
                    {...register(`options.${index}.name`, { required: true })}
                  />
                  <select
                    {...register(`options.${index}.type`)}
                    className="border-2 border-gray-200 rounded-lg p-2 sm:p-3 focus:border-blue-500 focus:outline-none transition-colors text-xs sm:text-base"
                  >
                    <option value="single">Single Choice</option>
                    <option value="multiple">Multiple Choice</option>
                  </select>
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-medium">
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
                      <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                        Choices
                      </p>
                      <div className="space-y-2">
                        {field.value.map((choice, cIndex) => (
                          <div
                            key={cIndex}
                            className="flex flex-col xs:flex-row gap-2"
                          >
                            <input
                              placeholder="Choice label"
                              className="flex-1 border border-gray-300 rounded-lg p-2 sm:p-3 focus:border-blue-500 focus:outline-none transition-colors text-xs sm:text-base"
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
                              className="w-20 sm:w-28 border border-gray-300 rounded-lg p-2 sm:p-3 focus:border-blue-500 focus:outline-none transition-colors text-xs sm:text-base"
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
                        className="mt-2 sm:mt-3 flex items-center gap-2 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <Plus className="w-3 h-3" /> Add Choice
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
          className="cursor-pointer w-full py-3 sm:py-4 bg-primary hover:bg-amber-500 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors text-base sm:text-lg"
        >
          {isLoading ? "Saving..." : "Save Food Item"}
        </button>

        {isError && (
          <div className="mt-4 p-2 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-medium text-xs sm:text-base">
              {error?.toString()}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
