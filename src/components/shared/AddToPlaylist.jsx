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

export function AddToPlaylist() {
  return (
    <Dialog >
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Create</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>New Playlist</DialogTitle>
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
            <Button type="submit">Add playlist</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
