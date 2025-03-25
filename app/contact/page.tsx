'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <main className={styles.contactPage}>
      <div className={styles.contactHero}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <h2>Visit Our Restaurant</h2>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h3>Address</h3>
                <p>245 Providence Road<br />Charlotte, NC 28207</p>
                <p className={styles.directionsLink}>
                  <a href="https://maps.google.com/?q=245+Providence+Road+Charlotte+NC+28207" target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </a>
                </p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z"/>
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h3>Phone</h3>
                <p className={styles.phoneNumber}>
                  <a href="tel:9802292987">980-229-2987</a>
                </p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h3>Email</h3>
                <p className={styles.emailAddress}>
                  <a href="mailto:info@queencitygreens.com">info@queencitygreens.com</a>
                </p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h3>Hours</h3>
                <ul className={styles.hoursList}>
                  <li>Monday - Friday: 11am - 10pm</li>
                  <li>Saturday: 10am - 11pm</li>
                  <li>Sunday: 10am - 9pm</li>
                  <li>Brunch: Sat & Sun 10am - 2pm</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.formContainer}>
            {!submitted ? (
              <>
                <h2>Send Us a Message</h2>
                <p className={styles.formIntro}>
                  Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
                </p>
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your email address"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="subject">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Reservation Question">Reservation Question</option>
                      <option value="Catering">Catering</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Employment">Employment</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Type your message here..."
                      rows={6}
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
              </>
            ) : (
              <div className={styles.confirmationMessage}>
                <div className={styles.checkmark}>✓</div>
                <h2>Message Sent!</h2>
                <p>Thank you, {formData.name}! We've received your message and will get back to you shortly.</p>
                <p>We typically respond within 24-48 hours during business days.</p>
                <div className={styles.buttonContainer}>
                  <Link href="/" className="btn btn-secondary">Return to Home</Link>
                  <button onClick={() => setSubmitted(false)} className="btn btn-primary">Send Another Message</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.mapSection}>
          <h2>Find Us</h2>
          <div className={styles.mapContainer}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.1776108497454!2d-80.82237642346173!3d35.20485647992296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856a026932923e5%3A0x7fecb2c689de081d!2s245%20Providence%20Rd%2C%20Charlotte%2C%20NC%2028207!5e0!3m2!1sen!2sus!4v1711477465123!5m2!1sen!2sus" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className={styles.homeLink}>
        <Link href="/" className={styles.backLink}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Back to Home
        </Link>
      </div>
    </main>
  );
} 