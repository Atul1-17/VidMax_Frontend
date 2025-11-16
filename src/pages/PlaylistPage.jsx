import { AddToPlaylist } from '@/components/shared/AddToPlaylist'
import Playlist from '@/components/shared/Playlist'
import React from 'react'

function PlaylistPage() {
  const data = [
    {
      title: "jdsvjh",
      discription: 'hvashjhsh'
    }
  ]
  return (
    <div className='h-[88vh] w-full'>
      <div className='h-[5vh] flex items-center justify-between p-4'>
        <h1 className='text-2xl'>Playlist</h1>
        <AddToPlaylist/>
      </div>
      <div className="flex h-[83vh] w-max p-4">
            {data.map((iteam) => (
              <div className='h-[30vh] w-[30vw] flex flex-col rounded-2xl items-center justify-center border-2'>
                <h1 className=''>{iteam.title}</h1>
                <p className='opacity-40'>{iteam.discription}</p>
              </div>
            ))}
      </div>
    </div>
  )
}

export default PlaylistPage