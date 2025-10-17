import React from 'react';

function FormInput({ label, name, type = 'text', value, onChange, placeholder, required = false, readOnly = false }) {
  const baseClasses = "p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full";
  const readOnlyClasses = "bg-gray-100 cursor-not-allowed";

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block mb-2 text-sm font-bold text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        className={`${baseClasses} ${readOnly ? readOnlyClasses : ''}`}
      />
    </div>
  );
}

export default FormInput;