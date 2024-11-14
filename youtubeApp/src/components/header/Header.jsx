import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MenuSvg, youtubeSvg, smallSearchSvg, SearchSvg, mikeSvg, SettingSvg, signInSvg, leftArrowSvg, correctSvg, notificationsSvg, uploadVideoSvg, cancelSvg } from "../../assets/Svg"
import { firstNavBarItems, closeNavBarItems, moreSetting } from './SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { applyDark, applyLight } from '../../utlite/ThemeSlice'
import ThemeBtns from './themeBtns'
import { toggleSetting } from '../../context/context'
import SingIn from '../SingIn'
import LeftBar from './leftBar'
import { activeBtn } from '../../utlite/ActiveSlice'
import { toggelSideBtn } from '../../utlite/SideBarSlice'
import VideoPlay from '../playing/VideoPlay'
import Home from '../home/Home'
import { SEARCH_SUGGESTIONS_API } from '../../api'
import axios from "axios"
import { sreachQuery } from '../../utlite/sreachSlice'





function Header() {
    const [svgs, setSvg] = useState(false)
    const { openSetting, setOpeSetting } = useContext(toggleSetting)
    const [openSearchBar , SetOpenSearchBar] = useState(false)

    const [input, setInput] = useState('')
    const navigate = useNavigate()

    const toggleSide = useSelector((state) => state.toggleSideBarSlice.toggleSideBar)
    const activeBtn = useSelector((state) => state.activeSlice.active)

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleSearchBard = () => {
        if (!svgs) {
            setSvg(true)
        }
    }

     const  handleOpenSearchBar = () => {
        SetOpenSearchBar((prev) => !prev)
     }

    const handleSearch = (e) => {
        e.preventDefault()
        dispatch(sreachQuery(input)); // Update Redux store with search query
        navigate(`/search/${input}`);    // Navigate to search results page
        dispatch(activeBtn("search"))
    };


    const handletoggleSide = () => {
        dispatch(toggelSideBtn())

    }



    const handleBlur = () => {
        setSvg(false)
    }
    const handleSettingBtn = () => {
        if (!openSetting) {
            setOpeSetting(true)
        }
    }

    const handleRemoveInputData = () => {
        setInput("")
        setSvg(true)
    }

    const themeMode = useSelector((state) => state.themeSlice.theme)
    const active = useSelector((state) => state.activeSlice.active)
    const userData = useSelector((state) => state.loginSlice.userData)
    const dispatch = useDispatch()

    useEffect(() => {
        document.querySelector('html').classList.remove("light", "dark")
        document.querySelector('html').classList.add(themeMode)
    }, [themeMode])

    return (
        <>
            <div className='w-full relative dark:bg-[#0F0F0F]'>
                {openSetting ? (
                    <ThemeBtns />
                ) : (
                    ""
                )}
                <div className='w-full mx-auto flex justify-between items-center '>
                    <div onBlur={handleBlur} className='w-full'>
                        <div className='w-full fixed z-20 bg-white dark:bg-[#0F0F0F] dark:text-white dark:fill-white'>
                            <div className='md:px-4 px-1 flex justify-between items-center '>
                                <div className='flex justify-between items-center'>
                                    <div className='md:px-1 md:pb-0 px-2 py-1 hover:bg-[#D9D9D9]  dark:hover:bg-[#3D3D3D] rounded-full'>
                                        <button onClick={handletoggleSide}>
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
                                <div className={' flex flex-row items-center bg-transparent ' + (openSearchBar ? " dark:bg-[#0F0F0F] flex flex-row items-center absolute left-0  " : " hidden sm:flex flex-row items-center  ") }>
                                    <div className=''>
                                        <div className={' xl:w-[640px] ml-10 px-1 lg:w-[500px] md:w-[350px] w-[280px]  flex flex-row items-center relative ' + (openSearchBar ? "ml-3 mr-6 w-[310px] " : "  ")}>
                                             <div className='md:hidden lg:hidden xl:hidden sm:hidden pr-2 '>
                                                <button onClick={() => SetOpenSearchBar(false)}>
                                                    <span>{leftArrowSvg}</span>
                                                </button>
                                             </div>
                                            <form onSubmit={handleSearch} className='w-full h-[40px]'>
                                                <div className={'pr-1 pl-4  border-[1px]  h-[40px] text-[#111111] dark:bg-[#0F0F0F] dark:text-white bg-[#ffffff] rounded-l-full flex  flex-row items-center ' + (svgs ? "ml-0 border-[#1c62b9]" : "ml-8 border-[#ccc] dark:border-gray-700")}>
                                                    {svgs ? <div className='mb-1'>
                                                        <div className='pr-[10px]'>
                                                            <span className='w-[20px] h-[20px]'>
                                                                {smallSearchSvg}
                                                            </span>
                                                        </div>
                                                    </div> : ""}
                                                    <div className='w-full'>
                                                        <input value={input} onChange={handleInputChange} onClick={handleSearchBard} className='w-full mr-3 outline-none bg-transparent dark:text-white text-black placeholder:text-gray-500 text-base font-roboto' type="text" placeholder='Search' />
                                                    </div>
                                                </div>
                                            </form>
                                            {input.length ? (
                                                <div className=' absolute right-16 pl-4 z-50'>
                                                    <button className=' outline-none px-2' onClick={handleRemoveInputData}>
                                                        <span>{cancelSvg}</span>
                                                    </button>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            <button onClick={handleSearch} className='px-[6px]  py-[1px] h-10 w-[65px] border-l-0 dark:bg-[#222222] bg-[#f8f8f8] border-[1px] border-[#ccc] dark:border-gray-700 rounded-r-full flex items-center justify-center'>
                                                <div className='w-[24px]'>
                                                    <span>
                                                        {SearchSvg}
                                                    </span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='ml-3 p-2 sm:hidden  rounded-full bg-[#f8f8f8] hover:bg-[#D9D9D9] dark:bg-[#222222] dark:hover:bg-[#3D3D3D]'>
                                        <button>
                                            <div>
                                                {mikeSvg}
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className='min-w-[225px] flex justify-end items-center'>
                                    <div className=' flex flex-row items-center'>
                                        <div className='lg:hidden md:hidden sm:hidden  xs:flex'>
                                            <button onClick={handleOpenSearchBar} className=' px-[6px]  py-[1px] h-10 w-[65px]  rounded-r-full flex items-center justify-center'>
                                                <div className='w-[24px]'>
                                                    <span>
                                                        {SearchSvg}
                                                    </span>
                                                </div>
                                            </button>
                                        </div>
                                        <div>
                                            {userData ? (
                                                <div className=' flex flex-row items-center'>
                                                    <div className='mr-2'>
                                                        <div>
                                                            <div className='p-2'>
                                                                <button className=''>
                                                                    <span>
                                                                        {uploadVideoSvg}
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='mr-2'>
                                                        <div>
                                                            <div className='p-2'>
                                                                <button>
                                                                    <span>
                                                                        {notificationsSvg}

                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>) : (
                                                <div className='p-2'>
                                                    <button onClick={handleSettingBtn}>
                                                        <div>
                                                            <span>
                                                                {SettingSvg}
                                                            </span>
                                                        </div>
                                                    </button>
                                                </div>
                                            )}

                                        </div>
                                        <div>
                                            {userData ? (
                                                <button onClick={handleSettingBtn} className='px-[6px] py-[1px]'>
                                                    <div className='w-8 h-8 mx-2'>

                                                        <img
                                                            src={userData?.payload?.photoURL}
                                                            alt="User Avatar"
                                                            style={{ width: 50, height: 32, borderRadius: '50%' }}
                                                        />
                                                    </div>
                                                </button>

                                            ) : (
                                                <SingIn />
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <div>


                <div>
                    {toggleSide ? (
                        <div>
                            <LeftBar />
                        </div>
                    ) : (
                        <div>
                            {active === "watch" ? (
                                ""
                            ) : (
                                <div className="hidden md:flex">
                                    <div className="fixed mt-14">
                                        <div className="px-1">
                                            <div className="mt-1 flex flex-col">
                                                {closeNavBarItems.map((data) => (
                                                    <div
                                                        key={data.name}
                                                        onClick={() => dispatch(activeBtn(data.name))}
                                                        className={`w-full rounded-[10px] hover:bg-[#0808080D] dark:hover:bg-[#FFFFFF19] ${active === data.name ? " font-roboto font-normal" : "bg-transparent"
                                                            }`}
                                                    >
                                                        <Link to={data.path} className="flex justify-center pt-4 pb-[14px]">
                                                            <div className="flex flex-col items-center justify-center">
                                                                <button className="text-center mb-[6px] dark:fill-white">
                                                                    {active === data.name ? (
                                                                        <span>{data.darkSvg}</span>
                                                                    ) : (
                                                                        <span>{data.svg}</span>
                                                                    )}
                                                                </button>
                                                                <span className="text-[10px] font-roboto dark:text-white">{data.name}</span>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>


        </>
    )
}

export default Header