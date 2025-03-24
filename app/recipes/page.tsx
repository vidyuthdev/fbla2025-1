'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import styles from './recipes.module.css';

// Recipe Type
type RecipeType = {
  id: string;
  title: string;
  image: string;
  prepTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  mealType: string[];
  ingredients: string[];
  restrictions: string[];
  description: string;
};

// Sample recipe data
const recipes: RecipeType[] = [
  {
    id: 'easy-pizza-bagels',
    title: 'Easy Pizza Bagels',
    image: '/images/pizza-bagels.jpg',
    prepTime: 15,
    difficulty: 'beginner',
    mealType: ['lunch', 'dinner', 'snack'],
    ingredients: ['bagels', 'tomato sauce', 'cheese', 'pepperoni'],
    restrictions: ['vegetarian-optional'],
    description: 'Quick, customizable mini pizzas made on bagels'
  },
  {
    id: 'simple-pasta-salad',
    title: 'Simple Pasta Salad',
    image: '/images/pasta-salad.jpg',
    prepTime: 20,
    difficulty: 'beginner',
    mealType: ['lunch', 'dinner', 'side'],
    ingredients: ['pasta', 'cucumber', 'tomatoes', 'cheese', 'dressing'],
    restrictions: ['vegetarian'],
    description: 'Colorful and refreshing pasta with vegetables'
  },
  {
    id: 'chocolate-mug-cake',
    title: 'Chocolate Mug Cake',
    image: '/images/mug-cake.jpg',
    prepTime: 5,
    difficulty: 'beginner',
    mealType: ['dessert'],
    ingredients: ['flour', 'sugar', 'cocoa powder', 'milk', 'egg'],
    restrictions: ['vegetarian'],
    description: 'Delicious single-serving cake in minutes'
  },
  {
    id: 'homemade-smoothie-bowl',
    title: 'Homemade Smoothie Bowl',
    image: '/images/smoothie-bowl.jpg',
    prepTime: 10,
    difficulty: 'intermediate',
    mealType: ['breakfast', 'snack'],
    ingredients: ['banana', 'berries', 'yogurt', 'granola', 'honey'],
    restrictions: ['vegetarian', 'gluten-free-optional'],
    description: 'Nutritious and Instagram-worthy breakfast bowl'
  },
  {
    id: 'simple-quesadillas',
    title: 'Simple Quesadillas',
    image: '/images/quesadillas.jpg',
    prepTime: 15,
    difficulty: 'beginner',
    mealType: ['lunch', 'dinner', 'snack'],
    ingredients: ['tortillas', 'cheese', 'bell peppers', 'onions', 'sour cream'],
    restrictions: ['vegetarian'],
    description: 'Easy Mexican-inspired quesadillas with melted cheese'
  },
  {
    id: 'overnight-oats',
    title: 'Overnight Oats',
    image: '/images/overnight-oats.jpg',
    prepTime: 10,
    difficulty: 'beginner',
    mealType: ['breakfast'],
    ingredients: ['oats', 'milk', 'yogurt', 'honey', 'fruit'],
    restrictions: ['vegetarian', 'gluten-free-optional'],
    description: 'No-cook breakfast prepared the night before'
  },
  {
    id: 'chicken-rice-bowl',
    title: 'Simple Chicken Rice Bowl',
    image: '/images/chicken-rice-bowl.jpg',
    prepTime: 30,
    difficulty: 'intermediate',
    mealType: ['lunch', 'dinner'],
    ingredients: ['chicken', 'rice', 'vegetables', 'soy sauce', 'sesame oil'],
    restrictions: [],
    description: 'Protein-packed bowl with lean chicken and veggies'
  },
  {
    id: 'homemade-trail-mix',
    title: 'Homemade Trail Mix',
    image: '/images/trail-mix.jpg',
    prepTime: 5,
    difficulty: 'beginner',
    mealType: ['snack'],
    ingredients: ['nuts', 'dried fruit', 'cereal', 'chocolate chips', 'pretzels'],
    restrictions: ['vegetarian', 'gluten-free-optional'],
    description: 'Customizable energy-boosting snack mix'
  },
  {
    id: 'fruit-parfait',
    title: 'Fruit and Yogurt Parfait',
    image: '/images/fruit-parfait.jpg',
    prepTime: 10,
    difficulty: 'beginner',
    mealType: ['breakfast', 'snack', 'dessert'],
    ingredients: ['yogurt', 'granola', 'berries', 'banana', 'honey'],
    restrictions: ['vegetarian', 'gluten-free-optional'],
    description: 'Layered yogurt, fruit, and granola parfait'
  },
  {
    id: 'avocado-toast',
    title: 'Avocado Toast',
    image: '/images/avocado-toast.jpg',
    prepTime: 10,
    difficulty: 'beginner',
    mealType: ['breakfast', 'snack'],
    ingredients: ['bread', 'avocado', 'lemon', 'salt', 'red pepper flakes'],
    restrictions: ['vegetarian', 'vegan'],
    description: 'Simple and nutritious avocado on toast'
  },
  {
    id: 'veggie-wrap',
    title: 'Veggie Wrap',
    image: '/images/veggie-wrap.jpg',
    prepTime: 15,
    difficulty: 'beginner',
    mealType: ['lunch', 'snack'],
    ingredients: ['tortilla', 'hummus', 'cucumber', 'carrot', 'lettuce', 'bell pepper'],
    restrictions: ['vegetarian', 'vegan-optional'],
    description: 'Fresh vegetable wrap with creamy hummus'
  },
  {
    id: 'mac-and-cheese',
    title: 'Easy Mac and Cheese',
    image: '/images/mac-and-cheese.jpg',
    prepTime: 20,
    difficulty: 'intermediate',
    mealType: ['lunch', 'dinner', 'side'],
    ingredients: ['pasta', 'butter', 'milk', 'cheddar cheese', 'salt', 'pepper'],
    restrictions: ['vegetarian'],
    description: 'Creamy homemade macaroni and cheese'
  }
];

export default function AllRecipes() {
  const [filter, setFilter] = useState({
    search: '',
    mealType: '',
    difficulty: '',
    prepTime: '',
    dietary: ''
  });
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const filterRecipes = () => {
    return recipes.filter(recipe => {
      // Search filter
      if (filter.search && !recipe.title.toLowerCase().includes(filter.search.toLowerCase()) &&
          !recipe.description.toLowerCase().includes(filter.search.toLowerCase())) {
        return false;
      }
      
      // Meal type filter
      if (filter.mealType && !recipe.mealType.includes(filter.mealType)) {
        return false;
      }
      
      // Difficulty filter
      if (filter.difficulty && recipe.difficulty !== filter.difficulty) {
        return false;
      }
      
      // Prep time filter
      if (filter.prepTime === 'quick' && recipe.prepTime > 15) {
        return false;
      } else if (filter.prepTime === 'medium' && (recipe.prepTime <= 15 || recipe.prepTime > 30)) {
        return false;
      } else if (filter.prepTime === 'long' && recipe.prepTime <= 30) {
        return false;
      }
      
      // Dietary restrictions filter
      if (filter.dietary === 'vegetarian' && !recipe.restrictions.some(r => r.includes('vegetarian'))) {
        return false;
      } else if (filter.dietary === 'gluten-free' && !recipe.restrictions.some(r => r.includes('gluten-free'))) {
        return false;
      }
      
      return true;
    });
  };

  const filteredRecipes = filterRecipes();

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

  const handleFilterChange = (name: string, value: string) => {
    setFilter({
      ...filter,
      [name]: value
    });
  };

  const clearFilters = () => {
    setFilter({
      search: '',
      mealType: '',
      difficulty: '',
      prepTime: '',
      dietary: ''
    });
  };

  // Handle image error
  const handleImageError = (recipeId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [recipeId]: true
    }));
  };

  // Get image URL with fallback
  const getImageUrl = (recipe: RecipeType) => {
    if (imageErrors[recipe.id]) {
      // Return placeholder for errored images
      return `https://via.placeholder.com/300x200/A7D1F0/000000?text=${encodeURIComponent(recipe.title)}`;
    }
    return recipe.image;
  };

  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>All Recipes</h1>
          <p className={styles.subtitle}>Discover simple, delicious recipes perfect for young cooks</p>
        </header>
        
        <section className={styles.filterSection}>
          <div className={styles.filterBar}>
            <div className={styles.searchBox}>
              <input 
                type="text" 
                placeholder="Search recipes..." 
                value={filter.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.filterOptions}>
              <div className={styles.filterGroup}>
                <label htmlFor="mealType">Meal Type</label>
                <select 
                  id="mealType" 
                  value={filter.mealType}
                  onChange={(e) => handleFilterChange('mealType', e.target.value)}
                >
                  <option value="">All Meals</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                  <option value="dessert">Dessert</option>
                  <option value="side">Side Dish</option>
                </select>
              </div>
              
              <div className={styles.filterGroup}>
                <label htmlFor="difficulty">Difficulty</label>
                <select 
                  id="difficulty" 
                  value={filter.difficulty}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                >
                  <option value="">Any Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div className={styles.filterGroup}>
                <label htmlFor="prepTime">Prep Time</label>
                <select 
                  id="prepTime" 
                  value={filter.prepTime}
                  onChange={(e) => handleFilterChange('prepTime', e.target.value)}
                >
                  <option value="">Any Time</option>
                  <option value="quick">Quick (under 15 min)</option>
                  <option value="medium">Medium (15-30 min)</option>
                  <option value="long">Longer (30+ min)</option>
                </select>
              </div>
              
              <div className={styles.filterGroup}>
                <label htmlFor="dietary">Dietary</label>
                <select 
                  id="dietary" 
                  value={filter.dietary}
                  onChange={(e) => handleFilterChange('dietary', e.target.value)}
                >
                  <option value="">All Diets</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="gluten-free">Gluten-Free</option>
                </select>
              </div>
              
              <button 
                className={styles.clearButton}
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
          
          <div className={styles.resultsCount}>
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
          </div>
        </section>
        
        <section className={styles.recipesSection}>
          <div className={styles.recipeGrid}>
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(recipe => (
                <Link href={`/recipes/${recipe.id}`} key={recipe.id} className={styles.recipeCard}>
                  <div className={styles.recipeImageContainer}>
                    <div 
                      className={styles.recipeImage} 
                      style={{ backgroundImage: `url(${getImageUrl(recipe)})` }}
                      onError={() => handleImageError(recipe.id)}
                    ></div>
                    <span className={`${styles.recipeDifficulty} ${getDifficultyClass(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                  <div className={styles.recipeInfo}>
                    <h3 className={styles.recipeTitle}>{recipe.title}</h3>
                    <p className={styles.recipeDescription}>{recipe.description}</p>
                    <div className={styles.recipeDetails}>
                      <span className={styles.prepTime}>{recipe.prepTime} min</span>
                      <div className={styles.mealTypes}>
                        {recipe.mealType.map(type => (
                          <span key={type} className={styles.mealType}>{type}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className={styles.noRecipes}>
                <p>No recipes found with the selected filters. Try adjusting your search criteria.</p>
                <button className={styles.resetButton} onClick={clearFilters}>Reset Filters</button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
} 