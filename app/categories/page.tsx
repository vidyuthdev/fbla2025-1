'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import styles from './categories.module.css';

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
    ingredients: ['flour', 'sugar', 'cocoa powder', 'milk', 'oil'],
    restrictions: ['vegetarian'],
    description: 'Quick individual chocolate cake made in a mug'
  },
  {
    id: 'fruit-smoothie-bowl',
    title: 'Fruit Smoothie Bowl',
    image: '/images/smoothie-bowl.jpg',
    prepTime: 10,
    difficulty: 'beginner',
    mealType: ['breakfast', 'snack'],
    ingredients: ['frozen berries', 'banana', 'yogurt', 'granola', 'honey'],
    restrictions: ['vegetarian', 'gluten-free-optional'],
    description: 'Thick, creamy smoothie topped with fresh fruits and granola'
  },
  {
    id: 'avocado-toast',
    title: 'Avocado Toast',
    image: '/images/avocado-toast.jpg',
    prepTime: 10,
    difficulty: 'beginner',
    mealType: ['breakfast', 'lunch', 'snack'],
    ingredients: ['bread', 'avocado', 'lemon juice', 'salt', 'red pepper flakes'],
    restrictions: ['vegetarian', 'vegan-optional'],
    description: 'Simple and nutritious toast topped with mashed avocado'
  },
  {
    id: 'vegetable-quesadilla',
    title: 'Vegetable Quesadilla',
    image: '/images/quesadilla.jpg',
    prepTime: 15,
    difficulty: 'beginner',
    mealType: ['lunch', 'dinner'],
    ingredients: ['tortillas', 'cheese', 'bell peppers', 'onions', 'salsa'],
    restrictions: ['vegetarian'],
    description: 'Crispy tortilla filled with melted cheese and vegetables'
  },
  {
    id: 'homemade-trail-mix',
    title: 'Homemade Trail Mix',
    image: '/images/trail-mix.jpg',
    prepTime: 5,
    difficulty: 'beginner',
    mealType: ['snack'],
    ingredients: ['nuts', 'dried fruits', 'chocolate chips', 'pretzels'],
    restrictions: ['vegetarian', 'vegan-optional', 'gluten-free-optional'],
    description: 'Customizable mix of nuts, dried fruits and treats'
  },
  {
    id: 'yogurt-parfait',
    title: 'Yogurt Parfait',
    image: '/images/yogurt-parfait.jpg',
    prepTime: 10,
    difficulty: 'beginner',
    mealType: ['breakfast', 'snack', 'dessert'],
    ingredients: ['yogurt', 'granola', 'berries', 'honey'],
    restrictions: ['vegetarian', 'gluten-free-optional'],
    description: 'Layered yogurt with fruits and crunchy granola'
  }
];

// Define our categories
const categories = [
  { id: 'breakfast', name: 'Breakfast', icon: '🍳' },
  { id: 'lunch', name: 'Lunch', icon: '🥪' },
  { id: 'dinner', name: 'Dinner', icon: '🍽️' },
  { id: 'snack', name: 'Snacks', icon: '🥨' },
  { id: 'dessert', name: 'Desserts', icon: '🍰' },
  { id: 'side', name: 'Side Dishes', icon: '🥗' }
];

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState<string>('breakfast');
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  // Filter recipes by the active category
  const filteredRecipes = recipes.filter(recipe => 
    recipe.mealType.includes(activeCategory)
  );

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  // Get style for difficulty label
  const getDifficultyClass = (difficulty: string): string => {
    switch(difficulty) {
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
    <div className={styles.pageContainer}>
      <Navbar />
      
      <main className={styles.main}>
        <section className={styles.categoryHeader}>
          <h1>Recipe Categories</h1>
          <p>Browse recipes by category to find exactly what you're looking for.</p>
        </section>
        
        <section className={styles.categoryNav}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${activeCategory === category.id ? styles.activeCategory : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </section>
        
        <section className={styles.recipeGrid}>
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
              <p>No recipes found in this category. Try selecting a different category.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
} 