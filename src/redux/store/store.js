import { configureStore } from "@reduxjs/toolkit";

import { SliceFilters } from "../slices/slicesFilters";
import { SliceTickets } from "../slices/slicesTickets";
import { SliceTransplants } from "../slices/slicesTransplants";

const store = configureStore({
    reducer: {
        filters: SliceFilters.reducer,
        tickets: SliceTickets.reducer,
        transplants: SliceTransplants.reducer,
    },
})

export default store