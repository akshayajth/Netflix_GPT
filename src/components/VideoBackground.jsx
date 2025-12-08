
import React, { useEffect, use } from 'react'
import { useSelector } from 'react-redux'


const VideoBackground = ( { movieId }) => {
  const trailerVideo = useSelector(store => store.movies?.trailerVideo);
  
   
 
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={"https://www.youtube.com/embed/sEgPQ7HKoBA?si=CB_2FSeH5K8q0tFv" + trailerVideo?.key}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen>
      </iframe>
    </div>
  )
}

export default VideoBackground


