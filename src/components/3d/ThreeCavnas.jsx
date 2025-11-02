import { Canvas, extend } from "@react-three/fiber"
import * as THREE from 'three/webgpu'
import Boxs from "./Boxs"
import { Environment, OrbitControls } from "@react-three/drei"


const ThreeCavnas = () => {
  return (
     <div id="canvas">
        <Canvas
          shadows 
          eventSource={document.getElementById("root")} 
          eventPrefix="client" 
          gl={(props) => {
          extend(THREE)
          const renderer = new THREE.WebGPURenderer({ 
            ...props, 
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
            // forceWebGL:true // 强制使用 WebGL
          })
          return renderer.init().then(() => renderer)
        }}
          
        >

        <color attach="background" args={['#373737']} />
        <Environment preset="city" />
        
        <Boxs/>
     
        <OrbitControls makeDefault enableZoom={false} />
        </Canvas>
      </div>
  )
}
export default ThreeCavnas