import { useEffect, useState } from "react";
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
import toast from "react-hot-toast";

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
      toast.error("Unable to load product for editing");
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
    if (product?.images && uploadedImages.length === 0) {
      const initial = product.images.map((url) => ({
        file: null,
        preview: url,
      }));
      setUploadedImages(initial);
      setValue("images", initial);
    }
  }, [product, setValue, uploadedImages.length]);

  const ingredientsArray = useFieldArray({ name: "ingredients", control });
  const sizesArray = useFieldArray({ name: "sizes", control });
  const addonsArray = useFieldArray({ name: "addons", control });
  const optionsArray = useFieldArray({ name: "options", control });

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
      toast.success("Product updated!");
      navigate(-1);
    } catch {
      toast.error("Update failed");
    }
  };

  if (prodLoading)
    return <p className="text-center text-gray-600">Loading product...</p>;
  if (prodError)
    return (
      <p className="text-center text-red-500">
        Error: {prodErrorObj.toString()}
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[90%] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl bg-white rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 space-y-6"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-4">
          Edit Food Item
        </h2>

        {/* Title & Category */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50 text-gray-900 text-sm"
              placeholder="Enter food title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            {catLoading ? (
              <p className="text-gray-600 text-sm">Loading categories...</p>
            ) : (
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50 text-gray-900 text-sm"
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
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

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images
          </label>
          <div className="flex flex-wrap gap-3 mb-3">
            {uploadedImages.length === 0 && (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-gray-50 text-xs">
                No Images
              </div>
            )}
            {uploadedImages.map((img, idx) => (
              <div
                key={idx}
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-blue-200 shadow-sm"
              >
                <img
                  src={img.preview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() =>
                    setUploadedImages(
                      uploadedImages.filter((_, i) => i !== idx)
                    )
                  }
                  className="absolute top-1 right-1 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 rounded-full p-1 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <input type="hidden" {...register("images")} />
          <ImageUploader
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
            setValue={setValue}
          />
        </div>

        {/* Sizes */}
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
              placeholder: "e.g. Small, Medium, Large",
            },
            { name: "price", type: "number", placeholder: "Price" },
            {
              name: "discountPrice",
              type: "number",
              placeholder: "Discount Price",
            },
          ]}
        />

        {/* CookTime & Servings */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cook Time
            </label>
            <input
              {...register("cookTime")}
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50 text-gray-900 text-sm"
              placeholder="e.g. 30 min"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Servings
            </label>
            <input
              type="number"
              {...register("servings", { min: 1 })}
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50 text-gray-900 text-sm"
              placeholder="e.g. 1"
            />
          </div>
        </div>

        {/* Ingredients */}
        <fieldset>
          <legend className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Ingredients
            </span>
            <button
              type="button"
              onClick={() => ingredientsArray.append("")}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Add Ingredient
            </button>
          </legend>
          <div className="space-y-2">
            {ingredientsArray.fields.map((f, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  {...register(`ingredients.${i}`, {
                    required: "Ingredient is required",
                  })}
                  className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50 text-gray-900 text-sm"
                  placeholder="Enter ingredient"
                />
                <button
                  type="button"
                  onClick={() => ingredientsArray.remove(i)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Add-ons */}
        <DynamicFieldArray
          name="addons"
          label="Add-ons"
          control={control}
          register={register}
          errors={errors}
          noRequired
          fieldDefs={[
            { name: "label", type: "text", placeholder: "e.g. Extra Cheese" },
            { name: "price", type: "number", placeholder: "e.g. 1.99" },
          ]}
        />

        {/* Option Groups */}
        <div>
          <div className="flex items-center justify-between mb-3">
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
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Add Option Group
            </button>
          </div>
          <div className="space-y-4">
            {optionsArray.fields.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  <input
                    placeholder="Option group name (e.g., Spice Level)"
                    className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-sm"
                    {...register(`options.${index}.name`, {
                      required: "Option name is required",
                    })}
                  />
                  <select
                    {...register(`options.${index}.type`)}
                    className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-sm"
                  >
                    <option value="single">Single Choice</option>
                    <option value="multiple">Multiple Choice</option>
                  </select>
                  <label className="flex items-center gap-1 text-xs sm:text-sm font-medium">
                    <input
                      type="checkbox"
                      {...register(`options.${index}.required`)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    Required
                  </label>
                  <button
                    type="button"
                    onClick={() => optionsArray.remove(index)}
                    className="p-1.5 text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <Controller
                  name={`options.${index}.choices`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Choices
                      </p>
                      <div className="space-y-2">
                        {field.value.map((choice, cIndex) => (
                          <div
                            key={cIndex}
                            className="flex flex-col sm:flex-row gap-2"
                          >
                            <input
                              placeholder="Choice label"
                              className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-sm"
                              value={choice.label}
                              onChange={(e) => {
                                const newChoices = [...field.value];
                                newChoices[cIndex].label = e.target.value;
                                field.onChange(newChoices);
                              }}
                            />
                            <input
                              type="number"
                              min={0}
                              placeholder="Price"
                              className="w-full sm:w-24 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-sm"
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
                        className="mt-2 flex items-center gap-1 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <Plus className="w-4 h-4" /> Add Choice
                      </button>
                    </div>
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {isError && (
          <p className="text-red-500 text-sm mt-2">{error.toString()}</p>
        )}
      </form>
    </div>
  );
}
