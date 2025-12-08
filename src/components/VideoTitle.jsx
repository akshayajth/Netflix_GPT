import React from 'react'

const VideoTitle = ({title, overview}) => {
    return (
        <div className='w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black'>
            <h1 className='text-6xl font-bold'>{title}</h1>
            <p className='py-6 text-lg w-1/4'>{overview}</p>

            <div className="">
                <button className="bg-white text-black p-3 px-10 text-xl  rounded-lg hover:bg-white/80 transition">
                   ▶Play
                </button>
                <button  className=" mx-2 bg-gray-500 text-white p-3 px-10 text-xl bg-opacity-50 rounded-lg hover:bg-white/80 transition">
                    More Info
                </button>
            </div>
        </div>
    )
}

export default VideoTitle