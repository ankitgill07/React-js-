import React, { useContext, useEffect, useState } from 'react'
import { json, Link } from 'react-router-dom'
import { VideoMoreSvg, vireified } from '../../assets/Svg'
import { useDispatch, useSelector } from 'react-redux'
import { toggelSideBtn } from '../../utlite/SideBarSlice'
import { RelativeTimeDisplay, DurationDisplay, ViewCount } from '../convert/VideoDataConver'
import { vidoeHiatory } from '../../utlite/playlist'
import { activeBtn } from '../../utlite/ActiveSlice'
import DummyData from '../DummyData'
import { YOUTUBE_API_KEY, YOUTUBE_APP_URL } from '../../api'


function Home() {
  const [videosthumbnails, setVideosthumbnails] = useState([])
  const [channelData, setChannelData] = useState([])

  const sideBar = useSelector((state) => state.toggleSideBarSlice.toggleSideBar)
  const histary = useSelector((state) => state.playlistSlice.history)
  const dispatch = useDispatch()

  const getVideosthumbnails = async () => {
    const url = await fetch(`${YOUTUBE_APP_URL}videos?part=snippet,contentDetails,statistics&regionCode=IN&maxResults=50&chart=mostPopular&key=${YOUTUBE_API_KEY}`)
    const result = await url.json()
    setVideosthumbnails(result?.items)
    const channelId = [...new Set(result.items.map((data) => data?.snippet?.channelId))].join(',')
    const channelApi = await fetch(`${YOUTUBE_APP_URL}channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`)
    const data = await channelApi.json()
    const channelDataMap = {};
    data?.items.forEach((channel) => {
      channelDataMap[channel.id] = channel.snippet.thumbnails.default.url;
    });
    setChannelData(channelDataMap)
  }
const videoData =  videosthumbnails.map(data => data.id)
console.log(videoData);



const handleHistroyData = (videoData) => {
dispatch(activeBtn("watch"))
dispatch(toggelSideBtn())
const videoId = histary.find((video) => video.id === videoData.id)
if(!videoId){
  dispatch(vidoeHiatory(videoData))
}
}




  useEffect(() => {
    getVideosthumbnails()
  }, [])
  return (
    <div className='pt-6'>
      <div className=' lg:ml-4 '>
        {videosthumbnails.length ? (
          <div className=" grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {videosthumbnails.map((data) => (
    <div key={data.id}  className="mx-2 mb-9 w-auto">
      <div className="flex justify-center items-center">
        <div className="w-full">
          <div className="flex flex-col relative">
            <div onClick={() => handleHistroyData(data)} className="relative object-fill">
              <Link to={`/watch/${data.id}`}>
                <div className="object-fill">
                  <img className="rounded-lg w-full h-auto" src={data?.snippet?.thumbnails?.maxres?.url} alt="" />
                </div>
                <div className="absolute bottom-0 right-0">
                  <div className="m-2">
                    <span className="text-xs font-roboto text-white bg-[#00000099] rounded-[4px] py-0.5 px-1">
                      <DurationDisplay duration={data?.contentDetails?.duration} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex  relative mt-2">
              <div className="mr-3 cursor-pointer">
                <div className="m-[2px] w-[34px] h-[34px]">
                  <img className="rounded-full" src={channelData[data.snippet.channelId]} alt="" />
                </div>
              </div>
              <div className="pr-6  flex flex-col overflow-hidden">
                <h3 className="mb-1 text-base font-roboto font-normal overflow-hidden line-clamp-2">
                  <Link>
                    <div>{data?.snippet?.title}</div>
                  </Link>
                </h3>
                <div className="flex flex-col text-[#606060] dark:text-[#aaa]">
                  <div className="text-xs font-roboto ">
                    <Link className="flex">
                      <span className="dark:hover:text-white">{data?.snippet?.channelTitle}</span>
                    </Link>
                  </div>
                  <div className="flex items-center text-xs font-roboto ">
                    <span><ViewCount count={data?.statistics?.viewCount} /> views</span>
                    <div className="mx-1">•</div>
                    <span><RelativeTimeDisplay date={data?.snippet?.publishedAt} /></span>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 mt-2">
                <div className="flex items-start justify-end">
                  <button className="w-5 dark:fill-white">
                    <span>{VideoMoreSvg}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


        ):(
      <DummyData/>
        )}
      </div>
    </div>
  )
}

export default Home