import React, { useEffect, useState } from 'react'
import { allSubscribe, signInSvg } from '../../assets/Svg'
import { firstNavBarItems, withSing } from './SideBar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { activeBtn } from '../../utlite/ActiveSlice'
import { toggelSideBtn } from '../../utlite/SideBarSlice'
import { MenuSvg, youtubeSvg } from '../../assets/Svg'
import SingIn from '../SingIn'
function LeftBar() {

    const useData = useSelector((state) => state.loginSlice.userData)
    const active = useSelector((state) => state.activeSlice.active)
    const toggleSide = useSelector((state) => state.toggleSideBarSlice.toggleSideBar)
    const subscribe = useSelector((state) => state.playlistSlice.Subscribe)
    const reverseSubscribe = subscribe ? subscribe.slice().reverse() : [];

    const dispatch = useDispatch()



    return (
        <div className='w-full relative'>
            <div
                onClick={() => dispatch(toggelSideBtn())}
                className={`${!(toggleSide && active === "watch") ? "md:hidden" : ""} w-full bg-black/65 dark:bg-black/50 fixed top-0 z-10 h-full overflow-hidden`}>

            </div>
            <div className='w-[240px] md:mt-14  fixed  z-30 bg-transparent h-full overflow-hidden custom-scrollbar bg-white  dark:bg-[#0F0F0F] dark:text-white dark:fill-white ' style={{ width: "calc(100% -12px)" }}>
                <div className=' flex-1'>
                    <div className='relative '>
                        <div className='lg:hidden md:hidden min-w-[240px] fixed top-0 dark:bg-[#0F0F0F]  flex pl-4 flex-row items-center'>
                            <div className='md:px-1 md:pb-0 px-2 py-1 hover:bg-[#D9D9D9]  dark:hover:bg-[#3D3D3D] rounded-full'>
                                <button onClick={() => dispatch(toggelSideBtn())}>
                                    <span className='hidden md:flex'>{MenuSvg}</span>
                                    <span className='md:hidden'><i class="fa-solid fa-bars"></i></span>
                                </button>
                            </div>
                            <div>
                                <Link to="/">
                                    <div className='flex relative'>
                                        <div className='py-[18px] px-[14px] '>
                                            <div className='w-[90px] dark:fill-white'>
                                                {youtubeSvg}
                                            </div>
                                        </div>
                                        <span className=' absolute right-0 top-2.5 text-[11px] dark:text-white text-gray-700'>IN</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='md:mt-0 mt-14 xs:mt-14'>
                            {firstNavBarItems.map((items, i) => (
                                <div key={i} className='p-3 border-b-[1px] dark:border-b-[#FFFFFF19]'>
                                    <div>
                                        {items.map((data, i) => (
                                            <>
                                                {data.name === "History" ? (
                                                    <div>
                                                        {useData ? (
                                                            <div>
                                                                {withSing.map((data, i) => (
                                                                    <div key={i} className='w-full'>
                                                                        <div className={
                                                                            'w-full px-3 cursor-pointer flex items-center dark:hover:bg-[#FFFFFF19] rounded-[10px] min-h-10 hover:bg-[#0808080D] ' +
                                                                            (active === data.name ? "bg-[#0808080D] dark:bg-[#FFFFFF19] font-roboto font-medium " : "bg-transparent ")
                                                                        }>                                        
                                                                                {data.path ? (
                                                                                    <div onClick={() => dispatch(activeBtn(data.name))} className='w-full'>
                                                                                    <Link to={data.path}>
                                                                                        <div className='flex w-full'>
                                                                                            <div className='mr-[24px] dark:fill-white'>
                                                                                                {active === data.name ? <span>{data.darkSvg}</span> : <span>{data.svg}</span>}
                                                                                            </div>
                                                                                            <div>
                                                                                                <span className='text-sm font-roboto'>{data.name}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Link>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className='flex w-full'>
                                                                                        <div className='mr-[24px] dark:fill-white'>
                                                                                            {active === data.name ? <span>{data.darkSvg}</span> : <span>{data.svg}</span>}
                                                                                        </div>
                                                                                        <div>
                                                                                            <span className='text-sm font-roboto'>{data.name}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                       
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {data.name === "SignIn" ? (
                                                    <div>
                                                        {useData ? (
                                                            <div>
                                                                {subscribe.length >= 1 ? (
                                                                    <div>
                                                                        <div className='pt-[6px]  pb-1 px-3'><h3 className='text-base font-roboto font-medium'>Subscriptions</h3></div>
                                                                        <div className=' flex flex-col justify-center'>
                                                                            {reverseSubscribe.map((channel) => (
                                                                                <div className=' px-3 flex cursor-pointer gap-2 flex-row items-center hover:bg-[#0808080D] dark:hover:bg-[#FFFFFF19] py-2 rounded-[10px]'>
                                                                                    <div className='w-6 '>
                                                                                        <img className='rounded-full' src={channel?.snippet?.thumbnails?.default?.url} alt="" />
                                                                                    </div>
                                                                                    <div>
                                                                                        <span className='text-xs font-roboto line-clamp-1'>{channel?.snippet?.title}</span>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <Link to={'/feed/channels'}>
                                                                            <button onClick={() => dispatch(activeBtn("/feed/channels"))} className={'px-3 flex gap-2 flex-row items-center hover:bg-[#0808080D] dark:hover:bg-[#FFFFFF19] py-2 rounded-[10px] ' + (active === "/feed/channels" ? "bg-[#0808080D] dark:bg-[#FFFFFF19]  font-roboto font-medium " : "bg-transparent ")}>
                                                                                <span>{allSubscribe}</span>
                                                                                <span className='text-sm font-roboto '>All subscriptions</span>
                                                                            </button>
                                                                        </Link>
                                                                    </div>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <div className='px-5 py-1'>
                                                                    <span className='text-sm font-roboto line-clamp-2'>Sign in to like videos,<br /> comment and subscribe.</span>
                                                                    <div className='mt-3 w-[99px] '>
                                                                        <SingIn />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                ) : (
                                                    <div className=''>
                                                        {data.title ? <div className='pt-[6px]  pb-1 px-3'><h3 className='text-base font-roboto font-medium'>{data.title}</h3></div> : ""}
                                                        <div key={i} className='w-full'>
                                                            <div className={'w-full px-3 cursor-pointer flex items-center dark:hover:bg-[#FFFFFF19]  rounded-[10px] min-h-10 hover:bg-[#0808080D]  ' + (active === data.name ? "bg-[#0808080D] dark:bg-[#FFFFFF19]  font-roboto font-medium " : "bg-transparent ")}>

                                                                {data?.path ? (
                                                                    <div onClick={() => dispatch(activeBtn(data.name))} className='w-full'>
                                                                        <Link to={`${data.path}`}>
                                                                            <div className=' flex w-full'>
                                                                                <div className='mr-[24px] dark:fill-white'>
                                                                                    {active === data.name ? <span>
                                                                                        {data.darkSvg}
                                                                                    </span>
                                                                                        : <span>
                                                                                            {data.svg}
                                                                                        </span>
                                                                                    }
                                                                                </div>
                                                                                <div>
                                                                                    <span className='text-sm font-roboto'>
                                                                                        {data.name}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                ) : (
                                                                    <div className='flex w-full'>
                                                                        <div className='mr-[24px] dark:fill-white'>
                                                                            {active === data.name ? <span>{data.darkSvg}</span> : <span>{data.svg}</span>}
                                                                        </div>
                                                                        <div>
                                                                            <span className='text-sm font-roboto'>{data.name}</span>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className=''>
                            <div className='pt-4 px-8 '>
                                <span className='text-xs font-roboto font-medium text-gray-800 dark:text-[#aaa] line-clamp-3'>About Press Copyright Contact us Creator Advertise Developers</span>
                            </div>
                            <div className='pt-4 px-8 '>
                                <span className='text-xs font-roboto font-medium text-gray-800 dark:text-[#aaa] line-clamp-3'>Terms Privacy  Policy & Safety How YouTube works Test new features</span>
                            </div>
                            <div className='py-4 px-8'>
                                <span className='text-xs font-roboto text-[#909090] dark:text-[#aaa] font-normal'>© 2024 Google LLC</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBar