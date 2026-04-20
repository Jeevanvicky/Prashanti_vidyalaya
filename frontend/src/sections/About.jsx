import { useEffect, useRef, useState } from "react";
import "../styles/about.css";

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for entry animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current && sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Only apply parallax when section is in view
        if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
          const scrollFactor = (windowHeight - sectionRect.top) / windowHeight;
          const parallaxValue = (scrollFactor - 0.5) * 40;
          
          imageRef.current.style.transform = `translateY(${parallaxValue}px)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hover effect for image
  const handleImageHover = (isHovering) => {
    if (imageRef.current) {
      if (isHovering) {
        imageRef.current.style.transform += " scale(1.03)";
      } else {
        imageRef.current.style.transform = "";
      }
    }
  };

  return (
    <section 
      className="about-wrapper" 
      ref={sectionRef}
    >
      {/* Background gradient layers */}
      <div className="about-bg-layer-gradient"></div>
      <div className="about-bg-layer-glow"></div>

      <div className="about-container">
        {/* LEFT SIDE - IMAGE */}
        <div 
          className={`about-image-block ${isVisible ? "animate-in" : ""}`}
          ref={imageRef}
          onMouseEnter={() => handleImageHover(true)}
          onMouseLeave={() => handleImageHover(false)}
        >
          <img 
            src="about.jpeg"
            alt="Prashanti Vidyalaya Campus"
            className="about-image"
          />
        </div>

        {/* RIGHT SIDE - TEXT CONTENT */}
        <div 
          className={`about-content-block ${isVisible ? "animate-in" : ""}`}
          ref={contentRef}
          style={{ animation: isVisible ? 'contentFloat 4s ease-in-out infinite' : 'none' }}
        >
          {/* Title */}
          <h2 className="about-title">
            About Our Institution
          </h2>

          {/* Description */}
          <p className="about-description">
            At Prashanti Vidyalaya, education goes beyond textbooks. 
            We cultivate discipline, inspire curiosity, and shape 
            individuals into confident leaders of tomorrow.
          </p>

          {/* Vision */}
          <div className="about-vision">
            <h3 className="about-vision-title">Vision</h3>
            <p className="about-vision-text">
              To nurture responsible, innovative, and compassionate individuals 
              who contribute meaningfully to society.
            </p>
          </div>

          {/* Mission */}
          <div className="about-mission">
            <h3 className="about-mission-title">Mission</h3>
            <p className="about-mission-text">
              To provide a balanced education that blends academic excellence, 
              character development, and holistic growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
