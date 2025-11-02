import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ReactLenis, { useLenis } from 'lenis/react'
import LoadingScreen from './components/ui/LoadingScreen'
import ThreeCavnas from './components/3d/ThreeCavnas'
import FixedUi from './components/ui/FixedUi'
import Timeline from './components/ui/Timeline'


function App() {
  const lenisRef = useRef()
  const caption = useRef()
  const scroll = useRef(0)
  const [isLoading, setIsLoading] = useState(true)
  // 🚀 与gsap集成，gsap 与 lenis 同步 
  useEffect(() => {

    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])

  // 🚀 页面加载时，将滚动位置设置为0
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  // 🚀 使用Lenis的原生滚动监听，更平滑更高效
  useLenis((lenis) => {
    const progress = lenis.progress || 0
    scroll.current = progress
    if (caption.current) {
      caption.current.innerText = progress.toFixed(2)
    }
    isLoading? lenis.stop(): lenis.start() //loading页面是禁止滚动
  }, [isLoading])
  return (
    <>
       <ReactLenis 
        ref={lenisRef}
        root 
        autoRaf={false} 
        lerp={0.02}                    // 控制平滑度，越小越平滑（0.02-0.2）
        duration={5}                // 滚动持续时间（秒）
        easing={(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))}  // 自定义缓动函数
        gestureOrientation="vertical" // 手势方向
        smoothWheel={true}            // 平滑滚轮
        wheelMultiplier={0.9}           // 滚轮灵敏度
        infinite={false}              // 无限滚动
        orientation="vertical"        // 滚动方向
      />
      {isLoading && <LoadingScreen setIsLoading={setIsLoading}/>}
      <ThreeCavnas/>
      <FixedUi/>
      <Timeline caption={caption}/>
      
    </>
  )
}

export default App


