import { configureStore } from "@reduxjs/toolkit"
import themeSlice from "../utlite/ThemeSlice"
import loginSlice from "../utlite/loginSlice"
import  activeSlice  from "../utlite/ActiveSlice"
import  toggleSideBarSlice from "../utlite/SideBarSlice"
import playlistSlice from "../utlite/playlist"
import sreachSlice from "../utlite/sreachSlice"
const Store = configureStore({
    reducer: {
        themeSlice,
        loginSlice,
        activeSlice,
        toggleSideBarSlice,
        playlistSlice,
        sreachSlice
    }
})

export default Store 