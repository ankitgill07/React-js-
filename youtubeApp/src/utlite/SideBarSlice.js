import { createSlice } from "@reduxjs/toolkit";

const initialState = {
toggleSideBar : JSON.parse(localStorage.getItem("isSideBarOpen")) ?? true
}

const toggleSideBarSlice = createSlice({
name: "sideBar",
initialState,
reducers:{
toggelSideBtn : (state) => {
state.toggleSideBar = !state.toggleSideBar
localStorage.setItem("isSideBarOpen", JSON.stringify(state.toggleSideBar))
}
}
})

export const {toggelSideBtn} = toggleSideBarSlice.actions
export default toggleSideBarSlice.reducer