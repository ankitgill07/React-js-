import { createSlice } from "@reduxjs/toolkit";

const initialState = {
userData : JSON.parse(localStorage.getItem("userData")) || null
}

const loginSlice = createSlice({
name : "login",
initialState,

reducers: {
signInBtn : (state , action) =>{
 state.userData = action.payload
localStorage.setItem("userData" , JSON.stringify(action.payload))
},

singInOut : (state ) => {
state.userData = null
localStorage.removeItem("userData")
}
}
})

export const {signInBtn , singInOut } = loginSlice.actions
export default loginSlice.reducer