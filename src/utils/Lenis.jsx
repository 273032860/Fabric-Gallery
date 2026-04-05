import gsap from 'gsap'
import { useRef, useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { LenisScrollTriggerSync } from './scroll-trigger'

const Lenis = ({
  root,
  options,
  syncScrollTrigger = true, // 建议默认开启
}) => {
  const lenisRef = useRef()

  // 🚀 获取 lenis 实例
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    // 关键：定义驱动函数
    function update(time) {
      // 如果 lenis.stop() 被调用，isStopped 会变成 true
      // 此时我们拦截掉 raf，滚动就会真正停止
      if (!lenis.isStopped) {
        lenis.raf(time * 1000)
      }
    }

    // 使用 GSAP 主时钟驱动
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [lenis])
   
  return (
    <ReactLenis
      ref={lenisRef}
      root={root}
      options={{
        ...options,
        lerp: options?.lerp ?? 0.1, // 稍微降低一点更丝滑
        autoRaf: false, // 必须为 false，由 GSAP 接管
        anchors: true,
      }}
    >
      {/* 只有 root 模式下才需要同步 ScrollTrigger */}
      {syncScrollTrigger && root && <LenisScrollTriggerSync />}
    </ReactLenis>
  )
}

export default Lenis