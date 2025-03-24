'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import styles from './recipe.module.css';

// Recipe Type
type RecipeType = {
  id: string;
  title: string;
  image: string;
  prepTime: number;
  cookTime?: number;
  totalTime?: number;
  servings: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  mealType: string[];
  ingredients: string[];
  instructions: string[];
  tips?: string[];
  restrictions: string[];
  description: string;
};

// Sample recipe data
const recipes: RecipeType[] = [
  {
    id: 'easy-pizza-bagels',
    title: 'Easy Pizza Bagels',
    image: '/images/pizza-bagels.jpg',
    prepTime: 5,
    cookTime: 10,
    totalTime: 15,
    servings: 4,
    difficulty: 'beginner',
    mealType: ['lunch', 'dinner', 'snack'],
    ingredients: [
      '4 plain bagels, halved',
      '1 cup pizza sauce or marinara sauce',
      '2 cups shredded mozzarella cheese',
      '1/2 cup pepperoni slices (optional)',
      '1/4 cup sliced bell peppers (optional)',
      '1/4 cup sliced black olives (optional)',
      '1 teaspoon dried oregano',
      '1 teaspoon dried basil'
    ],
    instructions: [
      'Preheat the oven to 375°F (190°C).',
      'Place the bagel halves cut side up on a baking sheet.',
      'Spread 2 tablespoons of pizza sauce on each bagel half.',
      'Sprinkle each with shredded mozzarella cheese.',
      'Add your favorite toppings like pepperoni, bell peppers, or olives.',
      'Sprinkle with dried oregano and basil.',
      'Bake for 8-10 minutes until the cheese is melted and bubbly.',
      'Let cool for 2 minutes before serving.'
    ],
    tips: [
      'Try different types of bagels like whole wheat or everything bagels for different flavors.',
      'For a vegetarian version, skip the pepperoni and add more veggies.',
      'Use leftover chicken, ham, or ground beef as alternative toppings.'
    ],
    restrictions: ['vegetarian-optional'],
    description: 'Quick, customizable mini pizzas made on bagels'
  },
  {
    id: 'simple-pasta-salad',
    title: 'Simple Pasta Salad',
    image: '/images/pasta-salad.jpg',
    prepTime: 10,
    cookTime: 10,
    totalTime: 20,
    servings: 6,
    difficulty: 'beginner',
    mealType: ['lunch', 'dinner', 'side'],
    ingredients: [
      '8 oz rotini pasta',
      '1 cup cherry tomatoes, halved',
      '1 cucumber, diced',
      '1/2 cup bell peppers, diced',
      '1/4 cup red onion, finely diced',
      '1/2 cup black olives, sliced',
      '1/2 cup feta cheese, crumbled',
      '1/4 cup Italian dressing',
      '1 tablespoon olive oil',
      'Salt and pepper to taste',
      '1 teaspoon dried oregano'
    ],
    instructions: [
      'Cook pasta according to package directions until al dente.',
      'Drain pasta and rinse under cold water to cool.',
      'In a large bowl, combine cooled pasta, tomatoes, cucumber, bell peppers, red onion, and black olives.',
      'Add Italian dressing and olive oil, then toss to coat.',
      'Gently fold in feta cheese.',
      'Season with salt, pepper, and oregano.',
      'Refrigerate for at least 30 minutes before serving to allow flavors to blend.'
    ],
    tips: [
      'This salad tastes even better the next day after the flavors have fully combined.',
      'Add grilled chicken or shrimp to make it a complete meal.',
      'Use whole wheat pasta for added fiber and nutrition.'
    ],
    restrictions: ['vegetarian'],
    description: 'Colorful and refreshing pasta with vegetables'
  },
  {
    id: 'chocolate-mug-cake',
    title: 'Chocolate Mug Cake',
    image: '/images/mug-cake.jpg',
    prepTime: 2,
    cookTime: 1.5,
    totalTime: 3.5,
    servings: 1,
    difficulty: 'beginner',
    mealType: ['dessert'],
    ingredients: [
      '4 tablespoons all-purpose flour',
      '2 tablespoons unsweetened cocoa powder',
      '2 tablespoons sugar',
      '1/4 teaspoon baking powder',
      'Pinch of salt',
      '5 tablespoons milk',
      '2 tablespoons vegetable oil',
      '1/4 teaspoon vanilla extract',
      '1 tablespoon chocolate chips (optional)'
    ],
    instructions: [
      'In a microwave-safe mug, mix flour, cocoa powder, sugar, baking powder, and salt.',
      'Add milk, vegetable oil, and vanilla extract. Stir until smooth with no lumps.',
      'Sprinkle chocolate chips on top (if using).',
      'Microwave on high for 90 seconds. The cake may still look slightly moist on top but will be cooked through.',
      'Let cool for 1 minute before enjoying. Be careful, it will be hot!'
    ],
    tips: [
      'Don\'t overcook or the cake will become tough. Start with 70 seconds if your microwave is powerful.',
      'Add a scoop of ice cream on top for an extra treat.',
      'Mix in 1 tablespoon of peanut butter before cooking for a chocolate-peanut butter version.'
    ],
    restrictions: ['vegetarian'],
    description: 'Delicious single-serving cake in minutes'
  },
  {
    id: 'homemade-smoothie-bowl',
    title: 'Homemade Smoothie Bowl',
    image: '/images/smoothie-bowl.jpg',
    prepTime: 10,
    servings: 1,
    difficulty: 'intermediate',
    mealType: ['breakfast', 'snack'],
    ingredients: [
      '1 frozen banana',
      '1 cup frozen mixed berries',
      '1/4 cup Greek yogurt',
      '1/4 cup milk or plant-based milk',
      '1 tablespoon honey or maple syrup',
      'Toppings: granola, fresh fruit, coconut flakes, chia seeds'
    ],
    instructions: [
      'Add frozen banana, berries, yogurt, milk, and honey to a blender.',
      'Blend until smooth, stopping to scrape down the sides as needed. The mixture should be thick.',
      'If mixture is too thick, add a little more milk. If too thin, add more frozen fruit.',
      'Pour into a bowl and add toppings of your choice.',
      'Arrange toppings in a decorative pattern for an Instagram-worthy breakfast!'
    ],
    tips: [
      'Freeze banana chunks ahead of time for a thicker smoothie bowl.',
      'Use a powerful blender or food processor for best results.',
      'For dairy-free version, use coconut yogurt and plant-based milk.'
    ],
    restrictions: ['vegetarian', 'gluten-free-optional'],
    description: 'Nutritious and Instagram-worthy breakfast bowl'
  }
];

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [imageError, setImageError] = useState(false);
  const [suggestionImageErrors, setSuggestionImageErrors] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    // In a real app, this would be an API call
    const foundRecipe = recipes.find(recipe => recipe.id === id);
    if (foundRecipe) {
      setRecipe(foundRecipe);
    }
    setLoading(false);
  }, [id]);

  // Get difficulty badge class
  const getDifficultyClass = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner':
        return styles.beginner;
      case 'intermediate':
        return styles.intermediate;
      case 'advanced':
        return styles.advanced;
      default:
        return '';
    }
  };

  // Handle main image error
  const handleMainImageError = () => {
    setImageError(true);
  };

  // Get main image URL with fallback
  const getMainImageUrl = () => {
    if (imageError || !recipe) {
      // Return placeholder for errored images
      return `https://via.placeholder.com/1200x400/A7D1F0/000000?text=${encodeURIComponent(recipe?.title || 'Recipe Image')}`;
    }
    return recipe.image;
  };

  // Handle suggestion image error
  const handleSuggestionImageError = (recipeId: string) => {
    setSuggestionImageErrors(prev => ({
      ...prev,
      [recipeId]: true
    }));
  };

  // Get suggestion image URL with fallback
  const getSuggestionImageUrl = (suggestion: RecipeType) => {
    if (suggestionImageErrors[suggestion.id]) {
      // Return placeholder for errored images
      return `https://via.placeholder.com/300x200/A7D1F0/000000?text=${encodeURIComponent(suggestion.title)}`;
    }
    return suggestion.image;
  };

  if (loading) {
    return (
      <main className={styles.main}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.loading}>Loading recipe...</div>
        </div>
      </main>
    );
  }

  if (!recipe) {
    return (
      <main className={styles.main}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h1>Recipe Not Found</h1>
            <p>Sorry, we couldn't find the recipe you're looking for.</p>
            <Link href="/recipes" className={styles.backLink}>Browse All Recipes</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      
      <main className={styles.main}>
        <div 
          className={styles.recipeHeader} 
          style={{ backgroundImage: `url(${getMainImageUrl()})` }}
          onError={handleMainImageError}
        >
          <div className={styles.headerOverlay}>
            <div className={styles.headerContent}>
              <h1 className={styles.recipeTitle}>{recipe.title}</h1>
              <p className={styles.recipeDescription}>{recipe.description}</p>
              
              <div className={styles.recipeDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}>⏱️</span>
                  <span className={styles.detailLabel}>Prep Time</span>
                  <span className={styles.detailValue}>{recipe.prepTime} min</span>
                </div>
                
                {recipe.cookTime && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>🍳</span>
                    <span className={styles.detailLabel}>Cook Time</span>
                    <span className={styles.detailValue}>{recipe.cookTime} min</span>
                  </div>
                )}
                
                {recipe.totalTime && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>⌛</span>
                    <span className={styles.detailLabel}>Total Time</span>
                    <span className={styles.detailValue}>{recipe.totalTime} min</span>
                  </div>
                )}
                
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}>👥</span>
                  <span className={styles.detailLabel}>Servings</span>
                  <span className={styles.detailValue}>{recipe.servings}</span>
                </div>
                
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}>📊</span>
                  <span className={styles.detailLabel}>Difficulty</span>
                  <span className={`${styles.difficultyBadge} ${getDifficultyClass(recipe.difficulty)}`}>
                    {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.recipeContent}>
          <div className={styles.recipeSection}>
            <h2 className={styles.sectionTitle}>Ingredients</h2>
            <ul className={styles.ingredientsList}>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className={styles.ingredientItem}>
                  <span className={styles.ingredientCheck}>
                    <input type="checkbox" id={`ingredient-${index}`} />
                    <label htmlFor={`ingredient-${index}`}>{ingredient}</label>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.recipeSection}>
            <h2 className={styles.sectionTitle}>Instructions</h2>
            <ol className={styles.instructionsList}>
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className={styles.instructionItem}>
                  <div className={styles.instructionNumber}>{index + 1}</div>
                  <div className={styles.instructionText}>{instruction}</div>
                </li>
              ))}
            </ol>
          </div>
          
          {recipe.tips && recipe.tips.length > 0 && (
            <div className={styles.recipeSection}>
              <h2 className={styles.sectionTitle}>Cooking Tips</h2>
              <div className={styles.tipsList}>
                {recipe.tips.map((tip, index) => (
                  <div key={index} className={styles.tipItem}>
                    <div className={styles.tipIcon}>💡</div>
                    <p>{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className={styles.shareSection}>
            <h3 className={styles.shareTitle}>Enjoy this recipe? Share it!</h3>
            <div className={styles.shareButtons}>
              <button className={styles.shareButton}>📱 Share</button>
              <button className={styles.printButton}>🖨️ Print Recipe</button>
            </div>
          </div>
          
          <div className={styles.suggestionsSection}>
            <h2 className={styles.sectionTitle}>You Might Also Like</h2>
            <div className={styles.suggestionCards}>
              {recipes
                .filter(r => r.id !== recipe.id)
                .slice(0, 3)
                .map(suggestion => (
                  <Link 
                    href={`/recipes/${suggestion.id}`} 
                    key={suggestion.id} 
                    className={styles.suggestionCard}
                  >
                    <div className={styles.suggestionImageContainer}>
                      <div 
                        className={styles.suggestionImage} 
                        style={{ backgroundImage: `url(${getSuggestionImageUrl(suggestion)})` }}
                        onError={() => handleSuggestionImageError(suggestion.id)}
                      ></div>
                    </div>
                    <div className={styles.suggestionContent}>
                      <h3>{suggestion.title}</h3>
                      <span className={`${styles.difficultyBadge} ${getDifficultyClass(suggestion.difficulty)}`}>
                        {suggestion.difficulty.charAt(0).toUpperCase() + suggestion.difficulty.slice(1)}
                      </span>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 