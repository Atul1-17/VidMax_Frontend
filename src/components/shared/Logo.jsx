import React from 'react'

function Logo({
    className,
    LogoName
}, ref) {
  return (
    <div className={`${className}`}>
        <h1>{LogoName}</h1>
    </div>
  )
}

export default React.forwardRef(Logo)