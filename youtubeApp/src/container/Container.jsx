import React from 'react'
import {useSelector} from "react-redux"
function Container({children}) {
  const sideBar = useSelector((state) => state.toggleSideBarSlice.toggleSideBar) 
  return (
    <div className={'max-w-full   mt-14  dark:bg-[#0F0F0F] dark:text-white ' + (sideBar ? "md:ml-[240px]" : "md:ml-[72px]" )}>
    {children}
    </div>
  )
}

export default Container