import React from 'react';

function FormSelect({ label, name, value, onChange, options = [] }) {
  // Normaliza o valor vindo do formData (para evitar erros de capitalização)
  const normalizedValue = (value || '').toString().toUpperCase();

  // Normaliza as opções
  const normalizedOptions = options.map(option => ({
    value: option.value.toString().toUpperCase(),
    label: option.label,
  }));

  // Garante que o valor selecionado sempre exista entre as opções
  const selectedValue = normalizedOptions.some(opt => opt.value === normalizedValue)
    ? normalizedValue
    : normalizedOptions[0]?.value || '';

  return (
    <div className="col-span-full">
      <label htmlFor={name} className="block mb-2 text-sm font-bold text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={selectedValue}
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