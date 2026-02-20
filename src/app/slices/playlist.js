import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "@/lib/axios";



export const createPlaylist = createAsyncThunk(
    "playlists/createPlaylist",
    async (credentials, {rejectWithValue}) => {
        try {
            const response = await apiClient.post("/playlists/createPlaylist",credentials)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to create playlist")
        }
    }
)

export const getUserPlaylists = createAsyncThunk(
    "playlists/getUserPlaylists",
    async (userId, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`playlists/getUserPlaylists/${userId}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to get User Playlist")
        }
    }
)

export const getPlaylistById = createAsyncThunk(
    "playlists/getPlaylistById",
    async (playlistId, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`playlists/getPlaylistById/${playlistId}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to get Playlist")
        }
    }
)

export const addVideoToPlaylist = createAsyncThunk(
    "playlists/addVideoToPlaylist",
    async ({videoId, playlistId}, {rejectWithValue}) => {
        try {
            const response = await apiClient.patch(`playlists/addVideoToPlaylist/playlist/${playlistId}/video/${videoId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to Add Video into Playlist")
        }
    }
)

export const removeVideoFromPlaylist = createAsyncThunk(
    "playlists/removeVideoFromPlaylist",
    async ({videoId, playlistId}, {rejectWithValue}) => {
        try {
            const response = await apiClient.patch(`playlists/removeVideoFromPlaylist/playlist/${playlistId}/video/${videoId}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to Remove Video from Playlist")
        }
    }
)

export const updatedPlaylist = createAsyncThunk(
    "playlists/updatedPlaylist",
    async ({playlistId, data}, {rejectWithValue}) => {
        try {
            const response = await apiClient.patch(`playlists/updatePlaylist/${playlistId}`, data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to Update Playlist")
        }
    }
)

export const deletePlaylist = createAsyncThunk(
    "playlists/deletePlaylist",
    async (playlistId, {rejectWithValue}) => {
        try {
            const response = await apiClient.delete(`playlists/deletePlaylist/${playlistId}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to Delete Playlist")
        }
    }
)


const initialState = {
  playlists: [],          // for getUserPlaylists
  playlist: null,         // for getPlaylistById / create / update
  status: "idle",
  error: null,
}

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(createPlaylist.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(createPlaylist.fulfilled, (state, action) => {
            state.status = "succeded"
        })
        .addCase(createPlaylist.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload
        })
        .addCase(getUserPlaylists.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(getUserPlaylists.fulfilled, (state, action) => {
            state.status = "succeded"
            state.playlists = action.payload.data
        })
        .addCase(getUserPlaylists.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload
        })
        .addCase(getPlaylistById.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(getPlaylistById.fulfilled, (state, action) => {
            state.status = "succeded"
            state.playlist = action.payload.data
        })
        .addCase(getPlaylistById.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload
        })
        .addCase(addVideoToPlaylist.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(addVideoToPlaylist.fulfilled, (state, action) => {
            state.status = "succeded"
        })
        .addCase(addVideoToPlaylist.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload
        })
        .addCase(removeVideoFromPlaylist.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(removeVideoFromPlaylist.fulfilled, (state, action) => {
            state.status = "succeded"
        })
        .addCase(removeVideoFromPlaylist.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload
        })
        .addCase(updatedPlaylist.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(updatedPlaylist.fulfilled, (state, action) => {
            state.status = "succeded"       
        })
        .addCase(updatedPlaylist.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload
        })
        .addCase(deletePlaylist.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(deletePlaylist.fulfilled, (state, action) => {
            state.status = "succeded"
        })
        .addCase(deletePlaylist.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload
        })
    }
})


export const {clearError} = playlistSlice.actions;
export default playlistSlice.reducer;
