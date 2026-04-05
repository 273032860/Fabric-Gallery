const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300    border-none">
      <div className="max-w-[1400px] mx-auto px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 no-underline group">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden transition-colors duration-300 group-hover:border-white/30">
            <svg
              viewBox="0 0 256 256"
              width="20"
              height="20"
              fill="currentColor"
              className="text-[#00FF9D]"
            >
              <path d="M240,100H216V88a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v12H16a8,8,0,0,0-8,8v40a56.06,56.06,0,0,0,56,56,55.75,55.75,0,0,0,37.33-14.28A55.75,55.75,0,0,0,137.67,184,56,56,0,0,0,248,148V108A8,8,0,0,0,240,100ZM64,188a40,40,0,1,1,40-40A40,40,0,0,1,64,188Zm128,0a40,40,0,1,1,40-40A40,40,0,0,1,192,188Z" />
            </svg>
          </div>
          <span className="font-bold text-[20px] tracking-[0.1em] uppercase text-white">
            Vision<span className="text-[#00FF9D]">AI</span>
          </span>
        </a>

        {/* Nav links */}
        <div className="flex items-center gap-10 text-[14px] font-medium">
          <a href="#" className="hero-nav-link text-white no-underline">
            产品概览
          </a>
          <a
            href="#"
            className="text-gray-400 no-underline transition-colors duration-300 hover:text-white"
          >
            空间计算
          </a>
          <a
            href="#"
            className="text-gray-400 no-underline transition-colors duration-300 hover:text-white"
          >
            原生应用
          </a>
          <a
            href="#"
            className="text-gray-400 no-underline transition-colors duration-300 hover:text-white"
          >
            技术规格
          </a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-5">
          <a
            href="#"
            className="text-[14px] text-gray-400 font-medium no-underline transition-colors duration-300 hover:text-white"
          >
            登录
          </a>
          <a
            href="#"
            className="bg-[#00FF9D] text-black px-6 py-2.5 rounded-full text-[14px] font-bold tracking-[0.05em] no-underline flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,157,0.4)] hover:bg-white hover:shadow-[0_0_40px_rgba(0,255,157,0.6)] hover:-translate-y-0.5"
          >
            立即抢购
            <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor">
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};
export default Header;
