import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, fileApiClient } from "../../lib/axios";

export const loginUser = createAsyncThunk(
    "user/login",
    async (credential, {rejectWithValue}) => {
        try {
            const response = await apiClient.post("/users/login", credential)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

export const registerUser = createAsyncThunk(
    "user/register", 
    async (credential, {rejectWithValue}) => {
    try {
        const response = await apiClient.post("/users/register", credential)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const checkAuthStatus = createAsyncThunk(
    "user/checkAuthStatus",
    async (_, {rejectWithValue}) => {
        try {
            const response = await apiClient.post("/users/refresh-token")
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const changeCurrentPassword = createAsyncThunk(
    "user/changeCurrentPassword",
    async (credential, {rejectWithValue}) => {
        try {
            const response = await apiClient.post("/users/change-password", credential)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.message)
        }
    }
)

export const getCurrentUser = createAsyncThunk(
    "user/getCurrentUser",
    async (credential, {rejectWithValue}) => {
        try {
            const response = await apiClient.get("/current-user", credential)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const updateAccountDetailes = createAsyncThunk(
    "user/updateAccountDetailes",
    async (credential, {rejectWithValue}) => {
        try {
            const response = await apiClient.patch("/users/update-user-details", credential)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const updateUserAvatar = createAsyncThunk(
    "user/updateUserAvatar",
    async (credential, {rejectWithValue}) => {
        try {
            const formData = new FormData()
            formData.append("avatar", credential);

            const response = await fileApiClient.patch("/users/update-avatar", formData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const addToWatchHistory = createAsyncThunk(
    "user/addToWatchHistory",
    async (videoId, {rejectWithValue}) => {
        try {
            const response = await apiClient.patch(`/users/v/${videoId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const getWatchHistory = createAsyncThunk(
    "user/getWatchHistory",
    async (_, {rejectWithValue}) => {
        try {
            const response = await apiClient.get("/users/watch-history")
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const logout = createAsyncThunk(
    "user/logout",
    async (_, {rejectWithValue}) => {
        try {
            await apiClient.post("/users/logout")
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)



const initialState = {
    user: null,
    videos: [],
    token: null,
    status: "idle",
    error: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
            state.status = "loading";
            state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeded";
                state.user = action.payload.data.user;
                state.token = action.payload.data.accessToken;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
            .addCase(registerUser.pending, (state, action) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeded"
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
            .addCase(checkAuthStatus.pending, (state, action) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.status = "succeded"
                state.token = action.payload.data.accessToken
                state.user = action.payload.data.user
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(checkAuthStatus.rejected, (state, action) => {
                state.status = "failed"
                state.isAuthenticated = false
                state.user = null
                state.token = null
            })
            .addCase(updateAccountDetailes.pending, (state, action) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(updateAccountDetailes.fulfilled, (state, action) => {
                state.status = "succeded"
                state.error = null
                state.isAuthenticated = true
                state.user = action.payload.data
            })
            .addCase(updateAccountDetailes.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
            .addCase(logout.pending, (state, action) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.status = "succeded"
                state.error = null
                state.isAuthenticated = false
                state.user = null
                state.token = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload.data.message
            })
            .addCase(updateUserAvatar.pending, (state, action) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(updateUserAvatar.fulfilled, (state, action) => {
                state.status = "succeded"
                state.error = null
                state.user = action.payload.data
                state.isAuthenticated = true
            })
            .addCase(updateUserAvatar.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload.data.message
            })
            .addCase(changeCurrentPassword.pending, (state, action) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(changeCurrentPassword.fulfilled, (state, action) => {
                state.status = "succeded"
                state.error = null
                state.isAuthenticated = true
            })
            .addCase(changeCurrentPassword.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
            .addCase(addToWatchHistory.pending, (state, action) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(addToWatchHistory.fulfilled, (state, action) => {
                state.status = "succeded"
            })
            .addCase(addToWatchHistory.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
            .addCase(getWatchHistory.pending, (state, action) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(getWatchHistory.fulfilled, (state, action) => {
                state.status = "succeded"
                state.videos = action.payload.data
            })
            .addCase(getWatchHistory.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
    }
})

export const {clearError} = authSlice.actions;
export default authSlice.reducer;