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
  const [position, setPosition] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const speedRef = useRef<number>(0.5); // pixels per frame
  
  // Create an array with 3 copies of the partners to ensure smooth infinite scrolling
  const displayedPartners = [...schoolPartners, ...schoolPartners, ...schoolPartners];
  
  // Calculate item width based on the screen size
  const getItemWidth = () => {
    if (typeof window === 'undefined') return 200; // Default for SSR
    
    if (window.innerWidth < 576) return window.innerWidth / 2;
    if (window.innerWidth < 768) return window.innerWidth / 3;
    if (window.innerWidth < 1024) return window.innerWidth / 4;
    if (window.innerWidth < 1280) return window.innerWidth / 5;
    return window.innerWidth / 6;
  };
  
  // Handle the smooth scroll animation
  const animate = () => {
    if (!trackRef.current) return;
    
    // Increase position for continuous scrolling
    setPosition(prevPosition => {
      let newPosition = prevPosition + speedRef.current;
      
      // Reset position when we've scrolled past a complete set
      const totalWidth = schoolPartners.length * getItemWidth();
      if (newPosition >= totalWidth) {
        newPosition = 0;
      }
      
      return newPosition;
    });
    
    // Continue the animation
    animationRef.current = requestAnimationFrame(animate);
  };
  
  // Start/stop the animation
  useEffect(() => {
    if (isAutoPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAutoPlaying]);
  
  // Handle window resize to adjust item widths
  useEffect(() => {
    const handleResize = () => {
      // Reset position to avoid jumps when resizing
      setPosition(0);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Pause animation on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);
  
  // Increase speed temporarily when clicking the navigation buttons
  const speedUp = (direction: 'left' | 'right') => {
    // Temporarily increase scroll speed in the appropriate direction
    speedRef.current = direction === 'right' ? 3 : -3;
    
    // Reset speed after 1 second
    setTimeout(() => {
      speedRef.current = 0.5;
    }, 1000);
    
    // Ensure animation is running
    if (!isAutoPlaying) {
      setIsAutoPlaying(true);
    }
  };

  return (
    <section className={styles.schoolPartnersSection}>
      <h2 className={styles.partnersTitle}>Our Partner Schools</h2>
      <div 
        className={styles.carouselContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.carouselContentWrapper}>
          <div 
            ref={trackRef}
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${position}px)`,
              transition: 'none' // Using animation frames instead for smoother movement
            }}
          >
            {displayedPartners.map((school, index) => (
              <div 
                key={index} 
                className={styles.logoSlide}
                style={{ 
                  width: `${getItemWidth()}px`,
                  flexShrink: 0
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 