import React, { useState } from 'react'
import './NavBar.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchMoviesAsync, movieTextEnter } from '../../feature/Slices/movieSlice';

const NavBar = () => {
    const [searchMovie, setsearchMovie] = useState("")
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(searchMovie)
        dispatch(movieTextEnter(searchMovie))
        dispatch(fetchMoviesAsync())
    }
    return (
        <div className="navigation-bar">
            <div className="logo">
                <Link to="/">
                    Movie App
                </Link>
            </div>
            <div className="search-movie">
                <form onSubmit={handleSubmit}>
                    <input type="text" value={searchMovie} onChange={(e) => setsearchMovie(e.target.value)} />
                    <button type='submit'>🔎</button>
                </form>
            </div>
        </div>
    )
}

export default NavBar