import { VegaLite, VisualizationSpec } from 'react-vega';

export default function StandardVega(props: { spec: VisualizationSpec }) {
  return (
    <VegaLite
      renderer="svg"
      actions={false}
      spec={{ width: 500, height: 300, ...props.spec }}
      config={{ font: 'Montserrat', background: '#fff0' }}
    ></VegaLite>
  );
}
