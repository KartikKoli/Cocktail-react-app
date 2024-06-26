import { configureStore } from "@reduxjs/toolkit";
import cocktailReducer from "./features/cocktailSlice";

const store= configureStore({
    reducer:{
        app: cocktailReducer
    }
})

export default store;