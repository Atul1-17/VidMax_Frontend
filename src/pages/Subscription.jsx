import {
  Card,
} from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"
import { useNavigate } from "react-router"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSelector } from "react-redux"

function Subscription() {

  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const {subscribedChannels} = useSelector(state => state.subscription)
  
  if (isMobile) {
    return (
      <div className="w-full h-[81vh] bg-re-500 flex flex-col items-center p-5 overflow-scroll gap-4">
      {subscribedChannels.map((channel) => (
          <Card key={channel.username} onClick={()=> navigate("/channelProfile")} className="w-full h-[10vh] flex items-center max-w-sm gap-5">
            <Avatar className="h-auto w-15 ml-5">
              <AvatarImage className="object-cover" src={channel.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          <div className="flex flex-col items-start justify-center gap-2 w-[50%] bg-re-500">
             <h1>{channel.username}</h1>
             <h3>{channel.fullName}</h3>
          </div>
        </Card>
        ))}
    </div>
    )
  }

  return (
    <div className="w-full h-[100vh] bg-re-500 flex flex-col items-center p-5 gap-4">
      {subscribedChannels.map((channel) => (
          <Card key={channel.username} onClick={()=> navigate("/channelProfile")} className="w-full h-[20vh] flex items-center gap-5">
            <Avatar className="h-auto w-20 ml-5">
              <AvatarImage className="object-cover" src={channel.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          <div className="flex flex-col items-start justify-center gap-2 w-[50%] bg-re-500">
             <h1>{channel.username}</h1>
             <h3>{channel.fullName}</h3>
          </div>
        </Card>
        ))}
    </div>
  )
}

export default Subscription