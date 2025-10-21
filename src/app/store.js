import { configureStore } from "@reduxjs/toolkit";
import authServiceReducer from "../app/slices/authSlice"
import videoServiceReducer from "../app/slices/videoSlice"

const store = configureStore({
    reducer: {
        auth: authServiceReducer,
        video: videoServiceReducer,
    }
});

export default store;