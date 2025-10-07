import React from 'react'
import { Container } from './Container'

function WatchHistory({
    className,
    data
}) {

  return (
    <div className={`${className}`}>
        <Container Data={data}/>
    </div>
  )
}

export default WatchHistory