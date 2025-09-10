import React from 'react'
import Logo from './Logo'
import { Search } from 'lucide-react';
import {ModeToggle} from "../shared/ToggleTheme"

function Header({
    className,
}) {
  return (
    <div className={`${className} p-5 rounded-b-3xl flex justify-between w-full`}>  
        <div className='text-center'>
            <Logo LogoName={"vidMax"} className={"text-2xl font-semibold"} />
        </div>
        
        <div className='flex items-center gap-3 justify-center'>
            <Search />
            <div>
            <ModeToggle/>
            </div>
        </div>
    </div>
  )
}

export default Header