import React, { useEffect } from 'react'
import { Container } from '../components/shared/Container'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getWatchHistory } from '@/app/slices/authSlice'
import { getAllVideos } from '../app/slices/videoSlice'
import { getUserPlaylists } from '@/app/slices/playlistSlice'
import Loader from '@/components/shared/Loader'
import { useIsMobile } from '@/hooks/use-mobile'

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isMobile = useIsMobile()
  const {videos, status, error} = useSelector(state => state.video)
  const {isAuthenticated} = useSelector(state => state.auth)
  const userId = useSelector(state => state.auth?.user?._id)
  const playlistStatus = useSelector(state => state.playlist?.status)

  useEffect(() => {
    if (isAuthenticated && status === "idle") {
      console.log("User is authenticated, dispatching getAllVideos...");
      dispatch(getAllVideos({}));
      dispatch(getWatchHistory())
    } else {
      console.log("User is NOT authenticated yet, skipping getAllVideos.");
    }
  }, [isAuthenticated, dispatch, userId, status])

  useEffect(() => {
    if (isAuthenticated && userId && playlistStatus === "idle" ) {
      dispatch(getUserPlaylists(userId))
    }
  }, [isAuthenticated, userId, dispatch])

  
  if (status === 'loading' && videos.length === 0) {
    return (
      <div className='w-full h-[81vh] flex justify-center items-center'>
        <Loader />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className='w-full h-[81vh] flex justify-center items-center'>
        <p className="text-red-500">Error: {error || 'Could not fetch videos.'}</p>
      </div>
    );
  }

  if (status === 'succeeded' && videos.length === 0) {
    return (
        <div className='w-full h-[81vh] flex justify-center items-center'>
            <p>No videos found.</p>
        </div>
    );
  }

  return (
    <>
      {isMobile && 
      <div className='w-full h-[81vh] lg:h-[100vh]'>
        <div onClick={()=> navigate("/video")} className='flex flex-col items-center p-5 overflow-scroll gap-6 w-full h-[100%]'>
          <Container Data={videos}/>
        </div>
      </div>}
      {!isMobile &&
      <div className='w-full'>
        <div onClick={()=> navigate("/video")} className='grid grid-cols-3 items-center p-5 gap-6 w-full h-[100%]'>
          <Container Data={videos}/>
        </div>
      </div>}
    </>
  )
}

export default Home