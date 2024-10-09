import { ChangeEvent } from 'react';

import { TypeAhead } from '../utils/async';

const tah = new TypeAhead<ChangeEvent<HTMLInputElement>>(500, (q) => {
  const last = q[q.length - 1];
  //   notifyStateMgmt(last)
  return [];
});

export default function Slider() {
  return <input type="range" name="" id="" onChange={(evt) => tah.event(evt)} />;
}
