import React from 'react'
import Container from '../container/Container'


function DummyData() {
    return (
<div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {Array(20).fill("").map((_, index) => (
    <div key={index} className="mx-2 mb-9">
      <div className="flex justify-center items-center">
        <div className="w-full">
          <div className="flex flex-col relative">
            {/* Video Thumbnail Placeholder */}
            <div className="w-full h-[210px] bg-[#0808080D] dark:bg-[#FFFFFF19] rounded-xl"></div>
            
            {/* Video Info Section */}
            <div className="flex flex-row mt-3 relative">
              {/* Channel Avatar Placeholder */}
              <div className="mr-3 bg-[#0808080D] dark:bg-[#FFFFFF19] w-[34px] h-[34px] rounded-full"></div>
              
              {/* Video Text Placeholder */}
              <div className="flex flex-col w-full">
                <div className="h-5 bg-[#0808080D] dark:bg-[#FFFFFF19] rounded-sm w-3/4 mb-2"></div>
                <div className="h-5 bg-[#0808080D] dark:bg-[#FFFFFF19] rounded-sm w-2/3 mb-2"></div>
                
                {/* Channel and View Info */}
          
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

    )
}


export function  RelatedVideosData () {
    return(
        <>
   <div className='flex flex-col'>
            {Array(20).fill("").map((data) => (
                <div className=' mb-3'>
                    <div className='flex justify-center  '>
                        <div className=" w-full">
                            <div className=' flex'>
                                <div className='relative object-fill lg:w-[242px] w-full h-[200px] lg:h-[150px] bg-[#0808080D] dark:bg-[#FFFFFF19] rounded-xl mr-2'>
                                </div>
                                <div className=' flex flex-row  relative'>
                                    <div className=' flex flex-row  cursor-pointer '>
                                        <div>
                                            <div className='h-5 lg:w-[200px] w-full rounded-sm bg-[#0808080D] dark:bg-[#FFFFFF19]'>

                                            </div>
                                            <div className='h-5 mt-2 lg:w-[120px] w-full rounded-sm bg-[#0808080D] dark:bg-[#FFFFFF19]'>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col overflow-x-hidden'>

                                        <div className='flex flex-col'>
                                            <div className='text-xs font-roboto text-[#aaa]'>

                                            </div>
                                            <div className='flex items-center text-xs font-roboto text-[#aaa]'>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export const  SearchData = () => {
return(
  <>
<div className="grid grid-cols-1 gap-3">
  {Array(20).fill("").map((_, index) => (
    <div key={index} className="mb-3">
      <div className="flex justify-center">
        <div className="w-full">
          <div className="flex">
            {/* Placeholder for Image */}
            <div className="relative w-full  h-[281px] bg-[#0808080D] dark:bg-[#FFFFFF19] rounded-xl mr-4">
              {/* Optional content inside image placeholder */}
            </div>
            <div className="w-full flex flex-col ">
              {/* Title and description placeholders */}
              <div className="flex flex-col gap-2 mb-3">
                <div className="h-5 w-full rounded-sm bg-[#0808080D] dark:bg-[#FFFFFF19]"></div>
                <div className="h-5 w-[96%] rounded-sm bg-[#0808080D] dark:bg-[#FFFFFF19]"></div>
              </div>
              {/* Channel or metadata placeholders */}
              <div className="flex flex-col gap-1">
                <div className="h-4 w-24 rounded-sm bg-[#0808080D] dark:bg-[#FFFFFF19]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

  </>
)
}

export default DummyData