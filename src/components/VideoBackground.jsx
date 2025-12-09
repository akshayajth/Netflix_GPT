

import { useSelector } from 'react-redux'
import useMovieTrailer from '@/hooks/useMovieTrailer';

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);
  if (!trailerVideo) return null;

    const youtubeUrl = `https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1`;

  return (
    <div className="">
      <iframe
        className="w-screen aspect-video"
        src={youtubeUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};
export default VideoBackground


