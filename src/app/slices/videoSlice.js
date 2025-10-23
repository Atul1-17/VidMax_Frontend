import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, fileApiClient,  } from "@/lib/axios";
import axios from "axios";

const API_URL = "http://localhost:8000/api/v1"; 

export const publishVideo = createAsyncThunk(
    "video/publishVideo",
    async (videoData, {rejectWithValue}) => {
        try {
            const response = await fileApiClient.post("/videos/publishVideo", videoData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to publish video")
        }
    }
)

export const getAllVideos = createAsyncThunk(
    "video/getAllVideos",
    async({page = 1, limit = 10, query, sortBy, sortType, userId}, {rejectWithValue}) => {
        try {
            const params = new URLSearchParams({page, limit});
            if (query) params.append('query', query);
            if (sortBy) params.append('sortBy', sortBy);
            if (sortType) params.append('sortType', sortType);
            if (userId) params.append('userId', userId)

            const response = await axios.get(`${API_URL}/videos/getAllVideos?${params.toString()}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch video")
        }
    }
)

const initialState = {
    videos : [],
    video: null,
    status: "idle",
    error: null,
    pagination: {
        totalDocs: 0,
        limit: 10,
        totalPages: 1,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    }
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(publishVideo.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(publishVideo.fulfilled, (state, action) => {
            state.status = "succeded"
        })
        .addCase(publishVideo.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload
        })
        .addCase(getAllVideos.pending, (state, action) => {
            state.status = "loading"
            state.error = null
        })
        .addCase(getAllVideos.fulfilled, (state, action) => {
            state.status = "succeded"
            state.videos = action.payload.data.docs
            state.pagination = action.payload.data
        })
        .addCase(getAllVideos.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload
        })
        
    }
})

export const {clearError} = videoSlice.actions;
export default videoSlice.reducer;