"use client";

// ... existing imports ...
import { useState, useEffect } from "react";
import styles from "./calendar.module.css";
import Link from "next/link";
import { redirect } from 'next/navigation';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'sports' | 'concert' | 'tradeshow' | 'community';
}

function EditableCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Regional Basketball Tournament',
      date: new Date(2025, 2, 15),
      type: 'sports'
    },
    {
      id: '2',
      title: 'Spring Concert Series',
      date: new Date(2025, 3, 5),
      type: 'concert'
    }
  ]);
  const [newEvent, setNewEvent] = useState<{
    title: string;
    date: Date;
    type: CalendarEvent['type'];
  }>({
    title: '',
    date: new Date(),
    type: 'sports'
  });

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
    setNewEvent({ title: '', date: new Date(), type: 'sports' });
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const renderCalendarDays = () => {
    const days = [];

    // Add day headers
    dayNames.forEach(day => {
      days.push(
        <div key={`header-${day}`} className={styles.calendarDayHeader}>
          {day}
        </div>
      );
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={styles.calendarDay} />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDayEvents = events.filter(event => {
        return event.date.getDate() === day &&
               event.date.getMonth() === currentDate.getMonth() &&
               event.date.getFullYear() === currentDate.getFullYear();
      });

      days.push(
        <div key={day} className={`${styles.calendarDay} ${currentDayEvents.length > 0 ? styles.hasEvent : ''}`}>
          <div className={styles.dayNumber}>{day}</div>
          {currentDayEvents.map(event => (
            <div key={event.id} className={styles.calendarEvent}>
              <span>{event.title}</span>
              <button 
                onClick={() => handleDeleteEvent(event.id)}
                className={styles.deleteEvent}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={styles.editableCalendar}>
      <div className={styles.calendarHeader}>
        <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <div className={styles.calendarNav}>
          <button onClick={handlePrevMonth}>Previous</button>
          <button onClick={() => setCurrentDate(new Date())}>Today</button>
          <button onClick={handleNextMonth}>Next</button>
        </div>
      </div>

      <div className={styles.calendarGrid}>
        {renderCalendarDays()}
      </div>

      <form onSubmit={handleAddEvent} className={styles.addEventForm}>
        <input
          type="text"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          placeholder="Event Title(Please Specify the Type of Event)"
          required
        />
        <input
          type="date"
          onChange={(e) => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
          required
        />
        <select
          value={newEvent.type}
          onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as CalendarEvent['type'] })}
        >
          <option value="sports">Sports</option>
          <option value="concert">Concert</option>
          <option value="tradeshow">Trade Show</option>
          <option value="community">Community</option>
        </select>
        <button type="submit">Plan Your Event!</button>
      </form>
    </div>
  );
}

export default function Calendar() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Event Calendar</h1>
        <p>Browse upcoming events and plan your visit to our arena</p>
      </header>
      
      <EditableCalendar />
      
      <div className={styles.backLink}>
        <Link href="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export function Home() {
  redirect('/homepage');
}

