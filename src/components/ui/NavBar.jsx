import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger)

// 导航链接数据
const navLinks = [
    { label: "Store" },
    { label: "Mac" },
    { label: "iPhone" },
    { label: "Watch" },
    { label: "Vision" },
    { label: "AirPods" },
];


const NavBar = () => {
  const headerRef = useRef(null)

  // 使用useGSAP优化GSAP动画
  useGSAP(() => {
    // GSAP滚动动画：当滚动到10%时淡出导航栏
    gsap.to(headerRef.current, 
      {
        opacity: 0,
        scrollTrigger: {
          trigger: document.body,
          start: "10% top", // 滚动到10%时开始动画
          end: "20% top", // 滚动到20%时完成动画
          scrub: true, // 平滑跟随滚动
          ease: "none",
          // markers: true,
        }
      }
    )
  }, { scope: headerRef }) // 限制作用域到navRef

  return (
    <header ref={headerRef}>
      <nav >
        {/* 磨砂玻璃背景容器 */}
        
            {/* Logo区域 */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex-center bg-mint-500 rounded-xl">
                <span className="text-white font-bold text-sm">3D</span>
              </div>
              <span className="text-white font-semibold text-lg tracking-wide">Studio</span>
            </div>
            
            {/* 导航菜单 */}
            <ul>
              {navLinks.map(({ label }) => (
                <li key={label}>
                    <a href={label}>{label}</a>
                </li>
              ))}
            </ul>
            
            {/* 右侧按钮 */}
            <div className="flex-center gap-4">
              {/* 搜索按钮 */}
              <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* CTA按钮 */}
              <button className="px-4 py-1 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                体验3D
              </button>
              
              
            </div>
        
      </nav>
    </header>
  )
}
export default NavBar