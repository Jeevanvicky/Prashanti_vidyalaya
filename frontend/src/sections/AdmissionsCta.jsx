import React, { useState, useEffect, useRef } from 'react';
import '../styles/admissionsCta.css';

const AdmissionsCta = ({ onOpenAdmissionModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for entry animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Split headline into words for animation
  const headline = "Give your child not just education, but a future defined by discipline, confidence, and excellence.";
  const headlineWords = headline.split(' ');

  const handleApplyClick = () => {
    if (onOpenAdmissionModal) {
      onOpenAdmissionModal();
    }
  };

  return (
    <section className="admissions-cta" ref={sectionRef}>
      {/* Background Layers */}
      <div className="admissions-cta__bg-layer admissions-cta__bg-gradient"></div>
      <div className="admissions-cta__bg-layer admissions-cta__bg-glow"></div>
      <div className="admissions-cta__bg-layer admissions-cta__bg-waves"></div>

      {/* Content Container */}
      <div className={`admissions-cta__content ${isVisible ? 'visible' : ''}`}>
        {/* Title */}
        <h1 className="admissions-cta__title">
          Admissions Open 2026
        </h1>

        {/* Headline with Word-by-Word Animation */}
        <div className="admissions-cta__headline-container">
          <p className="admissions-cta__headline">
            {headlineWords.map((word, index) => (
              <span
                key={index}
                className="headline-word"
                style={{ '--word-index': index }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Urgency Line */}
        <p className="admissions-cta__urgency">
          Limited seats. Admissions closing soon.
        </p>

        {/* CTA Button */}
        <button
          className={`admissions-cta__button ${isHovering ? 'hovering' : ''}`}
          onClick={handleApplyClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Enroll Now
        </button>

        {/* Micro Reassurance Text */}
        <p className="admissions-cta__micro-text">
          Quick admission process • Guided support • Limited seats
        </p>
      </div>
    </section>
  );
};

export default AdmissionsCta;
