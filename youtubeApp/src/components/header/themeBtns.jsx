import React, { useContext, useEffect, useState } from 'react'
import { moreSetting } from './SideBar'
import { leftArrowSvg, correctSvg, signOut, croseSvg } from '../../assets/Svg'
import { useSelector, useDispatch } from 'react-redux'
import { applyDark, applyLight } from '../../utlite/ThemeSlice'
import { toggleSetting } from '../../context/context'
import { Link, useNavigate } from 'react-router-dom'
import { activeBtn } from '../../utlite/ActiveSlice'
import { singInOut } from '../../utlite/loginSlice'
import toast from 'react-hot-toast'

function ThemeBtns() {
    const [openThem, setOpenThem] = useState(false)
    const { openSetting, setOpeSetting } = useContext(toggleSetting)

    const navigate = useNavigate

    const useData = useSelector((state) => state.loginSlice.userData)

    const closeSettingSection = () => {
        setOpenThem(false)
        setOpeSetting(false)
    }
    const handleSingOut = () => {
        setOpenThem(false)
        setOpeSetting(false)
        dispatch(singInOut())
        navigate('/')
    toast.error("logOut succes")
    }

    const handleThemBtn = () => {
        setOpenThem((prev) => !prev)
    }

    const themeMode = useSelector((state) => state.themeSlice.theme)
    const dispatch = useDispatch()

    useEffect(() => {
        document.querySelector('html').classList.remove("light", "dark")
        document.querySelector('html').classList.add(themeMode)
    }, [themeMode])

    return (
        <div>
            {openSetting ?
                <div cl className={'w-full relative dark:bg-[#0F0F0F] '} >
                    <div className={'lg:w-[25%] xl:w-[15.7%] md:w-[35%] sm:w-[35%] md:h-auto h-screen fixed  z-40 top-12  rounded-md dynamic-shadow bg-white dark:bg-[#282828] dark:text-white ' + (useData ? "md:right-5 right-0" : "right-32")}>
                    <div className={'flex justify-end items-center absolute right-2 top-0 ' }>
                        <button onClick={closeSettingSection} className='p-2 dark:fill-white rounded-full hover:bg-[#0808080D] dark:hover:bg-[#FFFFFF19]'>
                          <span className={'' + (openThem ? "hidden" : " visited") || (openThem ? "visited" : " hidden")}>
                            {croseSvg}
                          </span>
                        </button>
                        </div>
                        {useData ? (
                            <div className={'w-full p-4 flex justify-start border-b-[1px] dark:border-b-[#FFFFFF19] ' + (openThem ? "hidden" : " visited") || (openThem ? "visited" : " hidden")}>
                                <div className='w-10 h-10 mx-2 mr-4'>

                                    <img className='w-10 h-10'
                                        src={useData.payload.photoURL}
                                        alt="User Avatar"
                                        style={{ borderRadius: '50%' }}
                                    />
                                </div>
                                <div className=' flex flex-col'>
                                    <h4 className='text-base font-roboto'>{useData.payload.displayName}</h4>
                                    <h5 className='text-sm font-roboto'>@{useData.payload.displayName.replace(/\s+/g, "")}</h5>
                                    <div onClick={closeSettingSection} className='mt-1'>
                                        <Link onClick={() => dispatch(activeBtn("You"))} to={`/you`}>
                                            <span className='text-[#3ea6ff] text-sm font-roboto'>View your channel</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                                <div>
                        
                        </div>
                        {moreSetting.map((items, i) => (
                            <div key={i} className={'w-full border-b-[1px] dark:border-b-[#FFFFFF19] ' + (openThem ? "hidden" : " visited") || (openThem ? "visited" : " hidden")}>
                                <div>
                                    {useData ? (
                                        <div>
                                            {i === 0 ? (
                                                <div className='py-2 border-b-[1px] dark:border-b-[#FFFFFF19]'>
                                                    <div className='w-full flex hover:bg-[#0808080D] dark:hover:bg-[#FFFFFF19] h-10  cursor-pointer  items-center'>
                                                        <div className=' w-full px-4  '>
                                                            <button onClick={handleSingOut} className='w-full flex  items-center'>
                                                                <div className='mr-4 dark:fill-white'>
                                                                    <span>
                                                                        {signOut}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <span className='text-[13px] font-roboto font-light'>Sign Out</span>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                <div className='w-full f  py-2'>
                                    {items.map((data, items) => (
                                        <div>
                                            {data.name === "Appearance:" ? (
                                                <div onClick={handleThemBtn} className='w-full flex hover:bg-[#0808080D] dark:hover:bg-[#FFFFFF19] h-10  cursor-pointer  items-center'>
                                                    <div className=' w-full px-4  '>
                                                        <div className='w-full flex  items-center'>
                                                            <div className='mr-4 dark:fill-white'>
                                                                <span>
                                                                    {data.svg}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className='text-[13px] font-roboto font-light'>{data.name} {themeMode}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div key={items} className='w-full flex hover:bg-[#0808080D] dark:hover:bg-[#FFFFFF19] h-10  cursor-pointer  items-center'>
                                                    <div className=' w-full px-4  '>
                                                        <div className='w-full flex  items-center'>
                                                            <div className='mr-4 dark:fill-white'>
                                                                <span>
                                                                    {data.svg}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className='text-[13px] font-roboto font-light'>{data.name}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className={' ' + (openThem ? " visible" : "hidden") || (openThem ? "hidden" : "visited")}>
                            <div className='w-full h-auto flex flex-col '>
                                <div className='w-full'>
                                    <div className='flex flex-row items-center h-10'>
                                        <button onClick={handleThemBtn} className='mx-1.5 p-1 rounded-full hover:bg-[#E5E5E5] dark:hover:bg-[#FFFFFF19]'>
                                            <span className=' dark:fill-white'>
                                                {leftArrowSvg}
                                            </span>
                                        </button>
                                        <div>
                                            <span className='text-[14px] font-roboto font-normal'>Appearance </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex flex-col py-2 border-t-[1px] dark:border-t-[#FFFFFF19]'>
                                    <div className='px-4 h-8'>
                                        <span className='text-xs text-[#606060] font-roboto dark:text-[#aaa]'>Setting applies to this browser only</span>
                                    </div>
                                    <div onClick={() => dispatch(applyDark())} className='w-full flex hover:bg-[#0808080D] dark:hover:bg-[#FFFFFF19]  h-10  cursor-pointer  items-center'>
                                        <div onClick={closeSettingSection} className=' w-full px-4  '>
                                            <div className='w-full flex  items-center'>
                                                <div className={'dark:fill-white ' + (themeMode === "dark" ? "mr-4" : "mr-0")}>
                                                    <span>
                                                        {themeMode === "dark" ?
                                                            correctSvg : ""}
                                                    </span>
                                                </div>
                                                <div className={'' + (themeMode != "dark" ? "ml-10" : "mr-0")}>
                                                    <span className='text-[13.4px] font-roboto font-light'>Dark theme</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div onClick={() => dispatch(applyLight())} className='w-full flex hover:bg-[#0808080D] dark:hover:bg-[#FFFFFF19]  h-10  cursor-pointer  items-center'>
                                        <div onClick={closeSettingSection} className=' w-full px-4  '>
                                            <div className='w-full flex  items-center'>
                                                <div className={'' + (themeMode === "light" ? "mr-4" : "mr-0")}>
                                                    <span className='dark:fill-white'>
                                                        {themeMode === "light" ?
                                                            correctSvg : ""}
                                                    </span>
                                                </div>
                                                <div className={'' + (themeMode != "light" ? "ml-10" : "mr-0")}>
                                                    <span className='text-[13.4px] font-roboto font-light'>Light theme</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : ""
            }
        </div>
    )
}

export default ThemeBtns