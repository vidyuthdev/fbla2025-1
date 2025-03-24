'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../page.module.css';

// School partner data with image paths
const schoolPartners = [
  {
    name: 'Marvin Ridge High School',
    logo: '/images/schools/marvin-ridge.jpg',
    altLogo: { background: '#1E4D8C', text: '#F7941E', initials: 'MR' }
  },
  {
    name: 'Weddington High School',
    logo: '/images/schools/weddington.jpg',
    altLogo: { background: '#00804C', text: '#FFFFFF', initials: 'W' }
  },
  {
    name: 'Cuthbertson High School',
    logo: '/images/schools/cuthbertson.jpg',
    altLogo: { background: '#14284B', text: '#D4B559', initials: 'C' }
  },
  {
    name: 'Audrey Kell High School',
    logo: '/images/schools/audrey-kell.jpg',
    altLogo: { background: '#4B2C83', text: '#FFFFFF', initials: 'AK' }
  },
  {
    name: 'Cox Mill High School',
    logo: '/images/schools/cox-mill.jpg',
    altLogo: { background: '#4B2C83', text: '#CCCCCC', initials: 'CM' }
  },
  {
    name: 'Mallard Creek High School',
    logo: '/images/schools/mallard-creek.jpg',
    altLogo: { background: '#14284B', text: '#D4B559', initials: 'MC' }
  }
];

export default function SchoolPartners() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(Array(schoolPartners.length).fill(false));
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

  // Handle image loading
  const handleImageLoad = (index: number) => {
    const newImagesLoaded = [...imagesLoaded];
    newImagesLoaded[index] = true;
    setImagesLoaded(newImagesLoaded);
  };

  const handleImageError = (index: number) => {
    const newImagesLoaded = [...imagesLoaded];
    newImagesLoaded[index] = false;
    setImagesLoaded(newImagesLoaded);
  };

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
                  {/* Display image if loaded, fallback to colored box with initials */}
                  <img 
                    src={school.logo}
                    alt={`${school.name} logo`}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: imagesLoaded[index] ? 'block' : 'none'
                    }}
                  />
                  
                  {/* Fallback if image fails to load */}
                  {!imagesLoaded[index] && (
                    <div 
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: school.altLogo.background,
                        color: school.altLogo.text,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '1.5rem'
                      }}
                    >
                      {school.altLogo.initials}
                    </div>
                  )}
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