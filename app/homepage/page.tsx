"use client";

import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "./homepage.module.css";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaRedo } from 'react-icons/fa';

interface EventCardProps {
  date: string;
  title: string;
  description: string;
  buttonText?: string;
  image?: string;
}

interface AccessCardProps {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}

type EventType = 'sports' | 'concert' | 'tradeshow' | 'community';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: EventType;
}

// New interface for mini calendar events
interface MiniCalendarEvent {
  date: Date;
  title: string;
}

// Add new interfaces
interface RecommendedAction {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'rebook' | 'view' | 'complete';
}

export default function HomePage() {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideHeader, setHideHeader] = useState(false);
  
  // Mini calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState<MiniCalendarEvent[]>([
    { date: new Date(2025, 2, 15), title: "Regional Basketball Tournament" },
    { date: new Date(2025, 3, 5), title: "Spring Concert Series" },
    { date: new Date(2025, 3, 20), title: "Community Trade Show" },
    { date: new Date(2025, 4, 10), title: "Summer Wrestling Championship" }
  ]);
  
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [userName, setUserName] = useState("Vidyuth.");
  const [recommendedActions, setRecommendedActions] = useState<RecommendedAction[]>([
    {
      id: '1',
      title: 'Marvin Ridge V. Weddington Girls Basketball',
      date: 'March 29, 2025',
      description: 'Your previous booking from 2/28/2025 for Girls Varsity Basketball. Would you like to book it again?',
      type: 'rebook'
    },
    {
      id: '2',
      title: 'MRHS PTSO Spring Conference',
      date: 'April 12, 2025',
      description: 'Complete your booking for the Spring PTSO Conference to secure your seats.',
      type: 'complete'
    }
  ]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  useEffect(() => {
    // Simulate video loading
    const timer = setTimeout(() => {
      setIsVideoLoading(false);
    }, 1000);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Make header sticky after scrolling down 20px
      if (currentScrollY > 20) {
        setIsHeaderSticky(true);
      } else {
        setIsHeaderSticky(false);
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
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (!href) return;
        
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 60,
          behavior: 'smooth'
        });
      });
    });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Add action handlers
  const handleActionClick = async (action: RecommendedAction) => {
    switch (action.type) {
      case 'rebook':
        // Navigate to booking page with pre-filled event details
        window.location.href = `/boxOffice?event=${encodeURIComponent(action.title)}&date=${encodeURIComponent(action.date)}`;
        break;
      case 'complete':
        // Navigate to booking completion page
        window.location.href = `/boxOffice/complete?event=${encodeURIComponent(action.title)}`;
        break;
      case 'view':
        // Navigate to event details page
        window.location.href = `/events/${encodeURIComponent(action.id)}`;
        break;
    }
  };

  // Mini calendar functions
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderMiniCalendar = () => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    const today = new Date();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Last day of the month (28-31)
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    
    // Last day of previous month
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    
    // Calendar days array
    const days = [];
    
    // Add day headers
    dayNames.forEach(day => {
      days.push(
        <div key={`header-${day}`} className={styles.miniCalendarDay}>
          {day}
        </div>
      );
    });
    
    // Add days from previous month to fill the first row
    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevMonthDay = lastDayOfPrevMonth - firstDayOfMonth + i + 1;
      days.push(
        <div key={`prev-${prevMonthDay}`} className={`${styles.miniCalendarDate} ${styles.otherMonth}`}>
          <span>{prevMonthDay}</span>
        </div>
      );
    }
    
    // Add days of current month
    for (let day = 1; day <= lastDayOfMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.getDate() === today.getDate() && 
                      date.getMonth() === today.getMonth() && 
                      date.getFullYear() === today.getFullYear();
      
      // Check if there's an event on this day
      const hasEvent = calendarEvents.some(event => 
        event.date.getDate() === day && 
        event.date.getMonth() === month && 
        event.date.getFullYear() === year
      );
      
      days.push(
        <div 
          key={`current-${day}`} 
          className={`${styles.miniCalendarDate} ${isToday ? styles.today : ''} ${hasEvent ? styles.hasEvent : ''}`}
        >
          <span>{day}</span>
        </div>
      );
    }
    
    // Add days from next month to complete the grid
    const totalCells = 42; // 6 rows of 7 days
    const remainingCells = totalCells - (firstDayOfMonth + lastDayOfMonth);
    
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className={`${styles.miniCalendarDate} ${styles.otherMonth}`}>
          <span>{day}</span>
        </div>
      );
    }
    
    return days;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowBookingModal(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Mav360 - Your Premier Event Venue</title>
        <meta name="description" content="A 3,500-seat arena for sports, concerts, trade shows, and community events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.heroVideo}>
        {!isVideoLoading && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.backgroundVideo}
          >
            <source src="/fbla20252.mp4" type="video/mp4" />
          </video>
        )}
        <div className={styles.videoOverlay}></div>
        <div className={styles.heroContent}>
          <h1>Welcome to Mav360</h1>
          <p>A state-of-the-art 3,500-seat venue at Marvin Ridge High School for sports, concerts, trade shows, and community events</p>
          <div className={styles.ctaButtons}>
            <Link href="#events" className={styles.ctaButton}>Explore Events</Link>
            <Link href="/boxOffice" className={styles.ctaButton + ' ' + styles.ctaOutline}>Buy Tickets</Link>
          </div>
        </div>
      </div>

      <div className={styles.welcomeSection}>
        <div className={styles.welcomeContainer}>
          <div className={styles.welcomeHeader}>
            <h2 className={styles.welcomeText}>
              Welcome back, <span>{userName}</span>
            </h2>
          </div>
          
          <div className={styles.recommendedActions}>
            {recommendedActions.map(action => (
              <div key={action.id} className={styles.actionCard}>
                <div className={styles.actionHeader}>
                  <h3 className={styles.actionTitle}>{action.title}</h3>
                  <span className={styles.actionDate}>{action.date}</span>
                </div>
                <p className={styles.actionDescription}>{action.description}</p>
                <button 
                  className={styles.actionButton}
                  onClick={() => handleActionClick(action)}
                >
                  {action.type === 'rebook' && (
                    <>
                      <FaRedo /> Rebook
                    </>
                  )}
                  {action.type === 'complete' && (
                    <>
                      <FaCalendarAlt /> Complete Booking
                    </>
                  )}
                  {action.type === 'view' && (
                    <>
                      <FaCalendarAlt /> View Details
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className={styles.mainContent}>
        <section id="events" className={styles.featuredEvents}>
          <div className={styles.section}>
            <div className={styles.eventsCalendarSection}>
              {/* Left side - Events info */}
              <div className={styles.eventsInfo}>
                <h2>Events Calendar</h2>
                <p>Browse or book upcoming events at Mav360</p>
              </div>
              
              {/* Right side - Mini calendar */}
              <div className={styles.miniCalendarContainer}>
                <div className={styles.miniCalendarHeader}>
                  <div className={styles.miniCalendarTitle}>
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </div>
                  <div className={styles.miniCalendarNav}>
                    <button onClick={handlePrevMonth} aria-label="Previous month">
                      <FaChevronLeft />
                    </button>
                    <button onClick={handleNextMonth} aria-label="Next month">
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
                
                <div className={styles.miniCalendarGrid}>
                  {renderMiniCalendar()}
                </div>
                
                <Link href="/calendar" className={styles.viewFullCalendarButton}>
                  View Full Calendar
                </Link>
              </div>
            </div>
            
            <div className={styles.eventsGrid}>
              <EventCard 
                date="March 15, 2025"
                title="Regional Basketball Tournament"
                description="Join us for the exciting regional basketball tournament featuring teams from across the state."
                image="https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              />
              <EventCard 
                date="April 5, 2025"
                title="Spring Concert Series"
                description="Experience an unforgettable night of music with our spring concert series featuring local artists."
                image="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              />
              <EventCard 
                date="May 20-22, 2025"
                title="Community Trade Show"
                description="Discover local businesses and innovations at our annual community trade show and expo."
                buttonText="Learn More"
                image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              />
            </div>
          </div>
        </section>

        <section className={styles.quickAccess} id="information">
          <div className={styles.section}>
            <div className={styles.sectionHeading}>
              <h2>Quick Access</h2>
              <p>Everything you need to know about The Mav360 Stadium</p>
            </div>
            <div className={styles.accessGrid}>
              <AccessCard 
                icon="🎟️"
                title="Box Office"
                description="Purchase tickets for upcoming events or check availability."
                buttonText="Buy Tickets"
                buttonLink="/boxOffice"
              />
              <AccessCard 
                icon="🗺️"
                title="Directions & Parking"
                description="Find your way to the arena with maps and parking information."
                buttonText="Get Directions"
                buttonLink="#"
              />
              <AccessCard 
                icon="🏢"
                title="Rent the Arena"
                description="Host your next event at our state-of-the-art facility."
                buttonText="Plan Your Event"
                buttonLink="/rentArena"
              />
              <AccessCard 
                icon="📋"
                title="Policies & Amenities"
                description="Review our policies and learn about the amenities available at Mav360!"
                buttonText="Learn More"
                buttonLink="#"
              />
            </div>
          </div>
        </section>

        <section className={styles.testimonials}>
          <div className={styles.section}>
            <div className={styles.sectionHeading}>
              <h2>What People Are Saying</h2>
              <p>Hear from event organizers and attendees</p>
            </div>
            <div className={styles.testimonialsContainer}>
              <TestimonialCard 
                quote="Mav360 was the perfect venue for our charity basketball tournament. The staff was incredibly helpful throughout the planning process, and the facilities exceeded our expectations."
                name="Michael Johnson"
                title="Event Organizer, Community Basketball League"
              />
              <TestimonialCard 
                quote="We've held our annual trade show at Mav360 for the past two years, and it's been a fantastic experience. The space is versatile, the amenities are top-notch, and our exhibitors love the location."
                name="Sarah Williams"
                title="Director, Highland Business Association"
              />
            </div>
          </div>
        </section>

        <section className={styles.newsletter} id="plan">
          <div className={styles.newsletterContainer}>
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter to receive updates on upcoming events, special offers, and more.</p>
            <form className={styles.subscribeForm}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerColumn}>
            <h3>Mav360</h3>
            <p>2825 Crane Rd, Waxhaw, NC 28173
            <br />Waxhaw, NC 28173</p>
            <p>Phone: (555) 123-4567<br />Email: info@mav360.org</p>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon}>FB</a>
              <a href="#" className={styles.socialIcon}>TW</a>
              <a href="#" className={styles.socialIcon}>IG</a>
              <a href="#" className={styles.socialIcon}>YT</a>
            </div>
          </div>
          <div className={styles.footerColumn}>
            <h3>Quick Links</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="#events">Events Calendar</Link></li>
              <li><Link href="/boxOffice">Buy Tickets</Link></li>
              <li><Link href="/rentArena">Plan Your Event</Link></li>
              <li><Link href="#">Seating Charts</Link></li>
              <li><Link href="#">Amenities</Link></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>Information</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">FAQs</Link></li>
              <li><Link href="#">Accessibility</Link></li>
              <li><Link href="#">Safety Policies</Link></li>
              <li><Link href="/contactInfo">Contact Us</Link></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>Legal</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="#">Terms & Conditions</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Cookie Policy</Link></li>
              <li><Link href="#">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>&copy; 2025 Mav360. All rights reserved.</p>
        </div>
      </footer>

      {showBookingModal && (
        <div className={styles.bookingModalOverlay}>
          <div className={styles.bookingModal}>
            <div className={styles.bookingModalHeader}>
              <h2 className={styles.bookingModalTitle}>Book Event</h2>
              <button className={styles.closeButton} onClick={() => setShowBookingModal(false)}>×</button>
            </div>
            <form className={styles.bookingForm}>
              {/* Add your form fields here */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Component for event cards
function EventCard({ date, title, description, buttonText = "Get Tickets", image }: EventCardProps) {
  return (
    <div className={styles.eventCard}>
      <div 
        className={styles.eventImage} 
        style={{ 
          backgroundImage: `url('${image || '/api/placeholder/400/200'}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className={styles.eventDetails}>
        <div>
          <span className={styles.eventDate}>{date}</span>
          <h3 className={styles.eventTitle}>{title}</h3>
        </div>
        <p>{description}</p>
        <Link href="#" className={styles.ctaButton}>{buttonText}</Link>
      </div>
    </div>
  );
}

// Component for access cards
function AccessCard({ icon, title, description, buttonText, buttonLink }: AccessCardProps) {
  return (
    <div className={styles.accessCard}>
      <div className={styles.accessIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={buttonLink} className={styles.ctaButton}>{buttonText}</Link>
    </div>
  );
}

// Component for testimonial cards
function TestimonialCard({ quote, name, title }: TestimonialCardProps) {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.testimonialText}>
        "{quote}"
      </div>
      <div className={styles.testimonialAuthor}>
        <div className={styles.authorImage}></div>
        <div className={styles.authorInfo}>
          <h4>{name}</h4>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
}

function EditableCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'SC V. NC Basketball Tournament',
      date: new Date(2025, 2, 15),
      type: 'sports'
    },
    {
      id: '2',
      title: 'Kenrdrick Lamar Concert ',
      date: new Date(2025, 3, 5),
      type: 'concert'
    }
  ]);
  
  const [newEvent, setNewEvent] = useState<{title: string; date: Date; type: EventType}>({
    title: '',
    date: new Date(),
    type: 'sports'
  });

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as EventType;
    setNewEvent({ ...newEvent, type: value });
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
    setNewEvent({ title: '', date: new Date(), type: 'sports' });
  };

  return (
    <div className={styles.editableCalendar}>
      {/* ... other JSX ... */}
      <form onSubmit={handleAddEvent} className={styles.addEventForm}>
        <input
          type="text"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          placeholder="Event Title"
          required
        />
        <input
          type="date"
          onChange={(e) => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
          required
        />
        <select
          value={newEvent.type}
          onChange={handleEventTypeChange}
        >
          <option value="sports">Sports</option>
          <option value="concert">Concert</option>
          <option value="tradeshow">Trade Show</option>
          <option value="community">Community Event</option>
        </select>
      </form>
    </div>
  );
}