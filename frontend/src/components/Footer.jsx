import React, { useState, useEffect, useRef } from 'react';
import '../styles/footer.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  // Intersection Observer for entry animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const navigationLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Academics', href: '#academics' },
    { label: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: '#',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg'
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com/prashantiividyalaya',
      icon: 'https://imgs.search.brave.com/XmBtOYr_GGv2zzI3UrewOUyvSW10gIlxMWpklHPJHik/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTgv/OTMwLzY5MS9zbWFs/bC9pbnN0YWdyYW0t/bG9nby1pbnN0YWdy/YW0taWNvbi10cmFu/c3BhcmVudC1mcmVl/LXBuZy5wbmc'
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com/@prashanti205.?si=sw3BMiYHHhTo76a_',
      icon: '/youtube.png'
    },
    {
      label: 'WhatsApp',
      href: 'https://whatsapp.com/channel/0029VayfYoiHAdNZojemYk1A',
      icon: 'https://imgs.search.brave.com/qQFsWwkzXytW45U6eora2Odu3eKWSgAEP7QcVftykqk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQzLzIvd2hhdHNh/cHAtbG9nby1wbmdf/c2Vla2xvZ28tNDMw/NzI4LnBuZw'
    }
  ];

  return (
    <footer className={`footer ${isVisible ? 'visible' : ''}`} ref={footerRef}>
      {/* Background Layers */}
      <div className="footer__bg-layer footer__bg-gradient"></div>
      <div className="footer__bg-layer footer__bg-fade"></div>
      <div className="footer__bg-layer footer__bg-texture"></div>

      {/* Content Wrapper */}
      <div className="footer__content">
        {/* Top Section - Logo Area */}
        <div className="footer__top">
          <div className="footer__logo">
            <h3 className="footer__brand">Prashanti Vidyalaya</h3>
          </div>
        </div>

        {/* Middle Section - Contact & Navigation */}
        <div className="footer__middle">
          {/* Contact Information */}
          <div className="footer__section footer__contact">
            <h4 className="footer__section-title">Contact Us</h4>
            
            <div className="footer__contact-item">
              <span className="footer__contact-icon">📍</span>
              <div>
                <p className="footer__contact-label">Address</p>
                <p className="footer__contact-text">Prashanti Vidyalaya, Bengaluru</p>
              </div>
            </div>

            <div className="footer__contact-item">
              <span className="footer__contact-icon">📞</span>
              <div>
                <p className="footer__contact-label">Phone</p>
                <a href="tel:+919880410995" className="footer__contact-text footer__link">
                  +91 9880410995
                </a>
              </div>
            </div>

            <div className="footer__contact-item">
              <span className="footer__contact-icon">✉</span>
              <div>
                <p className="footer__contact-label">Email</p>
                <a href="mailto:prshanti@gmail.com" className="footer__contact-text footer__link">
                  prshanti@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer__section footer__navigation">
            <h4 className="footer__section-title">Navigation</h4>
            <nav className="footer__nav-links">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="footer__nav-link"
                  style={{ '--link-index': index }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="footer__section footer__social">
            <h4 className="footer__section-title">Follow Us</h4>
            <div className="footer__social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`footer__social-link footer__social-link--${social.label.toLowerCase()}`}
                  title={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ '--social-index': index }}
                >
                  <img
                    src={social.icon}
                    alt={social.label}
                    className="footer__social-icon"
                  />
                  <span className="footer__social-label">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 Prashanti Vidyalaya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;