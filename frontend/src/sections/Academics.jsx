import { useEffect, useRef, useState } from "react";
import "../styles/academics.css";

export default function Academics() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const connectingLineRef = useRef(null);
  const energyParticleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(-1);
  const [energyProgress, setEnergyProgress] = useState(0);

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

  // Energy flow system - Respects reduced motion preference
  useEffect(() => {
    if (!isVisible) return;
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let animationFrameId;
    let currentProgress = 0;
    const duration = 6000; // 6 seconds for full flow cycle
    let startTime = Date.now();

    const animateEnergyFlow = () => {
      const elapsed = Date.now() - startTime;
      currentProgress = (elapsed % duration) / duration;
      setEnergyProgress(currentProgress);

      // Calculate which card should be active based on energy progress
      // Divide the line into 4 stages for 4 cards
      const activeIndex = Math.floor(currentProgress * 4);
      setActiveCardIndex(activeIndex >= 4 ? -1 : activeIndex);

      animationFrameId = requestAnimationFrame(animateEnergyFlow);
    };

    animationFrameId = requestAnimationFrame(animateEnergyFlow);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible]);

  // Animate connecting line on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (connectingLineRef.current && sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate scroll progress through section
        if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
          const scrollProgress = (windowHeight - sectionRect.top) / (windowHeight + sectionRect.height);
          const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
          
          connectingLineRef.current.style.width = `${clampedProgress * 100}%`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const journeyStages = [
    {
      id: 1,
      title: "Pre-Nursery & Foundation",
      text: "Early childhood development through play-based and activity-driven learning."
    },
    {
      id: 2,
      title: "Primary Education",
      text: "Strong fundamentals in academics with emphasis on curiosity and exploration."
    },
    {
      id: 3,
      title: "Secondary Education",
      text: "Structured curriculum focused on critical thinking and academic excellence."
    },
    {
      id: 4,
      title: "Smart Learning",
      text: "Technology-integrated classrooms enhancing interactive and modern education."
    }
  ];

  return (
    <section 
      className="academics-wrapper" 
      ref={sectionRef}
    >
      {/* Background layers - Enhanced futuristic design */}
      <div className="academics-bg-layer-gradient"></div>
      <div className="academics-bg-layer-animated"></div>
      <div className="academics-bg-layer-pattern"></div>

      <div className="academics-container">
        {/* HEADER SECTION */}
        <div className={`academics-header ${isVisible ? "animate-in" : ""}`}>
          <h2 className="academics-title">Academics & Learning</h2>
          <p className="academics-subtext">
            Structured learning from foundational years to academic excellence.
          </p>
        </div>

        {/* CARDS CONTAINER - Learning Journey Flow */}
        <div className="academics-cards-wrapper">
          {/* Connecting Line Container */}
          <div className="academics-connecting-line-container">
            {/* Base line */}
            <div 
              className="academics-connecting-line" 
              ref={connectingLineRef}
            ></div>
            
            {/* Energy particle - Glowing orb traveling the line */}
            <div 
              className="academics-energy-particle"
              ref={energyParticleRef}
              style={{
                left: `${energyProgress * 100}%`,
                opacity: isVisible ? 1 : 0
              }}
            >
              <div className="energy-core"></div>
              <div className="energy-glow-1"></div>
              <div className="energy-glow-2"></div>
            </div>
          </div>

          {/* Journey Cards */}
          <div 
            className={`academics-cards-container ${isVisible ? "animate-in" : ""}`}
            ref={cardsContainerRef}
          >
            {journeyStages.map((stage, index) => (
              <div 
                key={stage.id}
                className={`academics-card ${activeCardIndex === index ? "active" : ""}`}
                style={{
                  animationDelay: isVisible ? `${index * 120}ms` : "0s"
                }}
              >
                {/* Card background glow - Enhanced depth */}
                <div className="academics-card-bg-glow"></div>

                {/* Card Icon/Circle */}
                <div className={`academics-card-number ${activeCardIndex === index ? "pulse" : ""}`}>
                  {stage.id}
                </div>

                {/* Card Content */}
                <div className="academics-card-content">
                  <h3 className="academics-card-title">
                    {stage.title}
                  </h3>
                  <p className="academics-card-text">
                    {stage.text}
                  </p>
                </div>

                {/* Active highlight accent - Appears when card is active */}
                <div className="academics-card-highlight"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
