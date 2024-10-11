import "../styles/Vega.css";

import { VegaLite, VisualizationSpec } from "react-vega";


export default function StandardVega(props: { spec: VisualizationSpec }) {
  // const [size, setSize] = useState({ w: 0, h: 0 });
  return (
    // <SizeProvider sizeCallback={(w, h) => setSize({ w, h })} onResize={false}>
    <VegaLite
      renderer="svg"
      actions={false}
      spec={{
        // width: size.w,
        // height: 300,
        width: 400,
        height: 300,
        autosize: {
          type: 'fit',
          resize: true,
          contains: 'content',
        },
        ...props.spec,
      }}
      config={{ font: 'Montserrat', background: '#fff0' }}
      //   theme="vox"
    ></VegaLite>
    // </SizeProvider>
  );
}
