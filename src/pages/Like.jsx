import { Container } from "@/components/shared/Container"
import { useIsMobile } from "@/hooks/use-mobile"

function Like() {

  const isMobile = useIsMobile()

  const Data = [
    {
      title: "The first video",
      discription: "This is the first discription video",
      image: "/Gemini_Generated_Image_9y60we9y60we9y60__1_-removebg-preview.png"
    }
  ]

  return (
    <>
      {isMobile && 
      <div className='w-full h-[81vh] lg:h-[100vh]'>
        <div onClick={()=> navigate("/video")} className='flex flex-col items-center p-5 overflow-scroll gap-6 w-full h-[100%]'>
          <Container Data={Data}/>
        </div>
      </div>}
      {!isMobile &&
      <div className='w-full'>
        <div onClick={()=> navigate("/video")} className='grid grid-cols-3 items-center p-5 gap-6 w-full h-[100%]'>
          <Container Data={Data}/>
        </div>
      </div>}
    </>
  )
}

export default Like