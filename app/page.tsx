import Link from 'next/link';
import Image from 'next/image';
import Navbar from './components/Navbar';
import SchoolPartners from './components/SchoolPartners';
import styles from './page.module.css';
import childCookingImage from '../public/images/child-cooking.jpg';

export default function Home() {
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
          
          <div className={styles.recipes}>
            <Link href="/recipes/1" className={styles.recipeCard}>
              <div className={styles.recipeImage} style={{backgroundImage: `url('/images/recipes/pancakes.jpg')`}}></div>
              <div className={styles.recipeContent}>
                <div>
                  <span className={`${styles.difficultyBadge} ${styles.beginner}`}>Beginner</span>
                  <span className={styles.prepTime}>20 mins</span>
                </div>
                <h3>Fluffy Pancakes</h3>
                <p>Easy pancakes with fresh berries that anyone can make!</p>
              </div>
            </Link>
            
            <Link href="/recipes/2" className={styles.recipeCard}>
              <div className={styles.recipeImage} style={{backgroundImage: `url('/images/recipes/pasta.jpg')`}}></div>
              <div className={styles.recipeContent}>
                <div>
                  <span className={`${styles.difficultyBadge} ${styles.intermediate}`}>Intermediate</span>
                  <span className={styles.prepTime}>30 mins</span>
                </div>
                <h3>Veggie Pasta</h3>
                <p>Colorful pasta loaded with tasty vegetables</p>
              </div>
            </Link>
            
            <Link href="/recipes/3" className={styles.recipeCard}>
              <div className={styles.recipeImage} style={{backgroundImage: `url('/images/recipes/cookies.jpg')`}}></div>
              <div className={styles.recipeContent}>
                <div>
                  <span className={`${styles.difficultyBadge} ${styles.beginner}`}>Beginner</span>
                  <span className={styles.prepTime}>25 mins</span>
                </div>
                <h3>Chocolate Chip Cookies</h3>
                <p>Classic cookies that are crispy outside, chewy inside</p>
              </div>
            </Link>
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
            KidChef<span className={styles.logoAccent}>🍳</span>
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
            © {new Date().getFullYear()} KidChef. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
