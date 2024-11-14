import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: localStorage.getItem("theme") || "light"
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        applyDark: (state, action) => {
            state.theme = "dark"
            localStorage.setItem("theme", "dark")
        },
        applyLight: (state, action) => {
            state.theme = "light"
            localStorage.setItem("theme", "light")
        }
    }
})

export const { applyDark, applyLight } = themeSlice.actions
export default themeSlice.reducer