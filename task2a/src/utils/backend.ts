import { sleep } from './async';
import { InputState, OutputState } from './state';

export class BackendService {
  static async simulate(payload: InputState): Promise<OutputState> {
    console.log('start request ...');
    await sleep(5000);
    console.log('... end request');
    return {
      // The charging values (in kW) per charge point at a useful aggregation level
      chargingValues: {},

      // An exemplary day
      averageDay: Array(24)
        .fill(0)
        .map((v, i) => i)
        .map((i) => {
          const r = Math.random() * 10;
          return { time: i, min: r - 3 * Math.random(), mean: r, max: r + 3 * Math.random() };
        }),

      // The total energy charged (in kWh)
      totalEnergyCharged: Math.random() * 10_000,

      // The number of charging events per year/month/week/day
      chargingEvents: {
        day: Math.random() * 5,
        week: Math.random() * 5 * 7,
        month: Math.random() * 5 * 30,
        year: Math.random() * 5 * 365,
      },
    };
  }
}
