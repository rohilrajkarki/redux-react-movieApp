import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./Slices/movieSlice"


export const store = configureStore({
    reducer: {
        movies: moviesReducer
    }
})