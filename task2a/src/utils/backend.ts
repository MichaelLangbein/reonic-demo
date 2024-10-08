import { sleep } from './async';
import { InputState, OutputState } from './state';

export class BackendService {
  static async simulate(payload: InputState): Promise<OutputState> {
    await sleep(500);
    return {
      nrEvents: 56,
      averageDay: [
        { t: 0, v: 1 },
        { t: 1, v: 2 },
        { t: 2, v: 4 },
      ],
    };
  }
}
