import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { APIKEY } from '../../Api/MovieApiKey'
import axios from 'axios'

const initialState = {
    movies: {},
    selectedMovie: {},
    page: 1,
    searchText: "murder",
    loading: false
}

export const fetchMoviesAsync = createAsyncThunk(
    'movie/fetchMoviesAsync',
    async (_, { getState }) => {
        const { page, searchText } = getState().movies
        // console.log("getting page", page)
        // console.log("searchMovie", searchText)
        return await axios.get(`?apikey=${APIKEY}&s=${searchText}&type=movie&page=${page}`)
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
        // addMovies: (state, { payload }) => {
        //     state.movies.push(payload);
        // },
        removeSelectedMovies: (state) => {
            state.selectedMovie = {};
        },
        pageNumber: (state, { payload }) => {
            if (payload === "nex") {
                state.page++;
            } else if (payload === "pre") {
                state.page--;
            }
            console.log("store page", state.page)
        },
        movieTextEnter: (state, { payload }) => {
            state.searchText = payload
        }
    },
    extraReducers:
        (builder) => {
            builder.addCase(fetchMoviesAsync.pending, (state) => {
                state.loading = true
                // console.log("pending", state.loading)
            })
            builder.addCase(fetchMoviesAsync.fulfilled, (state, { payload }) => {
                // console.log("Movies Fetched")
                state.movies = payload
                state.loading = false
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

export const { removeSelectedMovies, pageNumber, movieTextEnter } = movieSlice.actions;
//store bata value leko
export const getAllMovies = (state) => state.movies.movies//state.reducername.property
export const getMoviesDetail = (state) => state.movies.selectedMovie
export const getPageDetail = (state) => state.movies.page
export default movieSlice.reducer