import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, fileApiClient,  } from "@/lib/axios";
import axios from "axios"; 

const API_URL = import.meta.env.VITE_API_URL

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

export const getVideoById = createAsyncThunk(
    "video/getVideoById",
    async(videoId, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`/videos/c/${videoId}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch video")
        }
    }
)

export const toggleVideoLike = createAsyncThunk(
    "video/toggleVideoLike",
    async(videoId, {rejectWithValue}) => {
        try {
            const response = await apiClient.post(`/likes/toggle/${videoId}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to toggle like")
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
        .addCase(getVideoById.pending, (state, action) => {
            state.status = "loading"
            state.error = null
        })
        .addCase(getVideoById.fulfilled, (state, action) => {
            state.status = "succeded"
            state.video = action.payload.data
        })
        .addCase(getVideoById.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload.message
        })
    }
})

export const {clearError} = videoSlice.actions;
export default videoSlice.reducer;