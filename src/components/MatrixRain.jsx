import React, { useEffect, useRef } from 'react';

export function MatrixRain({ isActive, onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$%&*#@!';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF66';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between p-6 bg-black/90">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between w-full font-mono text-xs text-[#00FF66] tracking-widest uppercase bg-black/80 p-4 border border-[#00FF66]/40 rounded-xl backdrop-blur-md pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-sm">MATRIX NERD MODE ACTIVE</span>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-1.5 rounded-lg bg-[#00FF66]/20 border border-[#00FF66] text-[#00FF66] hover:bg-[#00FF66] hover:text-black font-bold transition-all cursor-pointer"
        >
          EXIT MATRIX [ESC]
        </button>
      </div>

      <div className="relative z-10 text-center font-mono text-xs text-[#00FF66]/80 bg-black/80 p-3 border border-[#00FF66]/30 rounded-xl max-w-md mx-auto pointer-events-auto">
        SYSTEM OVERRIDE: Explanations are now injected directly into your cerebral cortex.
      </div>
    </div>
  );
}
