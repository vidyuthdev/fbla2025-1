'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

// Define types for menu items
type MenuItem = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
};

export default function Home() {
  // State to track which sections are visible for animations
  const sections = ['hero', 'about', 'approach', 'menu', 'sustainability'] as const;
  type SectionType = typeof sections[number];
  const [isVisible, setIsVisible] = useState<Record<SectionType, boolean>>({
    hero: true,
    about: false,
    approach: false,
    menu: false,
    sustainability: false
  });

  // Refs for each section
  const sectionRefs = useRef<Record<SectionType, HTMLDivElement | null>>({
    hero: null,
    about: null,
    approach: null,
    menu: null,
    sustainability: null
  });

  // Handle scroll to show animations
  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight * 0.7;
    
    for (const section of sections) {
      if (sectionRefs.current[section]) {
        const sectionTop = sectionRefs.current[section]?.offsetTop || 0;
        
        setIsVisible(prev => ({
          ...prev,
          [section]: scrollPosition > sectionTop
        }));
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Sample menu data
  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: 'Garden Fresh Salad',
      description: 'Seasonal organic vegetables with house-made vinaigrette',
      price: '$12.95',
      image: '/images/menu1.jpg'
    },
    {
      id: 2,
      title: 'Roasted Vegetable Buddha Bowl',
      description: 'Quinoa, roasted seasonal vegetables, avocado, and tahini dressing',
      price: '$15.95',
      image: '/images/menu2.jpg'
    },
    {
      id: 3,
      title: 'Wild Mushroom Risotto',
      description: 'Creamy arborio rice with locally foraged mushrooms and truffle oil',
      price: '$18.95',
      image: '/images/menu3.jpg'
    },
    {
      id: 4,
      title: 'Rainbow Plant Power Bowl',
      description: 'A colorful array of vegetables, legumes, and seeds with a lemon-herb dressing',
      price: '$16.95',
      image: '/images/menu4.jpg'
    },
    {
      id: 5,
      title: 'Chef\'s Special Pasta',
      description: 'Hand-rolled pasta with seasonal vegetables and house-made sauce',
      price: '$17.95',
      image: '/images/menu1.jpg'
    },
    {
      id: 6,
      title: 'Plant-Based Burger',
      description: 'House-made vegetable and legume patty on a whole grain bun with all the fixings',
      price: '$14.95',
      image: '/images/menu2.jpg'
    }
  ];

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section 
        ref={(el: HTMLDivElement | null) => { sectionRefs.current.hero = el; }}
        className={styles.heroSection}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Queen City Greens</h1>
          <p className={styles.heroSubtitle}>
            Celebrating plant-based cuisine with locally sourced, seasonal ingredients
          </p>
          <div className={styles.heroButtons}>
            <Link href="#menu" className="btn btn-primary">View Menu</Link>
            <Link href="/reservations" className="btn btn-secondary">Book a Table</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about"
        ref={(el: HTMLDivElement | null) => { sectionRefs.current.about = el; }}
        className={`${styles.section} ${styles.aboutSection} ${isVisible.about ? styles.visible : ''}`}
      >
        <div className="container">
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <p className={styles.sectionDescription}>
            Queen City Greens is a celebration of sustainable, plant-based cuisine that honors local farmers and the natural bounty of our region.
          </p>
          
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <h3>Commitment to Quality</h3>
              <p>
                Founded in 2015 by Chef Maria Chen, Queen City Greens was born from a vision to create delicious plant-based dishes that would satisfy even the most dedicated meat enthusiasts. Our philosophy is simple: source the finest local ingredients and let their natural flavors shine through creative, thoughtful preparation.
              </p>
              <p>
                Every dish we serve is crafted with intention, balancing nutrition, sustainability, and most importantly, incredible flavor. We work directly with local farmers and producers to ensure that only the freshest, highest-quality ingredients make it to your plate.
              </p>
              <p>
                We believe that vegetarian cuisine should never be an afterthought, but a celebration of the incredible diversity and richness that plants offer.
              </p>
            </div>
            <Image 
              src="/images/about-img.jpg" 
              alt="Queen City Greens interior" 
              width={600} 
              height={400}
              className={styles.aboutImage}
            />
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section 
        id="approach"
        ref={(el: HTMLDivElement | null) => { sectionRefs.current.approach = el; }}
        className={`${styles.section} ${styles.approachSection} ${isVisible.approach ? styles.visible : ''}`}
      >
        <div className="container">
          <h2 className={styles.sectionTitle}>Our Approach</h2>
          <p className={styles.sectionDescription}>
            We believe in a holistic approach to food that honors the earth, the farmers, and your well-being.
          </p>
          
          <div className={styles.approachCards}>
            <div className={styles.approachCard}>
              <div className={styles.approachIcon}>🌱</div>
              <h3>Farm to Table</h3>
              <p>We source 90% of our ingredients from farms within 50 miles of our restaurant, supporting local agriculture and ensuring peak freshness.</p>
            </div>
            
            <div className={styles.approachCard}>
              <div className={styles.approachIcon}>👨‍🍳</div>
              <h3>Mindful Preparation</h3>
              <p>Our chefs treat each ingredient with respect, using preparation techniques that enhance natural flavors without unnecessary processing.</p>
            </div>
            
            <div className={styles.approachCard}>
              <div className={styles.approachIcon}>♻️</div>
              <h3>Zero Waste</h3>
              <p>We utilize every part of our produce, compost all organic matter, and use eco-friendly packaging for a minimal environmental footprint.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section 
        id="menu"
        ref={(el: HTMLDivElement | null) => { sectionRefs.current.menu = el; }}
        className={`${styles.section} ${styles.menuSection} ${isVisible.menu ? styles.visible : ''}`}
      >
        <div className="container">
          <h2 className={styles.sectionTitle}>Our Menu</h2>
          <p className={styles.sectionDescription}>
            Our seasonal menu celebrates the bounty of local farms with creative vegetarian dishes that delight the senses.
          </p>
          
          <div className={styles.menuItems}>
            {menuItems.map((item) => (
              <div key={item.id} className={styles.menuItem}>
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  width={400} 
                  height={200}
                  className={styles.menuItemImage}
                />
                <div className={styles.menuItemContent}>
                  <h3 className={styles.menuItemTitle}>{item.title}</h3>
                  <p className={styles.menuItemDescription}>{item.description}</p>
                  <p className={styles.menuItemPrice}>{item.price}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.menuCta}>
            <Link href="/full-menu" className="btn btn-primary">View Full Menu</Link>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section 
        id="sustainability"
        ref={(el: HTMLDivElement | null) => { sectionRefs.current.sustainability = el; }}
        className={`${styles.section} ${styles.sustainabilitySection} ${isVisible.sustainability ? styles.visible : ''}`}
      >
        <div className="container">
          <h2 className={styles.sectionTitle}>Sustainability</h2>
          <p className={styles.sectionDescription}>
            Our commitment to the planet goes beyond serving plant-based food. We strive to make every aspect of our business environmentally responsible.
          </p>
          
          <div className={styles.sustainabilityContent}>
            <div className={styles.sustainabilityText}>
              <h3>Our Green Commitment</h3>
              <p>
                At Queen City Greens, sustainability isn't just a buzzword—it's the foundation of everything we do. From the farmers we partner with to the energy that powers our kitchen, we make conscious choices that minimize our environmental impact while maximizing our positive influence on our community.
              </p>
              <p>
                We believe that delicious food and environmental responsibility go hand in hand, and we're proud to set a standard for sustainable dining in our community.
              </p>
              
              <ul className={styles.sustainabilityList}>
                <li>Solar-powered kitchen and dining room</li>
                <li>Water conservation systems throughout our facility</li>
                <li>Comprehensive recycling and composting program</li>
                <li>Partnerships with regenerative agriculture farms</li>
                <li>Seasonal menu that minimizes food miles and carbon footprint</li>
              </ul>
            </div>
            
            <Image 
              src="/images/sustainability.jpg" 
              alt="Sustainable farming practices" 
              width={600} 
              height={400}
              className={styles.sustainabilityImage}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div>
              <div className={styles.footerLogo}>Queen City Greens</div>
              <p className={styles.footerAbout}>
                A sustainable vegetarian restaurant celebrating the bounty of local farms and the creativity of plant-based cuisine.
              </p>
              <div className={styles.footerSocial}>
                <Link href="#" className={styles.footerSocialIcon}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </Link>
                <Link href="#" className={styles.footerSocialIcon}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </Link>
                <Link href="#" className={styles.footerSocialIcon}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className={styles.footerNav}>
              <h3 className={styles.footerTitle}>Navigation</h3>
              <ul>
                <li><Link href="#about">About Us</Link></li>
                <li><Link href="#menu">Menu</Link></li>
                <li><Link href="#approach">Our Approach</Link></li>
                <li><Link href="#sustainability">Sustainability</Link></li>
                <li><Link href="/reservations">Reservations</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerNav}>
              <h3 className={styles.footerTitle}>Hours</h3>
              <ul>
                <li>Monday - Friday: 11am - 10pm</li>
                <li>Saturday: 10am - 11pm</li>
                <li>Sunday: 10am - 9pm</li>
                <li>Brunch: Sat & Sun 10am - 2pm</li>
              </ul>
            </div>
            
            <div className={styles.footerContact}>
              <h3 className={styles.footerTitle}>Contact</h3>
              <p>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
                245 Providence Road, Charlotte, NC 28207
              </p>
              <p>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                </svg>
                980-229-2987
              </p>
              <p>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                </svg>
                info@queencitygreens.com
              </p>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} Queen City Greens. All rights reserved. Proudly serving plant-based cuisine since 2015.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
