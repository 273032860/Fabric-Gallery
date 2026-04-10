import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { useRef } from 'react';


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
        {/* <div className="header  ">
          <Header />
        </div> */}
        <div className='absolute left-10 top-10 z-50 w-90'>
          <img src='/Group 2.svg'/>
        </div>
        <div className='absolute right-14 top-12 z-50 w-90'>
          <h1 className='text-5xl text-white'>vx:syh273032860</h1>
        </div>
       
        {/* <SrollIcon /> */}
      </div>
    </>
  );
};

export default FixedUi;
 