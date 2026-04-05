import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  return (
    // 填写总共页面高度
    <div className="relative z-20 pointer-events-none h-[1000vh]">
      <div className="page-2 absolute  top-[100%] left-0 size-full ">
        {/* 主要滚动内容 */}
        <div>123</div>
        {/* <ScrolContent/> */}
        <div className="h-screen relative">
          <div className="absolute left-1/2 top-3/4 -translate-x-1/2">
            <h1 className="text-[#84eb62] text-bold  text-7xl   ">联系方式</h1>
            <div className="flex-center gap-4 ">
              <img src="/wechat-logo.svg" alt="weixin" className="w-28 h-auto" />
              <h1 className="text-[#84eb62] text-bold text-7xl    ">syh273032860</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Timeline;
