'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './full-menu.module.css';

// Define types
type MenuCategory = 'starters' | 'mains' | 'desserts' | 'drinks';
type MenuItem = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  dietary?: string[];
};
type MenuData = {
  [key in MenuCategory]: MenuItem[];
};

export default function FullMenu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('starters');

  // Full menu data
  const menuData: MenuData = {
    starters: [
      {
        id: 1,
        title: 'Garden Fresh Salad',
        description: 'Seasonal organic vegetables with house-made vinaigrette',
        price: '$12.95',
        image: '/images/menu1.jpg',
        dietary: ['Vegan', 'Gluten-Free']
      },
      {
        id: 2,
        title: 'Roasted Beet Carpaccio',
        description: 'Thinly sliced roasted beets with arugula, walnuts, and cashew cheese',
        price: '$14.95',
        image: '/images/menu2.jpg',
        dietary: ['Vegan', 'Gluten-Free']
      },
      {
        id: 3,
        title: 'Seasonal Soup',
        description: 'Daily selection of farm-fresh vegetables in a flavorful broth',
        price: '$9.95',
        image: '/images/menu3.jpg',
        dietary: ['Vegan', 'Gluten-Free']
      },
      {
        id: 4,
        title: 'Artisanal Bruschetta',
        description: 'House-made sourdough topped with seasonal vegetables and herbs',
        price: '$11.95',
        image: '/images/menu4.jpg',
        dietary: ['Vegetarian']
      }
    ],
    mains: [
      {
        id: 5,
        title: 'Wild Mushroom Risotto',
        description: 'Creamy arborio rice with locally foraged mushrooms and truffle oil',
        price: '$18.95',
        image: '/images/menu3.jpg',
        dietary: ['Vegetarian', 'Gluten-Free']
      },
      {
        id: 6,
        title: 'Roasted Vegetable Buddha Bowl',
        description: 'Quinoa, roasted seasonal vegetables, avocado, and tahini dressing',
        price: '$15.95',
        image: '/images/menu2.jpg',
        dietary: ['Vegan', 'Gluten-Free']
      },
      {
        id: 7,
        title: 'Rainbow Plant Power Bowl',
        description: 'A colorful array of vegetables, legumes, and seeds with a lemon-herb dressing',
        price: '$16.95',
        image: '/images/menu4.jpg',
        dietary: ['Vegan', 'Gluten-Free']
      },
      {
        id: 8,
        title: 'Chef\'s Special Pasta',
        description: 'Hand-rolled pasta with seasonal vegetables and house-made sauce',
        price: '$17.95',
        image: '/images/menu1.jpg',
        dietary: ['Vegetarian']
      },
      {
        id: 9,
        title: 'Plant-Based Burger',
        description: 'House-made vegetable and legume patty on a whole grain bun with all the fixings',
        price: '$14.95',
        image: '/images/menu2.jpg',
        dietary: ['Vegan']
      },
      {
        id: 10,
        title: 'Seasonal Vegetable Curry',
        description: 'Aromatic spices and coconut milk with seasonal vegetables served with brown rice',
        price: '$16.95',
        image: '/images/menu3.jpg',
        dietary: ['Vegan', 'Gluten-Free']
      }
    ],
    desserts: [
      {
        id: 11,
        title: 'Seasonal Fruit Crumble',
        description: 'Local fruits with oat and nut topping, served with plant-based ice cream',
        price: '$10.95',
        image: '/images/menu4.jpg',
        dietary: ['Vegan']
      },
      {
        id: 12,
        title: 'Chocolate Avocado Mousse',
        description: 'Rich chocolate mousse made with ripe avocados and fair-trade cacao',
        price: '$9.95',
        image: '/images/menu1.jpg',
        dietary: ['Vegan', 'Gluten-Free']
      },
      {
        id: 13,
        title: 'Vanilla Bean Cheesecake',
        description: 'Cashew-based cheesecake with a walnut-date crust and berry compote',
        price: '$11.95',
        image: '/images/menu2.jpg',
        dietary: ['Vegan', 'Gluten-Free']
      }
    ],
    drinks: [
      {
        id: 14,
        title: 'Seasonal Botanical Spritzer',
        description: 'House-made syrup with fresh herbs, citrus, and sparkling water',
        price: '$6.95',
        image: '/images/menu3.jpg',
        dietary: ['Vegan', 'Gluten-Free']
      },
      {
        id: 15,
        title: 'Organic Kombucha',
        description: 'Local kombucha in rotating seasonal flavors',
        price: '$7.95',
        image: '/images/menu4.jpg',
        dietary: ['Vegan', 'Gluten-Free']
      },
      {
        id: 16,
        title: 'Fresh-Pressed Juice',
        description: 'Rotating selection of organic fruits and vegetables',
        price: '$8.95',
        image: '/images/menu1.jpg',
        dietary: ['Vegan', 'Gluten-Free']
      },
      {
        id: 17,
        title: 'Organic Wine Selection',
        description: 'Curated selection of organic and biodynamic wines (glass/bottle)',
        price: '$12.95 / $45.00',
        image: '/images/menu2.jpg',
        dietary: ['Vegan', 'Gluten-Free']
      }
    ]
  };

  return (
    <main className={styles.menuPage}>
      <div className={styles.menuHero}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1>Our Menu</h1>
          <p>Farm-fresh ingredients prepared with care</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.menuDescription}>
          <h2>Seasonal & Sustainable</h2>
          <p>
            Our menu changes with the seasons to showcase the best local produce at its peak freshness. 
            Every dish is thoughtfully prepared to highlight the natural flavors of our sustainably sourced ingredients. 
            We're proud to work directly with farmers who share our commitment to environmental stewardship.
          </p>
          <p>
            <strong>Please note:</strong> Our kitchen is happy to accommodate dietary restrictions and preferences. 
            Please inform your server of any allergies or special requests.
          </p>
        </div>

        <div className={styles.categoryTabs}>
          {(['starters', 'mains', 'desserts', 'drinks'] as MenuCategory[]).map((category) => (
            <button
              key={category}
              className={`${styles.categoryTab} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.menuItems}>
          {menuData[activeCategory].map((item) => (
            <div key={item.id} className={styles.menuItem}>
              <div className={styles.menuItemImageContainer}>
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  width={300} 
                  height={200}
                  className={styles.menuItemImage}
                />
                {item.dietary && item.dietary.length > 0 && (
                  <div className={styles.dietaryTags}>
                    {item.dietary.map((tag) => (
                      <span key={tag} className={styles.dietaryTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.menuItemDetails}>
                <div className={styles.menuItemHeader}>
                  <h3 className={styles.menuItemTitle}>{item.title}</h3>
                  <span className={styles.menuItemPrice}>{item.price}</span>
                </div>
                <p className={styles.menuItemDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.noteSection}>
          <h3>Dietary Information</h3>
          <div className={styles.dietaryLegend}>
            <div className={styles.legendItem}>
              <span className={`${styles.legendTag} ${styles.veganTag}`}>Vegan</span>
              <p>Contains no animal products</p>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendTag} ${styles.vegetarianTag}`}>Vegetarian</span>
              <p>May contain dairy or eggs, but no meat</p>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendTag} ${styles.glutenFreeTag}`}>Gluten-Free</span>
              <p>Contains no wheat, rye, or barley</p>
            </div>
          </div>
        </div>

        <div className={styles.ctaSection}>
          <h3>Join Us For Dinner</h3>
          <p>Experience our seasonal menu in our sustainable dining room or order for takeaway.</p>
          <div className={styles.ctaButtons}>
            <Link href="/reservations" className="btn btn-primary">Make a Reservation</Link>
            <a href="tel:5551234567" className="btn btn-secondary">Call to Order: (555) 123-4567</a>
          </div>
        </div>
      </div>

      <div className={styles.homeLink}>
        <Link href="/" className={styles.backLink}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Back to Home
        </Link>
      </div>
    </main>
  );
} 