import './Appearing.css';

import { VegaLite } from 'react-vega';
import { TopLevelSpec } from 'vega-lite';
import { InlineDataset } from 'vega-lite/build/src/data';

import { State, useWatchState } from '../utils/state';

// import { Children, cloneElement, isValidElement, ReactNode } from 'react';

// function FadingElement<T>(props: {filter: (s: State) => T, id: string, children: ReactNode}) {
//     const currentState = useWatchState(props.filter, props.id);
//     const animation = currentState ? '' : ' fadeOut';

//     const childrenWithState = Children.map(props.children, child => {
//         // Checking isValidElement is the safe way and avoids a typescript error too.
//         if (isValidElement(child)) {
//           return cloneElement(child, {key: "state", });
//         }
//         return child;
//       });

//     return (
//       <div className={'fadable' + animation}>
//         {childrenWithState}
//       </div>
// }

export default function FadingVegaElement<T>(props: {
  spec: TopLevelSpec;
  filter: (s: State) => T;
  transform?: (s: T) => InlineDataset;
  id: string;
}) {
  const currentState = useWatchState(props.filter, props.id);
  const animation = currentState ? '' : ' fadeOut';
  let currentData: InlineDataset = [];
  if (currentState) {
    if (props.transform) {
      currentData = props.transform(currentState);
    } else {
      currentData = currentState;
    }
  }

  return (
    <div className={'fadable' + animation}>
      <VegaLite
        spec={{
          ...props.spec,
          //   width: 'container',
          data: { values: currentData },
        }}
      ></VegaLite>
    </div>
  );
}
