'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from './recipe-finder.module.css';

// Define the recipe data type
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
  }
];

// Define question types
type Question = {
  id: string;
  text: string;
  options: {
    value: string;
    label: string;
  }[];
};

// Define our questions
const questions: Question[] = [
  {
    id: 'mealType',
    text: 'What type of meal are you looking for?',
    options: [
      { value: 'breakfast', label: 'Breakfast' },
      { value: 'lunch', label: 'Lunch' },
      { value: 'dinner', label: 'Dinner' },
      { value: 'snack', label: 'Snack' },
      { value: 'dessert', label: 'Dessert' },
      { value: 'any', label: 'Any meal type' }
    ]
  },
  {
    id: 'prepTime',
    text: 'How much time do you have to cook?',
    options: [
      { value: 'under10', label: 'Under 10 minutes' },
      { value: 'under20', label: 'Under 20 minutes' },
      { value: 'under30', label: 'Under 30 minutes' },
      { value: 'any', label: 'No time restrictions' }
    ]
  },
  {
    id: 'difficulty',
    text: 'What\'s your cooking skill level?',
    options: [
      { value: 'beginner', label: 'Beginner - I\'m just starting out' },
      { value: 'intermediate', label: 'Intermediate - I know the basics' },
      { value: 'any', label: 'Any difficulty level is fine' }
    ]
  },
  {
    id: 'restrictions',
    text: 'Do you have any dietary restrictions?',
    options: [
      { value: 'none', label: 'No restrictions' },
      { value: 'vegetarian', label: 'Vegetarian' },
      { value: 'gluten-free', label: 'Gluten-free' },
    ]
  }
];

export default function RecipeFinder() {
  // Current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Answers storage
  const [answers, setAnswers] = useState<Record<string, string>>({});
  // Whether we're showing results
  const [showResults, setShowResults] = useState(false);
  // Filtered recipes
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeType[]>([]);

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  // Handle selecting an option
  const handleOptionSelect = (value: string) => {
    // Store the answer
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    // Move to next question or show results
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question completed, filter recipes and show results
      const results = filterRecipes(newAnswers);
      setFilteredRecipes(results);
      setShowResults(true);
    }
  };

  // Handle going back to previous question
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Function to filter recipes based on answers
  const filterRecipes = (currentAnswers: Record<string, string>) => {
    return recipes.filter(recipe => {
      // Filter by meal type
      if (currentAnswers.mealType !== 'any' && !recipe.mealType.includes(currentAnswers.mealType)) {
        return false;
      }

      // Filter by prep time
      if (currentAnswers.prepTime === 'under10' && recipe.prepTime > 10) {
        return false;
      } else if (currentAnswers.prepTime === 'under20' && recipe.prepTime > 20) {
        return false;
      } else if (currentAnswers.prepTime === 'under30' && recipe.prepTime > 30) {
        return false;
      }

      // Filter by difficulty
      if (currentAnswers.difficulty !== 'any' && recipe.difficulty !== currentAnswers.difficulty) {
        return false;
      }

      // Filter by dietary restrictions
      if (currentAnswers.restrictions === 'vegetarian' && !recipe.restrictions.some(r => r.includes('vegetarian'))) {
        return false;
      } else if (currentAnswers.restrictions === 'gluten-free' && !recipe.restrictions.some(r => r.includes('gluten-free'))) {
        return false;
      }

      return true;
    });
  };

  // Reset the finder
  const resetFinder = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

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

  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.container}>
        <section className={styles.finderSection}>
          <div className={styles.contentWrapper}>
            {!showResults ? (
              <>
                <h1 className={styles.title}>Find Your Perfect Recipe</h1>
                <p className={styles.subtitle}>
                  Answer a few questions to discover recipes that match your preferences!
                </p>
                
                <div className={styles.questionCard}>
                  <div className={styles.progressContainer}>
                    <div 
                      className={styles.progressBar} 
                      style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                  
                  <h2 className={styles.questionText}>{currentQuestion.text}</h2>
                  
                  <div className={styles.optionsContainer}>
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.value}
                        className={styles.optionButton}
                        onClick={() => handleOptionSelect(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  
                  {currentQuestionIndex > 0 && (
                    <button className={styles.backButton} onClick={handleBack}>
                      &larr; Back
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className={styles.resultsHeader}>
                  <h1 className={styles.title}>Your Recipe Matches</h1>
                  <button className={styles.resetButton} onClick={resetFinder}>
                    Start Over
                  </button>
                </div>
                
                {filteredRecipes.length > 0 ? (
                  <div className={styles.recipeGrid}>
                    {filteredRecipes.map((recipe) => (
                      <Link href={`/recipes/${recipe.id}`} key={recipe.id} className={styles.recipeCard}>
                        <div 
                          className={styles.recipeImage} 
                          style={{ backgroundImage: `url(${recipe.image})` }}
                        ></div>
                        <div className={styles.recipeContent}>
                          <div className={styles.recipeMeta}>
                            <span className={`${styles.difficultyBadge} ${getDifficultyClass(recipe.difficulty)}`}>
                              {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                            </span>
                            <span className={styles.prepTime}>{recipe.prepTime} min</span>
                          </div>
                          <h3 className={styles.recipeTitle}>{recipe.title}</h3>
                          <p className={styles.recipeDescription}>{recipe.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noResults}>
                    <div className={styles.noResultsIcon}>🥣</div>
                    <h2>No recipes match your criteria</h2>
                    <p>Try adjusting your preferences to see more recipes.</p>
                    <button className={styles.ctaButton} onClick={resetFinder}>
                      Try Again
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
} 