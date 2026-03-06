import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Save } from "lucide-react"
import { addVideoToPlaylist, removeVideoFromPlaylist } from "@/app/slices/playlistSlice"
import Loader from "./Loader"

export function SaveToPlaylistDialog() {
  const dispatch = useDispatch()

  const { playlists, status } = useSelector((state) => state.playlist)
  const videoId = useSelector(state => state.video?.video?._id)

  const [selected, setSelected] = useState({})

  // When playlists load, pre-check ones that already contain video
  useEffect(() => {
    if (playlists) {
      const initialState = {}
      playlists.forEach((pl) => {
        initialState[pl._id] = pl.hasVideo
      })
      setSelected(initialState)
    }
  }, [playlists])

  const handleCheckboxChange = (playlistId) => {
    setSelected((prev) => ({
      ...prev,
      [playlistId]: !prev[playlistId],
    }))
  }

  const handleSave = () => {
    Object.keys(selected).forEach((playlistId) => {
      if (selected[playlistId]) {
        // dispatch add video
        dispatch(addVideoToPlaylist({ playlistId, videoId }))
      } else {
        // dispatch remove video
        dispatch(removeVideoFromPlaylist({ playlistId, videoId }))
      }
    })
  }

  if (status === "loading") {
    return (
          <div className='w-full h-[81vh] flex justify-center items-center'>
            <Loader />
          </div>
        );
  }
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center bg-ring gap-2 px-3 sm:px-4 py-2 hover:bg-gray-700 rounded-full transition-colors cursor-pointer">
          <Save size={18} />
          <h1>Save</h1>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Add Video to Playlist</DialogTitle>
          <DialogDescription>
            Select playlists to save this video.
          </DialogDescription>
        </DialogHeader>

        {/* Playlist List */}
        <div className="flex flex-col gap-3 max-h-60 overflow-y-auto mt-4">
          {playlists?.map((pl) => (
            <div
              key={pl._id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selected[pl._id] || false}
                  onCheckedChange={() => handleCheckboxChange(pl._id)}
                />
                <span className="text-sm font-medium">{pl.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-4">
          <Button onClick={handleSave} className="px-6">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}