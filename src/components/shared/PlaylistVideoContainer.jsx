import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { getVideoById } from "@/app/slices/videoSlice"
import { addToWatchHistory, getWatchHistory } from "@/app/slices/authSlice"

export function PlaylistVideoContainer({ videos }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleVideo = async (videoId) => {
    await dispatch(getVideoById(videoId)).unwrap()
    await dispatch(addToWatchHistory(videoId)).unwrap()
    dispatch(getWatchHistory())
    navigate("/video")
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {videos?.map((vid) => (
        <div
          key={vid._id}
          onClick={() => handleVideo(vid._id)}
          className="flex flex-col sm:flex-row gap-5 p-3 rounded-xl hover:bg-primary-foreground transition-all duration-200 cursor-pointer"
        >
          {/* Thumbnail */}
          <div className="w-full sm:w-[35%] md:w-[30%] lg:w-[25%] aspect-video">
            <img
              src={vid.thumbnail}
              alt={vid.title}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Video Info */}
          <div className="flex flex-col justify-between w-full sm:w-[65%] md:w-[70%] lg:w-[75%]">
            <div>
              <h1 className="text-lg md:text-xl font-semibold line-clamp-2">
                {vid.title}
              </h1>

            {vid.description && (
              <p className="text-sm opacity-75 mt-2 line-clamp-2 hidden md:block">
                {vid.description}
              </p>
            )}
              <h2 className="text-sm opacity-80 mt-1">
                {vid.owner?.username || "Unknown User"}
              </h2>

              <p className="text-xs md:text-sm opacity-70 mt-1">
                {new Date(vid.createdAt).toLocaleDateString()}
              </p>
            </div>

          </div>
        </div>
      ))}
    </div>
  )
}