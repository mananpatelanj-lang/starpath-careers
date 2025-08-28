import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create three layers of stars
    const stars: Star[][] = [[], [], []];
    const starCounts = [50, 30, 20]; // Different densities for each layer
    const colors = ['hsl(45, 100%, 70%)', 'hsl(270, 100%, 80%)', 'hsl(200, 100%, 85%)'];
    
    // Initialize stars for each layer
    starCounts.forEach((count, layer) => {
      for (let i = 0; i < count; i++) {
        stars[layer].push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (layer + 1) + 1,
          speed: (layer + 1) * 0.1,
          opacity: Math.random() * 0.5 + 0.3,
          color: colors[layer]
        });
      }
    });

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and animate each layer
      stars.forEach((layer, layerIndex) => {
        layer.forEach(star => {
          // Update position
          star.y += star.speed;
          if (star.y > canvas.height) {
            star.y = -star.size;
            star.x = Math.random() * canvas.width;
          }

          // Update opacity for twinkling effect
          star.opacity += (Math.random() - 0.5) * 0.02;
          star.opacity = Math.max(0.1, Math.min(0.8, star.opacity));

          // Draw star
          ctx.save();
          ctx.globalAlpha = star.opacity;
          ctx.fillStyle = star.color;
          ctx.shadowBlur = star.size * 2;
          ctx.shadowColor = star.color;

          // Draw star shape
          const x = star.x;
          const y = star.y;
          const size = star.size;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();

          // Add cross sparkle for larger stars
          if (size > 2) {
            ctx.strokeStyle = star.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x - size * 1.5, y);
            ctx.lineTo(x + size * 1.5, y);
            ctx.moveTo(x, y - size * 1.5);
            ctx.lineTo(x, y + size * 1.5);
            ctx.stroke();
          }

          ctx.restore();
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'radial-gradient(ellipse at center, hsl(270, 60%, 10%) 0%, hsl(240, 80%, 5%) 100%)' }}
    />
  );
}