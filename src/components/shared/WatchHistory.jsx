import { useDispatch, useSelector } from "react-redux"
import { getVideoById } from "@/app/slices/videoSlice"
import { addToWatchHistory, getWatchHistory } from "@/app/slices/authSlice"
import { useNavigate } from "react-router"
import Loader from "./Loader"

export function WatchHistory({
  Data,
  className,
  imgClass
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {status} = useSelector(state => state.video)

  const handleVideo = (videoId) => {
    dispatch(getVideoById(videoId))
    dispatch(addToWatchHistory(videoId)).then(() => {
      dispatch(getWatchHistory())
    })
    if (status === "loading") {
      <Loader />
    }
    else if (status === "succeded") {
      navigate("/video")
    }
  }

  return (
    Data?.map((vid) => {
    const username = Array.isArray(vid.ownerDetails) 
      ? vid.ownerDetails[0]?.username 
      : vid.ownerDetails?.username;

      return (
        <div key={vid._id} onClick={() => handleVideo(vid._id)} className={`${className} w-full h-[20vh] lg:h-[45vh] lg:p-2 hover:bg-primary-foreground rounded-2xl`}>
        <div className="h-[70%]">
          <img className="h-[100%] w-full object-cover rounded-2xl" src={vid.thumbnail} alt="" />
        </div>
        <div className="h-[30%] w-[100%] flex">
          <div className="flex flex-col items-center justify-center h-[100%] w-[80%]">
            <div className="h-[78%] w-full flex justify-between flex-col p-1 overflow-hidden">
              <h1 className="text-sm font-medium">{vid.title}</h1>
              <h2 className="opacity-80 font-mono">{username || 'Unknown User'}</h2>
            </div>
          </div>
        </div>
      </div>
      )
    }
  )
  )
}
