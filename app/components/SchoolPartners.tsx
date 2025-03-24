'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../page.module.css';

// Logo imports
import marvinRidgeLogo from '../../public/images/schools/marvin-ridge.png';
import weddingtonLogo from '../../public/images/schools/weddington.png';
import cuthbertsonLogo from '../../public/images/schools/cuthbertson.png';
import audreyKellLogo from '../../public/images/schools/audrey-kell.png';
import coxMillLogo from '../../public/images/schools/cox-mill.png';
import mallardCreekLogo from '../../public/images/schools/mallard-creek.png';

const schoolPartners = [
  {
    name: 'Marvin Ridge High School',
    logo: marvinRidgeLogo
  },
  {
    name: 'Weddington High School',
    logo: weddingtonLogo
  },
  {
    name: 'Cuthbertson High School',
    logo: cuthbertsonLogo
  },
  {
    name: 'Audrey Kell High School',
    logo: audreyKellLogo
  },
  {
    name: 'Cox Mill High School',
    logo: coxMillLogo
  },
  {
    name: 'Mallard Creek High School',
    logo: mallardCreekLogo
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
                  <Image
                    src={school.logo}
                    alt={`${school.name} logo`}
                    width={120}
                    height={120}
                    style={{ objectFit: 'contain' }}
                    priority={index < visibleSlides}
                  />
                </div>
                <p className={styles.schoolName}>{school.name}</p>
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