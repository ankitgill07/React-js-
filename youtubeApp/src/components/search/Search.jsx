import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Container from '../../container/Container'
import { VideoMoreSvg } from '../../assets/Svg'
import { YOUTUBE_API_KEY, YOUTUBE_APP_URL } from '../../api'
import { DurationDisplay, RelativeTimeDisplay, ViewCount } from '../convert/VideoDataConver'
import { vidoeHiatory } from '../../utlite/playlist'
import { activeBtn } from '../../utlite/ActiveSlice'
import { toggelSideBtn } from '../../utlite/SideBarSlice'
import { SearchData } from '../DummyData'

function Search() {
  const [sreachQueary, setSreachQueary] = useState([])
  const [allVideoDetaily, setAllVideoDetaily] = useState([])
  const [channel, setChannel] = useState([])
  const { q } = useParams()
  const sreachResponse = useSelector((state) => state.sreachSlice.query)

  const showSuggestion = async () => {
    try {
      const sreachData = await fetch(`${YOUTUBE_APP_URL}search?part=snippet&regionCode=IN&q=${sreachResponse}&type=video&maxResults=50&key=${YOUTUBE_API_KEY}`)
      const searchResult = await sreachData.json()
      console.log(searchResult?.items);
      setSreachQueary(searchResult?.items)
      const videoId = searchResult?.items?.map((data) => data?.id?.videoId)
      const channelId = searchResult?.items?.map((data) => data?.snippet?.channelId)
      const uniqueChannelIds = [...new Set(channelId)];
      if (videoId) {
        const videoDeatily = await fetch(`${YOUTUBE_APP_URL}videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`)
        const videoResult = await videoDeatily.json()
        setAllVideoDetaily(videoResult?.items)
      }
      if (uniqueChannelIds.length) {
        const channelDeatily = await fetch(`${YOUTUBE_APP_URL}channels?part=snippet,contentDetails,statistics&id=${uniqueChannelIds.join(',')}&key=${YOUTUBE_API_KEY}`);
        const channelResult = await channelDeatily.json();

        // Store channel data in a map by channelId for easy lookup
        const channelDataMap = {};
        channelResult.items.forEach((item) => {
          channelDataMap[item.id] = item;
        });

        setChannel(channelDataMap);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    showSuggestion();
  }, [sreachResponse])

  const histroy = useSelector((state) => state.playlistSlice.history)
  const dispatch = useDispatch()

  const handleVideoHistroy = (videoData) => {
    dispatch(activeBtn("watch"));
    dispatch(toggelSideBtn());
    
    // Find the details for the clicked video
    const videoDetail = allVideoDetaily.find((video) => video.id === videoData.id.videoId);
  
    // Dispatch only videoDetail if it exists and is not already in history
    if (videoDetail && !histroy.find((video) => video.id === videoDetail.id)) {
      dispatch(vidoeHiatory(videoDetail));
    }
  };

  return (
    <Container>
     <div className='md:px-6 md:pb-4 lg:px-6 lg:pb-4 pt-2'>
  <div className='max-w-7xl mx-auto dark:text-white relative'>
{sreachQueary.length ? (
      <div className='grid grid-cols-1 '>
      {sreachQueary && sreachQueary.map((data) => {
        const channelData = channel[data.snippet.channelId];
        return (
          <div key={data.id.videoId} className='mt-4'>
            <div className='flex justify-center items-center'>
              <div className='w-full'>
                <div className='lg:flex items-start relative'>
                  <div onClick={() => handleVideoHistroy(data)} className='relative md:mr-2 px-1'>
                    <Link to={`/watch/${data?.id?.videoId}`}>
                      {/* Image container with fixed dimensions */}
                      <div className='relative lg:w-[500px] h-full overflow-hidden'>
                        <img 
                          className='w-full h-full object-cover rounded-lg' 
                          src={data?.snippet?.thumbnails?.medium?.url} 
                          alt="" 
                        />
                        <div className='absolute bottom-0 right-0'>
                          <div className='m-1'>
                            <span className='text-xs font-roboto bg-[#00000099] text-white rounded-[4px] py-0.5 px-1'>
                              <DurationDisplay duration={allVideoDetaily.find(video => video.id === data?.id.videoId)?.contentDetails?.duration} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className='md:mt-0 mt-2 flex flex-row justify-between'>
                    <div className='md:pr-6 flex flex-col overflow-x-hidden'>
                      <h3 className='mb-1 text-base font-roboto font-normal dark:text-white overflow-y-hidden line-clamp-2'>
                        <Link>
                          <div>{data?.snippet?.title}</div>
                        </Link>
                      </h3>
                      <div className='flex flex-row'>
                        <div className='flex items-center text-xs font-roboto text-[#606060] dark:text-[#aaa]'>
                          <span><ViewCount count={allVideoDetaily.find(video => video.id === data?.id.videoId)?.statistics?.viewCount} /> views</span>
                          <div className='mx-1'>•</div>
                          <span><RelativeTimeDisplay date={data?.snippet?.publishTime} /></span>
                        </div>
                      </div>
                      <div className='text-xs flex flex-row items-center font-roboto py-3 text-[#606060] dark:text-[#aaa]'>
                        <div className='mr-2 cursor-pointer'>
                          <div className='w-[23px] h-[23px]'>
                            <img className='rounded-full' src={channelData?.snippet?.thumbnails?.default?.url} alt="" />
                          </div>
                        </div>
                        <Link className='flex'>
                          <span className='dark:hover:text-white block'>{data?.snippet?.channelTitle}</span>
                        </Link>
                      </div>
                      <div>
                        <span className='text-xs font-roboto line-clamp-1 text-[#606060] dark:text-[#aaa]'>{data?.snippet?.description}</span>
                      </div>
                    </div>
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
          </div>
        );
      })}
    </div>
):(
<SearchData/>
)}
  </div>
</div>


    </Container>

  )
}

export default Search