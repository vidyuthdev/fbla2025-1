"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './boxOffice.module.css';
import { FaCalendarAlt, FaTicketAlt, FaArrowLeft, FaFire, FaExclamationCircle } from 'react-icons/fa';

interface Event {
  id: number;
  title: string;
  date: string;
  price: string;
  availability: 'Available' | 'Limited Seats' | 'Sold Out' | 'High Demand' | 'Low Seats Remaining';
  image: string;
}

export default function BoxOffice() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Championship Basketball Finals",
      date: "June 15, 2023 - 7:00 PM",
      price: "$45.00 - $120.00",
      availability: "High Demand",
      image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: "Rock Concert: The Amplifiers",
      date: "July 3, 2023 - 8:30 PM",
      price: "$65.00 - $150.00",
      availability: "Limited Seats",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      title: "International Trade Show",
      date: "August 10-12, 2023 - All Day",
      price: "$25.00 per day",
      availability: "Available",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 4,
      title: "Summer Wrestling Championship",
      date: "July 22, 2023 - 6:00 PM",
      price: "$35.00 - $85.00",
      availability: "Sold Out",
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 5,
      title: "Classical Symphony Orchestra",
      date: "September 5, 2023 - 7:30 PM",
      price: "$55.00 - $130.00",
      availability: "Low Seats Remaining",
      image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 6,
      title: "Community Charity Gala",
      date: "October 1, 2023 - 6:00 PM",
      price: "$75.00",
      availability: "Limited Seats",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ]);

  const getAvailabilityClass = (availability: string) => {
    switch (availability) {
      case 'Available':
        return styles.available;
      case 'Limited Seats':
        return styles.limited;
      case 'Sold Out':
        return styles.soldOut;
      case 'High Demand':
        return styles.highDemand;
      case 'Low Seats Remaining':
        return styles.lowSeats;
      default:
        return '';
    }
  };

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'High Demand':
        return <FaFire className={styles.statusIcon} />;
      case 'Low Seats Remaining':
        return <FaExclamationCircle className={styles.statusIcon} />;
      default:
        return null;
    }
  };

  const handlePurchase = (id: number) => {
    alert(`Ticket purchase initiated for event #${id}. Redirecting to payment...`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Box Office</h1>
        <p>Browse and purchase tickets for upcoming events at our arena</p>
      </header>

      <div className={styles.ticketList}>
        {events.map((event, index) => (
          <div 
            key={event.id} 
            className={styles.ticketCard} 
            style={{ '--index': index } as React.CSSProperties}
          >
            <img 
              src={event.image} 
              alt={event.title} 
              className={styles.eventImage} 
            />
            <div className={styles.eventDetails}>
              <div className={styles.eventContent}>
                <h2 className={styles.eventTitle}>{event.title}</h2>
                
                <div className={styles.eventDate}>
                  <span className={styles.eventIcon}><FaCalendarAlt /></span>
                  <span>{event.date}</span>
                </div>
                
                <div className={styles.eventPrice}>
                  <span className={styles.eventIcon}><FaTicketAlt /></span>
                  <span>{event.price}</span>
                </div>
                
                <div className={styles.statusContainer}>
                  <span className={`${styles.availabilityTag} ${getAvailabilityClass(event.availability)}`}>
                    {getAvailabilityIcon(event.availability)}
                    {event.availability}
                  </span>
                </div>
              </div>
              
              <button 
                className={styles.purchaseButton}
                onClick={() => handlePurchase(event.id)}
                disabled={event.availability === 'Sold Out'}
              >
                {event.availability === 'Sold Out' ? 'Sold Out' : 'Purchase Tickets'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.backLink}>
        <Link href="/">
          <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Back to Home
        </Link>
      </div>
    </div>
  );
}


