import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';
import { useRef } from 'react';
import { mapProgress } from '../../../utils/progress';

const Texth1 = () => {
  const tl = useRef();
  const tl2 = useRef();
  const tl3 = useRef();
  const tl4 = useRef(); //两个按钮

  const h1Ref = useRef();
  const h2Ref = useRef();

  const lastState = useRef(null);
  const lastState2 = useRef(null);
  useGSAP(() => {
    // 基础动画
    tl.current = gsap.timeline({ paused: true }).to(h1Ref.current, { opacity: 0, duration: 1 });

    tl2.current = gsap.timeline({ paused: true }).to(h2Ref.current, { opacity: 0, duration: 1 });

    tl3.current = gsap
      .timeline({ paused: true })
      .to('.card1', { opacity: 0, duration: 1 })
      .to('.card2', { opacity: 0, duration: 1 })
      .to('.card3', { opacity: 0, duration: 1 });

    // ===== 按钮动画 =====
    tl4.current = gsap
      .timeline({ paused: true })
      .to('.button1', {
        autoAlpha: 0,
        yPercent: 100,
      })
      .to(
        '.button2',
        {
          autoAlpha: 0,
          yPercent: 100,
        },
        '<'
      );
    // button1 移动
  }, []);

  useLenis((lenis) => {
    const progress = lenis.progress;
    // 节流：用 requestAnimationFrame 避免频繁触发
    if (!tl.current) return;
    if (!tl2.current) return;
    if (!tl3.current) return;
    if (!tl4.current) return;
    tl.current.progress(mapProgress(progress, 0, 0.1));
    tl2.current.progress(mapProgress(progress, 0.1, 0.2));

    if (progress > 0.3 && lastState.current !== 'play') {
      lastState.current = 'play';
      tl3.current.play();
    }

    if (progress <= 0.4 && lastState.current !== 'reverse') {
      lastState.current = 'reverse';
      tl3.current.reverse();
    }
    // 按钮动画
    if (progress > 0.2 && lastState2.current !== 'play') {
      lastState2.current = 'play';
      tl4.current.play();
    }

    if (progress <= 0.3 && lastState2.current !== 'reverse') {
      lastState2.current = 'reverse';
      tl4.current.reverse();
    }
  });

  return (
    <>
      <div className=" absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1
          className="text-[clamp(48px,8vw,96px)] font-bold tracking-[-0.02em] mb-6 leading-[1.1]"
          ref={h1Ref}
        >
          <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent block mb-2">
            全息感知
          </span>
          <span className="hero-neon-text-gradient">智界无限</span>
        </h1>
      </div>
      <div className=" absolute top-9/12 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p
          className="text-[18px] text-gray-400 max-w-[672px] mx-auto mb-12 font-light leading-[1.75] "
          ref={h2Ref}
        >
          首款搭载原生多模态大模型的空间计算眼镜。将数字视界与现实完美融合，所见即所知，开启次世代交互革命。
        </p>
        <div className="flex flex-row flex-wrap items-center gap-5 justify-center w-full">
          <button className="group bg-[#00FF9D] text-black px-10 py-4 rounded-full text-[16px] font-bold flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,255,157,0.4)] border-none cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-[0_0_40px_rgba(0,255,157,0.6)] hover:scale-105 button1">
            <span className="flex items-center gap-[3px] opacity-70">
              <div className="w-1 h-3 bg-current rounded-sm" />
              <div className="w-1 h-4 bg-current rounded-sm" />
              <div className="w-1 h-3 bg-current rounded-sm" />
              <div className="w-1 h-5 bg-current rounded-sm" />
            </span>
            <span className="buttonText1 inline-block whitespace-nowrap"> 支付定金 (¥100)</span>
          </button>

          <button className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/20 px-10 py-4 rounded-full text-[16px] font-medium text-white cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:bg-white/10 hover:border-white/40 button2">
            <svg viewBox="0 0 256 256" width="22" height="22" fill="#9ca3af">
              <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z" />
            </svg>
            <span className="buttonText2 inline-block whitespace-nowrap">观看概念片</span>
          </button>
        </div>
      </div>
      {/* 滚动图标 */}

      {/* Floating cards */}
      <div className="hero-animate-float bg-[#0a0a0a]/60 backdrop-blur-2xl border border-[#00FF9D]/20 absolute top-[20%] left-[10%] px-4 py-3 rounded-2xl flex items-center gap-3 shadow-[0_0_15px_rgba(0,255,157,0.1)] card1">
        <div className="w-8 h-8 rounded-full bg-[#00FF9D]/10 flex items-center justify-center">
          <svg viewBox="0 0 256 256" width="18" height="18" fill="#00FF9D">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-104H136V80a8,8,0,0,0-16,0v40H80a8,8,0,0,0,0,16h40v40a8,8,0,0,0,16,0V136h40a8,8,0,0,0,0-16Z" />
          </svg>
        </div>
        <div className="text-left ">
          <div className="text-[11px] text-gray-400 font-mono">Display</div>
          <div className="text-[14px] font-bold text-white">Micro-OLED 4K</div>
        </div>
      </div>

      <div className="hero-animate-float-delayed bg-[#0a0a0a]/60 backdrop-blur-2xl border border-[#00FF9D]/20 absolute top-[10%] right-[12%] px-4 py-3 rounded-2xl flex items-center gap-3 shadow-[0_0_15px_rgba(0,255,157,0.1)] card2">
        <div className="w-8 h-8 rounded-full bg-[#00FF9D]/10 flex items-center justify-center">
          {/* Processor Icon */}
          <svg viewBox="0 0 256 256" width="18" height="18" fill="#00FF9D">
            <path d="M152,128A24,24,0,1,1,128,104,24,24,0,0,1,152,128Zm76.45-15.06L208,104.22V88a16,16,0,0,0-16-16H184.22l-8.72-20.45a16,16,0,0,0-14.72-9.55H95.22a16,16,0,0,0-14.72,9.55L71.78,72H64A16,16,0,0,0,48,88v104a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V151.78l20.45-8.72A8,8,0,0,0,228.45,112.94ZM192,128a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Z" />
          </svg>
        </div>
        <div className="text-left">
          <div className="text-[11px] text-gray-400 font-mono">Processor</div>
          <div className="text-[14px] font-bold text-white">XR2 Gen 2</div>
        </div>
      </div>

      <div className="hero-animate-float bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 absolute bottom-[20%] left-[20%] px-4 py-2 rounded-xl flex items-center gap-2 card3">
        <svg viewBox="0 0 256 256" width="16" height="16" fill="#9ca3af">
          <path d="M229.66,218.34l-50.07-50.07A88.11,88.11,0,1,0,168,178.83l50.06,50.06a8,8,0,0,0,11.6-11l0,0ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
        </svg>
        <span className="text-[14px] font-medium text-white">仅重 45g</span>
      </div>

      {/* Glasses SVG */}
      <div className="w-full max-w-[896px] relative z-10">
        {/* Shadow glow */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-8 bg-[#00FF9D]/30 blur-2xl rounded-full transition-opacity duration-500  'opacity-80' 
            }`}
        />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none z-30" />
    </>
  );
};
export default Texth1;
