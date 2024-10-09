import { sleep } from './async';
import { InputState, OutputState } from './state';

export class BackendService {
  /**
   * Mock backend service
   * Returns random data
   */
  static async simulate(payload: InputState): Promise<OutputState> {
    console.log('start request ...');
    await sleep(1000);
    console.log('... end request');

    const energyPerStation: OutputState['energyPerStation'] = {};
    for (let nrStation = 1; nrStation <= payload.nrChargePoints; nrStation++) {
      const r = Math.random() * 10;
      energyPerStation[nrStation] = {
        day: r,
        week: r * 7,
        month: r * 31,
        year: r * 365,
      };
    }

    return {
      // The charging values (in kW) per charge point at a useful aggregation level
      energyPerStation,

      // An exemplary day
      averageDay: Array(24)
        .fill(0)
        .map((v, i) => i)
        .map((i) => {
          const r = Math.random() * 10;
          return { time: i, min: r - 3 * Math.random(), mean: r, max: r + 3 * Math.random() };
        }),

      // The total energy charged (in kWh)
      totalEnergyCharged: Array(365)
        .fill(0)
        .map((_, i) => {
          const dayValue = Math.random() * 30;
          return { day: i, kWh: dayValue };
        }),

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
