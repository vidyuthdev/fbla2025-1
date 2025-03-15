"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./contactInfo.module.css";

export default function ContactInfoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>← Back to Home</Link>
      <header className={styles.header}>
        <h1>Contact Mav360</h1>
        <p>We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.</p>
      </header>

      <div className={styles.contactGrid}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📍</div>
            <h3>Address</h3>
            <p>2825 Crane Rd<br />Waxhaw, NC 28173</p>
          </div>
          
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📞</div>
            <h3>Phone</h3>
            <p>Main: (555) 123-4567<br />Box Office: (555) 123-4568</p>
          </div>
          
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>✉️</div>
            <h3>Email</h3>
            <p>info@mav360.org<br />events@mav360.org</p>
          </div>
          
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>🕒</div>
            <h3>Hours</h3>
            <p>Monday-Friday: 9am-5pm<br />Saturday: 10am-3pm<br />Sunday: Closed</p>
          </div>
        </div>

        <div className={styles.contactForm}>
          <h2>Send Us a Message</h2>
          {submitSuccess ? (
            <div className={styles.successMessage}>
              <p>Thank you for your message! We'll get back to you soon.</p>
              <button onClick={() => setSubmitSuccess(false)}>Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
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
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone (optional)</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
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
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="tickets">Ticket Information</option>
                  <option value="events">Event Planning</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <button 
                type="submit" 
                className={styles.submitButton} 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className={styles.mapSection}>
        <h2>Find Us</h2>
        <div className={styles.map}>
          {/* Map placeholder - in a real app, you would integrate Google Maps or similar */}
          <div className={styles.mapPlaceholder}>
            <p>Interactive Map Coming Soon</p>
          </div>
        </div>
      </div>

      <div className={styles.backLink}>
        <Link href="/">← Back to Home</Link>
      </div>
      <Link href="/" className={styles.exitButton}>Exit to Homepage</Link>
    </div>
  );
}
