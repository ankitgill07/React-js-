import { createSlice  } from "@reduxjs/toolkit";

const initialState = {
active : JSON.parse(localStorage.getItem("activeBtn")) || "Home",
}

const activeSlice = createSlice({
name : "acitve",
initialState,
reducers:{
activeBtn : (state , action) => {
state.active = action.payload
localStorage.setItem("activeBtn" , JSON.stringify(action.payload))
}
}
})

export const { activeBtn } = activeSlice.actions
export default activeSlice.reducer