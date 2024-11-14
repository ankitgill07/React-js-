import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 query: '',
}

const sreachSlice = createSlice({
name : "search",
initialState ,
reducers:{
sreachQuery : (state , action) => {
state.query = action.payload
}
}
})

export const {sreachQuery} = sreachSlice.actions
export default sreachSlice.reducer