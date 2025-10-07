import { configureStore } from "@reduxjs/toolkit";
import authServiceReducer from "../app/slices/authSlice"

const store = configureStore({
    reducer: {
        auth: authServiceReducer
    }
});

export default store;