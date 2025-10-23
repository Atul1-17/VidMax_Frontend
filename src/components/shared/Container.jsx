export function Container(
  {
    Data,
  }
) {

  const handleVideoLoading = (videoId) => {
      
  }

  return (
    Data.map((vid) => (
      <div key={vid._id} onClick={() => handleVideoLoading(vid._id)} className="w-full h-[30vh] rounded-2xl">
        <div className="h-[70%]">
          <img className="h-[100%] w-full object-cover rounded-2xl" src={vid.thumbnail} alt="" />
        </div>
        <div className="h-[30%] w-[100%] flex">
          <div className="h-[100%] w-[20%] flex items-center justify-start">
            <img className="w-15 h-15 rounded-full cursor-pointer object-cover border-card border-2" src={vid.thumbnail} alt="" />
          </div>
          <div className="flex flex-col items-center justify-center h-[100%] w-[80%]">
            <div className="h-[78%] w-full flex justify-between flex-col p-1">
              <h1 className="text-xl font-medium">{vid.title}</h1>
              <h2 className="opacity-80 font-medium">{vid.ownerDetails[0].username}</h2>
            </div>
            <div className="h-[22%] w-full pl-1">
              <h3 className="text-[10px] opacity-80 font-medium">{new Date(vid.createdAt).toLocaleDateString()}</h3>
            </div>
          </div>
        </div>
      </div>
    ))
  )
}
