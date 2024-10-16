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

    const countChargePoints = Object.values(payload.nrChargePoints).reduce((prev, curr) => prev + curr.count, 0);
    const energyPerStation: OutputState['energyPerStation'] = {};
    for (let nrStation = 1; nrStation <= countChargePoints; nrStation++) {
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
          const r = Math.random() * 10 * Math.sin((Math.PI * i) / 24);
          return { time: i, min: Math.max(r - 3 * Math.random(), 0), mean: r, max: r + 3 * Math.random() };
        }),

      // The total energy charged (in kWh)
      totalEnergyCharged: Array(365)
        .fill(0)
        .map((_, i) => {
          const dayValue = Math.random() * 30 * Math.sin((Math.PI * i) / 365);
          return { day: i, kWh: dayValue };
        })
        .map((val, i, all) => {
          if (i > 0) {
            val.kWh += all[i - 1].kWh;
          }
          return val;
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
