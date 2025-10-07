import React from 'react'
import { Home } from 'lucide-react'
import { SquarePlay } from 'lucide-react';
import { ThumbsUp } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';


function Footer({
    className
}) {

  const {avatar} = useSelector(state => state.auth.user)
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
        {avatar ? 
        (<img 
            src={avatar} 
            alt="User Avatar" 
            className="w-6 h-6 rounded-full cursor-pointer"
            onClick={() => navigate("/dashbord")} 
        />)
          : 
          (<CircleUserRound 
            className="cursor-pointer"
            onClick={() => navigate("/dashbord")} 
        />)}
      </div>
    </div>
  )
}

export default Footer