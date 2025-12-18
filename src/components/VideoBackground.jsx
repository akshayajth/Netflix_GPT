

import { useSelector } from 'react-redux'
import useMovieTrailer from '@/hooks/useMovieTrailer';

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);
  if (!trailerVideo) return null;

    const youtubeUrl = `https://www.youtube-nocookie.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`;

  return (
    <>
      <iframe
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src={youtubeUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
        <div className="absolute inset-0 pointer-events-none bg-transparent"></div>

    </>
  );
};
export default VideoBackground


