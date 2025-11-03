import React from 'react'
import Logo from './Logo'
import { Search, SearchIcon } from 'lucide-react';
import {ModeToggle} from "../shared/ToggleTheme"
import { useNavigate } from 'react-router'

function Header({
    className,
}) {

  const navigate = useNavigate() 

  return (
    <>
      <div className={`${className} lg:hidden p-5 rounded-b-3xl flex justify-between w-full`}>  
        <div className='text-center'>
            <Logo LogoName={"vidMax"} className={"text-2xl font-semibold"} />
        </div>
        <div className='flex items-center gap-3 justify-center'>
            <button onClick={() => navigate("/upload")} className='font-medium border-2 px-3 rounded-2xl bg-background'>+ Upload</button>
            <Search />
            <div>
            <ModeToggle/>
            </div>
        </div>
      </div>
      <div className={`${className} hidden lg:flex p-5 rounded-b-3xl justify-between w-full`}>  
        <div className='text-center'>
            <Logo LogoName={"VidMax"} className={"text-2xl font-semibold"} />
        </div>
        <div className='bg-primary-foreground w-[30vw] rounded-2xl flex items-center'>
           <input
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => query && setIsOpen(true)}
              placeholder="Search..."
              className="w-full px-4 py-3 outline-none placeholder-gray-500"
            />
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </>
  )
}

export default Header