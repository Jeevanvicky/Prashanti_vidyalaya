import React, { useState, useEffect } from 'react';
import '../styles/testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "This institution has profoundly shaped my child's discipline, confidence, and academic excellence.",
      author: "Parent of Class X Student"
    },
    {
      id: 2,
      quote: "The dedication of the faculty and the structured environment have brought remarkable transformation.",
      author: "Parent of Class VIII Student"
    },
    {
      id: 3,
      quote: "A perfect balance of education, values, and co-curricular excellence.",
      author: "Parent of Class VI Student"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-rotate testimonials every 4-5 seconds
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovering, testimonials.length]);

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="testimonials">
      {/* Background Layers */}
      <div className="testimonials__bg-layer testimonials__bg-gradient"></div>
      <div className="testimonials__bg-layer testimonials__bg-radial-glow"></div>
      <div className="testimonials__bg-layer testimonials__bg-grain"></div>
      <div className="testimonials__bg-layer testimonials__bg-floating-lights">
        <div className="floating-light floating-light-1"></div>
        <div className="floating-light floating-light-2"></div>
        <div className="floating-light floating-light-3"></div>
        <div className="floating-light floating-light-4"></div>
      </div>

      {/* Content Container */}
      <div className="testimonials__content">
        {/* Header */}
        <div className="testimonials__header">
          <h2 className="testimonials__title">What Parents Say</h2>
          <p className="testimonials__subtext">Voices of trust, experience, and transformation.</p>
        </div>

        {/* Testimonial Card */}
        <div
          className="testimonials__card"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Quote Marks Animation */}
          <div className="quote-mark quote-mark-open">"</div>

          {/* Quote Text with Line Reveal */}
          <p className="testimonials__quote">
            {currentTestimonial.quote.split('\n').map((line, idx) => (
              <span key={idx} className="quote-line" style={{ '--line-index': idx }}>
                {line}
              </span>
            ))}
          </p>

          {/* Closing Quote Mark */}
          <div className="quote-mark quote-mark-close">"</div>

          {/* Author */}
          <p className="testimonials__author">{currentTestimonial.author}</p>
        </div>

        {/* Navigation Dots */}
        <div className="testimonials__dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonials__dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
