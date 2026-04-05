import { useLenis } from 'lenis/react';
import { useRef } from 'react';

const SrollIcon = () => {
  const ref = useRef(null);
  useLenis((Lenis) => {
    const progress = Lenis.progress;
    if (progress > 0.97) {
      ref.current.style.opacity = 0;
    } else {
      ref.current.style.opacity = 1;
    }
  });
  return (
    <div
      className="hero-animate-bounce-slow absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 opacity-60"
      ref={ref}
    >
      <span className="text-[12px] font-mono tracking-[0.15em] text-gray-400 uppercase">
        滚动浏览
      </span>
      <svg viewBox="0 0 256 256" width="16" height="16" fill="#9ca3af">
        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
      </svg>
    </div>
  );
};
export default SrollIcon;
