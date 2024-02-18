import React from 'react';
import { useEffect } from 'react';

function Bookmarks({ bookmarks }) {
  console.log('Bookmarks component rendered with bookmarks:', bookmarks);
  useEffect(() => {
    console.log('Bookmarks:', bookmarks);
  }, [bookmarks]);
  return (
    <div>
      <h2>Bookmarked Recipes</h2>
      <div>
        {bookmarks.map(recipe => (
          <div key={recipe.idMeal}>
            <h3>{recipe.strMeal}</h3>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default Bookmarks;