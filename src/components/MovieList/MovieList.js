import React from 'react'
import { useSelector } from 'react-redux'
import { getAllMovies } from '../../feature/Slices/movieSlice'
import MovieCard from '../MovieCard/MovieCard'
import './MovieList.scss';

const MovieList = () => {
    const data = useSelector(getAllMovies)
    // console.log(data.Search)
    return (
        <div className='movie'>
            {
                data.Response === "True" ? data.Search.map(item => (
                    <MovieCard key={item.Title + item.Year} data={item} />
                )) :
                    <div className="error">
                        <h2>{data.Error}</h2>
                    </div>
            }
        </div>
    )
}

export default MovieList