import React from 'react'
import { useSelector } from 'react-redux'
import { DurationDisplay, RelativeTimeDisplay, ViewCount } from '../convert/VideoDataConver'
import { Link } from 'react-router-dom'
import { croseSvg, VideoMoreSvg } from '../../assets/Svg'
import Container from '../../container/Container'

function LikeVideo() {
const likeVideo = useSelector((state) => state.playlistSlice.likeVideo)
const  reverseLikeVideo = likeVideo ? likeVideo.slice().reverse() : [];
  return (
    <Container>
<div className=' max-w-6xl mx-auto md:flex justify-start'>
<div>
<div className='w-full pt-6 pb-1'>
<h1 className='text-4xl font-roboto font-bold dark:text-white'>Liked videos</h1>
</div>
<div className='w-full  pt-4 relative' >
<div className=' flex flex-col justify-start '>
<div>
{reverseLikeVideo && reverseLikeVideo.map((data, index) => (
  <div key={data?.id} className='dark:hover:bg-[#272727] px-4 py-2 rounded-2xl cursor-pointer relative'>
    <div className='grid grid-cols-1'>
      <div className='w-full md:flex items-center'>
        <div className='pr-3'>
          <span>{index + 1}</span>
        </div>
        <div className='md:flex items-start'>
          {/* Image container with fixed aspect ratio */}
          <div className='relative w-full md:w-[300px] aspect-video md:mr-2 px-1 overflow-hidden'>
            <Link to={`/watch/${data?.id}`}>
              {/* Image fills container with w-full and h-full */}
              <img 
                className='w-full h-full object-cover rounded-lg' 
                src={data?.snippet?.thumbnails?.medium?.url} 
                alt="" 
              />
              {/* Duration overlay */}
              <div className='absolute bottom-0 right-0'>
                <div className='m-2'>
                  <span className='text-xs font-roboto bg-[#00000099] text-white rounded-[4px] py-0.5 px-1'>
                    <DurationDisplay duration={data?.contentDetails?.duration} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Video details */}
          <div className='md:mt-0 flex flex-col text-[#606060] dark:text-[#aaa] justify-between w-full'>
            <div className='pr-5'>
              <h3 className='text-base font-roboto font-normal dark:text-white line-clamp-2'>
                <Link>
                  <div>{data?.snippet?.title}</div>
                </Link>
              </h3>
              <div className='flex flex-row'>
                <div className='text-xs flex items-center font-roboto '>
                  <Link className='flex'>
                    <span className='dark:hover:text-white'>{data?.snippet?.channelTitle}</span>
                  </Link>
                  <div className='mx-1'>•</div>
                </div>
                <div className='flex items-center text-xs font-roboto '>
                  <span><ViewCount count={data?.statistics?.viewCount}/> views</span>
                  <div className='mx-1'>•</div>
                  <span><RelativeTimeDisplay date={data?.snippet?.publishedAt} /></span>
                </div>
              </div>
            </div>
            
            {/* More options button */}
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

export default LikeVideo