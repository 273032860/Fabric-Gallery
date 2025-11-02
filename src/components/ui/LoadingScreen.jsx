import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react";

export default function LoadingScreen({setIsLoading}) {
  const containerRef = useRef()
  const progressRef = useRef()
  const { contextSafe } = useGSAP({ scope: containerRef });

  const LoadingExit = contextSafe(() => {
    gsap.to(containerRef.current, {
      autoAlpha: 0,
      duration:2,
      onComplete: () => setIsLoading(false)
    });
  });

  return (
    <div
      ref={containerRef}
      id="loading"
    >
      {/* rive可在此处添加rive动画 */}
      <div className="text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">3D Showcase</h1>
          <p className="text-lg text-purple-300">Loading immersive experience...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
              style={{ width: "0%" }}
            />
          </div>
         
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
      <button className="cursor-pointer text-amber-50" onClick={LoadingExit}>开始</button>
    </div>
  )
}
