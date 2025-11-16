import React from 'react'
import { ScrollArea, ScrollBar } from '../components/ui/scroll-area'
import { Card } from '../components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar'
import { useSelector } from 'react-redux'
import { Settings2Icon } from 'lucide-react'
import { useNavigate } from 'react-router'
import { WatchHistory } from '../components/shared/WatchHistory'
import { PlusIcon } from 'lucide-react'
import { AddToPlaylist } from '../components/shared/AddToPlaylist'


function Dashbord() {

  const {avatar, email, fullname, username} = useSelector((state) => state.auth.user)
  const {videos} = useSelector(state => state.auth)
  const navigate = useNavigate()

  const data = [
    {
      title: "jdsvjh",
      discription: 'hvashjhsh'
    }
  ]

  return (
    <div className='w-full h-[81vh] p-5 gap-5 flex flex-col'>
      <Card className="w-full h-[20%] flex items-center max-w-sm gap-5">
        <Avatar className="h-auto w-23 ml-5">
          <AvatarImage className="object-cover" src={avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-center gap-1 w-[45%] bg-re-500">
          <h1 className='font-medium'>{username}</h1>
          <h3 className='font-medium opacity-60'>{fullname}</h3>
          <p className='opacity-50'>{email}</p>
        </div>
        <div>
          <Settings2Icon onClick={()=> navigate("/userdashbord")}/>
        </div>
      </Card>

      <div className='h-[30vh] w-full text-center flex flex-col gap-5'>
          <label className='font-bold' htmlFor="playlist">Watch History</label>
          <div className='flex overflow-x-scroll'>
          <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
            <div className="flex w-max space-x-6 p-4">
              <WatchHistory Data={videos}/>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      <div className='h-[30vh] w-full text-center flex flex-col gap-5'>
          <div className='h-[20%] flex items-center justify-between p-2'>
            <label className='font-bold' htmlFor="playlist">Playlist</label>
            <AddToPlaylist />
          </div>
          <div className='h-[80%] flex overflow-x-scroll'>
          <ScrollArea className="w-96 h-[100%] rounded-md border whitespace-nowrap">
            <div className="flex h-[100%] w-max space-x-6">
              {data.map((iteam) => (
                <div className='h-[20vh] w-[45vw] flex flex-col rounded-2xl items-center justify-center border-2'>
                  <h1 className=''>{iteam.title}</h1>
                  <p className='opacity-40'>{iteam.discription}</p>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>  
    </div>
  )
}

export default Dashbord