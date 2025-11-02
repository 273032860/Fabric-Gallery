import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas"


export default function R_yuhua() {
  const { rive, RiveComponent } = useRive({
    src: "R_yuhua.riv", // Rive文件路径
    stateMachines: "State Machine 1",
    autoplay: true,
    artboard:'Canvas',
    autoBind: true, // 需要手动绑定 ViewModel
    layout: new Layout({//https://rive.app/docs/runtimes/layout#react
      fit: Fit.layout, // 指定fit.layout以自动调整艺术板的大小。 Fit.Contain  Fit.Cover  Fit.FitWidth Fit.FitHeight
      // layoutScaleFactor: 2, // x2 The Scale Factor 缩放
      // alignment: Alignment.Center //对齐方式 https://rive.app/docs/runtimes/layout#alignment
    }),
  })

 

 
  return (
      <RiveComponent/>
  )
}
