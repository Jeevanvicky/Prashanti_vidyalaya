import { useEffect } from "react";
import "../styles/hero.css";

export default function Hero() {
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector(".hero-container");
      if (hero) {
        const scrollY = window.scrollY;
        const scale = 1 - scrollY * 0.0002;
        const translateY = scrollY * 0.3;
        hero.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero-wrapper">
      <div className="hero-container">
        {/* Main Title */}
        <h1 className="hero-title">
          PRASHANTI VIDYALAYA
        </h1>

        {/* Tagline */}
        <p className="hero-tagline">
          Shaping Discipline. Building Futures.
        </p>

        {/* Description */}
        <p className="hero-description">
          Where young minds are nurtured with integrity, guided by vision, and empowered to rise as architects of a brighter tomorrow.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="hero-buttons">
          <button className="btn primary">Enroll</button>
          <button className="btn secondary">Explore School</button>
        </div>
      </div>
    </section>
  );
}