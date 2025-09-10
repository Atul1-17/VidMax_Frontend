import React from 'react'
import { Home } from 'lucide-react'
import { SquarePlay } from 'lucide-react';
import { ThumbsUp } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { useNavigate } from 'react-router';


function Footer({
    className
}) {

  const navigate = useNavigate()

  return (
    <div className={`${className} p-5 rounded-t-3xl flex justify-between w-full`}>
      <div>
        <Home onClick={()=> navigate("/")}/>
      </div>
      <div>
        <ThumbsUp onClick={()=> navigate("/like")}/>
      </div>
      <div>
        <SquarePlay onClick={()=> navigate("/subscription")}/>
      </div>
      <div>
        <CircleUserRound />
      </div>
    </div>
  )
}

export default Footer