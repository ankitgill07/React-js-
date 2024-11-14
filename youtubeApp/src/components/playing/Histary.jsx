import React from 'react'
import Container from '../../container/Container'
import { croseSvg, deleteSvg, historyVideoSvg, VideoMoreSvg, youVideoSvg } from '../../assets/Svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DurationDisplay, RelativeTimeDisplay, ViewCount } from '../convert/VideoDataConver'
import { clearAllHistory, deleteVidoeHistory } from '../../utlite/playlist'
import toast from 'react-hot-toast'
import { toggelSideBtn } from '../../utlite/SideBarSlice'
import { activeBtn } from '../../utlite/ActiveSlice'
import SingIn from '../SingIn'

function Histary() {
const history = useSelector((state) => state.playlistSlice.history) 
const userAuth = useSelector((state) => state.loginSlice.userData)
const reverseHistroy = history ? history.slice().reverse() : [];
const dispatch = useDispatch()



const handlehistoryDelete = (reversedIndex) => {
  const originalIndex = history.length - 1 - reversedIndex; 
  if (history.length > 1) {
    const newArr = [...history];
    newArr.splice(originalIndex, 1);
    dispatch(deleteVidoeHistory(newArr));
    toast.success("Selected video removed from history");
  } else {
    handleClearHistroy();
    toast.success("Watch history cleared");
  }
}


const handleClearHistroy = () => {
dispatch(clearAllHistory())
}



const handletoggleSide = () => {
  dispatch(activeBtn("watch"))
  dispatch(toggelSideBtn())
}

  return (
<Container>
{userAuth ? ( 
  <div className=' max-w-7xl mx-auto  flex  '>

<div>
<div>
<div className='w-full pt-6 pb-1'>
<h1 className='text-4xl font-roboto font-bold dark:text-white'>Watch history</h1>
</div>
<div className='w-full lg:pr-4 pt-4 pb-6 relative' >
<div className=' flex flex-col justify-start items-center'>
  {history.length === 0 ? (
      <div className=' max-w-6xl mx-auto '>
      <div>
      <div className='w-full pt-6 pb-1'>
      <h1 className='text-4xl font-roboto font-bold dark:text-white'>Watch history</h1>
      </div>
      <div className='w-full pr-40 pt-4 relative' >
      <div className=' flex flex-col justify-start items-center'>
      <div>
        </div>
        </div>
        </div>
      </div>
         <div className=' text-center'>
         <span className=' text-sm font-roboto  text-[#fff]'>This list has no videos.</span>
         </div>
        </div>
  ):(
<div>
  {reverseHistroy && reverseHistroy.map((data, index) => (
    <div key={data?.id} className="mt-4">
      <div className="w-full flex justify-start items-center">
        <div className="">
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            <div onClick={handletoggleSide} className="relative  object-fill md:mr-2 px-1">
              <Link to={`/watch/${data?.id}`}>
                <div className=" overflow-hidden rounded-lg">
                  <img
                    className="w-full h-full object-cover"
                    src={data?.snippet?.thumbnails?.medium?.url}
                    alt=""
                  />
                </div>
                <div className="absolute bottom-0 right-0">
                  <div className="m-2">
                    <span className="text-xs font-roboto bg-[#00000099] text-white  rounded-[4px] py-0.5 px-1">
                      <DurationDisplay duration={data?.contentDetails?.duration} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="md:mt-0 flex flex-row justify-between">
              <div className="flex  flex-col overflow-x-hidden">
                <h3 className="text-base font-roboto font-normal dark:text-white overflow-y-hidden line-clamp-2">
                  <Link>
                    <div>{data?.snippet?.title}</div>
                  </Link>
                </h3>
                <div className="flex flex-row gap-2 text-[#606060] dark:text-[#aaa]">
                  <div className="text-xs flex flex-row items-center font-roboto ">
                    <Link className="flex">
                      <span className="dark:hover:text-white block">
                        {data?.snippet?.channelTitle}
                      </span>
                    </Link>
                  </div>
                  <div className="flex items-center text-xs font-roboto ">
                    <span>
                      <ViewCount count={data?.statistics?.viewCount} /> views
                    </span>
                  </div>
                </div>
                <div className="mb-2 pt-2">
                  <span className="text-xs font-roboto line-clamp-2 text-[#606060] dark:text-[#aaa]">{data?.snippet.description}</span>
                </div>
              </div>
              <div className="absolute right-0 ml-2">
                <div className="flex items-start gap-4 justify-end">
                  <button onClick={() => handlehistoryDelete(index)} className="w-5 dark:fill-white">
                    <span>{croseSvg}</span>
                  </button>
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
  )}

</div>
</div>
</div>
<div className='mb-5'>
<button onClick={handleClearHistroy} className=' flex flex-row gap-2 p-2 rounded-full dark:fill-white dark:hover:bg-[#FFFFFF19]'>
  <span>{deleteSvg}</span>
  <span>Clear all watch history</span>
</button>

</div>
</div>
</div>
) : (
<div className='w-full flex justify-center pt-[140px]'>
    <div className='w-full grid justify-center  dark:fill-white'>
    <div className='w-32 ml-16'>
    {historyVideoSvg}
    </div>
      <div className='  my-6  text-center'>
        <h3 className=' text-2xl font-roboto font-normal pb-2 '>Keep track of what you watch</h3>
        <span className=' text-xs font-roboto '>Watch history isn't viewable when you're signed out.</span>
         <div className=' w-28 ml-24 mt-2'>
          <SingIn/>
         </div>
      </div>
    </div>
</div>
)}
</Container>
  )
}

export default Histary