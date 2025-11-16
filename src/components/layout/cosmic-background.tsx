'use client';

import { useState, useEffect } from 'react';

const CosmicBackground = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }).map(() => ({
        id: Math.random(),
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 2 + 1}px`,
        duration: `${Math.random() * 15 + 10}s`,
        delay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.5 + 0.2,
      }));
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/50 animate-[float_var(--duration)_ease-in-out_infinite]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
            // @ts-ignore
            '--duration': p.duration,
          }}
        />
      ))}
    </div>
  );
};

export default CosmicBackground;
