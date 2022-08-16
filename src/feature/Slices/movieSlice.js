import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { APIKEY } from '../../Api/MovieApiKey'
import axios from 'axios'

const initialState = {
    movies: {},
    selectedMovie: {}
}

export const fetchMoviesAsync = createAsyncThunk(
    'movie/fetchMoviesAsync',
    async (page) => {
        const movieText = "mystery";
        return await axios.get(`?apikey=${APIKEY}&s=${movieText}&type=movie&page=${page}`)
            .then(res => res.data)
    })

export const fetchMoviesDetailsAsync = createAsyncThunk(
    'movie/fetchMoviesDetailsAsync',
    async (id) => {
        return await axios.get(`?apikey=${APIKEY}&i=${id}&Plot=full`)
            .then(res => res.data)
    })

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        addMovies: (state, { payload }) => {
            state.movies.push(payload);
        }
    },
    extraReducers:
        (builder) => {
            builder.addCase(fetchMoviesAsync.pending, () => {
                console.log("pending")
            })
            builder.addCase(fetchMoviesAsync.fulfilled, (state, { payload }) => {
                // console.log("Movies Fetched")
                state.movies = payload
                // console.log(state.movies)

            })
            builder.addCase(fetchMoviesAsync.rejected, () => {
                console.log("rejected")
            })
            builder.addCase(fetchMoviesDetailsAsync.fulfilled, (state, { payload }) => {
                state.selectedMovie = payload

            })
        }

})

export const { addMovies } = movieSlice.actions;
//store bata value leko
export const getAllMovies = (state) => state.movies.movies//state.reducername.property
export const getMoviesDetail = (state) => state.movies.selectedMovie
export default movieSlice.reducer