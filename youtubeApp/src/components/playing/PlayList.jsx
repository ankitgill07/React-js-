import React from 'react'
import Container from '../../container/Container'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { activeBtn } from '../../utlite/ActiveSlice'
import { playlistSvg } from '../../assets/Svg'

function PlayList() {

    const dispatch = useDispatch()
    const likeVideo = useSelector((state) => state.playlistSlice.likeVideo)
    const reverseLikeVideo =  likeVideo[likeVideo.length - 1];
    const watchLater =  useSelector((state) => state.playlistSlice.watchLater)
    const recentWatch = watchLater[watchLater.length - 1]
  return (
<Container>
      <div className='pl-6 pt-4'>
        <div>
          <h2 className='text-3xl font-roboto font-bold'>Playlists</h2>
        </div>
        <div className='flex flex-wrap gap-3 pt-4'>
            <div>
            {recentWatch ? (
             <Link to="/playlist/list=WL">
             <div onClick={() => dispatch(activeBtn("Liked videos"))} className='flex flex-col'>
               <div className='pb-2 w-[291px] relative'>
                 {/* Display only the most recent liked video thumbnail */}
                 {recentWatch && (
                   <img 
                     className='rounded-lg' 
                     src={recentWatch?.snippet?.thumbnails?.medium?.url}
                     alt=""
                   />
                 )}
                 <div className=' absolute bottom-2 right-0 m-1'>
                     <button className=' text-xs flex items-center gap-1 bg-[#00000099] rounded-[4px] font-medium py-0.5 px-1 font-roboto text-white'>
                         <span>{playlistSvg}</span>
                         <span>{watchLater.length} videos</span>
                     </button>
                 </div>
               </div>
               <div className='flex flex-col gap-1'>
                 <span className='text-sm font-roboto font-medium'>Liked videos</span>
                 <span className='dark:hover:text-white text-sm font-roboto font-medium text-[#606060] dark:text-[#aaa]'>View full playlist</span>
               </div>
             </div>
           </Link>
         ) : (
          ""
         )}
            </div>
                     {reverseLikeVideo ? (
             <Link to="/playlist/list=LL">
             <div onClick={() => dispatch(activeBtn("Liked videos"))} className='flex flex-col'>
               <div className='pb-2 w-[291px] relative'>
                 {/* Display only the most recent liked video thumbnail */}
                 {reverseLikeVideo && (
                   <img 
                     className='rounded-lg' 
                     src={reverseLikeVideo?.snippet?.thumbnails?.medium?.url}
                     alt=""
                   />
                 )}
                 <div className=' absolute bottom-2 right-0 m-1'>
                     <button className=' text-xs flex items-center gap-1 bg-[#00000099] rounded-[4px] font-medium py-0.5 px-1 font-roboto text-white'>
                         <span>{playlistSvg}</span>
                         <span>{likeVideo.length} videos</span>
                     </button>
                 </div>
               </div>
               <div className='flex flex-col gap-1'>
                 <span className='text-sm font-roboto font-medium'>Liked videos</span>
                 <span className='dark:hover:text-white text-sm font-roboto font-medium text-[#606060] dark:text-[#aaa]'>View full playlist</span>
               </div>
             </div>
           </Link>
         ) : (
          ""
         )}
        </div>
      </div>
    </Container>
  
  )
}

export default PlayList