import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../container/Container';
import { dwonArrorSvg, notificationsSvg } from '../../assets/Svg';
import { ViewCount } from '../convert/VideoDataConver';
import {  UnSubscribe } from '../../utlite/playlist';
import toast from 'react-hot-toast';

function AllSubscribe() {
  const subscribe = useSelector((state) => state.playlistSlice.Subscribe)
  const reverseSubscribe = subscribe ? subscribe.slice().reverse() : [];

  const dispatch = useDispatch()

  const handleUnScribe = (reversedIndex) => {
    const originalIndex = subscribe.length - 1 - reversedIndex;
    if (subscribe.length > 1) {
      const newArr = [...subscribe];
      newArr.splice(originalIndex, 1);
      dispatch(UnSubscribe(newArr));
      toast.success("Subscription removed");
    } else {
      dispatch(UnSubscribe([]));
      toast.success("Subscription cleared");
    }
  }

  return (
    <Container>
      <div className="w-full">
        <div className="max-w-4xl flex flex-col mx-auto relative">
          <div className="w-full pt-6 pb-1 ">
            <h1 className="w-full text-3xl font-bold">All subscriptions</h1>
          </div>
          <div className="w-full mt-2">
            {reverseSubscribe.map((channel , index) => (
              <div key={channel?.id} className="w-full sm:flex gap-3 items-center mb-4 ">
                <div className="w-[136px] h-[136px] flex-shrink-0">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={channel?.snippet?.thumbnails?.default?.url}
                    alt={channel?.snippet?.title || "Channel Image"}
                  />
                </div>
                <div className=" w-full flex flex-col flex-grow pr-4">
                  <h3 className="text-base font-roboto mb-1">{channel?.snippet?.title}</h3>
                  <div className="flex gap-1 items-center text-xs font-roboto text-[#aaa] mb-1">
                    <span>{channel?.snippet?.customUrl}</span>
                    <span>•</span>
                    <span><ViewCount count={channel?.statistics?.subscriberCount} /> subscribers</span>
                  </div>
                  <div className="w-full text-xs font-roboto text-[#aaa] line-clamp-2">
                    {channel?.snippet?.description}
                  </div>
                </div>
                <div className=" w-full -ml-56 flex justify-end">
                  <button onClick={() => handleUnScribe(index)} className="px-3.5 py-1 flex flex-row justify-center items-center rounded-full dark:bg-[#3F3F3F] bg-[#0000000D] dark:text-white ">
                    <span className="text-sm flex flex-row gap-2 dark:fill-white justify-center items-center font-roboto font-medium">
                      {notificationsSvg} Subscribed {dwonArrorSvg}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>


  )
}

export default AllSubscribe