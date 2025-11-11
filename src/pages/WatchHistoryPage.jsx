import React, { useEffect } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { Container } from '../components/shared/Container'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getWatchHistory } from '@/app/slices/authSlice'
import Loader from '@/components/shared/Loader'

function WatchHistoryPage() {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { videos, status, error } = useSelector(state => state.auth)
  const { isAuthenticated } = useSelector(state => state.auth)

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
        <p className="text-red-500">Error: {error || 'Could not fetch watch history.'}</p>
      </div>
    );
  }

  if (status === 'succeeded' && videos.length === 0) {
    return (
      <div className='w-full h-[81vh] flex justify-center items-center'>
        <p>No videos in watch history.</p>
      </div>
    );
  }

  return (
    <>
      {isMobile && 
      <div className='w-full h-[81vh] lg:h-[100vh]'>
        <div onClick={() => navigate("/video")} className='flex flex-col items-center p-5 overflow-scroll gap-6 w-full h-[100%]'>
          <Container Data={videos} />
        </div>
      </div>}
      {!isMobile &&
      <div className='w-full'>
        <div onClick={() => navigate("/video")} className='grid grid-cols-3 items-center p-5 gap-6 w-full h-[100%]'>
          <Container Data={videos} />
        </div>
      </div>}
    </>
  )
}

export default WatchHistoryPage