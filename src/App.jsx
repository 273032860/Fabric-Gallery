import FixedUi from '@/components/ui/FixedUi';
import ThreeCavnas from '@/components/3d/ThreeCavnas';
import Timeline from '@/components/ui/Timeline';
import Lenis from '@/utils/Lenis';
import VideoBackground from '@/components/ui/VideoBackground';

function App({ lenisConfig = true }) {
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
      <VideoBackground />
      <div className="relative">
        <FixedUi/>
        <ThreeCavnas/>
        <Timeline />
      </div>
    </>
  );
}

export default App;
