import React from 'react';

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl p-10 transition-all transform hover:-translate-y-2 hover:scale-[1.02]">
      {icon}
      <h3 className="mb-3 text-2xl font-semibold">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

export default FeatureCard;