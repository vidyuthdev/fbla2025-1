'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './reservations.module.css';

export default function Reservations() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
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
    <main className={styles.reservationsPage}>
      <div className={styles.reservationsHero}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1>Make a Reservation</h1>
          <p>Join us for a sustainable dining experience at Fresh Earth</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.contentWrapper}>
          <div className={styles.reservationInfo}>
            <h2>Dining at Fresh Earth</h2>
            <p>
              We welcome you to experience our seasonal menu in a warm, sustainable environment. 
              Our dining room is designed to connect you with the natural world while you enjoy 
              the bounty of local farms prepared with care by our talented chefs.
            </p>
            
            <div className={styles.infoBox}>
              <h3>Hours</h3>
              <ul>
                <li><span>Monday - Friday:</span> 11am - 10pm</li>
                <li><span>Saturday:</span> 10am - 11pm</li>
                <li><span>Sunday:</span> 10am - 9pm</li>
                <li><span>Brunch:</span> Sat & Sun 10am - 2pm</li>
              </ul>
            </div>
            
            <div className={styles.infoBox}>
              <h3>Location</h3>
              <p>245 Providence Road<br />Charlotte, NC 28207</p>
            </div>
            
            <div className={styles.infoBox}>
              <h3>Contact</h3>
              <p>Phone: 980-229-2987<br />Email: info@freshearthrestaurant.com</p>
            </div>
          </div>

          <div className={styles.formContainer}>
            {!submitted ? (
              <>
                <h2>Reserve Your Table</h2>
                <form onSubmit={handleSubmit} className={styles.reservationForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div className={styles.formRow}>
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
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="date">Date</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="time">Time</label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="guests">Number of Guests</label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                    >
                      <option value="1">1 person</option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                      <option value="5">5 people</option>
                      <option value="6">6 people</option>
                      <option value="7+">7+ people</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="specialRequests">Special Requests</label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      placeholder="Any dietary restrictions or special occasions?"
                      rows={4}
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-primary">Reserve Now</button>
                </form>
              </>
            ) : (
              <div className={styles.confirmationMessage}>
                <div className={styles.checkmark}>✓</div>
                <h2>Reservation Received!</h2>
                <p>Thank you, {formData.name}! We've received your reservation request for {formData.guests === '7+' ? '7+' : formData.guests} people on {formData.date} at {formData.time}.</p>
                <p>We'll send a confirmation to {formData.email} shortly. If you need to make any changes to your reservation, please call us at 980-229-2987.</p>
                <div className={styles.buttonContainer}>
                  <Link href="/" className="btn btn-secondary">Return to Home</Link>
                  <button onClick={() => setSubmitted(false)} className="btn btn-primary">Make Another Reservation</button>
                </div>
              </div>
            )}
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