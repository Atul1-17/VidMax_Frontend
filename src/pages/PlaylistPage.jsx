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
              <div className='relative h-[30vh] w-[30vw] flex flex-col rounded-2xl items-center justify-center border-2'>
                <h1 className=''>{iteam.title}</h1>
                <p className='opacity-40'>{iteam.discription}</p>
                <div className='absolute top-2 h-[20%] w-[15%] right-3 flex items-center justify-between'>
                  <Popover>
                    <PopoverTrigger>
                      <Trash2 size={20}/>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className='text-center p-2 flex flex-col gap-5'>
                          <h1>Do you want to Delete this playlist</h1>
                          <Button className="hover:bg-red-500">Yes</Button>
                        </div>
                    </PopoverContent>
                  </Popover>
                    
                  <Dialog >
                    <form>
                      <DialogTrigger asChild>
                        <Pencil size={20}/>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] ">
                        <DialogHeader>
                          <DialogTitle>Update Playlist</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="grid gap-3">
                            <Label htmlFor="name-1">Title</Label>
                            <Input id="name-1" name="name" defaultValue="New Playlist" />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="username-1">Discription</Label>
                            <Input id="username-1" name="username" defaultValue="" />
                          </div>
                        </div>
                        <DialogFooter className={"gap-2"}>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Update playlist</Button>
                        </DialogFooter>
                      </DialogContent>
                    </form>
                  </Dialog>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default PlaylistPage