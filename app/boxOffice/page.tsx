"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./boxOffice.module.css";

interface Event {
  id: string;
  title: string;
  date: string;
  price: string;
  available: number;
}

export default function BoxOfficePage() {
  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Indoor Charlotte V. Fort Mill Tennis Showdown",
      date: "March 29, 2025",
      price: "$25 per Adult, $15 per Student, $10 per Senior",
      available: 3100
    },
    {
      id: "2",
      title: "Women's Varsity Basketball V. Cuthberston",
      date: "April 5, 2025",
      price: "$35 per Adult, $25 per Student, $15 per Senior",
      available: 3500
    },
    {
      id: "3",
      title: "Mavericks V. Weddington Volleyball Showdown",
      date: "May 20-22, 2025",
      price: "$15 per Adult, $10 per Student, $5 per Senior",
      available: 3500
    }
  ]);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>← Back to Home</Link>
      <header className={styles.header}>
        <h1>Box Office</h1>
        <p>Purchase tickets for upcoming events at Mav360</p>
      </header>

      <main className={styles.main}>
        <section className={styles.ticketList}>
          {events.map(event => (
            <div key={event.id} className={styles.ticketCard}>
              <div className={styles.eventInfo}>
                <h2>{event.title}</h2>
                <p className={styles.date}>{event.date}</p>
                <p className={styles.price}>Tickets from {event.price}</p>
                <p className={styles.availability}>{event.available} tickets available</p>
              </div>
              <button className={styles.purchaseButton}>
                Purchase Tickets
              </button>
            </div>
          ))}
        </section>
      </main>
      <Link href="/" className={styles.exitButton}>Exit to Homepage</Link>
    </div>
  );
}


