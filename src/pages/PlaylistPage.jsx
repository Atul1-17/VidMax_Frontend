import { AddToPlaylist } from '@/components/shared/AddToPlaylist'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Pencil } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import Loader from '@/components/shared/Loader'
import { useDispatch } from 'react-redux'
import { deletePlaylist } from '@/app/slices/playlistSlice'
import { getUserPlaylists } from '@/app/slices/playlistSlice'
import { updatedPlaylist } from '@/app/slices/playlistSlice'

function PlaylistPage() {

  const {playlists, status} = useSelector(state => state.playlist)
  const userId = useSelector(state => state.auth?.user?._id)  
  const dispatch = useDispatch()

  const submit = async (playlistId) => {
    try {
      await dispatch(deletePlaylist(playlistId)).unwrap()
      dispatch(getUserPlaylists(userId))
    } catch (error) {
      console.log(error)
    }
  }


  if (status === "loading") {
    return (
          <div className='w-full h-[81vh] flex justify-center items-center'>
            <Loader />
          </div>
        );
  }

  return (
    <div className='h-[88vh] w-full'>
      <div className='h-[5vh] flex items-center justify-between p-4'>
        <h1 className='text-2xl'>Playlist</h1>
        <AddToPlaylist/>
      </div>
      <div className="grid grid-cols-3 h-[83vh] w-full justify-items-center p-4 gap-2">
            {playlists.map((iteam) => (
              <div key={iteam._id} className='relative h-[30vh] w-[25vw] flex flex-col rounded-2xl items-center justify-center border-2'>
                <h1 className=''>{iteam.name}</h1>
                <p className='opacity-40'>{iteam.description}</p>
                <div className='absolute top-2 h-[20%] w-[15%] right-3 flex items-center justify-between'>
                  <Popover>
                    <PopoverTrigger>
                      <Trash2 size={20}/>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className='text-center p-2 flex flex-col gap-5'>
                          <h1>Do you want to Delete this playlist</h1>
                          <Button onClick={() => submit(iteam._id)} className="hover:bg-red-500">Yes</Button>
                        </div>
                    </PopoverContent>
                  </Popover>
                    
                  <Dialog >
                      <DialogTrigger asChild>
                        <Pencil size={20}/>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] ">
                        <DialogHeader>
                          <DialogTitle>Update Playlist</DialogTitle>
                        </DialogHeader>
                       <form 
                        onSubmit={async (e) => {
                            e.preventDefault()

                            const formData = new FormData(e.currentTarget)

                            const name = formData.get("name")
                            const description = formData.get("description")

                            try {
                              await dispatch(
                              updatedPlaylist({
                                playlistId: iteam._id,   // ✅ passed separately
                                name,
                                description,
                              })
                          ).unwrap()
                          dispatch(getUserPlaylists(userId))
                          } catch (error) {
                            console.log(error)
                          }
                        }}
                        >
                        <div className="grid gap-4">
                          <div className="grid gap-3">
                            <Label htmlFor="name">Title</Label>
                            <Input 
                              id="name" 
                              name="name" 
                              defaultValue={iteam.name} />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Input 
                              id="description" 
                              name="description" 
                              defaultValue={iteam.description} />
                          </div>
                        </div>
                        <DialogFooter className={"gap-2"}>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Update playlist</Button>
                        </DialogFooter>
                        </form>
                      </DialogContent> 
                  </Dialog>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default PlaylistPage