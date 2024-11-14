import React from 'react'
import Container from '../../container/Container'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { DurationDisplay, RelativeTimeDisplay, ViewCount } from '../convert/VideoDataConver';
import { VideoMoreSvg } from '../../assets/Svg';
import { toggelSideBtn } from '../../utlite/SideBarSlice';
import { activeBtn } from '../../utlite/ActiveSlice';

function WatchLater() {
const  watchLater = useSelector((state) => state.playlistSlice.watchLater)
const reverseWatchLater = watchLater ? watchLater.slice().reverse() : [];

const dispatch = useDispatch()

const handletoggleSide = () => {
  dispatch(activeBtn("watch"))
  dispatch(toggelSideBtn())
}

  return (
    <Container>
    <div className=' max-w-6xl mx-auto md:flex justify-start'>
    <div>
    <div className='w-full pt-6 pb-1'>
    <h1 className='text-4xl font-roboto font-bold dark:text-white'>Watch Later </h1>
    </div>
    <div className='w-full  pt-4 relative' >
    <div className=' flex flex-col justify-start '>
    <div>
    {reverseWatchLater && reverseWatchLater.map((data, index) => (
  <div key={data?.id} className='dark:hover:bg-[#272727] px-4 py-2 rounded-2xl cursor-pointer relative'>
    <div className='w-full  grid grid-cols-1  md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1'>
      <div className='flex items-center'>
        <div className='md:flex w-full items-start'>
          <div onClick={handletoggleSide} className='relative  md:mr-2 px-1'>
            <Link to={`/watch/${data?.id}`}>
              {/* Image container with fixed dimensions */}
              <div className='relative w-full overflow-hidden'>
                <img 
                  className='w-full  object-cover rounded-lg' 
                  src={data?.snippet?.thumbnails?.medium?.url} 
                  alt="" 
                />
                <div className='absolute bottom-0 right-0'>
                  <div className='m-2'>
                    <span className='text-xs font-roboto bg-[#00000099] text-white rounded-[4px] py-0.5 px-1'>
                      <DurationDisplay duration={data?.contentDetails?.duration} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className='md:mt-0 flex flex-row justify-between'>
            <div className='flex pr-5 flex-col overflow-x-hidden'>
              <h3 className='text-base font-roboto font-normal dark:text-white overflow-y-hidden line-clamp-2'>
                <Link>
                  <div>{data?.snippet?.title}</div>
                </Link>
              </h3>
              <div className='flex flex-row bg-transparent text-[#606060] dark:text-[#aaa]'>
                <div className='text-xs flex flex-row items-center font-roboto '>
                  <Link className='flex'>
                    <span className='dark:hover:text-white block'>{data?.snippet?.channelTitle}</span>
                  </Link>
                  <div className='mx-1'>•</div>
                </div>
                <div className='flex items-center text-xs font-roboto '>
                  <span><ViewCount count={data?.statistics?.viewCount} /> views</span>
                  <div className='mx-1'>•</div>
                  <span><RelativeTimeDisplay date={data?.snippet?.publishedAt} /></span>
                </div>
              </div>
            </div>
            <div className='absolute right-0'>
              <div className='flex items-start gap-4 justify-end'>
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
))}

    </div>
    
    </div>
    </div>
    </div>
    </div>
    </Container>
  )
}

export default WatchLater