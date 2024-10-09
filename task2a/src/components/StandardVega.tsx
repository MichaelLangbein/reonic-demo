import '../styles/Vega.css';

import { VegaLite, VisualizationSpec } from 'react-vega';

export default function StandardVega(props: { spec: VisualizationSpec }) {
  return (
    <VegaLite
      renderer="svg"
      actions={false}
      spec={{
        // width: 500, height: 300,
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
  );
}
