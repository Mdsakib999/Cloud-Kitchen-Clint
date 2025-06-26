import React from "react";
import { useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

export default function DynamicFieldArray({
  name,
  label,
  control,
  register,
  errors,
  fieldDefs,
}) {
  const { fields, append, remove } = useFieldArray({ name, control });

  return (
    <fieldset className="mb-8">
      <legend className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 pr-2">{label}</h3>
        <button
          type="button"
          onClick={() => {
            const empty = fieldDefs.reduce(
              (acc, def) => ({
                ...acc,
                [def.name]: def.type === "number" ? 0 : "",
              }),
              {}
            );
            append(empty);
          }}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <Plus className="w-4 h-4" /> Add {label.slice(0, -1)}
        </button>
      </legend>

      <div className="space-y-3">
        {fields.map((item, index) => (
          <div key={item.id} className="flex gap-3">
            {fieldDefs.map((def) => (
              <input
                key={def.name}
                type={def.type}
                placeholder={def.placeholder || def.name}
                className="flex-1 border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                {...register(`${name}.${index}.${def.name}`, {
                  required: `${def.name} is required`,
                  valueAsNumber: def.type === "number",
                  min:
                    def.type === "number"
                      ? { value: 0, message: `${def.name} must be >= 0` }
                      : undefined,
                })}
              />
            ))}
            <button
              type="button"
              onClick={() => remove(index)}
              className="px-4 py-3 text-red-600 hover:text-red-700 border-2 border-red-200 hover:border-red-300 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {errors[name] && Array.isArray(errors[name]) && (
        <p className="text-red-500 text-sm mt-2">
          {errors[name]
            .map((err, i) => {
              const firstKey = err && Object.keys(err)[0];
              return err[firstKey]?.message || null;
            })
            .join(", ")}
        </p>
      )}
    </fieldset>
  );
}
