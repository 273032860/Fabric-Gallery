import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { useRef } from 'react';
import { useLenis } from 'lenis/react';
import Header from './Fixed/Header';

gsap.registerPlugin(Flip);

const FixedUi = () => {
  const fixedRef = useRef(null);
   
  return (
    <>
      <div
        id="fixedUi"
        className="fixed inset-0 pointer-events-none z-100 mx-auto w-full "
        ref={fixedRef}
      >
        <div className="header  ">
          <Header />
        </div>
       
        {/* <SrollIcon /> */}
      </div>
    </>
  );
};

export default FixedUi;
 