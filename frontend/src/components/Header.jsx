import { useEffect, useState } from "react";
import "../styles/header.css";

export default function Header({ onOpenAdmissionModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", target: ".hero-wrapper" },
    { label: "About", target: ".about-wrapper" },
    { label: "Academics", target: ".academics-wrapper" },
    { label: "Facilities", target: ".facilities-wrapper" },
    { label: "Activities", target: ".sports-activities" },
    { label: "Contact", target: ".footer" }
  ];

  const handleNavClick = (target) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleEnrollClick = () => {
    if (onOpenAdmissionModal) {
      onOpenAdmissionModal();
    }
  };

  return (
    <header className={`header ${scrolled ? "header-scrolled" : "header-default"}`}>
      
      <div className="header-container">

        {/* LOGO */}
        <div className="intro-logo">
          <a href="/" onClick={() => handleNavClick(".hero-wrapper")}>
            <img 
              src="/logo.png" 
              alt="Prashanti Vidyalaya Logo"
              className="logo-img"
            />
          </a>
        </div>

        {/* NAV */}
        <nav className="nav">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              className={`nav-item ${hoverIndex === i ? "active" : ""}`}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => handleNavClick(item.target)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button className="apply-btn" onClick={handleEnrollClick}>
          Enroll Now
        </button>

      </div>

    </header>
  );
}