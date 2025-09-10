import { Container } from "@/components/shared/Container"

function Like() {
  const Data = [
    {
      title: "The first video",
      discription: "This is the first discription video",
      image: "/Gemini_Generated_Image_9y60we9y60we9y60__1_-removebg-preview.png"
    }
  ]

  return (
    <div className='w-full h-[81vh] bg-re-500 flex flex-col items-center p-4 overflow-scroll gap-4'>
        <Container Data={Data}/>
    </div>
  )
}

export default Like