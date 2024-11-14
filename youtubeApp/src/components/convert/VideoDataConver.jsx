import React from 'react'

function formatViewCount(viewCount) {
    if (viewCount >= 1_00_00_000) {
        return (viewCount / 1_00_00_000).toFixed(1) + " crore";
    } else if (viewCount >= 1_00_000) {
        return (viewCount / 1_00_000).toFixed(1) + " lakh";
    } else if (viewCount >= 1_000) {
        return (viewCount / 1_000).toFixed(1) + " K";
    } else {
        return viewCount
    }
  }
  function getRelativeTime(publishDate) {
    const now = new Date();
    const published = new Date(publishDate);
    let diffInMs = now - published;
  
    if (diffInMs < 0) diffInMs = 0; // Prevent negative time
  
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (years > 0) {
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    } else if (months > 0) {
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else if (weeks > 0) {
        return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (days > 0) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
        return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }
  }
  
 export  const RelativeTimeDisplay = ({ date }) => {
    return (
        <p>{getRelativeTime(date)}</p>
    );
  };

export  const ViewCount = ({ count }) => {
    return (
        <span>{formatViewCount(count)}</span>
    );
  };
  
  
  function parseISO8601Duration(duration) {
    if (!duration || typeof duration !== "string") {
      return "0:00"; // Default to "0:00" if duration is invalid
    }
  
    const hoursMatch = duration.match(/(\d+)H/);
    const minutesMatch = duration.match(/(\d+)M/);
    const secondsMatch = duration.match(/(\d+)S/);
    
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
    const seconds = secondsMatch ? parseInt(secondsMatch[1], 10) : 0;
  
    const formattedMinutes = hours > 0 ? String(minutes).padStart(2, '0') : minutes;
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    return hours > 0 
      ? `${hours}:${formattedMinutes}:${formattedSeconds}` 
      : `${minutes}:${formattedSeconds}`;
  }
  
export const DurationDisplay = ({ duration }) => {
    return (
      <>{parseISO8601Duration(duration)}</>
    );
  };