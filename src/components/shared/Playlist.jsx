import React from 'react'
import { Container } from './Container'

function Playlist({
  className,
  data
}) {
  return (
    <div className={`${className}`}>
        <Container Data={data}/>
    </div>
  )
}

export default Playlist