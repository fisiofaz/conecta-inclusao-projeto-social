import React from 'react';
import { Link } from 'react-router-dom';

// Componente reutilizável para exibir itens em uma lista
export function ItemCard({ title, subtitle, description, linkTo }) {
    return (
    <div className="flex flex-col transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl">
        <div className="flex-grow p-6">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
            {subtitle && (
            <p className="mb-3 font-normal text-gray-500">{subtitle}</p>
            )}
            <p className="mb-3 font-normal text-gray-700">
            {description}
            </p>
        </div>
        <div className="px-6 pb-4">
            <Link
            to={linkTo}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
                Ver Detalhes
                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Link>
        </div>
    </div>
    );
}