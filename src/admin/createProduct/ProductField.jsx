import React from "react";

function ProductField({
  field,
  handleChange,
  handleBlur,
  errors,
  values,
  touched,
  type,
  label
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      <input
        name={field}
        type={type}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[field]}
        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2"
      />
      {touched[field] && errors[field] && (
        <p className="mt-1 text-red-500 text-sm">{errors[field]}</p>
      )}
    </div>
  );
}

export default ProductField;
