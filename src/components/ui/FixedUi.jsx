import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { useAppStore } from '@/Store';
import { useLenis } from 'lenis/react';
import NavBar from './NavBar';

const FixedUi = () => {
  const fixedUiRef = useRef()
  const isLeftTopOpen = useAppStore((state) => state.isLeftTopOpen)
  const isLeftBottomOpen = useAppStore((state) => state.isLeftBottomOpen)

  const lenis = useLenis()

  useGSAP(() => {
    gsap.to(fixedUiRef.current, {
      backdropFilter: isLeftTopOpen ? 'blur(20px)' : 'blur(0px)',
    });
  },[isLeftTopOpen]);

  
  return (
    <>
      <div id='fixedUi'   ref={fixedUiRef}>
        <NavBar/>
        <FadeInX display={isLeftTopOpen}>
          <div className="leftTop absolute left-10 top-10 size-20 border-2 border-amber-400 ">左上</div>
          {/* <div className="leftTop absolute left-10 top-20 size-20 border-2 border-amber-400">左上</div>
          <div className="leftTop absolute left-10 top-30 size-20 border-2 border-amber-400">左上</div> */}
        </FadeInX>
        <div className="rightTop absolute right-10 top-10  text-amber-300">右上</div>
        <FadeInX display={isLeftBottomOpen}>
          <div className="leftBottom absolute bottom-10 left-10">左下</div>
        </FadeInX>
        <div className="rightBottom absolute bottom-10 right-10" onClick={() => lenis.scrollTo(0)}>右下</div>
        <div className="rightBottom absolute bottom-10 left-10" >左下</div>
         
        
      </div>
    </>
  )
}

export default FixedUi

function FadeInX({ children, x=-100,display }) {
  const el = useRef();

  useGSAP(() => {
    gsap.to(el.current.children, {
      xPercent: display ? 0 : x, //自身的百分比
      autoAlpha: display ? 1 : 0,
      duration: 1,
      ease: 'power2.out',
      
      // stagger: 0.2,
    });
  },[display]);
  
  return <span ref={el}>{children}</span>;
}
function FadeScaleY({ children, display }) {
  const el = useRef();

  useGSAP(() => {
    gsap.to(el.current.children, {
      // scaleY: display ? 1 : 0, //自身的百分比
      // autoAlpha: display ? 1 : 0,
      duration: 1,
      ease: 'power2.out',
      clipPath: display ? 'circle(100% at 50% 50%)' : 'circle(0% at 50% 50%)',
      // stagger: 0.2,
    });
  },[display]);
  
  return <span ref={el}>{children}</span>;
}