import React, { useRef, useEffect, useState } from 'react';

export const NeuralStreamExperiment: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frequency, setFrequency] = useState(0.02);
  const [speed, setSpeed] = useState(0.05);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    const render = () => {
      ctx.fillStyle = '#050609';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#78AFFF';

      const width = canvas.width;
      const height = canvas.height;

      for (let x = 0; x < width; x += 4) {
        const y = height / 2 + Math.sin(x * frequency + step) * 40 + Math.cos(x * 0.01 + step * 0.5) * 20;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Render particle dots along wave
      for (let x = 0; x < width; x += 40) {
        const y = height / 2 + Math.sin(x * frequency + step) * 40 + Math.cos(x * 0.01 + step * 0.5) * 20;
        ctx.fillStyle = '#B7D7FF';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      step += speed;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [frequency, speed]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between font-mono text-xs text-[#9BA4B2]">
        <span>EXP-03 // PROCEDURAL CANVAS WAVE VECTOR STREAM</span>
        <span className="text-[#78AFFF]">RENDER: 60FPS</span>
      </div>

      <div className="relative rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#050609] overflow-hidden">
        <canvas ref={canvasRef} width={700} height={180} className="w-full h-[180px] block" />
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-[#0A0D12] border border-[rgba(255,255,255,0.06)] font-mono text-xs">
        <div className="space-y-2">
          <div className="flex justify-between text-[#9BA4B2]">
            <span>WAVE FREQUENCY:</span>
            <span className="text-[#78AFFF] font-bold">{frequency.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="0.005"
            max="0.05"
            step="0.001"
            value={frequency}
            aria-label="Wave frequency slider"
            onChange={(e) => setFrequency(parseFloat(e.target.value))}
            className="w-full accent-[#78AFFF]"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[#9BA4B2]">
            <span>FLOW VELOCITY:</span>
            <span className="text-[#B7D7FF] font-bold">{speed.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="0.1"
            step="0.005"
            value={speed}
            aria-label="Flow velocity slider"
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full accent-[#B7D7FF]"
          />
        </div>
      </div>
    </div>
  );
};
