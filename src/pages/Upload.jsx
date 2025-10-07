import React, { useRef, useState } from 'react'
import { PlayIcon, PauseIcon, FullscreenIcon } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'

function Upload() {

  let vid = useRef(null)
  const uploadVid = useRef(null)
  const uploadImg = useRef(null)
  const [videoFile, setVideoFile] = useState(null)
  const [videoFileSrc, setVideoFileSrc] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [imageFile, setImageFile] = useState(null)

  const {register, handleSubmit, formState: {errors}} = useForm()
  
  const playVideo = ()=> {
    vid.current.play()
    setPlaying(true)
  }
  const PauseVideo = ()=> {
    vid.current.pause()
    setPlaying(false)
  }

  const fullScreen = () => {
    vid.current.webkitRequestFullscreen()
  }

  const handleVideoUpload = (e) => {
    const file = e.target.files[0]
    const url = URL.createObjectURL(file)
    setVideoFile(file)
    setVideoFileSrc(url)
  }

  const handleVideoDelete = () => {
    setVideoFile(null)
    setVideoFileSrc(null)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    setImageFile(URL.createObjectURL(file))
  }

  const onSubmit = () => {

  }

  return (
    <div className='h-[81vh] '>
      <form onSubmit={handleSubmit(onSubmit)} className='h-[100%] w-full p-5 flex flex-col gap-3'>
      <div className='bg-card h-[30%] flex items-center justify-center rounded-2xl border-2 border-amber-600 border-dashed'>
        {!videoFile ? (
          <div onClick={() => uploadVid.current.click()} className='h-[100%] flex items-center justify-center'>
            <input ref={uploadVid} accept='video/mp4' onChange={handleVideoUpload} hidden type="file" />
            <h1 className='font-medium'>Upload a video</h1>
          </div>
        ):(
          <div className='relative h-[100%] w-full flex items-center justify-center'>
            <video ref={vid} className='h-[100%] rounded-2xl' src={videoFileSrc}></video>
            <div onClick={handleVideoDelete} className='absolute top-2 right-4'>
              ❌
            </div>
            <div className='flex absolute bottom-0 p-2 justify-between w-full bg-ed-500'>
              {playing ? (
                <PauseIcon onClick={PauseVideo}/>
              ) : (
                <PlayIcon onClick={playVideo}/>
              )}
              <FullscreenIcon onClick={fullScreen}/>
            </div>
          </div>
        )}
        </div>
        <div className='bg-card h-[30%] border-2 border-dashed border-amber-600 rounded-2xl'>
          {imageFile ? (
            <div className='relative h-[100%] w-full flex items-center justify-center'>
              <img className='h-[100%] w-full object-contain' src={imageFile} alt="" />
              <div onClick={() => setImageFile(null)} className='absolute top-2 right-4'>
              ❌
            </div>
            </div>
          ):(
            <div onClick={() => uploadImg.current.click()} className='h-[100%] flex items-center justify-center'>
            <input ref={uploadImg} accept='image/png, image/jpeg' onChange={handleImageUpload} hidden type="file" />
            <h1 className='font-medium'>Upload a Thumbnail</h1>
          </div>
          )}
        </div>
        <div className='h-[30%] rounded-2xl flex flex-col items-center gap-3 justify-center'>
          <Input
                className="bg-card"
                id="title"
                type="text"
                placeholder="Enter Title"
                {...register("title", {required: "Title is required"})}
              />
          <InputGroup>
            <InputGroupTextarea placeholder="Enter your message" />
              <InputGroupAddon align='block-end'>
                <InputGroupText className={"text-muted-foreground text-xs"}>
                  50 charecters left
                </InputGroupText>
              </InputGroupAddon>
          </InputGroup>
        </div>
        <button type='submit' className='h-[10%] bg-green-500 rounded-2xl font-medium'>Upload</button>
      </form>
    </div>
  )
}

export default Upload