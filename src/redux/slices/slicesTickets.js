import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import uniqid from 'uniqid'


export const fetchSearchID = createAsyncThunk('tickets/fetchSearchId', async() => {
    const response = await fetch('https://aviasales-test-api.kata.academy/search')
    const data = await response.json()
    return data
})

export const fetchGetTickets = createAsyncThunk('tickets/fetchTickets', async (_, { getState, rejectWithMessage }) => {
    const state = getState()
    try {
        const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${state.tickets.searchId}`)
        if (response.status === 500 || response.status === 502) {
            return { tickets: [], stop: false }
        }
        if (response.status === 400 || response.status === 404) {
            return rejectWithMessage('Обновите страницу, проблемы с соединением с сервером')
        }
        const data = await response.json()
        return data
    }
    catch (error) {
        return rejectWithMessage(error.message)
    }
})

export const SliceTickets = createSlice({
    name: 'tickets',
    initialState: { tickets: [], searchId: null, visibleTickets: 5, error: null },
    reducers: {
        moreTickets: (state) => {
            state.visibleTickets += 5
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchID.pending, (state) => {
                state.fetchSearchIDStatus = 'pending'
            })
            .addCase(fetchSearchID.fulfilled, (state, action) => {
                state.searchId = action.payload.searchId
                state.fetchSearchIDStatus = 'resolved'
            })
            .addCase(fetchSearchID.rejected, (state) => {
                state.fetchSearchIDStatus = 'error'
            })
            .addCase(fetchGetTickets.pending, (state) => {
                state.fetchGetTicketsStatus = 'pending'
            })
            .addCase(fetchGetTickets.fulfilled, (state, action) => {
                state.fetchGetTicketsStatus = 'resolved'
                state.tickets = [...action.payload.tickets.map((ticket) => ({ id: uniqid(), ...ticket })), ...state.tickets]
                state.stop = action.payload.stop
            })
            .addCase(fetchGetTickets.rejected, (state) => {
                state.fetchGetTicketsStatus = 'error'
            })
        },
})

export const { moreTickets, setOfflineStatus } = SliceTickets.actions
export default SliceTickets.reducer