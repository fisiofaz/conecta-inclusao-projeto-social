import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 p-4 text-white transition-transform bg-indigo-700 rounded-full shadow-2xl bottom-24 right-6 hover:bg-indigo-600 hover:scale-110"
          title="Voltar ao topo"
        >
          <FaArrowUp className="text-2xl" />
        </button>
      )}
    </>
  );
}

export default ScrollToTopButton;