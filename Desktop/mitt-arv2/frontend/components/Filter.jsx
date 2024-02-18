export const filterRecipes = (recipes, searchTerm, selectedCategories) => {
  return recipes.filter(recipe => {
    const matchesSearchTerm = recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(recipe.strCategory);
    return matchesSearchTerm && matchesCategories;
  });
};
