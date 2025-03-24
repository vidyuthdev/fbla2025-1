import Link from 'next/link';
import Navbar from './components/Navbar';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.title}>Simple Recipes for <span className={styles.highlight}>Young Cooks</span></h1>
          <p className={styles.subtitle}>
            Learn to cook delicious meals with easy-to-follow recipes designed for middle and high school students
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
          <div className={styles.heroImage}></div>
        </div>
      </section>

      <section className={styles.featuredCategories}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>What do you want to cook?</h2>
          <div className={styles.categories}>
            <Link href="/categories/breakfast" className={styles.categoryCard}>
              <div className={styles.categoryIcon}>🍳</div>
              <h3>Breakfast</h3>
              <p>Start your day right</p>
            </Link>
            <Link href="/categories/lunch" className={styles.categoryCard}>
              <div className={styles.categoryIcon}>🥪</div>
              <h3>Lunch</h3>
              <p>Quick & tasty meals</p>
            </Link>
            <Link href="/categories/dinner" className={styles.categoryCard}>
              <div className={styles.categoryIcon}>🍝</div>
              <h3>Dinner</h3>
              <p>Impressive easy dinners</p>
            </Link>
            <Link href="/categories/snacks" className={styles.categoryCard}>
              <div className={styles.categoryIcon}>🍿</div>
              <h3>Snacks</h3>
              <p>Fun between meals</p>
            </Link>
            <Link href="/categories/desserts" className={styles.categoryCard}>
              <div className={styles.categoryIcon}>🧁</div>
              <h3>Desserts</h3>
              <p>Sweet treats</p>
            </Link>
            <Link href="/categories/drinks" className={styles.categoryCard}>
              <div className={styles.categoryIcon}>🥤</div>
              <h3>Drinks</h3>
              <p>Refreshing beverages</p>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.recipeFinderSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.finderContent}>
            <h2 className={styles.sectionTitle}>Not sure what to cook?</h2>
            <p className={styles.sectionSubtitle}>
              Answer a few simple questions and we'll help you find the perfect recipe for you!
            </p>
            <div className={styles.finderFeatures}>
              <div className={styles.finderFeature}>
                <div className={styles.featureIcon}>🔍</div>
                <h3>Based on ingredients</h3>
                <p>Use what you have</p>
              </div>
              <div className={styles.finderFeature}>
                <div className={styles.featureIcon}>⏱️</div>
                <h3>By prep time</h3>
                <p>Quick or leisurely</p>
              </div>
              <div className={styles.finderFeature}>
                <div className={styles.featureIcon}>🌟</div>
                <h3>By difficulty</h3>
                <p>Beginner to advanced</p>
              </div>
            </div>
            <Link href="/recipe-finder" className={`${styles.ctaButton} ${styles.primary}`}>
              Find Your Recipe
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
          <div className={styles.recipes}>
            <Link href="/recipes/easy-pizza-bagels" className={styles.recipeCard}>
              <div className={styles.recipeImage} style={{ backgroundImage: "url('/images/pizza-bagels.jpg')" }}></div>
              <div className={styles.recipeContent}>
                <span className={`${styles.difficultyBadge} ${styles.beginner}`}>Beginner</span>
                <span className={styles.prepTime}>15 min</span>
                <h3>Easy Pizza Bagels</h3>
                <p>Quick, customizable mini pizzas made on bagels</p>
              </div>
            </Link>
            <Link href="/recipes/simple-pasta-salad" className={styles.recipeCard}>
              <div className={styles.recipeImage} style={{ backgroundImage: "url('/images/pasta-salad.jpg')" }}></div>
              <div className={styles.recipeContent}>
                <span className={`${styles.difficultyBadge} ${styles.beginner}`}>Beginner</span>
                <span className={styles.prepTime}>20 min</span>
                <h3>Simple Pasta Salad</h3>
                <p>Colorful and refreshing pasta with vegetables</p>
              </div>
            </Link>
            <Link href="/recipes/chocolate-mug-cake" className={styles.recipeCard}>
              <div className={styles.recipeImage} style={{ backgroundImage: "url('/images/mug-cake.jpg')" }}></div>
              <div className={styles.recipeContent}>
                <span className={`${styles.difficultyBadge} ${styles.beginner}`}>Beginner</span>
                <span className={styles.prepTime}>5 min</span>
                <h3>Chocolate Mug Cake</h3>
                <p>Delicious single-serving cake in minutes</p>
              </div>
            </Link>
            <Link href="/recipes/homemade-smoothie-bowl" className={styles.recipeCard}>
              <div className={styles.recipeImage} style={{ backgroundImage: "url('/images/smoothie-bowl.jpg')" }}></div>
              <div className={styles.recipeContent}>
                <span className={`${styles.difficultyBadge} ${styles.intermediate}`}>Intermediate</span>
                <span className={styles.prepTime}>10 min</span>
                <h3>Homemade Smoothie Bowl</h3>
                <p>Nutritious and Instagram-worthy breakfast bowl</p>
              </div>
            </Link>
          </div>
          <div className={styles.viewAllContainer}>
            <Link href="/recipes" className={`${styles.viewAllButton}`}>
              View All Recipes
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.cookingTips}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Cooking Tips for Beginners</h2>
          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🔪</div>
              <h3>Knife Skills</h3>
              <p>Learn safe cutting techniques to make cooking easier and faster</p>
              <Link href="/cooking-tips/knife-skills" className={styles.tipLink}>Learn more</Link>
            </div>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>📏</div>
              <h3>Measuring</h3>
              <p>The right way to measure different ingredients for perfect results</p>
              <Link href="/cooking-tips/measuring" className={styles.tipLink}>Learn more</Link>
            </div>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🍳</div>
              <h3>Heat Control</h3>
              <p>Master the temperatures for different cooking methods</p>
              <Link href="/cooking-tips/heat-control" className={styles.tipLink}>Learn more</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLogo}>
            <span>CookCraft</span>
            <span className={styles.logoAccent}>🍳</span>
          </div>
          <p className={styles.footerTagline}>Simple Recipes for Young Cooks</p>
          <div className={styles.footerLinks}>
            <div className={styles.footerLinkGroup}>
              <h4>Explore</h4>
              <Link href="/recipes">All Recipes</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/recipe-finder">Recipe Finder</Link>
              <Link href="/cooking-tips">Cooking Tips</Link>
            </div>
            <div className={styles.footerLinkGroup}>
              <h4>Resources</h4>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/kitchen-essentials">Kitchen Essentials</Link>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} CookCraft. All rights reserved.</p>
            <p>Created for young cooks to develop culinary skills.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
