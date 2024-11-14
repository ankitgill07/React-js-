import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { activeBtn } from "./ActiveSlice";

const initialState = {
likeVideo : JSON.parse(localStorage.getItem("likeVideo")) || [],
watchLater : JSON.parse(localStorage.getItem("watchLater")) || [],
history : JSON.parse(localStorage.getItem("history")) || [], 
Subscribe : JSON.parse(localStorage.getItem("Subscribe")) || [],
}

const playlistSlice = createSlice({
name: "playlist",
initialState,
reducers :{
  videoToLike: (state, action) => {
    const likeVideo = action.payload
    state.likeVideo = [...state.likeVideo , likeVideo]
    localStorage.setItem("likeVideo" , JSON.stringify(state.likeVideo))
  },
   
  videoToDislike : (state , action) => {
    const videoIdToRemove = action.payload.id;
      state.likeVideo = state.likeVideo.filter(video => video.id !== videoIdToRemove);  
      localStorage.setItem("likeVideo", JSON.stringify(state.likeVideo));
  },

  vidoeHiatory : (state , action) => {
  const history = action.payload
  state.history = [...state.history , history]
  localStorage.setItem("history" , JSON.stringify(state.history))
  },
  deleteVidoeHistory : (state , action) => {
    state.history = action.payload
    localStorage.setItem("history" , JSON.stringify(action.payload))
  },
  clearAllHistory : (state) =>{
      state.history = null
      localStorage.removeItem("history")
  },
  videoWatch : (state , action) => {
    const watchLater = action.payload
    state.watchLater = [...state.watchLater , watchLater]
    localStorage.setItem("watchLater" , JSON.stringify(state.watchLater))
    },

deleteWatchLaterVideo : (state , action) => {
  const videoIdToRemove = action.payload.id;
  state.watchLater = state.watchLater.filter(video => video.id !== videoIdToRemove);  
  localStorage.setItem("watchLater", JSON.stringify(state.watchLater));
},
channelToSubscribe : (state, action) => {
  const Subscribe = action.payload
  state.Subscribe = [...state.Subscribe , Subscribe]
  localStorage.setItem("Subscribe" , JSON.stringify(state.Subscribe))
},
 
channelToUnSubscribe : (state , action) => {
  const videoIdToRemove = action.payload.id;
    state.Subscribe = state.Subscribe.filter(channel => channel.id !== videoIdToRemove);  
    localStorage.setItem("Subscribe", JSON.stringify(state.Subscribe));
},
UnSubscribe : (state , action) => {
  state.Subscribe = action.payload
  localStorage.setItem("Subscribe" , JSON.stringify(action.payload))
}
}
})

export const {videoToLike , videoToDislike , vidoeHiatory , deleteVidoeHistory , clearAllHistory , videoWatch , deleteWatchLaterVideo , channelToSubscribe , channelToUnSubscribe , UnSubscribe} = playlistSlice.actions

export default playlistSlice.reducer 