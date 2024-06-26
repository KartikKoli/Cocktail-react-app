import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    cocktails: [],
    cocktail: [],
    loading: false,
    error: null
}

export const fetchCocktails= createAsyncThunk("cocktails/fetchCocktails",async ()=>{
    return fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=").then((res)=>res.json());
})

export const fetchSingleCocktail = createAsyncThunk("cocktails/fetchSingleCocktail",async ({id})=>{
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((res)=>res.json());
})

export const fetchSearchCocktail = createAsyncThunk("cocktails/fetchSearchCocktail",async ({searchText})=>{
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`).then((res)=>res.json());
})

const cocktailSlice = createSlice({
    name: "cocktail",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCocktails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCocktails.fulfilled, (state, action) => {
                state.loading = false;
                state.cocktails = action.payload.drinks;
            })
            .addCase(fetchCocktails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchSingleCocktail.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSingleCocktail.fulfilled, (state, action) => {
                state.loading = false;
                state.cocktail = action.payload.drinks;
            })
            .addCase(fetchSingleCocktail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchSearchCocktail.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSearchCocktail.fulfilled, (state, action) => {
                state.loading = false;
                state.cocktails = action.payload.drinks;
            })
            .addCase(fetchSearchCocktail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default cocktailSlice.reducer;