import { createSlice } from "@reduxjs/toolkit";

export const SliceTransplants = createSlice({
    name: 'transplants',
    initialState: {
        statusMain: ['Без пересадок'],
        statusCheckboxes: [
            { id: 0, text: 'Все', isActive: false },
            { id: 1, text: 'Без пересадок', isActive: true },
            { id: 2, text: '1 пересадка', isActive: false },
            { id: 3, text: '2 пересадки', isActive: false },
            { id: 4, text: '3 пересадки', isActive: false },
        ],
    },
    reducers: {
        filtersTransplants: (state, action) => {
            const filter = action.payload
            switch(filter) {
                case 'Все': {
                    const isActiveAll = !state.statusCheckboxes[0].isActive
                    state.statusMain = isActiveAll ? state.statusCheckboxes.map((checkbox) => checkbox.text) : ['']
                    state.statusCheckboxes = state.statusCheckboxes.map((checkbox) => ({ ...checkbox, isActive: isActiveAll }))
                    break
                }
                default: {
                    const filterCheckbox = state.statusCheckboxes.find((checkbox) => checkbox.text === filter)
                    if (filterCheckbox) {
                        filterCheckbox.isActive = !filterCheckbox.isActive
                    }
                    const allActive = state.statusCheckboxes.slice(1).every((checkbox) => checkbox.isActive)
                    state.statusCheckboxes[0].isActive = allActive
                    if (allActive) {
                        state.statusCheckboxes[0].isActive = true
                    }
                    state.statusMain = state.statusCheckboxes
                        .filter((checkbox) => checkbox.isActive && checkbox.text !== 'Все')
                        .map((checkbox) => checkbox.text)
                    break
                }
            }
        },
    },
})

export const { filtersTransplants } = SliceTransplants.actions
export default SliceTransplants.reducer