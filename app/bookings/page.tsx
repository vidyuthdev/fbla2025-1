'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import styles from './bookings.module.css';

export default function BookingsPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Recipe Bookings</h1>
          <p className={styles.subtitle}>Save and organize your favorite recipes</p>
        </header>

        <section className={styles.bookingsSection}>
          <div className={styles.bookingsContent}>
            <p>This page is under construction. Please check back later for recipe booking functionality.</p>
            <Link href="/recipes" className={styles.returnButton}>
              Browse Recipes
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
