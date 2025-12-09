import React, { useEffect } from 'react'
import Header from './Header'
import useNowPlayingMovies from '@/hooks/useNowPlayingMovies'
import { CardSim } from 'lucide-react';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '@/hooks/usePopularMovies';

const Browse = () => {

  useNowPlayingMovies();
  usePopularMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/*    
    // {
        // MainContainer
        //   -VideoBg
        //   -VideoTitle

        //   SecondaryContainer
        //     -movielist
        //     -CardS 


    // } */}

    </div>

  )
}

export default Browse