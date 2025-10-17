import React from 'react';

function FormTextarea({ label, name, value, onChange, placeholder, required = false, rows = 4 }) {
  return (
    <div className="col-span-full">
      {label && (
        <label htmlFor={name} className="block mb-2 text-sm font-bold text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default FormTextarea;