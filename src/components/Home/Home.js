import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MovieList from '../MovieList/MovieList'
import { useDispatch } from 'react-redux'
import { fetchMoviesAsync } from '../../feature/Slices/movieSlice'
import './Home.scss';

axios.defaults.baseURL = "https://www.omdbapi.com"

const Home = () => {
    const [page, setPage] = useState(1) //&page=${page}
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchMoviesAsync(page))

    }, [dispatch, page])
    const handlePage = (text) => {
        if (text === "pre" && page > 1) {
            setPage(pre => pre - 1)
        } else if (text === "nex") {
            setPage(pre => pre + 1)
        }
    }
    return (
        <>
            <div className="page-buttons">
                <button onClick={() => handlePage("pre")}>Prev</button>
                <button onClick={() => handlePage("nex")}>Next</button>
            </div>
            <div>
                <MovieList />
            </div>
        </>
    )
}

export default Home