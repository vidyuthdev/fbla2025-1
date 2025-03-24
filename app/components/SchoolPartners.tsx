'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../page.module.css';

// School partner data with colors and details
const schoolPartners = [
  {
    name: 'Marvin Ridge High School',
    colors: { 
      primary: '#1E4D8C', // Blue
      secondary: '#F7941E', // Orange
      text: '#FFFFFF'
    },
    mascot: 'Mavericks',
    initials: 'MR'
  },
  {
    name: 'Weddington High School',
    colors: { 
      primary: '#00804C', // Green
      secondary: '#FFFFFF', // White
      text: '#FFFFFF'
    },
    mascot: 'Warriors',
    initials: 'W'
  },
  {
    name: 'Cuthbertson High School',
    colors: { 
      primary: '#14284B', // Navy
      secondary: '#D4B559', // Gold
      text: '#FFFFFF'
    },
    mascot: 'Cavaliers',
    initials: 'C'
  },
  {
    name: 'Audrey Kell High School',
    colors: { 
      primary: '#4B2C83', // Purple
      secondary: '#FFFFFF', // White
      text: '#FFFFFF'
    },
    mascot: 'Knights',
    initials: 'AK'
  },
  {
    name: 'Cox Mill High School',
    colors: { 
      primary: '#4B2C83', // Purple
      secondary: '#CCCCCC', // Light gray
      text: '#FFFFFF'
    },
    mascot: 'Chargers',
    initials: 'CM'
  },
  {
    name: 'Mallard Creek High School',
    colors: { 
      primary: '#14284B', // Navy
      secondary: '#D4B559', // Gold
      text: '#FFFFFF'
    },
    mascot: 'Mavericks',
    initials: 'MC'
  }
];

export default function SchoolPartners() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Determine visible slides based on screen width
  const [visibleSlides, setVisibleSlides] = useState(4);
  const totalSlides = schoolPartners.length;
  
  // Update visible slides based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2);
      } else if (window.innerWidth < 1280) {
        setVisibleSlides(3);
      } else {
        setVisibleSlides(4);
      }
    };
    
    // Initial setup
    handleResize();
    
    // Listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalSlides - visibleSlides ? 0 : prevIndex + 1
    );
  };
  
  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - visibleSlides : prevIndex - 1
    );
  };

  // Set up autoplay
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 3000); // Change slide every 3 seconds
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className={styles.schoolPartnersSection}>
      <h2 className={styles.partnersTitle}>Our Partner Schools</h2>
      <div 
        className={styles.carouselContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button 
          className={`${styles.carouselButton} ${styles.prevButton}`}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          &#8249;
        </button>
        
        <div className={styles.carouselContentWrapper}>
          <div 
            ref={contentRef}
            className={styles.carouselContent}
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
              width: `${(totalSlides / visibleSlides) * 100}%`
            }}
          >
            {schoolPartners.map((school, index) => (
              <div 
                key={index} 
                className={styles.logoSlide}
                style={{ width: `${100 / totalSlides}%` }}
              >
                <div className={styles.schoolLogo}>
                  <div 
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: school.colors.primary,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: `0 6px 16px rgba(0,0,0,0.15), 0 0 0 2px ${school.colors.secondary}`
                    }}
                  >
                    {/* Circle with school colors */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '-30%',
                        right: '-30%',
                        width: '60%',
                        height: '60%',
                        borderRadius: '50%',
                        backgroundColor: school.colors.secondary,
                        opacity: 0.7
                      }}
                    />
                    
                    {/* School initials */}
                    <span
                      style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: school.colors.text,
                        zIndex: 2,
                        textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
                      }}
                    >
                      {school.initials}
                    </span>
                  </div>
                </div>
                <p className={styles.schoolName}>{school.name}</p>
                <p className={styles.schoolMascot}>{school.mascot}</p>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className={`${styles.carouselButton} ${styles.nextButton}`}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          &#8250;
        </button>
      </div>
    </section>
  );
} 