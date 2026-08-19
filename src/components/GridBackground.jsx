import React, { useState, useEffect } from 'react';

export function GridBackground({ isDarkMode }) {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>

      <div
        className="absolute inset-0 bg-grid-pattern opacity-100 transition-opacity duration-300"
        style={{
          maskImage: `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%)`,
          WebkitMaskImage: `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%)`,
        }}
      ></div>

      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: isDarkMode
            ? `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, rgba(142, 168, 195, 0.18), transparent 70%)`
            : `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, rgba(28, 25, 23, 0.12), transparent 70%)`,
        }}
      ></div>
    </div>
  );
}
