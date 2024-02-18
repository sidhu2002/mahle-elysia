import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from '../components/Pagination';
import { filterRecipes } from '../components/Filter';
import { Link } from 'react-router-dom';
import './Search.css';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    // Authentication and logout functionality
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/logout');
            console.log("Logged out successfully");
            localStorage.removeItem('token');
            localStorage.setItem('registered', 'false');
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    //to make sure user cant access the /home by changing url
    useEffect(() => {
        const checkAuth = async () => {
            const registered = localStorage.getItem('registered');
            const token = localStorage.getItem('token');
            if (!registered || !token) {
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);
    

    // Recipe search and filtering functionality
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(6);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);

    //fetching the recipe's from api
    const handleSearch = async () => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
            const data = await response.json();
            if (data.meals) {
                setRecipes(data.meals);
                setFilteredRecipes(data.meals);
            } else {
                setRecipes([]);
                setFilteredRecipes([]);
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    //filter function
    useEffect(() => {
        const filtered = filterRecipes(recipes, searchTerm, selectedCategories);
        setFilteredRecipes(filtered);
    }, [searchTerm, recipes, selectedCategories]);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    //pagination function
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleCheckboxChange = (category) => {
        const index = selectedCategories.indexOf(category);
        if (index === -1) {
            setSelectedCategories([...selectedCategories, category]);
        } else {
            const newSelectedCategories = [...selectedCategories];
            newSelectedCategories.splice(index, 1);
            setSelectedCategories(newSelectedCategories);
        }
    };

    // user can add bookmark through this function
    const handleBookmark = (recipe) => {
        setBookmarks(prevBookmarks => [...prevBookmarks, recipe]);
        console.log(bookmarks);
    };

    return (
        <div style={{backgroundColor :"#D8DDDE"}}>
            <nav className="navbar">
                <h1>Mitt Arv</h1>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <div>
            <Link to="/bookmarks" className="bookmark">My Bookmarks</Link>
            </div>
            <div className="container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search for recipes..."
                />
                <button onClick={handleSearch}>Search</button>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange('Chicken')}
                            checked={selectedCategories.includes('Chicken')}
                        />
                        Chicken
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange('Beef')}
                            checked={selectedCategories.includes('Beef')}
                        />
                        Beef
                    </label>
                    
                </div>
                <div className="recipe-container">
                    {currentRecipes.map(recipe => (
                        <div key={recipe.idMeal} className="recipe-item">
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
                            <p>{recipe.strMeal}</p>
                            <Link to={`/recipe/${recipe.idMeal}`} className="recipe-link">
                                <button>View Details</button>
                            </Link>
                            <button onClick={() => handleBookmark(recipe)}>Bookmark</button>
                        </div>
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredRecipes.length / recipesPerPage)}
                    onPageChange={paginate}
                />
            </div>
        </div>
    );
}

export default Home;
