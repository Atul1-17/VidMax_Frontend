import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { createPlaylist, getUserPlaylists } from "@/app/slices/playlistSlice"
import { useSelector } from "react-redux"
import { useState } from "react"

export function AddToPlaylist() {

  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm()
  const {status} = useSelector(state => state.playlist)
  const userId = useSelector(state => state.auth?.user?._id)

  const onSubmit = async (data) => {
    try {
      await dispatch(createPlaylist(data)).unwrap()
      dispatch(getUserPlaylists(userId))
      setOpen(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Create</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader className={"mb-4"}>
              <DialogTitle>New Playlist</DialogTitle>
            </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Title</Label>
              <Input 
                id="name" 
                name="name" 
                defaultValue="New Playlist"
                {...register("name", {required: "The title is required"})}
                />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Discription</Label>
              <Input 
                id="description" 
                name="description" 
                defaultValue="" 
                {...register("description")}
                />
            </div>
          </div>
          <DialogFooter className={"gap-2 mt-4"}>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {status === "loading" ? "Creating..." : "Create playlist"}
            </Button>
          </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
  )
}
