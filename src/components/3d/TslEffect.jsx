import { useFrame, useThree } from '@react-three/fiber';
import { PostProcessing } from 'three/webgpu';
import {
  pass,
  output,
  emissive,
  mrt,
  uniform,
  nodeObject,
  Fn,
  directionToColor,
  normalView,
  vec2,
  metalness,
  roughness,
} from 'three/tsl';
import { useEffect, useMemo, useRef } from 'react';
import { useLenis } from 'lenis/react';



function composeEffects(baseNode, effectList = []) {
  let node = baseNode;

  for (const effect of effectList) {
    node = effect(node);
  }

  return node;
}

const TslEffect = () => {
   
  const postProcessingRef = useRef();

  const { gl, scene, camera, size, pointer, viewport } = useThree();

  const { outputPass, outputNode } = useMemo(() => {
    const scenePass = pass(scene, camera);
    scenePass.setMRT(
      mrt({
        output,
        emissive,
        normal: directionToColor(normalView),
        metalrough: vec2(metalness, roughness),
      })
    );
    const outputPass = scenePass.getTextureNode();

    const outputNode = scenePass;

    return {
      outputPass,
      outputNode,
    };
  }, [scene, camera]);

  const { exportEffectNode, effectUniforms } = useMemo(() => {
    const rangeU = uniform(0.1);
     

    const exportEffectNode = nodeObject(
      Fn(() => {
        const out = composeEffects(outputNode, [
          // 填写封装效果
        ]);
        // 填写额外效果
        // 如 mix(out,out2,0.5)
        return out;
      })()
    );
    return {
      exportEffectNode,
      effectUniforms: {
        range: rangeU,
      },
    };
  }, [outputNode, camera]);

  useEffect(() => {
    if (!gl || !scene || !camera) return;

    postProcessingRef.current = new PostProcessing(gl);
    postProcessingRef.current.outputNode = exportEffectNode;
    if (postProcessingRef.current.setSize) {
      postProcessingRef.current.setSize(size.width, size.height);
      postProcessingRef.current.needsUpdate = true;
    }

    // 返回清理函数
    return () => {
      if (postProcessingRef.current) {
        postProcessingRef.current.dispose();
      }
    };
  }, [gl, scene, camera, outputPass]);

  const scrollProgress = useRef(0);

  useLenis((lenis) => {
    scrollProgress.current = lenis.progress || 0;

    // //超过某个则隐藏scene1
    // if (lenis.progress > 0.74 || lenis.progress < 0.75) {
    //   setIsVisible(true);
    // }
    // if (lenis.progress > 0.76 && lenis.progress <= 1) {
    //   setIsVisible(false);
    // }
  });
  useFrame(() => {
    // 只在需要时渲染后处理效果，不覆盖默认渲染
    if (postProcessingRef.current) {
      postProcessingRef.current?.render();
    }
  }, 1);

  return null;
};

export default TslEffect;
