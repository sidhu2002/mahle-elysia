

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css'

function RecipeDetails() {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        if (data.meals) {
          setRecipe(data.meals[0]);
        } else {
          console.error('Recipe not found');
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipeDetails();

    // Cleanup function
    return () => {
      setRecipe(null);
    };
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p>{recipe.strInstructions}</p>
      
    </div>
  );
}

export default RecipeDetails;
