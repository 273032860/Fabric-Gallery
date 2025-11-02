import { Box } from '@react-three/drei'
import React from 'react'
import { useAppStore } from '@/Store'

const Boxs = () => {
  const toggleLeftTop = useAppStore((state)=>state.toggleLeftTop)
  const setLeftBottom = useAppStore((state)=>state.setLeftBottom)
  function onClick() {
    toggleLeftTop()
  }
  function onClick1() {
    setLeftBottom(true)
  }
  function onClick2() {
    setLeftBottom(false)
  }
  return (
    <>
      <Box onClick={onClick}/>
      <Box position={[4,0,0]} onClick={onClick1}/>
      <Box position={[4,2,0]} onClick={onClick2}/>
    </>
  )
}

export default Boxs