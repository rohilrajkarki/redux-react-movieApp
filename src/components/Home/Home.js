import axios from 'axios'
import React, { useEffect } from 'react'
import MovieList from '../MovieList/MovieList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMoviesAsync, getPageDetail, pageNumber } from '../../feature/Slices/movieSlice'
import './Home.scss';

axios.defaults.baseURL = "https://www.omdbapi.com"

const Home = () => {
    const page = useSelector(getPageDetail)
    const dispatch = useDispatch();
    useEffect(() => {
        // console.log("sent page", page)
        dispatch(fetchMoviesAsync())
    }, [dispatch, page])

    return (
        <>
            <div className="page-buttons">
                <button
                    onClick={() => dispatch(pageNumber("pre"))}
                >
                    Prev
                </button>
                <button onClick={() => dispatch(pageNumber("nex"))}>Next</button>
            </div>
            <div>
                <MovieList />
            </div>
        </>
    )
}

export default Home