import axios from 'axios'
import React, { useEffect } from 'react'
import MovieList from '../MovieList/MovieList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMoviesAsync, getLoading, getPageDetail, pageNumber } from '../../feature/Slices/movieSlice'
import './Home.scss';

axios.defaults.baseURL = "https://www.omdbapi.com"

const Home = () => {
    const page = useSelector(getPageDetail)
    const loading = useSelector(getLoading)
    const dispatch = useDispatch();
    useEffect(() => {
        // console.log("sent page", page)
        dispatch(fetchMoviesAsync())
    }, [dispatch, page])

    return (
        !loading ? <>
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
        </> : <h1 className='loading'>.....loading</h1>
    )
}

export default Home