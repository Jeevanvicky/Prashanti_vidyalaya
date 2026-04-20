import { useEffect, useRef, useState } from "react";
import "../styles/facilities.css";

export default function Facilities() {
  const sectionRef = useRef(null);
  const slidesRef = useRef([]);
  const [visibleSlides, setVisibleSlides] = useState({});

  // Intersection Observer for each individual slide
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -30% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = slidesRef.current.indexOf(entry.target);
        if (index !== -1) {
          setVisibleSlides(prev => ({
            ...prev,
            [index]: entry.isIntersecting
          }));
        }
      });
    }, observerOptions);

    slidesRef.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => observer.disconnect();
  }, []);

  const facilitySlides = [
    {
      id: 1,
      title: "Smart Transport System",
      description: "GPS-enabled, professionally monitored transport ensuring every child travels safely, securely, and on time.",
      image: "https://picsum.photos/800/500?random=1"
    },
    {
      id: 2,
      title: "Advanced Computer Lab",
      description: "Modern computing infrastructure empowering students with essential digital skills and future-ready knowledge.",
      image: "https://picsum.photos/800/500?random=2"
    },
    {
      id: 3,
      title: "Audio-Visual Learning Lab",
      description: "Interactive multimedia environment that enhances understanding through visual and experiential learning.",
      image: "https://picsum.photos/800/500?random=3"
    },
    {
      id: 4,
      title: "Classical Music & Dance",
      description: "Encouraging creativity, confidence, and cultural awareness through structured artistic expression.",
      image: "https://picsum.photos/800/500?random=4"
    },
    {
      id: 5,
      title: "Karate Training",
      description: "Building discipline, focus, physical fitness, and self-defense skills in a safe and guided environment.",
      image: "https://picsum.photos/800/500?random=5"
    },
    {
      id: 6,
      title: "Remedial Learning Programs",
      description: "Personalized attention for every learner, ensuring no child is left behind and every student progresses with confidence.",
      image: "https://picsum.photos/800/500?random=6"
    },
    {
      id: 7,
      title: "Weekly Activities Program",
      description: "A vibrant and structured weekly activity system that promotes physical health, teamwork, leadership, and joyful learning.",
      subPoints: [
        "Friday: PT sessions for all classes",
        "Aerobics and Yoga training",
        "Saturday: House-wise competitions"
      ],
      image: "https://picsum.photos/800/500?random=7",
      isHighlight: true
    }
  ];

  return (
    <section className="facilities-wrapper" ref={sectionRef}>
      {/* Minimal background layer */}
      <div className="facilities-bg-layer"></div>

      <div className="facilities-container">
        {/* Hero Header Section */}
        <div className="facilities-hero">
          <h2 className="facilities-hero-title">Facilities & Student Life</h2>
          <p className="facilities-hero-subtitle">
            World-class infrastructure and enriching experiences for holistic growth
          </p>
        </div>

        {/* Sequential Slides */}
        <div className="facilities-slides">
          {facilitySlides.map((slide, index) => (
            <div
              key={slide.id}
              ref={(el) => (slidesRef.current[index] = el)}
              className={`facilities-slide ${slide.isHighlight ? "slide-highlight" : ""} ${
                visibleSlides[index] ? "slide-visible" : ""
              }`}
            >
              {/* Image Section */}
              <div className="facilities-slide-image-wrapper">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="facilities-slide-image"
                  loading="lazy"
                />
                {/* Overlay gradient */}
                <div className="facilities-slide-overlay"></div>
              </div>

              {/* Content Section */}
              <div className="facilities-slide-content">
                <h3 className="facilities-slide-title">{slide.title}</h3>
                <p className="facilities-slide-description">
                  {slide.description}
                </p>

                {/* Sub-points for highlight slide */}
                {slide.subPoints && (
                  <ul className="facilities-slide-points">
                    {slide.subPoints.map((point, idx) => (
                      <li key={idx} className="facilities-slide-point">
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
