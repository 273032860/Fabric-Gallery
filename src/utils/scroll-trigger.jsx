import gsap from 'gsap'
import { ScrollTrigger as GSAPScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from 'lenis/react'
import { useEffect } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(GSAPScrollTrigger)
}

export function LenisScrollTriggerSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    // 每次 Lenis 滚动时，通知 ScrollTrigger 更新
    // 这是官方推荐的最简同步方案
    const scrollUpdate = () => GSAPScrollTrigger.update()
    lenis.on('scroll', scrollUpdate)

    // 当页面尺寸变化时刷新（例如图片加载后）
    const refreshTrigger = () => GSAPScrollTrigger.refresh()
    window.addEventListener('resize', refreshTrigger)

    // 初始刷新
    GSAPScrollTrigger.refresh()

    return () => {
      lenis.off('scroll', scrollUpdate)
      window.removeEventListener('resize', refreshTrigger)
    }
  }, [lenis])

  return null
}