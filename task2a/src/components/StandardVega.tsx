import '../styles/Vega.css';

import { useState } from 'react';
import { VegaLite, VisualizationSpec } from 'react-vega';

import SizeProvider from './SizeProvider';

export default function StandardVega(props: { spec: VisualizationSpec }) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  return (
    <SizeProvider sizeCallback={(w, h) => setSize({ w, h })} onResize={true}>
      <VegaLite
        renderer="svg"
        actions={false}
        spec={{
          width: size.w,
          // height: 300,
          // autosize: {
          //   type: 'fit',
          //   resize: true,
          //   contains: 'content',
          // },
          ...props.spec,
        }}
        config={{ font: 'Montserrat', background: '#fff0' }}
        //   theme="vox"
      ></VegaLite>
    </SizeProvider>
  );
}
