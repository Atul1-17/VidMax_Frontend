import React from 'react'
import { PlaylistVideoContainer } from '@/components/shared/PlaylistVideoContainer'
import { useSelector } from 'react-redux'

function PlaylistVideoPage() {

  const {videos} = useSelector(state => state.playlist.playlist)

  return (
    <div>
        <PlaylistVideoContainer videos={videos}/>
    </div>
  )
}

export default PlaylistVideoPage