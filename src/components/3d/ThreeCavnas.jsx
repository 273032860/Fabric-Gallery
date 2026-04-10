import { Canvas, extend } from "@react-three/fiber"
import * as THREE from 'three/webgpu'
import ColorSpace_Mapping_exposure from "@/r3f-components/ColorSpace_Mapping_exposure"
import { Leva } from "leva"
import { Suspense } from "react"
import { Center,Stats } from "@react-three/drei"
import { useRef } from "react"
import PlaneCloth布条 from "./Plane布条滚动/PlaneCloth布条"


const ThreeCavnas = () => {

  return (
     <div id="canvas">
      <Leva position="bottom-right" hidden />
      <Canvas
        shadows
        // style={{ opacity: isStart ? 1 : 0.001, transition: 'opacity 2s ease-in' }}
        // eventSource={document.getElementById('fixedUi')}
        // eventPrefix="client"
        gl={(props) => {
          extend(THREE);
          const renderer = new THREE.WebGPURenderer({
            ...props,
            // antialias: true, 
            // alpha: true,
            powerPreference: 'high-performance',
            // forceWebGL: true, // 强制使用 WebGL
          });
          return renderer.init().then(() => renderer);
        }}
      >
        {/* <Stats/> */}
        <Suspense>
          {/* <Scene1 /> */}
          
          <ColorSpace_Mapping_exposure />

          <Center>
         
          <PlaneCloth布条 />
          </Center>
        </Suspense>
        
      </Canvas>
    </div>
  )
}
export default ThreeCavnas