'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from './components/Navbar';
import SchoolPartners from './components/SchoolPartners';
import styles from './page.module.css';
import childCookingImage from '../public/images/child-cooking.jpg';
import { useState } from 'react';

export default function Home() {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  // Function to handle image errors and use placeholders
  const handleImageError = (imageId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [imageId]: true
    }));
  };

  // Get image URL with fallback
  const getImageUrl = (path: string, altText: string) => {
    const imageId = path.replace(/\/|\./g, '-');
    
    if (imageErrors[imageId]) {
      // Return placeholder
      return `https://via.placeholder.com/400x300/A7D1F0/000000?text=${encodeURIComponent(altText)}`;
    }
    return path;
  };

  return (
    <main className={styles.main}>
      <Navbar />
      
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.title}>
            Learn to <span className={styles.highlight}>Cook</span> with Confidence
          </h1>
          <p className={styles.subtitle}>
            Fun and easy recipes designed for young chefs to create delicious meals, learn new skills, and enjoy cooking!
          </p>
          <div className={styles.heroCta}>
            <Link href="/recipe-finder" className={`${styles.ctaButton} ${styles.primary}`}>
              Find a Recipe
            </Link>
            <Link href="/cooking-tips" className={`${styles.ctaButton} ${styles.secondary}`}>
              Cooking Tips
            </Link>
          </div>
        </div>
        <div className={styles.heroImageContainer}>
          <div className={styles.heroImage}>
            {/* Image will be displayed as background from CSS */}
          </div>
        </div>
      </section>

      {/* School Partners Carousel */}
      <SchoolPartners />

      <section className={styles.featuredCategories}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>What Do You Want to Cook?</h2>
          <p className={styles.sectionSubtitle}>
            Choose from our most popular categories and start creating delicious meals today!
          </p>
          
          <div className={styles.categories}>
            <Link href="/recipes?category=breakfast" className={styles.categoryCard}>
              <div className={styles.categoryIcon}>🍳</div>
              <h3>Breakfast</h3>
              <p>Start your day with our tasty breakfast recipes</p>
            </Link>
            
            <Link href="/recipes?category=lunch" className={styles.categoryCard}>
              <div className={styles.categoryIcon}>🥪</div>
              <h3>Lunch</h3>
              <p>Quick and delicious lunch ideas for kids</p>
            </Link>
            
            <Link href="/recipes?category=dinner" className={styles.categoryCard}>
              <div className={styles.categoryIcon}>🍝</div>
              <h3>Dinner</h3>
              <p>Impressive yet simple dinner recipes</p>
            </Link>
            
            <Link href="/recipes?category=snacks" className={styles.categoryCard}>
              <div className={styles.categoryIcon}>🍿</div>
              <h3>Snacks</h3>
              <p>Fun and healthy snacks for any time</p>
            </Link>
            
            <Link href="/recipes?category=desserts" className={styles.categoryCard}>
              <div className={styles.categoryIcon}>🧁</div>
              <h3>Desserts</h3>
              <p>Sweet treats that are fun to make</p>
            </Link>
            
            <Link href="/recipes?category=drinks" className={styles.categoryCard}>
              <div className={styles.categoryIcon}>🥤</div>
              <h3>Drinks</h3>
              <p>Refreshing beverages for all seasons</p>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.recipeFinderSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.finderContent}>
            <h2 className={styles.sectionTitle}>Find Your Perfect Recipe</h2>
            <p className={styles.sectionSubtitle}>
              Answer a few simple questions and we'll help you find recipes that match your preferences and skill level.
            </p>
            
            <div className={styles.finderFeatures}>
              <div className={styles.finderFeature}>
                <div className={styles.featureIcon}>🔍</div>
                <h3>Personalized</h3>
                <p>Based on your preferences</p>
              </div>
              
              <div className={styles.finderFeature}>
                <div className={styles.featureIcon}>🎯</div>
                <h3>Skill-Based</h3>
                <p>Matching your cooking level</p>
              </div>
              
              <div className={styles.finderFeature}>
                <div className={styles.featureIcon}>⏱️</div>
                <h3>Time-Conscious</h3>
                <p>Fit your available time</p>
              </div>
            </div>
            
            <Link href="/recipe-finder" className={`${styles.ctaButton} ${styles.primary}`}>
              Start Recipe Quiz
            </Link>
          </div>
          
          <div className={styles.finderImageContainer}>
            <div className={styles.finderImage}></div>
          </div>
        </div>
      </section>

      <section className={styles.featuredRecipes}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Popular Recipes</h2>
          <p className={styles.sectionSubtitle}>
            Our most loved recipes that young chefs enjoy making and eating!
          </p>
          
          <div className={styles.recipeCardsContainer}>
            <div className={styles.recipeCard}>
              <div className={styles.recipeImageWrapper}>
                <div 
                  className={styles.recipeImage} 
                  style={{backgroundImage: `url('${getImageUrl('/images/recipes/pancakes.jpg', 'Fluffy Pancakes')}')`}}
                  onError={() => handleImageError('images-recipes-pancakes-jpg')}
                ></div>
                <div className={styles.difficulty}>Beginner</div>
              </div>
              <div className={styles.recipeContent}>
                <h3>Fluffy Pancakes</h3>
                <p>Light, airy pancakes that are perfect for a weekend breakfast.</p>
                <div className={styles.recipeMetaData}>
                  <span className={styles.time}>15 min</span>
                  <span className={styles.mealType}>Breakfast</span>
                </div>
                <Link href="/recipes/fluffy-pancakes" className={styles.viewRecipe}>View Recipe</Link>
              </div>
            </div>

            <div className={styles.recipeCard}>
              <div className={styles.recipeImageWrapper}>
                <div 
                  className={styles.recipeImage} 
                  style={{backgroundImage: `url('${getImageUrl('/images/recipes/pasta.jpg', 'Simple Pasta')}')`}}
                  onError={() => handleImageError('images-recipes-pasta-jpg')}
                ></div>
                <div className={styles.difficulty}>Beginner</div>
              </div>
              <div className={styles.recipeContent}>
                <h3>Simple Pasta</h3>
                <p>A quick and delicious pasta dish that's perfect for busy weeknights.</p>
                <div className={styles.recipeMetaData}>
                  <span className={styles.time}>20 min</span>
                  <span className={styles.mealType}>Dinner</span>
                </div>
                <Link href="/recipes/simple-pasta" className={styles.viewRecipe}>View Recipe</Link>
              </div>
            </div>

            <div className={styles.recipeCard}>
              <div className={styles.recipeImageWrapper}>
                <div 
                  className={styles.recipeImage} 
                  style={{backgroundImage: `url('${getImageUrl('/images/recipes/cookies.jpg', 'Chocolate Chip Cookies')}')`}}
                  onError={() => handleImageError('images-recipes-cookies-jpg')}
                ></div>
                <div className={styles.difficulty}>Intermediate</div>
              </div>
              <div className={styles.recipeContent}>
                <h3>Chocolate Chip Cookies</h3>
                <p>Classic cookies with the perfect balance of chewy and crispy.</p>
                <div className={styles.recipeMetaData}>
                  <span className={styles.time}>30 min</span>
                  <span className={styles.mealType}>Dessert</span>
                </div>
                <Link href="/recipes/chocolate-chip-cookies" className={styles.viewRecipe}>View Recipe</Link>
              </div>
            </div>
          </div>
          
          <div className={styles.viewAllContainer}>
            <Link href="/recipes" className={styles.viewAllButton}>
              Browse All Recipes
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.cookingTips}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Cooking Tips</h2>
          <p className={styles.sectionSubtitle}>
            Learn essential cooking skills to help you become a better chef!
          </p>
          
          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🔪</div>
              <h3>Knife Skills</h3>
              <p>Learn safe and proper cutting techniques for young chefs</p>
              <Link href="/cooking-tips#knife-skills" className={styles.tipLink}>
                Read More
              </Link>
            </div>
            
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🍽️</div>
              <h3>Measuring</h3>
              <p>Tips for accurate measuring to make recipes turn out perfectly</p>
              <Link href="/cooking-tips#measuring" className={styles.tipLink}>
                Read More
              </Link>
            </div>
            
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🧽</div>
              <h3>Clean As You Go</h3>
              <p>Learn the secret of keeping your kitchen clean while cooking</p>
              <Link href="/cooking-tips#cleaning" className={styles.tipLink}>
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLogo}>
            CookCraft<span className={styles.logoAccent}>🍳</span>
          </div>
          <p className={styles.footerTagline}>Making cooking fun for young chefs!</p>
          
          <div className={styles.footerLinks}>
            <div className={styles.footerLinkGroup}>
              <h4>Explore</h4>
              <Link href="/recipes">Recipes</Link>
              <Link href="/recipe-finder">Recipe Finder</Link>
              <Link href="/cooking-tips">Cooking Tips</Link>
            </div>
            
            <div className={styles.footerLinkGroup}>
              <h4>Categories</h4>
              <Link href="/recipes?category=breakfast">Breakfast</Link>
              <Link href="/recipes?category=lunch">Lunch</Link>
              <Link href="/recipes?category=dinner">Dinner</Link>
              <Link href="/recipes?category=desserts">Desserts</Link>
            </div>
            
            <div className={styles.footerLinkGroup}>
              <h4>About</h4>
              <Link href="/about">Our Story</Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/faq">FAQ</Link>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            © {new Date().getFullYear()} CookCraft. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
