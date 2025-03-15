"use client";

import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "./homepage.module.css";

interface EventCardProps {
  date: string;
  title: string;
  description: string;
  buttonText?: string;
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

export default function HomePage() {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideHeader, setHideHeader] = useState(false);
  
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Mav360 - Your Premier Event Venue</title>
        <meta name="description" content="A 3,500-seat arena for sports, concerts, trade shows, and community events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header 
        className={`${styles.header} ${isHeaderSticky ? styles.stickyHeader : ''}`} 
        style={{ transform: hideHeader ? 'translateY(-100%)' : 'translateY(0)' }}
      >
        <div className={styles.headerContainer}>
          <div className={styles.logo}>Mav360</div>
          <nav>
            <ul className={styles.navLinks}>
              <li><Link href="#events">Events</Link></li>
              <li><Link href="/boxOffice">Tickets</Link></li>
              <li><Link href="#information">Information</Link></li>
              <li><Link href="#plan">Plan Your Event</Link></li>
              <li><Link href="/contactInfo">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className={styles.heroVideo}>
        <div className={styles.videoPlaceholder}></div>
        <div className={styles.heroContent}>
          <h1>Welcome to Mav360</h1>
          <p>A state-of-the-art 3,500-seat venue for sports, concerts, trade shows, and community events</p>
          <div className={styles.ctaButtons}>
            <Link href="#events" className={styles.ctaButton}>Explore Events</Link>
            <Link href="/boxOffice" className={styles.ctaButton + ' ' + styles.ctaOutline}>Buy Tickets</Link>
          </div>
        </div>
      </div>

      <main className={styles.mainContent}>
        <section id="events" className={styles.featuredEvents}>
          <div className={styles.section}>
            <div className={styles.sectionHeading}>
              <h2>Events Calendar</h2>
              <p>Browse upcoming events at Mav360</p>
            </div>
            <Link href="/calendar" className={styles.calendarButton}>
              View Full Calendar
              <br />
              <span style={{ fontSize: "16px", opacity: 0.8 }}>Click to see all events and schedules</span>
            </Link>
            <div className={styles.eventsGrid}>
              <EventCard 
                date="March 15, 2025"
                title="Regional Basketball Tournament"
                description="Join us for the exciting regional basketball tournament featuring teams from across the state."
              />
              <EventCard 
                date="April 5, 2025"
                title="Spring Concert Series"
                description="Experience an unforgettable night of music with our spring concert series featuring local artists."
              />
              <EventCard 
                date="May 20-22, 2025"
                title="Community Trade Show"
                description="Discover local businesses and innovations at our annual community trade show and expo."
                buttonText="Learn More"
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
                buttonLink="#plan"
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
              <li><Link href="#plan">Plan Your Event</Link></li>
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
    </div>
  );
}

// Component for event cards
function EventCard({ date, title, description, buttonText = "Get Tickets" }: EventCardProps) {
  return (
    <div className={styles.eventCard}>
      <div className={styles.eventImage} style={{ backgroundImage: "url('/api/placeholder/400/200')" }}></div>
      <div className={styles.eventDetails}>
        <span className={styles.eventDate}>{date}</span>
        <h3 className={styles.eventTitle}>{title}</h3>
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