import { useEffect, useRef, useState } from "react";
import "../styles/achievements.css";

export default function Achievements() {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCounts, setAnimatedCounts] = useState({ 0: 0, 1: 0, 2: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Stats data - exactly as specified (500, 20, 100)
  const stats = [
    { id: 1, label: "Students", value: 500 },
    { id: 2, label: "Awards", value: 20 },
    { id: 3, label: "Results", value: 100, isPercent: true }
  ];

  // Intersection Observer for scroll detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Count-up animation with requestAnimationFrame (~1.5s duration)
  useEffect(() => {
    if (!isVisible) return;

    const countUp = (index, targetValue, duration = 1500) => {
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(progress * targetValue);

        setAnimatedCounts(prev => ({
          ...prev,
          [index]: currentValue
        }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    };

    // Start count-up animations with 0.15s (150ms) stagger
    stats.forEach((stat, index) => {
      setTimeout(() => {
        countUp(index, stat.value, 1500);
      }, index * 150);
    });
  }, [isVisible]);

  return (
    <section className="achievements-wrapper" ref={sectionRef}>
      {/* Background Layers */}
      {/* Layer 1: Deep gradient (dark → darker) */}
      <div className="achievements-bg-dark"></div>

      {/* Layer 2: Subtle radial glow behind center */}
      <div className="achievements-bg-glow"></div>

      {/* Layer 3: Very faint pattern (dots / grid) */}
      <div className="achievements-bg-pattern"></div>

      {/* Content Container with 100px top/bottom padding */}
      <div className="achievements-container">
        {/* Header Section */}
        <div className={`achievements-header ${isVisible ? "animate-in" : ""}`}>
          <h2 className="achievements-title">Our Achievements</h2>
          <p className="achievements-subtitle">
            A legacy of excellence, discipline, and consistent academic success.
          </p>
        </div>

        {/* Stats Grid - 3 columns, 60px gap */}
        <div className={`achievements-stats ${isVisible ? "animate-in" : ""}`}>
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              ref={(el) => (statsRef.current[index] = el)}
              className="achievements-stat"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <div className="stat-number">
                {animatedCounts[index]}
                {stat.isPercent ? "%" : "+"}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
