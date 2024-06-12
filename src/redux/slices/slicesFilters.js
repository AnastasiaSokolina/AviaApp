import { createSlice } from '@reduxjs/toolkit'

export const SliceFilters = createSlice({
    name: 'filters',
    initialState: [
        { id: 0, text: 'самый дешевый', isActive: true },
        { id: 1, text: 'самый быстрый', isActive: false },
        { id: 2, text: 'оптимальный', isActive: false },
    ],
    reducers: {
        setActive:(state, action) => {
            state.forEach((button) => {
                button.isActive = button.id === action.payload
            })
        },
    },
})

export const { setActive } = SliceFilters.actions
export default SliceFilters.reducer