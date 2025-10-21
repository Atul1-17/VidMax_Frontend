import {
  Card,
} from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"
import { useNavigate } from "react-router"

function Subscription() {

  const navigate = useNavigate()

  const Data = [
    {
      username: "Atul",
      fullName: "Atul Bopche",
      Image: "/Gemini_Generated_Image_9y60we9y60we9y60__1_-removebg-preview.png"
    },
    {
      username: "Atul",
      fullName: "Atul Bopche",
      Image: "/WhatsApp Image 2025-02-18 at 22.06.14_eb632e0b.jpg"
    },
  ]
  return (
    <div className="w-full h-[81vh] bg-re-500 flex flex-col items-center p-5 overflow-scroll gap-4">
      {Data.map((vid) => (
          <Card key={vid.username} onClick={()=> navigate("/channelProfile")} className="w-full h-[10vh] flex items-center max-w-sm gap-5">
            <Avatar className="h-auto w-15 ml-5">
              <AvatarImage className="object-cover" src={vid.Image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          <div className="flex flex-col items-start justify-center gap-2 w-[50%] bg-re-500">
             <h1>{vid.username}</h1>
             <h3>{vid.fullName}</h3>
          </div>
        </Card>
        ))}
    </div>
  )
}

export default Subscription