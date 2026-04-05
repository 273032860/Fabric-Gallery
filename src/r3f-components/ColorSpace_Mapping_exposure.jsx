import { useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { LinearSRGBColorSpace,SRGBColorSpace,LinearToneMapping,ReinhardToneMapping,NoToneMapping,CineonToneMapping,AgXToneMapping,NeutralToneMapping,ACESFilmicToneMapping } from 'three/webgpu';
import {  } from 'three/webgpu';
 
const ColorSpace_Mapping_exposure = () => {
    const gl = useThree(v=>v.gl) //获取gl mesh 相机 
    const {_} = useControls('颜色mapping曝光', {
        ColorSpace: { value: SRGBColorSpace, 
            options: {
                sRGB: SRGBColorSpace,
                Linear: LinearSRGBColorSpace,
            },
            onChange: (value) => {
                gl.outputColorSpace = value
            }
         },
         mapping: { value: AgXToneMapping, 
            options: {
                No: NoToneMapping,
                Linear: LinearToneMapping,
                Reinhard: ReinhardToneMapping,
                Cineon: CineonToneMapping,
                AcesFilmic: ACESFilmicToneMapping,
                AgX: AgXToneMapping,
                Neutral: NeutralToneMapping,
            },
           
            onChange: (value) => {
                gl.toneMapping = value
            }},
        exposure: { value: 1, min: 0, max: 4, label: '曝光度',onChange: (value) => {
            gl.toneMappingExposure = value
        }},
      },{collapsed: true});
return null
}

export default ColorSpace_Mapping_exposure