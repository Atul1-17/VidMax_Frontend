import { configureStore } from "@reduxjs/toolkit";
import authServiceReducer from "../app/slices/authSlice"
import videoServiceReducer from "../app/slices/videoSlice"
import playlistServiceReducer from "../app/slices/playlistSlice"
import likeServiceReducer from "../app/slices/likeSlice"
import subscriptionServiceReducer from "../app/slices/subscriptionSlice"

const store = configureStore({
    reducer: {
        auth: authServiceReducer,
        video: videoServiceReducer,
        playlist: playlistServiceReducer,
        like: likeServiceReducer,
        subscription: subscriptionServiceReducer,
    }
});

export default store;