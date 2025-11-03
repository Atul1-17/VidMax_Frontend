import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/lib/axios";

export const toggleVideoLike = createAsyncThunk(
    "like/toggleVideoLike",
    async(videoId, {rejectWithValue}) => {
        try {
            const response = apiClient.post(`/likes/toggle/${videoId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to toggle video like");
        }
    }
)

const initialState = {
    liked: false,
    status: "idle",
    error: null
}

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(toggleVideoLike.pending, (state, action) => {
            state.status = "loading"
            state.error = null
        })
        .addCase(toggleVideoLike.fulfilled, (state, action) => {
            state.status = "succeded"
            state.liked = 
        })
        .addCase(toggleVideoLike.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload.message
        })
    }
})

export const {clearError} = likeSlice.actions;
export default likeSlice.reducer;