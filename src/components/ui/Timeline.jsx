import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger)

const Timeline = ({caption}) => {
  const main = useRef();
  
  useGSAP(
    () => {
      // 初始化：隐藏所有页面元素
      gsap.set('.page-content', {
        opacity: 0,
        y: 50,
        scale: 0.8
      });

      // 初始化：隐藏第五页的固定元素
      gsap.set('.page-5-center, .page-5-left, .page-5-right', {
        opacity: 0,
        scale: 0.8
      });
      
      gsap.set('.page-5-left', {
        x: -50
      });
      
      gsap.set('.page-5-right', {
        x: 50
      });

      // 第一页动画 - 页面加载时显示
      gsap.to('.page-1 .page-content', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out'
      });

      // 第二页动画
      gsap.to('.page-2 .page-content', {
        opacity: 1,
        y: 0,
        scale: 1,
        scrollTrigger: {
          trigger: '.page-2',
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
          // markers: true
        }
      });

      // 第三页动画（保留原有box动画）
      const boxes = gsap.utils.toArray('.box');
      boxes.forEach((box) => {
        // 先显示元素
        gsap.to(box.closest('.page-3').querySelector('.page-content'), {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: '.page-3',
            start: 'top 70%',
            end: 'top 50%',
            scrub: 1
          }
        });
        
        // 然后执行原有动画
        gsap.to(box, {
          x: 650,
          scrollTrigger: {
            trigger: box,
            start: 'bottom 50%',
            end: 'top 20%',
            scrub: true,
          },
        });
      });

      // 第四页动画
      gsap.to('.page-4 .page-content', {
        opacity: 1,
        y: 0,
        scale: 1,
        scrollTrigger: {
          trigger: '.page-4',
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1
        }
      });

      // 第五页动画 - 分别为每个固定元素添加动画
      gsap.to('.page-5-center', {
        opacity: 1,
        y: 0,
        scale: 1,
        scrollTrigger: {
          trigger: '.page-5',
          start: 'top 70%',
          end: 'top 50%',
          scrub: 1
        }
      });

      gsap.to('.page-5-left', {
        opacity: 1,
        x: 0,
        scale: 1,
        scrollTrigger: {
          trigger: '.page-5',
          start: 'top bottom',
          end: 'bottom 40%',
          scrub: 1,
          // markers: true,
         
        }
      });

      gsap.to('.page-5-right', {
        opacity: 1,
        x: 0,
        scale: 1,
        scrollTrigger: {
          trigger: '.page-5',
          start: 'top 50%',
          end: 'top 30%',
          scrub: 1
        }
      });
    },
    { scope: main }
  );

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: '.four',
        start: 'top 50%',
        end: 'bottom 20%',
        scrub: true,
        // markers: true,
        // onUpdate: (self) => {
        //       console.log(self)
        //     }
      })
    },
    { scope: main }
  )

  return (
    <div style={{height:"400vh"}}   id="timeline"
    ref={main}
    >timeline
         
         <div className='page-1 absolute top-0 h-dvh '>
            <div className='page-content'>
              <div className='fixed left-6 bottom-6'>
                {/* <h1 className='text-2xl font-bold text-white bg-blue-600 px-4 py-2 rounded-lg shadow-lg'>第一页 左下</h1> */}
              </div>
              <div className='fixed right-6 bottom-6'>
                <h1 className='text-2xl font-bold text-white bg-green-600 px-4 py-2 rounded-lg shadow-lg'>第一页 右下</h1>
              </div>
            </div>
            <span className="caption fixed top-0 right-0 m-20 text-white text-9xl " ref={caption}>
              0.0
            </span>
         </div>

         {/* 2 */}
         <div className='page-2 absolute top-[22%] left-1.5 '>
            <div className='page-content'>
              {/* <h1 className='text-4xl font-bold text-purple-600 bg-white px-6 py-3 rounded-xl shadow-xl'>第二页</h1> */}
            </div>
         </div>
         {/* 3 */}
         <div className='page-3 absolute top-[40%] left-1.5 ' >
            <div className='page-content'>
              <div className='box bg-red-500 p-4 rounded-lg'>
                {/* <h1 className='text-white text-2xl font-bold'>第三页 左下</h1> */}
              </div>
            </div>
         </div>
         {/* 4 */}
         <div className='page-4 absolute top-[60%] left-1.5 '>
            <div className='page-content'>
              <div className='four h-[50vh] border-2 border-amber-200 bg-amber-100 rounded-lg p-6'>
                {/* <h1 className='text-3xl font-bold text-amber-800'>第四页 左下</h1> */}
              </div>
            </div>
         </div>
         {/* 5 */}
         <div className='page-5 absolute top-[90%] left-1.5 w-full '>
            {/* <div className='page-5-center fixed top-2.5 left-1/2 transform -translate-x-1/2 '>
              <h1 className='text-4xl font-bold text-white bg-gradient-to-r from-pink-500 to-violet-500 px-8 py-4 rounded-full shadow-2xl'>第五页 固定居中</h1>
            </div>
            <div className='page-5-left fixed left-6 bottom-6 '>
              <h1 className='text-2xl font-bold text-white bg-indigo-600 px-4 py-2 rounded-lg shadow-lg'>第五页 固定左下</h1>
            </div>
            <div className='page-5-right fixed right-6 bottom-6'>
              <h1 className='text-2xl font-bold text-white bg-rose-600 px-4 py-2 rounded-lg shadow-lg'>第五页 固定右下</h1>
            </div> */}
         </div>
         

      </div>
  )
}
export default Timeline