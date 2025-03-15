"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaPhone, FaEnvelope } from 'react-icons/fa';
import styles from './rentArena.module.css';

// Define the section types for type safety
type SectionType = 'vip' | 'general';
type SectionsState = {
  vip: boolean;
  general: boolean;
};

export default function RentArena() {
  // Initialize state for section visibility
  const [sections, setSections] = useState<SectionsState>({
    vip: true,
    general: true
  });

  // Toggle section visibility
  const handleSectionToggle = (section: SectionType) => {
    setSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getVipColor = () => sections.vip ? '#2749B7' : '#444';
  const getGeneralColor = () => sections.general ? '#2749B7' : '#444';

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Rent the Arena</h1>
        <p>Host your next event at our state-of-the-art venue</p>
      </header>

      <div className={styles.content}>
        <section className={styles.infoSection}>
          <h2>Venue Information</h2>
          <p>
            Our arena offers a versatile space for concerts, corporate events, sports competitions, 
            and private gatherings. With modern amenities and flexible configurations, we can 
            accommodate events of various sizes and types.
          </p>
          
          <div className={styles.features}>
            <div className={styles.featureItem}>
              <h3>Capacity</h3>
              <p>Up to 3,500 guests with flexible seating arrangements</p>
            </div>
            <div className={styles.featureItem}>
              <h3>Amenities</h3>
              <p>State-of-the-art sound system, lighting, and climate control</p>
            </div>
            <div className={styles.featureItem}>
              <h3>Services</h3>
              <p>Event planning assistance, catering options, and technical support</p>
            </div>
          </div>
        </section>

        <section className={styles.seatingChartSection}>
          <h2>Interactive Seating Chart</h2>
          <p>
            Explore our seating layout to plan your non-sporting events. Toggle between sections to visualize 
            different seating arrangements.
          </p>
          
          <div className={styles.sectionToggle}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={sections.vip}
                onChange={() => handleSectionToggle('vip')}
                className={styles.toggleInput}
              />
              VIP Sections
            </label>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={sections.general}
                onChange={() => handleSectionToggle('general')}
                className={styles.toggleInput}
              />
              General Admission
            </label>
          </div>
          
          <div className={styles.seatingChart}>
            <svg 
              viewBox="0 0 800 500" 
              className={styles.chartSvg}
              aria-label="Arena seating chart"
            >
              {/* Stage */}
              <rect x="300" y="50" width="200" height="60" fill="#333" />
              <text x="400" y="85" textAnchor="middle" fill="white" className={styles.chartText}>STAGE</text>
              
              {/* VIP Sections */}
              {sections.vip && (
                <>
                  {/* Left VIP */}
                  <path d="M200,150 Q200,250 250,300 L280,280 Q240,240 240,150 Z" fill={getVipColor()} />
                  <text x="240" y="220" textAnchor="middle" fill="white" className={styles.chartText}>VIP A</text>
                  
                  {/* Right VIP */}
                  <path d="M600,150 Q600,250 550,300 L520,280 Q560,240 560,150 Z" fill={getVipColor()} />
                  <text x="560" y="220" textAnchor="middle" fill="white" className={styles.chartText}>VIP B</text>
                  
                  {/* Front Center VIP */}
                  <path d="M300,150 L500,150 L500,200 L300,200 Z" fill={getVipColor()} />
                  <text x="400" y="180" textAnchor="middle" fill="white" className={styles.chartText}>VIP PREMIUM</text>
                </>
              )}
              
              {/* General Admission */}
              {sections.general && (
                <>
                  {/* Left General */}
                  <path d="M100,150 Q100,350 250,400 L280,380 Q150,340 150,150 Z" fill={getGeneralColor()} />
                  <text x="180" y="280" textAnchor="middle" fill="white" className={styles.chartText}>GA LEFT</text>
                  
                  {/* Right General */}
                  <path d="M700,150 Q700,350 550,400 L520,380 Q650,340 650,150 Z" fill={getGeneralColor()} />
                  <text x="620" y="280" textAnchor="middle" fill="white" className={styles.chartText}>GA RIGHT</text>
                  
                  {/* Center General */}
                  <path d="M300,220 L500,220 L550,400 L250,400 Z" fill={getGeneralColor()} />
                  <text x="400" y="320" textAnchor="middle" fill="white" className={styles.chartText}>GA CENTER</text>
                </>
              )}
            </svg>
          </div>
        </section>

        <section className={styles.pricingSection}>
          <h2>Pricing & Availability</h2>
          <p>
            Our rental rates vary based on the type of event, duration, and services required. 
            Contact our events team for a customized quote.
          </p>
          
          <div className={styles.pricingTable}>
            <div className={styles.pricingRow}>
              <span className={styles.pricingCategory}>Corporate Events</span>
              <span className={styles.pricingRange}>$5,000 - $15,000</span>
            </div>
            <div className={styles.pricingRow}>
              <span className={styles.pricingCategory}>Concerts & Performances</span>
              <span className={styles.pricingRange}>$8,000 - $20,000</span>
            </div>
            <div className={styles.pricingRow}>
              <span className={styles.pricingCategory}>Private Celebrations</span>
              <span className={styles.pricingRange}>$4,000 - $12,000</span>
            </div>
            <div className={styles.pricingRow}>
              <span className={styles.pricingCategory}>Sporting Events</span>
              <span className={styles.pricingRange}>$6,000 - $18,000</span>
            </div>
          </div>
          
          <div className={styles.contactInfo}>
            <h3>Ready to Book Your Event?</h3>
            <p>Our events team is ready to help you plan the perfect event at our arena.</p>
            <div className={styles.contactButtons}>
              <a href="tel:+15551234567" className={styles.contactButton}>
                <FaPhone style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }} /> Call Us
              </a>
              <a href="mailto:events@arena.com" className={styles.contactButton}>
                <FaEnvelope style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }} /> Email Us
              </a>
            </div>
            
            <div className={styles.mapContainer}>
              <h3>Find Us</h3>
              <p>2825 Crane Rd, Waxhaw, NC 28173</p>
              <div className={styles.map}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.5701063015394!2d-80.75376492392788!3d34.94883757279787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885681d5c7c83095%3A0x97c0ea11a2af4054!2s2825%20Crane%20Rd%2C%20Waxhaw%2C%20NC%2028173!5e0!3m2!1sen!2sus!4v1710539520304!5m2!1sen!2sus" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0, borderRadius: '12px' }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mav360 Arena Location"
                  aria-label="Google Maps showing Mav360 Arena location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.backLink}>
        <Link href="/">
          <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Home
        </Link>
      </div>
    </div>
  );
}



