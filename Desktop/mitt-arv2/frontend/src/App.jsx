import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import RecipeDetails from '../components/RecipeDetails';
import Bookmarks from '../components/Bookmarks';


function App() {
  const [bookmarks, setBookmarks] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home setBookmarks={setBookmarks}/>} /> 
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/bookmarks" element={<Bookmarks bookmarks={bookmarks} />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
