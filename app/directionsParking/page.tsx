"use client";

import { useState, useEffect } from "react";
import styles from "./directionsParking.module.css";
import Link from "next/link";

export default function DirectionsParking() {
  const [isLoading, setIsLoading] = useState(true);
  const [directions, setDirections] = useState<string[]>([]);
  const [parkingInfo, setParkingInfo] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setDirections([
        "Take Interstate 75 to Exit 256B",
        "Follow the signs for Downtown",
        "Turn right onto Main Street",
        "The arena will be on your left after 0.5 miles"
      ]);
      
      setParkingInfo([
        "Main Arena Parking Garage - $15 per event",
        "North Lot - $10 per event",
        "South Street Parking - $8 per event",
        "VIP Parking available with advance purchase"
      ]);
      
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Directions & Parking</h1>
        <p>Find the best way to get to our arena and where to park</p>
      </header>

      <div className={styles.contentGrid}>
        <section className={styles.directionsSection}>
          <h2>How to Get Here</h2>
          {isLoading ? (
            <div className={styles.loadingIndicator}>Loading directions...</div>
          ) : error ? (
            <div className={styles.errorMessage}>{error}</div>
          ) : (
            <div className={styles.directionsContent}>
              <div className={styles.directionsText}>
                <h3>Driving Directions</h3>
                <ul className={styles.directionsList}>
                  {directions.map((direction, index) => (
                    <li key={index}>{direction}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.mapContainer}>
                <div className={styles.mapPlaceholder}>
                  Interactive Map Coming Soon
                </div>
              </div>
            </div>
          )}
        </section>

        <section className={styles.parkingSection}>
          <h2>Parking Information</h2>
          {isLoading ? (
            <div className={styles.loadingIndicator}>Loading parking info...</div>
          ) : error ? (
            <div className={styles.errorMessage}>{error}</div>
          ) : (
            <div className={styles.parkingContent}>
              <ul className={styles.parkingList}>
                {parkingInfo.map((info, index) => (
                  <li key={index} className={styles.parkingItem}>{info}</li>
                ))}
              </ul>
              
              <div className={styles.parkingNotes}>
                <h3>Important Notes</h3>
                <p>Parking lots open 2 hours before events. We recommend arriving early for the best spots.</p>
                <p>Accessible parking is available in all lots near the main entrances.</p>
              </div>
            </div>
          )}
        </section>
      </div>

      <div className={styles.backLink}>
        <Link href="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
}