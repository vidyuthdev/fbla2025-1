import Link from 'next/link';
import Navbar from '../components/Navbar';
import styles from './cooking-tips.module.css';

export default function CookingTips() {
  const tips = [
    {
      id: 'knife-skills',
      title: 'Knife Skills',
      icon: '🔪',
      description: 'Learn safe cutting techniques to make cooking easier and faster',
      content: [
        {
          subtitle: 'The Claw Grip',
          text: 'Curl your fingertips under your knuckles when holding food for cutting. This protects your fingers from the knife.',
          image: '/images/tips/claw-grip.jpg'
        },
        {
          subtitle: 'The Right Knife for the Job',
          text: 'A chef\'s knife is good for most cutting tasks. Use a serrated knife for bread and tomatoes, and a small paring knife for peeling and detail work.',
          image: '/images/tips/knife-types.jpg'
        },
        {
          subtitle: 'Always Cut on a Stable Surface',
          text: 'Use a cutting board placed on a flat, stable counter. Put a damp paper towel under the board to prevent it from sliding.',
          image: '/images/tips/cutting-board.jpg'
        }
      ]
    },
    {
      id: 'measuring',
      title: 'Measuring Ingredients',
      icon: '📏',
      description: 'The right way to measure different ingredients for perfect results',
      content: [
        {
          subtitle: 'Liquid vs. Dry Measuring Cups',
          text: 'Use transparent cups with a spout for liquids and flat-topped cups for dry ingredients like flour and sugar.',
          image: '/images/tips/measuring-cups.jpg'
        },
        {
          subtitle: 'How to Measure Flour',
          text: 'Spoon flour into the measuring cup (don\'t scoop directly with the cup), then level off the top with a knife.',
          image: '/images/tips/measure-flour.jpg'
        },
        {
          subtitle: 'Measuring Sticky Ingredients',
          text: 'Spray your measuring spoon or cup with a little cooking spray before measuring honey, syrup, or peanut butter to help it slide out easily.',
          image: '/images/tips/sticky-ingredients.jpg'
        }
      ]
    },
    {
      id: 'heat-control',
      title: 'Heat Control',
      icon: '🍳',
      description: 'Master the temperatures for different cooking methods',
      content: [
        {
          subtitle: 'Understanding Stove Settings',
          text: 'Low heat is for simmering and gentle cooking. Medium heat is for most cooking. High heat is for boiling and quick searing.',
          image: '/images/tips/stove-settings.jpg'
        },
        {
          subtitle: 'The Water Test for Pan Readiness',
          text: 'To test if a pan is hot enough, sprinkle a few drops of water on it. If they sizzle and dance, it\'s ready!',
          image: '/images/tips/water-test.jpg'
        },
        {
          subtitle: 'Oven Temperatures',
          text: 'Always preheat your oven before baking. Use an oven thermometer to check if your oven temperature is accurate.',
          image: '/images/tips/oven-temp.jpg'
        }
      ]
    },
    {
      id: 'kitchen-safety',
      title: 'Kitchen Safety',
      icon: '🧯',
      description: 'Essential safety tips every young cook should know',
      content: [
        {
          subtitle: 'Handle Hot Items Safely',
          text: 'Always use oven mitts or pot holders when handling hot pots, pans, or dishes. Never use wet towels as they conduct heat.',
          image: '/images/tips/oven-mitts.jpg'
        },
        {
          subtitle: 'Prevent Burns and Fires',
          text: 'Turn pot handles inward so you don\'t accidentally bump them. Keep flammable items away from the stove.',
          image: '/images/tips/pot-handles.jpg'
        },
        {
          subtitle: 'Clean Spills Immediately',
          text: 'Wipe up spills right away to prevent slips and falls. Be especially careful with oil or grease spills.',
          image: '/images/tips/clean-spills.jpg'
        }
      ]
    },
    {
      id: 'food-prep',
      title: 'Food Preparation',
      icon: '🥕',
      description: 'Techniques for preparing ingredients efficiently',
      content: [
        {
          subtitle: 'Mise en Place',
          text: 'The French term for "everything in its place." Prepare and organize all ingredients before you start cooking.',
          image: '/images/tips/mise-en-place.jpg'
        },
        {
          subtitle: 'Washing Produce',
          text: 'Rinse all fruits and vegetables under cool running water. Use a brush for firm produce like potatoes.',
          image: '/images/tips/washing-produce.jpg'
        },
        {
          subtitle: 'Uniform Cutting for Even Cooking',
          text: 'Cut ingredients into pieces of similar size so they cook at the same rate.',
          image: '/images/tips/uniform-cutting.jpg'
        }
      ]
    },
    {
      id: 'cooking-basics',
      title: 'Cooking Basics',
      icon: '🥘',
      description: 'Fundamental techniques for preparing delicious food',
      content: [
        {
          subtitle: 'Sautéing',
          text: 'Cook food quickly in a small amount of oil over medium-high heat. Keep the food moving in the pan.',
          image: '/images/tips/sauteing.jpg'
        },
        {
          subtitle: 'Boiling vs. Simmering',
          text: 'Boiling has large, rapid bubbles. Simmering has small, gentle bubbles. Many recipes call for simmering rather than boiling.',
          image: '/images/tips/boiling-simmering.jpg'
        },
        {
          subtitle: 'Taste as You Go',
          text: 'The most important cooking skill! Taste your food as you cook (when safe) and adjust seasonings as needed.',
          image: '/images/tips/taste-test.jpg'
        }
      ]
    }
  ];

  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Cooking Tips for Young Chefs</h1>
          <p className={styles.subtitle}>
            Master these essential skills to make cooking easier, safer, and more fun!
          </p>
        </header>
        
        <section className={styles.tipsOverview}>
          <div className={styles.tipsGrid}>
            {tips.map((tip) => (
              <Link key={tip.id} href={`/cooking-tips#${tip.id}`} className={styles.tipCard}>
                <div className={styles.tipIcon}>{tip.icon}</div>
                <h2>{tip.title}</h2>
                <p>{tip.description}</p>
              </Link>
            ))}
          </div>
        </section>
        
        <section className={styles.tipDetailSection}>
          {tips.map((tip) => (
            <div key={tip.id} id={tip.id} className={styles.tipDetail}>
              <div className={styles.tipDetailHeader}>
                <div className={styles.tipDetailIcon}>{tip.icon}</div>
                <h2 className={styles.tipDetailTitle}>{tip.title}</h2>
              </div>
              <p className={styles.tipDetailDescription}>{tip.description}</p>
              
              <div className={styles.tipContentList}>
                {tip.content.map((content, index) => (
                  <div key={index} className={styles.tipContentCard}>
                    <div 
                      className={styles.tipContentImage} 
                      style={{ backgroundImage: `url(${content.image})` }}
                    ></div>
                    <div className={styles.tipContentText}>
                      <h3 className={styles.tipContentTitle}>{content.subtitle}</h3>
                      <p>{content.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
        
        <section className={styles.moreResourcesSection}>
          <h2 className={styles.sectionTitle}>Want to Learn More?</h2>
          <div className={styles.resourceGrid}>
            <div className={styles.resourceCard}>
              <div className={styles.resourceIcon}>📺</div>
              <h3>Video Tutorials</h3>
              <p>Watch step-by-step cooking demonstrations for visual learners</p>
              <Link href="/video-tutorials" className={styles.resourceLink}>
                Browse Videos
              </Link>
            </div>
            <div className={styles.resourceCard}>
              <div className={styles.resourceIcon}>📚</div>
              <h3>Cooking Basics Guide</h3>
              <p>Download our free guide to cooking terminology and methods</p>
              <Link href="/downloads/cooking-basics.pdf" className={styles.resourceLink}>
                Download PDF
              </Link>
            </div>
            <div className={styles.resourceCard}>
              <div className={styles.resourceIcon}>📆</div>
              <h3>Cooking Classes</h3>
              <p>Find local and online cooking classes designed for young chefs</p>
              <Link href="/classes" className={styles.resourceLink}>
                Find Classes
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 