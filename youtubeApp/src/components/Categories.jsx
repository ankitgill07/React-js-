import React, { useEffect, useState } from 'react';
import { VideoMoreSvg } from '../assets/Svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RelativeTimeDisplay, DurationDisplay, ViewCount } from './convert/VideoDataConver';
import { toggelSideBtn } from '../utlite/SideBarSlice';
import { vidoeHiatory } from '../utlite/playlist';
import { activeBtn } from '../utlite/ActiveSlice';
import { YOUTUBE_API_KEY, YOUTUBE_APP_URL } from '../api';
import DummyData from './DummyData';
function Categories({ data }) {
  const [videoData, setVideoData] = useState([])
  const [channel, setChannel] = useState([])
  const videoId = data?.id
  const channelId = data?.snippet?.channelId

  useEffect(() => {
    const getChannelData = async () => {
      const url = await fetch(`${YOUTUBE_APP_URL}channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`)
      const result = await url.json()
      setChannel(result?.items)
    }
    getChannelData()
  }, [channelId])

  useEffect(() => {
    const getVideo = async () => {
      const url = await fetch(`${YOUTUBE_APP_URL}videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${YOUTUBE_APP_URL}`)
      const result = await url.json()
      console.log(result);
      setVideoData(result?.items);
    }
    getVideo()
  }, [videoId])
const sideBar = useSelector((state) => state.toggleSideBarSlice.toggleSideBar);

const histroy = useSelector((state) => state.playlistSlice.history)

const dispatch = useDispatch()


const handleHistroyData = () => {
  dispatch(activeBtn("watch"));
  dispatch(toggelSideBtn());
  const videoDetail = videoData.find((video) => video.id === data.id.videoId);

  if (videoDetail && !histroy.find((video) => video.id === videoDetail.id)){
    dispatch(vidoeHiatory(videoDetail));
  }
}

  return (
   <div className=''>
      <div>
 <div key={data.id} className="mx-2 mb-9">
      <div className="flex justify-center items-center">
        <div className="w-full">
          <div className="flex flex-col relative">
            <div onClick={() => handleHistroyData(data)}  className="relative object-fill">
              <Link to={`/watch/${data?.id}`}>
                <div className="object-fill">
                  <img
                    className="rounded-lg w-full h-full object-cover"
                    src={data?.snippet?.thumbnails?.medium?.url}
                    alt=""
                  />
                </div>
                <div className="absolute bottom-0 right-0">
                  <div className="m-2">
                    <span className="text-xs font-roboto bg-[#00000099] text-white  rounded-[4px] py-0.5 px-1">
                      <DurationDisplay duration={videoData?.[0]?.contentDetails?.duration} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex flex-row relative mt-2">
              <div className="mr-3 cursor-pointer">
                <div className="m-[2px] w-[34px] ">
                  <img className="rounded-full" src={channel?.[0]?.snippet?.thumbnails?.default?.url} alt="" />
                </div>
              </div>
              <div className="pr-6 flex flex-col overflow-hidden">
                <h3 className=" mb-1 text-base font-roboto font-normal overflow-hidden line-clamp-2">
                  <Link to="#">
                    <div>{data?.snippet?.title}</div>
                  </Link>
                </h3>
                <div className="flex flex-col text-[#606060] dark:text-[#aaa]">
                  <div className="text-xs font-roboto ">
                    <Link to="#" className="flex">
                      <span className="dark:hover:text-white">{data?.snippet?.channelTitle}</span>
                    </Link>
                  </div>
                  <div className="flex items-center text-xs font-roboto ">
                    <span><ViewCount count={videoData?.[0]?.statistics?.viewCount} /> views</span>
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

      </div>
   </div>

  );
}

export default Categories;
