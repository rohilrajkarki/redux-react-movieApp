import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMoviesDetailsAsync, getMoviesDetail, removeSelectedMovies } from '../../feature/Slices/movieSlice';
import './MovieDetail.scss';

const MovieDetail = () => {
    const { imdbID } = useParams()
    const dispatch = useDispatch();
    const data = useSelector(getMoviesDetail)
    console.log(data)
    useEffect(() => {
        dispatch(fetchMoviesDetailsAsync(imdbID));
        return () => {
            dispatch(removeSelectedMovies())
        }
    }, [dispatch, imdbID]);
    return (
        <div className='details-main'>
            <div>
                <img src={data.Poster} alt={data.Title} />
            </div>
            <div className="movie-info">
                <div className="movie-title">{data.Title}</div>
                <div>
                    <span>Director</span>
                    <span>{data.Director}</span>
                </div>
                <div>
                    <span>Stars</span>
                    <span>{data.Actors}</span>
                </div>
                <div>
                    <span>Generes</span>
                    <span>{data.Genre}</span>
                </div>
                <div>
                    <span>Languages</span>
                    <span>{data.Language}</span>
                </div>
                <div>
                    <span>Awards</span>
                    <span>{data.Awards}</span>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail