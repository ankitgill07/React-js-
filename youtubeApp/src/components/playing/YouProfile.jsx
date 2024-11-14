import React from 'react'
import Container from '../../container/Container'
import { useDispatch, useSelector } from 'react-redux'
import SingIn from '../SingIn'
import { VideoMoreSvg, youVideoSvg } from '../../assets/Svg'
import { Link } from 'react-router-dom'
import { RelatedVideosData } from '../DummyData'
import { DurationDisplay, RelativeTimeDisplay, ViewCount } from '../convert/VideoDataConver'
import { activeBtn } from '../../utlite/ActiveSlice'
import { toggelSideBtn } from '../../utlite/SideBarSlice'

function YouProfile() {
  const userAuth = useSelector((state) => state.loginSlice.userData)

  const history = useSelector((state) => state.playlistSlice.history)

  const reverseHistory = history ? history.slice().reverse() : [];

  const likeVideo = useSelector((state) => state.playlistSlice.likeVideo)

  const reverseLikeVideo = likeVideo ? likeVideo.slice().reverse() : [];

  const watchLater = useSelector((state) => state.playlistSlice.watchLater)

  const reverseWatchLater = watchLater ? watchLater.slice().reverse() : [];


  const dispatch = useDispatch()

  const handleToggelSideBar = () => {
    dispatch(activeBtn("watch"))
    dispatch(toggelSideBtn())
  }
  return (
    <>
      <Container>
        {userAuth ? (
          <div className=' max-w-7xl mx-auto '>
            <div className=' w-full flex flex-col justify-start gap-6 '>
              <div className=' pt-6 pb-1 flex flex-wrap items-center '>
                <div className=' mr-4'>
                  <img className=' rounded-full'
                    src={userAuth?.payload?.photoURL}
                    alt="User Avatar"
                 
                  />
                </div>
                <div className=' flex flex-col text-[#606060] dark:text-[#aaa]'>
                  <h1 className=' text-3xl font-roboto font-bold text-black dark:text-white'>{userAuth?.payload?.displayName}</h1>
                  <div>
                    <span className=' text-xs font-roboto '>@{userAuth?.payload?.displayName?.replace(/\s+/g, "")}</span>
                    <span className='text-xs font-roboto '> • </span>
                    <span className='text-xs font-roboto '>View channel</span>
                  </div>
                </div>
              </div>
              <div className=' flex flex-col'>
                {history.length ? (
                  <div className=' flex justify-between'>
                    <div>
                      <h4 className=' text-lg font-roboto font-medium'>History</h4>
                    </div>
                    <div>
                      <Link to="/history">
                        <button onClick={() => dispatch(activeBtn("History"))} className=' border-[1px] dark:border-[#FFFFFF19] rounded-full px-3 py-1 text-sm font-roboto font-medium'>View all</button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="pt-3 mb-6">
                  <div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                      {reverseHistory &&
                        reverseHistory.slice(0, 6).map((data) => (
                          <div key={data.id}>
                            <div className="w-full flex">
                              <div className="w-full">
                                <div className="w-full flex flex-col relative">
                                  <div onClick={handleToggelSideBar} className="w-full relative ">
                                    <Link to={`/watch/${data?.id}`}>
                                      <div className="w-full">
                                        <img className="w-full rounded-lg" src={data?.snippet?.thumbnails?.medium?.url} alt="" />
                                      </div>
                                      <div className="absolute bottom-0.5 right-0">
                                        <div className="mx-2">
                                          <span className="text-xs font-roboto bg-[#00000099] text-white rounded-[4px] py-0.5 px-1">
                                            <DurationDisplay duration={data?.contentDetails?.duration} />
                                          </span>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                  <div className="flex flex-row relative">
                                    <div className="pr-4 flex flex-col overflow-x-hidden">
                                      <h3 className="mt-3 mb-1 text-xs font-roboto font-semibold overflow-hidden line-clamp-1">
                                        <Link>
                                          <div className="line-clamp-1">{data?.snippet?.title}</div>
                                        </Link>
                                      </h3>
                                      <div className="flex flex-col text-[#606060] dark:text-[#aaa]">
                                        <div className="text-xs font-roboto ">
                                          <Link className="flex">
                                            <span className="dark:hover:text-white">{data?.snippet?.channelTitle}</span>
                                          </Link>
                                        </div>
                                        <div className="flex items-center text-xs font-roboto ">
                                          <span>
                                            <ViewCount count={data?.statistics?.viewCount} /> views
                                          </span>
                                          <div className="mx-1">•</div>
                                          <span>
                                            <RelativeTimeDisplay date={data?.snippet?.publishedAt} />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="absolute right-0">
                                      <div className="flex items-start justify-end mt-2">
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
                  </div>
                </div>

              </div>
              <div className=' flex flex-col'>
                {likeVideo.length ? (
                  <div className=' flex justify-between'>
                    <div className=' flex items-center gap-2'>
                      <h4 className=' text-lg font-roboto font-medium'>Like Video </h4>
                      <span className=' text-xs font-roboto text-[#aaa]'>{likeVideo.length}</span>
                    </div>
                    <div>
                      <Link to="/playlist/list=LL">
                        <button onClick={() => dispatch(activeBtn("Liked videos"))} className=' border-[1px] dark:border-[#FFFFFF19] rounded-full px-3 py-1 text-sm font-roboto font-medium'>View all</button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className=' pt-3 mb-6  '>
                  <div >
                    <div className=' grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 '>
                      {reverseLikeVideo && reverseLikeVideo.slice(0, 6).map((data) => (
                        <div>
                          <div className='flex justify-center  items-center'>
                            <div className={'md:w-[210px] '}>
                              <div className='flex  flex-col relative'>
                                <div onClick={handleToggelSideBar} className='relative object-fill'>
                                  <Link to={`/watch/${data?.id}`}>
                                    <div className='object-fill'>
                                      <img className='w-full rounded-lg  ' src={data?.snippet?.thumbnails?.medium?.url} alt="" />
                                    </div>
                                    <div className=' absolute bottom-0.5 right-0 '>
                                      <div className='mx-2'>
                                        <span className='text-xs font-roboto bg-[#00000099] text-white rounded-[4px] py-0.5 px-1'><DurationDisplay duration={data?.contentDetails?.duration} /></span>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                                <div className=' flex flex-row  relative'>
                                  <div className='pr-4 flex flex-col overflow-x-hidden'>
                                    <h3 className='mt-3 mb-1 text-xs   font-roboto font-semibold  overflow-y-hidden line-clamp-2'>
                                      <Link>
                                        <div className=' line-clamp-2'>
                                          {data?.snippet?.title}
                                        </div>
                                      </Link>
                                    </h3>
                                    <div className='flex flex-col text-[#606060] dark:text-[#aaa]'>
                                      <div className='text-xs font-roboto '>
                                        <Link className=' flex'>
                                          <span className=' dark:hover:text-white'>{data?.snippet?.channelTitle}</span>
                                        </Link>
                                      </div>
                                      <div className=' flex items-center text-xs font-roboto '>
                                        <span><ViewCount count={data?.statistics?.viewCount} /> views</span>
                                        <div className='mx-1'>•</div>
                                        <span><RelativeTimeDisplay date={data?.snippet?.publishedAt} /></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className=' absolute right-0'>
                                    <div className='flex items-start justify-end mt-2'>
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
              <div className=' flex flex-col'>
                {watchLater.length ? (
                  <div className=' flex justify-between'>
                    <div className=' flex items-center gap-2'>
                      <h4 className=' text-lg font-roboto font-medium'>Watch Later </h4>
                      <span className=' text-xs font-roboto text-[#aaa]'>{watchLater.length}</span>
                    </div>
                    <div>
                      <Link to="/playlist/list=WL">
                        <button onClick={() => dispatch(activeBtn("Watch Later"))} className=' border-[1px] dark:border-[#FFFFFF19] rounded-full px-3 py-1 text-sm font-roboto font-medium'>View all</button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className=' pt-3 mb-6  '>
                  <div >
                    <div className=' grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2  '>
                      {reverseWatchLater && reverseWatchLater.slice(0, 6).map((data) => (
                        <div>
                          <div className='flex justify-center  items-center'>
                            <div className={'md:w-[210px] '}>
                              <div className='flex  flex-col relative'>
                                <div onClick={handleToggelSideBar} className='relative object-fill'>
                                  <Link to={`/watch/${data?.id}`}>
                                    <div className='object-fill'>
                                      <img className='w-full rounded-lg  ' src={data?.snippet?.thumbnails?.medium?.url} alt="" />
                                    </div>
                                    <div className=' absolute bottom-0.5 right-0 '>
                                      <div className='mx-2'>
                                        <span className='text-xs font-roboto bg-[#00000099] text-white rounded-[4px] py-0.5 px-1'><DurationDisplay duration={data?.contentDetails?.duration} /></span>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                                <div className=' flex flex-row  relative'>
                                  <div className='pr-4 flex flex-col overflow-x-hidden'>
                                    <h3 className='mt-3 mb-1 text-xs   font-roboto font-semibold  overflow-y-hidden line-clamp-2'>
                                      <Link>
                                        <div className=' line-clamp-2'>
                                          {data?.snippet?.title}
                                        </div>
                                      </Link>
                                    </h3>
                                    <div className='flex flex-col text-[#606060] dark:text-[#aaa]'>
                                      <div className='text-xs font-roboto '>
                                        <Link className=' flex'>
                                          <span className=' dark:hover:text-white'>{data?.snippet?.channelTitle}</span>
                                        </Link>
                                      </div>
                                      <div className=' flex items-center text-xs font-roboto '>
                                        <span><ViewCount count={data?.statistics?.viewCount} /> views</span>
                                        <div className='mx-1'>•</div>
                                        <span><RelativeTimeDisplay date={data?.snippet?.publishedAt} /></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className=' absolute right-0'>
                                    <div className='flex items-start justify-end mt-2'>
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
          </div>
        ) :
          (
            <div className='w-full flex justify-center pt-[140px]'>
              <div className='w-full grid justify-center  dark:fill-white'>
                <div className='w-32 ml-16'>
                  {youVideoSvg}
                </div>
                <div className='  my-6  text-center'>
                  <h3 className=' text-2xl font-roboto font-normal pb-2 '>Enjoy your favourite videos</h3>
                  <span className=' text-xs font-roboto '>Sign in to access videos that you've liked or saved</span>
                  <div className=' w-28 ml-16 mt-2'>
                    <SingIn />
                  </div>
                </div>
              </div>
            </div>
          )}
      </Container>
    </>
  )
}

export default YouProfile