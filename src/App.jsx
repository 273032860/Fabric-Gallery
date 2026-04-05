
// import Loading from './components/ui/Loading';
import { useState } from 'react';
import FixedUi from '@/components/ui/FixedUi';
import ThreeCavnas from '@/components/3d/ThreeCavnas';
import Timeline from '@/components/ui/Timeline';
import Lenis from '@/utils/Lenis';

function App({ lenisConfig = true }) {
  const [isStart, setStart] = useState(false);
  return (
    <>
      {lenisConfig && (
        <Lenis
          root
          syncScrollTrigger={true}
          options={
            typeof lenisConfig === 'object'
              ? lenisConfig
              : {
                  duration: 1.4,
                }
          }
        />
      )}
      {/* <Loading setStart={setStart} /> */}
      <div className="relative">
        <FixedUi/>
        <ThreeCavnas/>
        <Timeline />
      </div>
    </>
  );
}

export default App;
