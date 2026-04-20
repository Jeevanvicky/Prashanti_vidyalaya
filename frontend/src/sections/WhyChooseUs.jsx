import { useEffect, useRef, useState } from "react";
import "../styles/whyChooseUs.css";

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const cards = [
    {
      icon: "📚",
      title: "Strong Academics",
      text: "A well-structured curriculum focused on conceptual clarity and real-world application."
    },
    {
      icon: "👨‍🏫",
      title: "Expert Faculty",
      text: "Passionate educators dedicated to nurturing every student's potential."
    },
    {
      icon: "🏛️",
      title: "Modern Infrastructure",
      text: "Smart classrooms and facilities designed for holistic learning."
    },
    {
      icon: "🌟",
      title: "Holistic Growth",
      text: "Equal focus on academics, sports, and character development."
    }
  ];

  return (
    <section className="why-choose-us" ref={sectionRef}>
      <div className="why-container">
        {/* Title */}
        <h2 className={`why-title ${isVisible ? "fade-in-title" : ""}`}>
          Why Choose Us
        </h2>

        {/* Subtext */}
        <p className={`why-subtext ${isVisible ? "fade-in-subtext" : ""}`}>
          Building strong foundations for lifelong success through excellence, discipline, and innovation.
        </p>

        {/* Cards Grid */}
        <div className="why-grid">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`why-card ${isVisible ? "fade-in-card" : ""}`}
              style={{
                animationDelay: isVisible ? `${0.3 + index * 0.1}s` : "0s"
              }}
            >
              {/* Icon */}
              <div className="why-card-icon">
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="why-card-title">
                {card.title}
              </h3>

              {/* Text */}
              <p className="why-card-text">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
