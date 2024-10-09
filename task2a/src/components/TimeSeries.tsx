import { VegaLite } from "react-vega";


export default function TimeSeries() {
  return (
    <VegaLite
      spec={{
        mark: 'line',
        encoding: {
          x: { field: 'time' },
          y: { field: 'value' },
        },
        data: [
          { time: 1, value: 1 },
          { time: 2, value: 2 },
          { time: 3, value: 1 },
          { time: 4, value: 2 },
        ],
      }}
      width={400}
      height={400}
    ></VegaLite>
  );
}
