'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideHeader, setHideHeader] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Make header sticky after scrolling down 20px
      if (currentScrollY > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
      
      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Helper function to determine if a link is active
  const isLinkActive = (href: string) => {
    // Don't highlight homepage sections
    if (href.startsWith('/homepage#')) {
      return false;
    }
    return pathname === href;
  };

  return (
    <header 
      className={`${styles.header} ${isSticky ? styles.stickyHeader : ''}`} 
      style={{ transform: hideHeader ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      <div className={styles.headerContainer}>
        <Link href="/homepage" className={styles.logo}>Mav360</Link>
        <nav>
          <ul className={styles.navLinks}>
            <li>
              <Link 
                href="/homepage#events" 
                className={isLinkActive('/homepage#events') ? styles.active : ''}
              >
                Events
              </Link>
            </li>
            <li>
              <Link 
                href="/boxOffice" 
                className={isLinkActive('/boxOffice') ? styles.active : ''}
              >
                Tickets
              </Link>
            </li>
            <li>
              <Link 
                href="/homepage#information" 
                className={isLinkActive('/homepage#information') ? styles.active : ''}
              >
                Information
              </Link>
            </li>
            <li>
              <Link 
                href="/rentArena" 
                className={isLinkActive('/rentArena') ? styles.active : ''}
              >
                Plan Your Event
              </Link>
            </li>
            <li>
              <Link 
                href="/contactInfo" 
                className={isLinkActive('/contactInfo') ? styles.active : ''}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 