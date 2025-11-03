import React from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { Container } from '../components/shared/Container'
import { useNavigate } from 'react-router'

function WatchHistoryPage() {
  const isMobile = useIsMobile()

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

export default WatchHistoryPage