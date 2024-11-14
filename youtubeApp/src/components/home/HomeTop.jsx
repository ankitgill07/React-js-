import React, { useEffect, useRef, useState } from 'react'
import Container from '../../container/Container'
import Conf from '../../config/conf'
import { leftScrollSvg, rightScrollSvg } from '../../assets/Svg'
import { useSelector } from 'react-redux'
import Home from './Home'
import Categories from '../Categories'
import DummyData from '../DummyData'
import { YOUTUBE_API_KEY, YOUTUBE_APP_URL } from '../../api'
function HomeTop() {
  const [category, setCategory] = useState([])
  const [active, setActive] = useState("All")
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [yourCategoryVideo, setYourCategoryVideo] = useState('')
  const [showVideo, setShowVideo] = useState([])
  const sideBar = useSelector((state) => state.toggleSideBarSlice.toggleSideBar)

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await fetch(
          `${YOUTUBE_APP_URL}videoCategories?part=snippet&regionCode=IN&key=${YOUTUBE_API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const categories = Array.isArray(result?.items)
          ? [{ id: '', snippet: { title: 'All' } }, ...result.items]
          : [{ id: '', snippet: { title: 'All' } }];

        setCategory(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategory();
  }, []);

  const fetchVideoData = async () => {
    const url = await fetch(`${YOUTUBE_APP_URL}videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&maxResults=50&videoCategoryId=${yourCategoryVideo}&key=${YOUTUBE_API_KEY}`)
    const result = await url.json()
    console.log(result?.items);

    setShowVideo(result?.items)
  }

  const getCategoryVideo = (id) => {
    setYourCategoryVideo(id)
    fetchVideoData()
  }


  useEffect(() => {
    fetchVideoData()
  }, [yourCategoryVideo])

  const scrollConatiner = useRef(null)

  const handleLeftScroll = () => {
    scrollConatiner.current.scrollBy({ left: 250, behavior: 'smooth' })
  }

  const handleRightScroll = () => {
    scrollConatiner.current.scrollBy({ left: -250, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const container = scrollConatiner.current;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    setShowLeftButton(container.scrollLeft > 0);
    setShowRightButton(container.scrollLeft < maxScrollLeft);
  };

  useEffect(() => {
    const container = scrollConatiner.current;
    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position on mount

    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleRightScroll]);

  return (
    <Container>
      <div>
  <div className="w-full flex sticky flex-row items-center">
    <div className="w-full px-6 relative">
    <div className={` flex dark:bg-[#0F0F0F] items-center justify-between ${sideBar ? 'lg:w-auto sm:w-full' : 'lg:w-auto sm:w-full'}`}>
  {/* Left Scroll Button */}
  {showLeftButton && (
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-white dark:from-[#0f0f0f] dark:via-[#0f0f0f] via-white flex items-center justify-center z-0 ">
      <button onClick={handleRightScroll} className="p-2 rounded-full hover:bg-[#0808080D] dark:hover:bg-[#FFFFFF19] dark:fill-white">
        <span>{leftScrollSvg}</span>
      </button>
    </div>
  )}

  {/* Scrollable Category List */}
  <div
    ref={scrollConatiner}
    className="w-full flex justify-between items-center overflow-x-auto dark:text-white whitespace-nowrap pr-3"
    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
  >
    {category && category.map((data) => (
      <div key={data.id} onClick={() => getCategoryVideo(data.id)}>
        <div
          onClick={() => setActive(data?.snippet?.title)}
          className={`flex-shrink-0 my-3 mr-3 px-3 pt-1 rounded-lg cursor-pointer bg-[#0000000D] ${
            active === data?.snippet?.title ? 'dark:bg-white bg-black text-white dark:text-black' : 'dark:bg-[#FFFFFF1A]'
          }`}
        >
          <span className="text-xs font-roboto font-medium inline-block overflow-hidden text-ellipsis whitespace-nowrap">
            {data?.snippet?.title}
          </span>
        </div>
      </div>
    ))}
  </div>

  {/* Right Scroll Button */}
  {showRightButton && (
    <div className="absolute z-0 right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-white dark:from-[#0f0f0f] dark:via-[#0f0f0f] via-white flex items-center justify-center ">
      <button onClick={handleLeftScroll} className="p-2 rounded-full hover:bg-[#0808080D] dark:hover:bg-[#FFFFFF19] dark:fill-white">
        <span>{rightScrollSvg}</span>
      </button>
    </div>
  )}
</div>
    </div>
  </div>

  {/* Conditional Rendering for Categories */}
  {active === "All" ? (
    <Home />
  ) : (
    <div className="pt-6">
          {showVideo?.length ? (
                  <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
{showVideo.map((data) => <Categories data={data} />)}
               </div>
          ):(

<div>
<DummyData/>
</div>

          )}
     
      </div>
  )}
</div>


    </Container>
  )
}

export default HomeTop