import React from 'react';

// Um componente de botão reutilizável e estilizável
function Button({ 
    children, // O conteúdo do botão (texto, ícone, etc.)
    onClick, 
    type = 'button', // 'button', 'submit', ou 'reset'
    variant = 'primary', // 'primary', 'secondary', etc.
    disabled = false,
    className = '', // Para adicionar classes extras, se necessário
}) {

     // Estilo base, comum a todos os botões
    const baseStyle = "w-full font-semibold py-3 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

    // Estilos específicos para cada variante
    const variantStyles = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
        secondary: 'bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-400',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    };

    // Estilo para quando o botão estiver desabilitado
    const disabledStyle = "opacity-50 cursor-not-allowed";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                ${baseStyle} 
                ${variantStyles[variant]} 
                ${disabled ? disabledStyle : ''}
                ${className}
            `}
        >
            {children}
        </button>
    );
}

export default Button;