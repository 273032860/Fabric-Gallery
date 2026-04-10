import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  return (
    // 填写总共页面高度
    <div className="relative z-20 pointer-events-none h-[200vh]">
      <div className="page-2 absolute  top-[100%] left-0 size-full ">
        {/* 主要滚动内容 */}
        
       
      </div>
    </div>
  );
};
export default Timeline;
