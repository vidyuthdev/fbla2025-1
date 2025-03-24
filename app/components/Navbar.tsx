'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isSticky ? styles.stickyHeader : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          CookCraft
          <span className={styles.logoAccent}>🍳</span>
        </Link>
        
        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            <li>
              <Link href="/recipes">All Recipes</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/recipe-finder">Recipe Finder</Link>
            </li>
            <li>
              <Link href="/cooking-tips">Cooking Tips</Link>
            </li>
          </ul>
        </nav>
        
        <div className={styles.actionButtons}>
          <Link href="/recipe-finder" className={styles.findRecipeButton}>
            Find a Recipe
          </Link>
        </div>
      </div>
    </header>
  );
} 