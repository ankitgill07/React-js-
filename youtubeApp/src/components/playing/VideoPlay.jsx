import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Container from '../../container/Container';
import {  disLike, dwonArrorSvg, likeSvg, moreSeenSvg, notificationsSvg, reportSvg, saveWatchSvg, shareSvg, VideoMoreSvg, watchSvg } from '../../assets/Svg';
import { RelativeTimeDisplay, ViewCount, DurationDisplay } from '../convert/VideoDataConver';
import { YOUTUBE_APP_URL, YOUTUBE_API_KEY } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import SingIn from '../SingIn';
import { channelToSubscribe, channelToUnSubscribe, deleteWatchLaterVideo, videoToDislike, videoToLike, videoWatch, vidoeHiatory } from '../../utlite/playlist';
import { RelatedVideosData } from '../DummyData';
function VideoPlay() {
  const { videoId } = useParams();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [singleVidoeData, setSingleVideoData] = useState([]);
  const [videoComments, setVideoComments] = useState([]);
  const [channelData, setChannelData] = useState([])
  const [isExpanded, setIsExpanded] = useState(false);
  const [closeComments, setcloseComments] = useState(false)
  const [isdisLike, setIsDisLike] = useState(false)
  const [checkUser , setCheckUser] = useState(false)
 const [changeText , setChangeText]  = useState(0)
const userAuth = useSelector((state) => state.loginSlice.userData)


  const dispatch = useDispatch()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commentsResponse, singleVideoResponse] = await Promise.all([
          fetch(`${YOUTUBE_APP_URL}commentThreads?part=snippet&videoId=${videoId}&maxResults=50&key=${YOUTUBE_API_KEY}`),
          fetch(`${YOUTUBE_APP_URL}videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`),
        ]);

        const commentsData = await commentsResponse.json();
        setVideoComments(commentsData?.items);

        const singleVideoData = await singleVideoResponse.json();

        console.log(singleVideoData?.items?.[0]);

        setSingleVideoData(singleVideoData?.items?.[0]);
        const channelId = singleVideoData?.items?.[0]?.snippet?.channelId;
        const videoCategoriesId = singleVideoData?.items?.[0]?.snippet?.categoryId

        if (videoCategoriesId) {
          const videoCategoriesIdResponse = await fetch(`${YOUTUBE_APP_URL}videos?part=snippet,contentDetails,statistics&regionCode=IN&chart=mostPopular&videoCategoryId=${videoCategoriesId}&maxResults=50&key=${YOUTUBE_API_KEY}`)
          const categoriesIdResult = await videoCategoriesIdResponse.json()
          console.log(categoriesIdResult?.items);
          setRelatedVideos(categoriesIdResult?.items)
        }
        if (channelId) {
          const channelResponse = await fetch(`${YOUTUBE_APP_URL}channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`)
          const channelResult = await channelResponse.json()
          setChannelData(channelResult?.items?.[0])
          console.log(channelResult?.items?.[0]);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [videoId]);


  const text = singleVidoeData?.snippet?.localized?.description || '';
  const readMore = text.length > 200 ? text.slice(0, 200) + '...' : text;



  const likeVideo = useSelector((state) => state.playlistSlice.likeVideo)
  const histroy = useSelector((state) => state.playlistSlice.history)
  const watchLater = useSelector((state) => state.playlistSlice.watchLater)
  const Subscribe = useSelector((state) => state.playlistSlice.Subscribe)


const handleLikeVideo = () => {
if(userAuth){
  const videoId = likeVideo.some((video) => video?.id === singleVidoeData?.id)
  if (videoId) {
    dispatch(videoToDislike(singleVidoeData)); 
  } else {
    dispatch(videoToLike(singleVidoeData)); 
    setIsDisLike(false)
  }
}else{
setCheckUser((prev) => !prev)
setChangeText(1)
}
}

const handleSingIn = () => {
  if(checkUser){
    setCheckUser(false)
  }
}

  const handleSubscribeChannel = () => {
if(userAuth){
  const channelId = Subscribe.some((channel) => channel?.id === channelData?.id)
  if (channelId) {
    dispatch(channelToUnSubscribe(channelData));
  } else {
    dispatch(channelToSubscribe(channelData));
  }
}else{
setCheckUser((prev) => !prev)
setChangeText(4)
}
  }

  const handleWatchLaterVideo = () => {
  if(userAuth){
    const videoId = watchLater.some((vidoe) => vidoe?.id === singleVidoeData?.id)
    if (videoId) {
      dispatch(deleteWatchLaterVideo(singleVidoeData))
    } else {
      dispatch(videoWatch(singleVidoeData))
    }
  }else{
    setCheckUser((prev) => !prev)
    setChangeText(3)
  }
  }

  const handledisLikeVideo = (i) => {
if (userAuth) {
  const videoId = likeVideo.some((video) => video?.id === singleVidoeData?.id)
  setIsDisLike((prev) => !prev)
  if (videoId) {
    dispatch(videoToDislike(singleVidoeData));
  }
}else{
  setCheckUser((prev) => !prev)
  setChangeText(2)
}
  }

  const handleHistroyData = (videoData) => {
    const videoId = histroy.find((video) => video.id === videoData.id)
    if (!videoId) {
      dispatch(vidoeHiatory(videoData))
    }
  }

  return (
    <div  className="max-w-[1680px] mx-auto mt-14">
      <div className="w-full lg:flex justify-end">
        <div className=" max-w-[1200px] pt-6 md:pr-3 mx-2 md:ml-6 flex">
          <div className="w-full flex flex-col">
            <div className="w-full aspect-video">
              <iframe
                className="w-full h-full rounded-2xl object-cover"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                autoFocus
              ></iframe>
            </div>
            <div className='mt-3 mb-5 text-black dark:text-white'>
              <div className=' flex flex-col '>
                <div>
                  <h1 className=' text-lg font-roboto font-medium'>{singleVidoeData?.snippet?.localized?.title}</h1>
                </div>
                <div className=' flex flex-wrap  justify-between items-center'>
                  <div className=' mt-3 mr-3'>
                    <div className=' flex flex-row  dark:text-[#aaa]'>
                      <Link className=' mr-3'>
                        <img className=' rounded-full w-10' src={channelData?.snippet?.thumbnails?.default?.url} alt="" />
                      </Link>
                      <div className=' flex flex-col mr-6'>
                        <h3 className=' text-base font-roboto font-normal'>{channelData?.snippet?.title}</h3>
                        <span className=' text-xs font-roboto '><ViewCount count={channelData?.statistics?.subscriberCount} /> subscribers</span>
                      </div>
                      <div>
                        <button onClick={handleSubscribeChannel} className={` px-3.5 py-1.5  flex flex-row justify-center items-center rounded-full   ${Subscribe?.some((channel) => channel?.id === channelData?.id) ? " dark:bg-[#3F3F3F] bg-[#0000000D] dark:text-white" : "bg-black text-white dark:bg-white dark:text-black"}`}>
                          <span className=' text-sm  flex flex-row gap-2 dark:fill-white fill-black justify-center items-center  font-roboto font-medium'>  {Subscribe?.some((channel) => channel?.id === channelData?.id)
                            ? (
                              <>
                              {notificationsSvg} Subscribed {dwonArrorSvg}
                              </>
                            )
                            : "Subscribe"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='lg:-m-1 mt-2  pt-3 '>
                    <div className=' flex flex-row mb-1 relative '>
                      <div className='md:px-3 py-1 px-2 rounded-full bg-[#0000000D] dark:bg-[#FFFFFF1A] '>
                        <div className=' flex flex-row'>
                          <button onClick={() => handleLikeVideo()} className='flex items-center md:pr-3 pr-1 border-r-[1px]  dark:border-gray-600'>
                            <span className=' text-lg md:mr-2 mr-0.5 rotate-180 dark:fill-white'>{likeVideo?.some((like) => like?.id === singleVidoeData?.id) ? likeSvg : disLike}</span>
                            <span className=' text-sm font-roboto font-normal'>
                              <ViewCount count={singleVidoeData?.statistics?.likeCount} />
                            </span>
                          </button>
                          <button onClick={handledisLikeVideo} className='md:pl-3 pl-1'>
                            <span className=' dark:fill-white'>{isdisLike ? likeSvg : disLike}</span>
                          </button>
                        </div>
            
                      </div>
              {checkUser ? (
                        <div className={' absolute  ' + (changeText === 4 ? "top-0 -left-[111%] " : " top-8 left-16")}>
                        <div className=' flex flex-col bg-white shadow-2xl dark:bg-[#212121]  '>
                           <div className='mt-6 px-6 mb-4'>
                            <h4 className='text-sm font-roboto font-normal'>{changeText === 1 ?   "Like this video?" : "" || changeText === 2  ? "Don't like this video?"  : "" || changeText === 3 ? "Want to watch this again later?" : "" || changeText === 4 ? "Want to subscribe to this channel?" : ""}</h4>
                           </div>
                           <div className='pl-6 pr-28 mt-1 mb-8'>
                            <span className=' text-xs font-roboto text-[#aaa]'>Sign in to make your opinion count.</span>
                           </div>
                          <div className=' flex flex-wrap justify-between pr-4 items-center'>
                          <div className='z-20 w-28 ml-6 mb-2'>
                            <SingIn/>
                           </div>
                           <button onClick={handleSingIn} className=' z-20'>
                            <span>Cancel</span>
                           </button>
                          </div>
                        </div>
                      </div>
              ):(
                ""
              )}
                      <div className='md:px-4 py-1 px-3 flex items-center md:ml-2 ml-1.5 rounded-full bg-[#0000000D] dark:bg-[#FFFFFF1A] '>
                        <button className='flex items-center '>
                          <span className=' mr-1 dark:fill-white'>{shareSvg}</span>
                          <span>Share</span>
                        </button>
                      </div>
                      <div className='md:px-4 md:py-1 md:ml-2 ml-1.5 flex items-center px-2 rounded-full bg-[#0000000D] dark:bg-[#FFFFFF1A] '>
                        <button onClick={handleWatchLaterVideo} className='flex items-center '>
                          <span className=' mr-1 dark:fill-white'>{watchLater?.some((watch) => watch?.id === singleVidoeData?.id) ? saveWatchSvg : watchSvg}</span>
                          <span>Watch</span>
                        </button>
                      </div>
                      <div className='md:px-1 flex items-center md:ml-2 ml-1.5 px-[3.5px] -p-1 rounded-full bg-[#0000000D] dark:bg-[#FFFFFF1A] '>
                        <button className='flex items-center '>
                          <span className='  dark:fill-white  '>{reportSvg}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full bg-[#F2F2F2] dark:bg-[#282828] mt-3 cursor-pointer rounded-2xl'>
                  <div className='m-3'>
                    <div className=' flex flex-row gap-2'>
                      <span className='text-xs font-roboto text-black dark:text-white font-medium'><ViewCount count={singleVidoeData?.statistics?.viewCount} /> views </span>
                      <span className='text-xs font-roboto text-black dark:text-white font-medium'><RelativeTimeDisplay date={singleVidoeData?.snippet?.publishedAt} /></span>
                    </div>
                    <div className='pt-2'>
                      <span className=' text-sm font-roboto text-black dark:text-white '>{isExpanded ? singleVidoeData?.snippet?.localized?.description : readMore}</span>
                      {readMore.length > 200 && (
                        <button onClick={() => setIsExpanded(!isExpanded)} className=' text-sm font-roboto font-medium '> {isExpanded ? 'Show Less' : 'more'}</button>
                      )}
                    </div>
                  </div>
                </div>
                <div className=' relative'>
                  <div className='mt-6 mb-8 flex  flex-col'>
                    <div className='mb-6 flex justify-between'>
                      <div>
                        <h2 className=' dark:text-white bg font-roboto text-base font-semibold'><ViewCount count={singleVidoeData?.statistics?.commentCount} /> Comments</h2>
                      </div>
                      <div className='  lg:hidden'>
                        <button onClick={() => setcloseComments(!closeComments)} className={' rotate-180 px-2' + (closeComments ? "rotate-180 " : "rotate-0 ")}>
                          <span className=' dark:fill-white'>{moreSeenSvg}</span>
                        </button>
                      </div>
                    </div>
                    {userAuth ? (
                      <div className=' flex items-start'>
                        <div className='mr-4'>
                        <img className=' rounded-full w-10'
                    src={userAuth?.payload?.photoURL}
                    alt="User Avatar"
                  
                  />
                        </div>
                        <div className='w-full pb-1 border-b-[1px] dark:border-[#FFFFFF33]'>
                          <input className=' outline-none bg-transparent placeholder:text-[#606060] placeholder:text-sm placeholder:font-roboto text-sm font-roboto' type="text" placeholder='Add a comment...' />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <SingIn />
                      </div>
                    )}
                  </div>
                  <div className={' lg:block flex flex-col md:relative lg:relative ' + (closeComments ? " block " : " hidden")}>
                    <div>
                      <div>
                        {videoComments && videoComments.map((data) => (
                          <div key={data?.[0]?.id} className='mb-8'>
                            <div className=' flex flex-row items-start relative'>
                              <div className='mr-4'>
                                <img className=' rounded-full w-10' src={data?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} alt="User profile" />
                              </div>
                              <div className=' flex flex-col'>
                                <div className='mb-0.5 flex flex-row'>
                                  <span className=' mr-2 text-xs font-roboto font-medium'>{data?.snippet?.topLevelComment?.snippet?.authorDisplayName}</span>
                                  <span className='text-xs font-roboto font-medium dark:text-[#aaa]'><RelativeTimeDisplay date={data?.snippet?.topLevelComment?.snippet?.publishedAt} /></span>
                                </div>
                                <div>
                                  <span className=' text-xs font-roboto font-normal dark:text-white'>{data?.snippet?.topLevelComment?.snippet?.textDisplay}</span>
                                </div>
                                <div className=' flex flex-row gap-1'>
                                  <button className='rotate-180'>
                                    <span className=' dark:fill-slate-500 w-16 h-16 '>{disLike}</span>
                                  </button>
                                  <div className='mr-2'>
                                    <span className=' text-xs font-roboto font-normal text-[#606060] dark:text-[#aaa] '><ViewCount count={data?.snippet?.topLevelComment?.snippet?.likeCount} /></span>
                                  </div>
                                  <button>
                                    <span className=' dark:fill-slate-500 w-16 h-16 '>{disLike}</span>
                                  </button>
                                </div>
                              </div>
                              <div className=' absolute right-0.5'>
                                <span className=' cursor-pointer dark:fill-white'>{VideoMoreSvg}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='pt-6'>
            <div className='w-full flex flex-col'>
          <div>
            {relatedVideos.length ? (
              <div>
                {relatedVideos.map((data) => (
                <div key={data?.id} onClick={() => handleHistroyData(data)} className='md:mb-2 mb-4'>
                  <div className='lg:flex justify-center items-center'>
                    <div className='w-full'>
                      <div className='lg:flex items-start relative'>
                        {/* Image container with fixed width and height */}
                        <div className='relative lg:mr-2 px-1 lg:w-[250px] lg:h-[150px] object-cover cursor-pointer flex-shrink-0 overflow-hidden'>
                          <Link to={`/watch/${data?.id}`}>
                            {/* Image with object-cover to fill container */}
                            <img
                              className='w-full h-full object-cover rounded-lg'
                              src={data?.snippet?.thumbnails?.medium.url}
                              alt=""
                            />
                            {/* Duration overlay */}
                            <div className='absolute bottom-0 right-0'>
                              <div className='m-1'>
                                <span className='text-xs font-roboto bg-[#00000099] dark:text-white rounded-[4px] py-0.5 px-1'>
                                  <DurationDisplay duration={data?.contentDetails?.duration} />
                                </span>
                              </div>
                            </div>
                          </Link>
                        </div>

                        {/* Text and details section */}
                        <div className='lg:mt-0 mt-2 lg:px-0 px-3 flex flex-col  lg:w-[226px]'>
                          <h3 className='mb-1 text-sm font-roboto font-normal dark:text-white overflow-hidden line-clamp-2'>
                            <Link>
                              <span>{data?.snippet?.title}</span>
                            </Link>
                          </h3>
                          <div className='text-xs font-roboto text-[#606060] dark:text-[#aaa]'>
                            <Link className='flex'>
                              <span className='dark:hover:text-white'>{data?.snippet?.channelTitle}</span>
                            </Link>
                          </div>
                          <div className='flex flex-row items-center text-xs font-roboto text-[#606060] dark:text-[#aaa]'>
                            <span><ViewCount count={data?.statistics?.viewCount} /> views</span>
                            <div className='mx-1'>•</div>
                            <span><RelativeTimeDisplay date={data?.snippet.publishedAt} /></span>
                          </div>
                        </div>

                        {/* More button */}
                        <div className='absolute right-0'>
                          <div className='flex items-start justify-end'>
                            <button className='w-5 dark:fill-white'>
                              <span>{VideoMoreSvg}</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            ):(
              <RelatedVideosData/>
            )}
          </div>
            </div>
          </div>


        </div>
      </div>
    </div>

  );
}

export default VideoPlay;
