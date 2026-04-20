import { useEffect, useRef, useState } from "react";

export default function IntroLoader() {
  const canvasRef = useRef(null);
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let t = 0;
    let path = [];

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // orb movement path (organic curve)
      let x = cx + Math.sin(t * 0.03) * 120;
      let y = cy + Math.cos(t * 0.02) * 80;

      path.push({ x, y });

      // draw trail
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 2;
      ctx.beginPath();

      path.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });

      ctx.stroke();

      // glowing orb
      let glow = ctx.createRadialGradient(x, y, 0, x, y, 30);
      glow.addColorStop(0, "rgba(255,255,255,1)");
      glow.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();

      t++;

      if (t < 140) {
        requestAnimationFrame(draw);
      } else {
        setShowLogo(true);
        setTimeout(() => setShowText(true), 400);
      }
    }

    draw();
  }, []);

  return (
    <div className="intro-container">
      <canvas ref={canvasRef} className="canvas"></canvas>

      {showLogo && (
        <img src="/logo.png" className="logo logo-reveal" />
      )}

      {showText && (
        <div className="text-block">
          <h1>Welcome to Our School</h1>
          <p>Let Me Be Light</p>
        </div>
      )}
    </div>
  );
}