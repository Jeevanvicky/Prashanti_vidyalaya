import { useEffect, useRef, useState } from "react";
import "../styles/sportsActivities.css";

export default function SportsActivities() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  // ═══════════════════════════════════════════════════════
  // ENTRY ANIMATION ON SCROLL
  // ═══════════════════════════════════════════════════════
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ═══════════════════════════════════════════════════════
  // PARALLAX + FLOATING SHAPES MOTION
  // ═══════════════════════════════════════════════════════
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Only calculate parallax when section is visible
      if (sectionTop < windowHeight && sectionTop > -section.offsetHeight) {
        const scrollProgress = (windowHeight - sectionTop) / (windowHeight + section.offsetHeight);
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ═══════════════════════════════════════════════════════
  // CARD DATA
  // ═══════════════════════════════════════════════════════
  const cards = [
    {
      id: 1,
      title: "Sports",
      icon: "⚽",
      items: ["Cricket", "Athletics", "PT Sessions", "Outdoor Games"],
      color: "#ff6b6b"
    },
    {
      id: 2,
      title: "Cultural",
      icon: "🎭",
      items: ["Classical Music & Dance", "House Competitions", "Fest Celebrations", "Cultural Events"],
      color: "#9d84b7"
    },
    {
      id: 3,
      title: "Events",
      icon: "🎉",
      items: ["Annual Day", "Competitions", "Talent Shows", "Saturday Events"],
      color: "#5a9fd4"
    }
  ];

  return (
    <section 
      className="sports-activities" 
      ref={sectionRef}
      style={{
        '--scroll-progress': scrollY
      }}
    >
      {/* ═══════════════════════════════════════════════════════ */}
      {/* BACKGROUND LAYERS */}
      {/* ═══════════════════════════════════════════════════════ */}

      {/* Layer 1: Gradient Background */}
      <div className="bg-gradient"></div>

      {/* Layer 2: Floating Shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Layer 3: Diagonal Light Streak */}
      <div className="light-streak"></div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* CONTENT */}
      {/* ═══════════════════════════════════════════════════════ */}

      <div 
        className={`sports-container ${isVisible ? 'visible' : ''}`}
        ref={containerRef}
      >
        {/* HEADER */}
        <div className="sports-header">
          <h2 className="sports-title">Sports & Activities</h2>
          <p className="sports-subtext">
            Empowering students through physical excellence, creativity, and participation.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="sports-grid">
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`sports-card ${hoveredCard === card.id ? 'hovered' : ''}`}
              style={{
                '--card-index': index,
                '--card-color': card.color,
                '--parallax-offset': `${scrollY * 15 * (index - 1)}px`
              }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glow Border Effect (Background) */}
              <div className="card-glow"></div>

              {/* Card Content */}
              <div className="card-content">
                {/* Icon */}
                <div className="card-icon">{card.icon}</div>

                {/* Title */}
                <h3 className="card-title">{card.title}</h3>

                {/* Items List - Text Reveal Animation */}
                <div className="card-items">
                  {card.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="card-item"
                      style={{
                        '--item-index': itemIndex
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Hover Button */}
                <button className="card-btn">
                  Explore {card.title}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
