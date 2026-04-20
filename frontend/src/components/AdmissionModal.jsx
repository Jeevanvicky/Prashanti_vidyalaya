import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/admissionModal.css';

const AdmissionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    student_name: '',
    parent_name: '',
    phone: '',
    email: '',
    class_applied: 'Pre-Nursery'
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const classOptions = [
    'Pre-Nursery', 'Nursery', 'LKG', 'UKG',
    '1st', '2nd', '3rd', '4th', '5th',
    '6th', '7th', '8th', '9th', '10th'
  ];

  // Trigger animation when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleFieldFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleFieldBlur = () => {
    setFocusedField(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Input discipline: trim and prevent leading spaces
    if (name === 'student_name' || name === 'parent_name') {
      processedValue = value.replace(/^\s+/, ''); // Remove leading spaces
      // Trim extra spaces, but preserve intentional spaces
      if (processedValue && !processedValue.match(/^\s/)) {
        processedValue = processedValue.trimStart();
      }
    }

    // Phone field: only allow numeric characters
    if (name === 'phone') {
      processedValue = value.replace(/[^0-9]/g, '');
      // Cap at 10 digits
      if (processedValue.length > 10) {
        processedValue = processedValue.slice(0, 10);
      }
    }

    // Email: trim whitespace
    if (name === 'email') {
      processedValue = value.trim();
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.student_name.trim()) {
      setError('Student name is required');
      return false;
    }
    if (!formData.parent_name.trim()) {
      setError('Parent name is required');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (formData.phone.length !== 10 || !/^[0-9]{10}$/.test(formData.phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:8000/apply',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        setTimeout(() => {
          handleClose();
        }, 4000);
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.message ||
        'Failed to submit application. Please try again.'
      );
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        student_name: '',
        parent_name: '',
        phone: '',
        email: '',
        class_applied: 'Pre-Nursery'
      });
      setSubmitted(false);
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="admission-modal-backdrop" onClick={handleClose}>
      <div
        className={`admission-modal ${isOpen ? 'open' : ''} ${submitted ? 'submitted' : ''} ${isAnimating ? 'animating' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={handleClose}
          disabled={loading}
          aria-label="Close modal"
        >
          ✕
        </button>

        {submitted ? (
          // Success State - Premium Modal
          <div className="success-container">
            <div className="success-content">
              <div className="success-icon-wrapper">
                {/* Premium minimalist checkmark SVG */}
                <svg className="success-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer circle background */}
                  <circle cx="50" cy="50" r="48" fill="rgba(76, 175, 80, 0.08)" stroke="rgba(76, 175, 80, 0.2)" strokeWidth="1.5"/>
                  {/* Checkmark path with smooth curves */}
                  <path 
                    d="M 30 50 L 45 65 L 75 35" 
                    stroke="#4CAF50" 
                    strokeWidth="4.5" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="checkmark-stroke"
                  />
                </svg>
              </div>
              <h2 className="success-title">Application Submitted Successfully</h2>
              <p className="success-subtitle">Thank you for choosing Prashanthi Vidyalaya</p>
              <p className="success-quote">
                "Every great future begins with the right foundation.<br />We are honored to be part of your child's journey."
              </p>
              <p className="success-contact-info">We will contact you within 24 hours</p>
              <button className="success-continue-btn" onClick={handleClose}>
                Continue
              </button>
            </div>
          </div>
        ) : (
          // Form State
          <>
            <div className="modal-header" data-index="0">
              <h1>Admission Application Form</h1>
              <p>Join Prashanthi Vidyalaya</p>
            </div>

            <form className="admission-form" onSubmit={handleSubmit}>
              {error && <div className="form-error" data-index="1">{error}</div>}

              <div className={`form-group ${focusedField === 'student_name' ? 'focused' : ''}`} 
                   data-index="2" data-field="student_name">
                <label htmlFor="student_name">Student Name *</label>
                <input
                  type="text"
                  id="student_name"
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleChange}
                  onFocus={() => handleFieldFocus('student_name')}
                  onBlur={handleFieldBlur}
                  placeholder="Enter student's full name"
                  disabled={loading}
                  required
                />
              </div>

              <div className={`form-group ${focusedField === 'parent_name' ? 'focused' : ''}`} 
                   data-index="3" data-field="parent_name">
                <label htmlFor="parent_name">Parent / Guardian Name *</label>
                <input
                  type="text"
                  id="parent_name"
                  name="parent_name"
                  value={formData.parent_name}
                  onChange={handleChange}
                  onFocus={() => handleFieldFocus('parent_name')}
                  onBlur={handleFieldBlur}
                  placeholder="Enter parent's full name"
                  disabled={loading}
                  required
                />
              </div>

              <div className="form-row" data-index="4">
                <div className={`form-group ${focusedField === 'phone' ? 'focused' : ''}`}
                     data-field="phone">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => handleFieldFocus('phone')}
                    onBlur={handleFieldBlur}
                    placeholder="10-digit number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    disabled={loading}
                    required
                    maxLength="10"
                  />
                </div>

                <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}
                     data-field="email">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFieldFocus('email')}
                    onBlur={handleFieldBlur}
                    placeholder="your@email.com"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className={`form-group ${focusedField === 'class_applied' ? 'focused' : ''}`} 
                   data-index="5" data-field="class_applied">
                <label htmlFor="class_applied">Class Applying For *</label>
                <select
                  id="class_applied"
                  name="class_applied"
                  value={formData.class_applied}
                  onChange={handleChange}
                  onFocus={() => handleFieldFocus('class_applied')}
                  onBlur={handleFieldBlur}
                  disabled={loading}
                  required
                >
                  {classOptions.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className={`submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
                data-index="6"
              >
                {loading ? 'Processing...' : 'Submit Application'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AdmissionModal;
