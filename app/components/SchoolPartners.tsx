'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../page.module.css';

// School partner data with school colors and abbreviations
const schoolPartners = [
  {
    name: 'Marvin Ridge High School',
    colors: { 
      primary: '#1E4D8C', // Blue
      secondary: '#F7941E', // Orange
      text: '#FFFFFF'
    },
    abbreviation: 'MRHS'
  },
  {
    name: 'Weddington High School',
    colors: { 
      primary: '#00804C', // Green
      secondary: '#FFFFFF', // White
      text: '#FFFFFF'
    },
    abbreviation: 'WHS'
  },
  {
    name: 'Cuthbertson High School',
    colors: { 
      primary: '#14284B', // Navy
      secondary: '#D4B559', // Gold
      text: '#FFFFFF'
    },
    abbreviation: 'CHS'
  },
  {
    name: 'Audrey Kell High School',
    colors: { 
      primary: '#4B2C83', // Purple
      secondary: '#FFFFFF', // White
      text: '#FFFFFF'
    },
    abbreviation: 'AKHS'
  },
  {
    name: 'Cox Mill High School',
    colors: { 
      primary: '#4B2C83', // Purple
      secondary: '#CCCCCC', // Light gray
      text: '#FFFFFF'
    },
    abbreviation: 'CMHS'
  },
  {
    name: 'Mallard Creek High School',
    colors: { 
      primary: '#14284B', // Navy
      secondary: '#D4B559', // Gold
      text: '#FFFFFF'
    },
    abbreviation: 'MCHS'
  }
];

export default function SchoolPartners() {
  const [activeSlides, setActiveSlides] = useState<number[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const transitonTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Determine visible slides based on screen width
  const [visibleSlideCount, setVisibleSlideCount] = useState(4);
  const totalSlides = schoolPartners.length;
  
  // Update visible slides based on screen size
  useEffect(() => {
    const handleResize = () => {
      let newVisibleSlideCount = 4;
      
      if (window.innerWidth < 768) {
        newVisibleSlideCount = 1;
      } else if (window.innerWidth < 1024) {
        newVisibleSlideCount = 2;
      } else if (window.innerWidth < 1280) {
        newVisibleSlideCount = 3;
      } else {
        newVisibleSlideCount = 4;
      }
      
      setVisibleSlideCount(newVisibleSlideCount);
      
      // Initialize active slides
      const initialActiveSlides: number[] = [];
      for (let i = 0; i < newVisibleSlideCount; i++) {
        initialActiveSlides.push(i % totalSlides);
      }
      setActiveSlides(initialActiveSlides);
    };
    
    // Initial setup
    handleResize();
    
    // Listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [totalSlides]);
  
  // Transition to the next set of slides
  const updateSlides = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Start the transition effect
    transitonTimerRef.current = setTimeout(() => {
      // Calculate new active slides (shift everything by 1)
      const newActiveSlides = activeSlides.map(
        (slideIndex) => (slideIndex + 1) % totalSlides
      );
      
      setActiveSlides(newActiveSlides);
      setIsTransitioning(false);
    }, 500); // Time should match the transition duration in CSS
  };
  
  // Handle manual navigation
  const goToNextSlides = () => {
    if (isAutoPlaying) {
      // Reset the autoplay timer
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      autoPlayRef.current = setInterval(updateSlides, 3000);
    }
    updateSlides();
  };
  
  const goToPrevSlides = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Start the transition effect
    transitonTimerRef.current = setTimeout(() => {
      // Calculate new active slides (shift everything by -1)
      const newActiveSlides = activeSlides.map(
        (slideIndex) => (slideIndex - 1 + totalSlides) % totalSlides
      );
      
      setActiveSlides(newActiveSlides);
      setIsTransitioning(false);
    }, 500); // Time should match the transition duration in CSS
    
    if (isAutoPlaying) {
      // Reset the autoplay timer
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      autoPlayRef.current = setInterval(updateSlides, 3000);
    }
  };

  // Set up autoplay
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(updateSlides, 3000); // Change slide every 3 seconds
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      if (transitonTimerRef.current) {
        clearTimeout(transitonTimerRef.current);
      }
    };
  }, [isAutoPlaying, activeSlides]);

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
          onClick={goToPrevSlides}
          aria-label="Previous slide"
          disabled={isTransitioning}
        >
          &#8249;
        </button>
        
        <div className={styles.carouselContentWrapper}>
          <div className={`${styles.carouselContent} ${isTransitioning ? styles.transitioning : ''}`}>
            {/* Display only active slides in the current view */}
            {Array.from({ length: visibleSlideCount }).map((_, slotIndex) => {
              const slideIndex = activeSlides[slotIndex];
              if (slideIndex === undefined) return null;
              
              const school = schoolPartners[slideIndex];
              if (!school) return null;
              
              return (
                <div 
                  key={`${slotIndex}-${slideIndex}`} 
                  className={`${styles.logoSlide} ${isTransitioning ? styles.fading : ''}`}
                  style={{ 
                    width: `calc(100% / ${visibleSlideCount})`,
                    opacity: isTransitioning ? 0 : 1,
                    transition: 'opacity 0.5s ease-in-out'
                  }}
                >
                  <div className={styles.schoolLogo}>
                    <div 
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: school.colors.primary,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Accent color element */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: '40%',
                          height: '40%',
                          backgroundColor: school.colors.secondary,
                          clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
                        }}
                      />
                      
                      {/* School abbreviation */}
                      <span
                        style={{
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          color: school.colors.text,
                          letterSpacing: '1px'
                        }}
                      >
                        {school.abbreviation}
                      </span>
                    </div>
                  </div>
                  <p className={styles.schoolName}>{school.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        <button 
          className={`${styles.carouselButton} ${styles.nextButton}`}
          onClick={goToNextSlides}
          aria-label="Next slide"
          disabled={isTransitioning}
        >
          &#8250;
        </button>
      </div>
    </section>
  );
} 