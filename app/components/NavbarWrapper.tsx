'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import styles from './NavbarWrapper.module.css';

export default function NavbarWrapper() {
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideHeader, setHideHeader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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

        <button 
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}></span>
        </button>

        <nav className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
          <ul>
            <li>
              <Link 
                href="/boxOffice" 
                className={isLinkActive('/boxOffice') ? styles.active : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Bookings
              </Link>
            </li>
            <li>
              <Link 
                href="/boxOffice" 
                className={isLinkActive('/boxOffice') ? styles.active : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Tickets
              </Link>
            </li>
            <li>
              <Link 
                href="/homepage#information" 
                className={isLinkActive('/homepage#information') ? styles.active : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Information
              </Link>
            </li>
            <li>
              <Link 
                href="/rentArena" 
                className={isLinkActive('/rentArena') ? styles.active : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Plan Your Event
              </Link>
            </li>
            <li>
              <Link 
                href="/contactInfo" 
                className={isLinkActive('/contactInfo') ? styles.active : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              {user ? (
                <button 
                  onClick={handleSignOut}
                  className={styles.signOutButton}
                >
                  Sign Out
                </button>
              ) : (
                <Link 
                  href="/auth"
                  className={isLinkActive('/auth') ? styles.active : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 