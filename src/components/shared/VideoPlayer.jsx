import { useSelector } from "react-redux";

function VideoPlayer() {

    const {video} = useSelector(state => state.video)

    console.log(video)

    return (
    <div className="aspect-video bg-black rounded-lg md:rounded-xl overflow-hidden shadow-2xl">
        <video src={video?.videoFile} controls className="w-full h-full object-contain" />
    </div>
    )
}
  

export default VideoPlayer