import React, { useEffect } from 'react'
import { Container } from '../components/shared/Container'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVideos } from '../app/slices/videoSlice'
import Loader from '@/components/shared/Loader'

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {videos, status, error} = useSelector(state => state.video)
  const {isAuthenticated} = useSelector(state => state.auth)

  useEffect(() => {
    if (isAuthenticated && status === "idle") {
      console.log("User is authenticated, dispatching getAllVideos...");
      dispatch(getAllVideos({}));
    } else {
      console.log("User is NOT authenticated yet, skipping getAllVideos.");
    }
  }, [isAuthenticated, dispatch, status])
  
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
    <div className='w-full h-[81vh]'>
      <div onClick={()=> navigate("/video")} className='flex flex-col items-center p-5 overflow-scroll gap-4 w-full h-[100%]'>
        <Container Data={videos}/>
      </div>
    </div>
  )
}

export default Home