import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { APIKEY } from '../../Api/MovieApiKey'
import axios from 'axios'

const initialState = {
    movies: {},
    selectedMovie: {},
    page: 1,
    searchText: "murder"
}

export const fetchMoviesAsync = createAsyncThunk(
    'movie/fetchMoviesAsync',
    async (_, { getState }) => {
        // const searchText = "murder";

        const { page, searchText } = getState().movies
        console.log("getting page", page)
        console.log("searchMovie", searchText)
        // console.log(aa)
        return await axios.get(`?apikey=${APIKEY}&s=${searchText}&type=movie&page=${page}`)
            // &page=${page}
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
            builder.addCase(fetchMoviesAsync.pending, () => {
                // console.log("pending")
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

export const { removeSelectedMovies, pageNumber, movieTextEnter } = movieSlice.actions;
//store bata value leko
export const getAllMovies = (state) => state.movies.movies//state.reducername.property
export const getMoviesDetail = (state) => state.movies.selectedMovie
export const getPageDetail = (state) => state.movies.page
export default movieSlice.reducer