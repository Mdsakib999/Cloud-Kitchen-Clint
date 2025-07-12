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
  noRequired = false,
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
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full"
          >
            {fieldDefs.map((def) => {
              const rules = {};
              if (!noRequired && def.required !== false) {
                rules.required = `${def.name} is required`;
              }
              if (def.type === "number") {
                rules.valueAsNumber = true;
                rules.min = { value: 0, message: `${def.name} must be >= 0` };
              }

              if (def.validate) {
                Object.assign(rules, def.validate);
              }

              return (
                <div
                  key={def.name}
                  className="flex flex-col w-full min-w-0 mb-2 sm:mb-0"
                >
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-1"
                    htmlFor={`${name}.${index}.${def.name}`}
                  >
                    {def.name}
                  </label>
                  <input
                    id={`${name}.${index}.${def.name}`}
                    type={def.type}
                    placeholder={def.placeholder || def.name}
                    className="border-2 border-gray-200 rounded-lg p-2 sm:p-3 focus:border-blue-500 focus:outline-none transition-colors w-full min-w-0 text-sm"
                    {...register(`${name}.${index}.${def.name}`, rules)}
                  />
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => remove(index)}
              className="self-end sm:self-center mt-2 sm:mt-0 text-red-600 hover:text-red-700 transition-colors flex-shrink-0"
              aria-label="Remove"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {errors[name] && Array.isArray(errors[name]) && (
        <p className="text-red-500 text-sm mt-2">
          {errors[name]
            .map((err) => {
              const key = err && Object.keys(err)[0];
              return err[key]?.message || null;
            })
            .filter(Boolean)
            .join(", ")}
        </p>
      )}
    </fieldset>
  );
}
