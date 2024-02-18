import React from 'react';

function RecipeCard({ recipe }) {
  return (
    <div className="recipe">
      <img src={recipe.imageUrl} alt={recipe.name} />
      <p>{recipe.name}</p>
    </div>
  );
}

export default RecipeCard;
