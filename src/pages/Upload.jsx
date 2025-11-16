import React, { useEffect, useRef, useState } from 'react';
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group';
import { Input } from '@/components/ui/input';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {publishVideo} from "../app/slices/videoSlice"
import { Select, SelectTrigger, SelectValue, SelectGroup, SelectItem } from '@/components/ui/select';
import Loader from "../components/shared/Loader";
import { SelectContent } from '@radix-ui/react-select';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProgressBar } from '../components/shared/ProgressBar';

function Upload() {
  const uploadVid = useRef(null);
  const uploadImg = useRef(null);
  const isMobile = useIsMobile()
  const {status} = useSelector(state => state.video)

  const [videoFile, setVideoFile] = useState(null);
  const [videoFileSrc, setVideoFileSrc] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileSrc, setImageFileSrc] = useState(null);
  
  const dispatch = useDispatch();

  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
    isPublic: true
  });

  useEffect(() => {
    register("videoFile", { required: "A video file is required" });
    register("thumbnail", { required: "A thumbnail is required" });
  }, [register]);

  useEffect(() => {
    setValue("videoFile", videoFile);
  }, [videoFile, setValue]);

  useEffect(() => {
    setValue("thumbnail", imageFile);
  }, [imageFile, setValue]);


  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoFileSrc(URL.createObjectURL(file));
    }
  };

  const handleVideoDelete = () => {
    setVideoFile(null);
    setVideoFileSrc(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileSrc(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = () => {
      setImageFile(null);
      setImageFileSrc(null);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile);
    formData.append("thumbnail", data.thumbnail);
    formData.append("isPublic", data.isPublic)

   
    dispatch(publishVideo(formData));

    console.log("Submitting FormData:", {
        title: formData.get('title'),
        description: formData.get('description'),
        videoFile: formData.get('videoFile'),
        thumbnail: formData.get('thumbnail'),
    });
  };

  if (status === 'loading') {
    return <ProgressBar />
  }

  return (
    <>
    {/* For mobile screen */}
      {isMobile && 
      <div className='h-[81vh]'>
      <form onSubmit={handleSubmit(onSubmit)} className='h-[100%] w-full p-5 flex flex-col gap-3'>
        <div className='bg-card h-[30%] lg:h-[50%] flex items-center justify-center rounded-2xl border-2 border-amber-600 border-dashed'>
          {!videoFileSrc ? (
            <div onClick={() => uploadVid.current.click()} className='h-[100%] w-full flex items-center justify-center cursor-pointer'>
              <input ref={uploadVid} accept='video/mp4' onChange={handleVideoUpload} hidden type="file" />
              <h1 className='font-medium'>Upload a video</h1>
            </div>
          ) : (
            <div className='relative h-[100%] w-full flex items-center justify-center'>
              <video className='h-[100%] rounded-2xl' controls src={videoFileSrc}></video>
              <div onClick={handleVideoDelete} className='absolute top-2 right-4 cursor-pointer'>❌</div>
            </div>
          )}
        </div>
        {errors.videoFile && <p className="text-red-500">{errors.videoFile.message}</p>}

        <div className='bg-card h-[30%] border-2 border-dashed border-amber-600 rounded-2xl'>
          {imageFileSrc ? (
            <div className='relative h-[100%] w-full flex items-center justify-center'>
              <img className='h-[100%] w-full object-contain' src={imageFileSrc} alt="Thumbnail preview" />
              <div onClick={handleImageDelete} className='absolute top-2 right-4 cursor-pointer'>❌</div>
            </div>
          ) : (
            <div onClick={() => uploadImg.current.click()} className='h-[100%] w-full flex items-center justify-center cursor-pointer'>
              <input ref={uploadImg} accept='image/png, image/jpeg' onChange={handleImageUpload} hidden type="file" />
              <h1 className='font-medium'>Upload a Thumbnail</h1>
            </div>
          )}
        </div>
        {errors.thumbnail && <p className="text-red-500">{errors.thumbnail.message}</p>}

        <div className='h-[30%] rounded-2xl flex flex-col items-center gap-3 justify-center'>
          <Controller
            name='isPublic'
            control={control}
            render={({field}) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
              <SelectTrigger className="">
                <SelectValue placeholder="Select Video Type" />
              </SelectTrigger>
              <SelectContent >
                <SelectGroup className='bg-primary-foreground border w-[30vw] rounded-2xl'>
                <SelectItem value="true">Public</SelectItem>
                <SelectItem value="false">Private</SelectItem>
              </SelectGroup>
              </SelectContent>
            </Select>
            )}
          />
          <Input
            className="bg-card"
            id="title"
            type="text"
            placeholder="Enter Title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          
          <InputGroup>
            <InputGroupTextarea
              placeholder="Enter your description"
              {...register("description", { required: "Description is required" })}
            />
          </InputGroup>
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>
        <button type='submit' className='h-[10%] bg-green-500 rounded-2xl font-medium'>Upload</button>
      </form>
      </div>
      }

      {/* For big screen */}
      {!isMobile && 
      <div className='h-[88vh] w-full'>
        <form onSubmit={handleSubmit(onSubmit)} className='h-[100%] w-full flex'>
          <div className='h-[100%] w-[50%] flex flex-col p-5 gap-5'>
              <div className='h-[50%] w-[100%]'>
                <div className='bg-card lg:h-[100%] flex items-center justify-center rounded-2xl border-2 border-amber-600 border-dashed'>
                  {!videoFileSrc ? (
                    <div onClick={() => uploadVid.current.click()} className='h-[100%] w-full flex items-center justify-center cursor-pointer'>
                      <input ref={uploadVid} accept='video/mp4' onChange={handleVideoUpload} hidden type="file" />
                      <h1 className='font-medium'>Upload a video</h1>
                    </div>
                  ) : (
                    <div className='relative h-[100%] w-full flex items-center justify-center'>
                      <video className='h-[100%] rounded-2xl' controls src={videoFileSrc}></video>
                      <div onClick={handleVideoDelete} className='absolute top-2 right-4 cursor-pointer'>❌</div>
                    </div>
                  )}
                </div>
                {errors.videoFile && <p className="text-red-500">{errors.videoFile.message}</p>}
              </div>
              <div className='h-[50%] w-[100%]'>
                <div className='bg-card h-[100%] border-2 border-dashed border-amber-600 rounded-2xl'>
                  {imageFileSrc ? (
                    <div className='relative h-[100%] w-full flex items-center justify-center'>
                      <img className='h-[100%] w-full object-contain' src={imageFileSrc} alt="Thumbnail preview" />
                      <div onClick={handleImageDelete} className='absolute top-2 right-4 cursor-pointer'>❌</div>
                    </div>
                  ) : (
                    <div onClick={() => uploadImg.current.click()} className='h-[100%] w-full flex items-center justify-center cursor-pointer'>
                      <input ref={uploadImg} accept='image/png, image/jpeg' onChange={handleImageUpload} hidden type="file" />
                      <h1 className='font-medium'>Upload a Thumbnail</h1>
                    </div>
                  )}
                </div>
                {errors.thumbnail && <p className="text-red-500">{errors.thumbnail.message}</p>}
              </div>
          </div>
          <div className='h-[100%] w-[50%] p-2 text-center'>
            <div className='h-[80%] rounded-2xl flex flex-col items-center gap-8 justify-center'>
              <Controller
                name='isPublic'
                control={control}
                render={({field}) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                  <SelectTrigger className="h-[8vh]">
                    <SelectValue placeholder="Select Video Type" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectGroup className='bg-primary-foreground border w-[20vw] rounded-2xl'>
                    <SelectItem value="true">Public</SelectItem>
                    <SelectItem value="false">Private</SelectItem>
                  </SelectGroup>
                  </SelectContent>
                </Select>
                )}
              />
              <Input
                className="bg-card h-[8vh]"
                id="title"
                type="text"
                placeholder="Enter Title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
              
              <InputGroup>
                <InputGroupTextarea 
                  className={"h-[25vh]"}
                  placeholder="Enter your description"
                  {...register("description", { required: "Description is required" })}
                />
              </InputGroup>
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
            <button type='submit' className='h-[10%] p-2 w-full hover:bg-green-800 bg-green-500 rounded-2xl font-medium'>Upload</button>
          </div>
        </form>
      </div>
      }
    </>
  );
}

export default Upload;