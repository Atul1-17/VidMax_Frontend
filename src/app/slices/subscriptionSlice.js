import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "@/lib/axios";


export const toggleSubscription = createAsyncThunk(
    "subscription/toggleSubscription",
    async (channelId, {rejectWithValue}) => {
        try {
            const response = await apiClient.post(`/subscriptions/toggleSubscription/${channelId}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to toggle subscription")
        }
    }
)

export const getUserChannelSubscribers = createAsyncThunk(
    "subscription/getUserChannelSubscribers",
    async (channelId, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`/subscriptions/getUserChannelSubscribers/${channelId}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to getUserChannelSubscribers")
        }
    }
)

export const getSubscribedChannels = createAsyncThunk(
    "subscription/getSubscribedChannels",
    async (subscriberId, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`/subscriptions/getSubscribedChannels/${subscriberId}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to getSubscribedChannels")
        }
    }
)


const initialState = {
    UserChannelSubscribers: [],    
    subscribedChannels: [],
    subscribed: false,
    status: "idle",
    error: null
}

const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        updateSubscribedChannels: (state, action) => {
        const { channel, subscribed } = action.payload

        if (subscribed) {
            // add new channel
            state.subscribedChannels.push(channel)
        } else {
            // remove unsubscribed channel
            state.subscribedChannels =
                state.subscribedChannels.filter(
                    (ch) => ch._id !== channel._id
                )
        }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(toggleSubscription.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(toggleSubscription.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.subscribed = action.payload.data.subscribed
        })
        .addCase(toggleSubscription.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload
        })
        .addCase(getSubscribedChannels.pending, (state, action) => {
            state.status = "loading"
            state.error = null
        })
        .addCase(getSubscribedChannels.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.subscribedChannels = action.payload.data
        })
        .addCase(getSubscribedChannels.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload
        })
    }
})



export const {clearError, updateSubscribedChannels} = subscriptionSlice.actions;
export default subscriptionSlice.reducer;