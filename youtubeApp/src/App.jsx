import React, { useState } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { toggleSetting } from "./context/context"
import HomeTop from "./components/home/HomeTop"
import Header from "./components/header/Header"
import VideoPlay from "./components/playing/VideoPlay"
import Search from "./components/search/Search"
import Histary from "./components/playing/Histary"
import LikeVideo from "./components/playing/LikeVideo"
import DummyData, { RelatedVideosData, SearchData } from "./components/DummyData"
import WatchLater from "./components/playing/WatchLater"
import AllSubscribe from "./components/playing/AllSubscribe"
import PlayList from "./components/playing/PlayList"
import YouProfile from "./components/playing/YouProfile"
function App() {
  const [openSetting, setOpeSetting] = useState(false)

  return (
    <toggleSetting.Provider value={{ openSetting, setOpeSetting}} >
      <div className={"w-full   dark:bg-[#0F0F0F] h-screen overflow-x-hidden  " + (openSetting ? "min-h-screen" : "")}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomeTop/>} />
            <Route path="/shorts" element={""} />
            <Route path="/subscriptions" element={<h2>subscriptions</h2>} />
            <Route path="/watch/:videoId" element={<VideoPlay/>} />
            <Route path="/search/:q" element={<Search/>}/>
            <Route path="/history" element={<Histary/>}/>
            <Route path="/playlist/list=LL" element={<LikeVideo/>} />
            <Route path="/playlist/list=WL" element={<WatchLater/>} />
            <Route path="/feed/channels" element={<AllSubscribe/>}/>
            <Route path="/playlists" element={<PlayList/>}/>
            <Route path="/you" element={<YouProfile/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </toggleSetting.Provider>
  )
}

export default App
