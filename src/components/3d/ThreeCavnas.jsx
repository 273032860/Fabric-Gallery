import { Canvas, extend } from "@react-three/fiber"
import * as THREE from 'three/webgpu'
import ColorSpace_Mapping_exposure from "@/r3f-components/ColorSpace_Mapping_exposure"

import TslEffect from "./TslEffect"
import { Leva } from "leva"
import { Suspense } from "react"
import { OrbitControls } from "@react-three/drei"
import Scene1 from "./Scene1/Scene1"






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
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance',
            // forceWebGL: true, // 强制使用 WebGL
          });
          return renderer.init().then(() => renderer);
        }}
      >
        <Suspense>
          <Scene1 />
          <ColorSpace_Mapping_exposure />
          <TslEffect  />
        </Suspense>
        <OrbitControls/>
      </Canvas>
    </div>
  )
}
export default ThreeCavnas