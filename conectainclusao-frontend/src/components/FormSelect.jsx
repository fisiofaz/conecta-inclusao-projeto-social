import React from 'react';

function FormSelect({ label, name, value, onChange, options = [] }) {
  return (
    <div className="col-span-full">
      <label htmlFor={name} className="block mb-2 text-sm font-bold text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 pr-8 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormSelect;