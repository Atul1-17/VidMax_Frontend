import { configureStore } from "@reduxjs/toolkit";
import authServiceReducer from "../app/slices/authSlice"
import videoServiceReducer from "../app/slices/videoSlice"
import playlistServiceReducer from "../app/slices/playlistSlice"

const store = configureStore({
    reducer: {
        auth: authServiceReducer,
        video: videoServiceReducer,
        playlists: playlistServiceReducer,
    }
});

export default store;