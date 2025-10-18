import React from 'react';

function InfoCard({ imageSrc, altText, title, description, linkHref, linkText }) {
  return (
    <div className="flex flex-col h-full p-6 transition bg-white shadow-md rounded-2xl hover:shadow-lg">
      <img
        src={imageSrc}
        alt={altText}
        className="object-cover w-full h-48 mb-4 rounded-xl"
      />
      <div className="flex-grow">
        <h2 className="mb-2 text-xl font-semibold text-blue-700">{title}</h2>
        <p className="mb-4 text-gray-600">{description}</p>
      </div>
      <a
        href={linkHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto font-medium text-blue-600 hover:underline" // mt-auto alinha o link na base
      >
        {linkText} →
      </a>
    </div>
  );
}

export default InfoCard;