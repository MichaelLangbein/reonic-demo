import { useState } from 'react';

import { BackendService } from './backend';

export type Action =
  | { type: 'init' }
  | {
      type: 'form-submit';
      payload: Partial<InputState>;
    }
  | {
      type: 'simulation-request';
      payload: InputState;
    }
  | {
      type: 'simulation-success';
      payload: State['output'];
    };

export interface InputState {
  nrChargePoints: { power: number; count: number }[];
  // a multiplier for the arrival probability to increase the amount of cars arriving to charge (20-200%, default: 100%)
  arrivalProbabilityMultiplier: number;
  // the consumption of the cars (default: 18 kWh)
  carConsumption: number;
  // the charging power per charge point (default: 11 kW)
  chargingPower: number;
}

export interface OutputState {
  // The charging values (in kW) per charge point at a useful aggregation level
  energyPerStation: {
    [stationNr: number]: {
      year: number;
      month: number;
      week: number;
      day: number;
    };
  };
  // An exemplary day
  averageDay: { time: number; mean: number; min: number; max: number }[];
  // The total energy charged (in kWh)
  totalEnergyCharged: { day: number; kWh: number }[];
  // The number of charging events per year/month/week/day
  chargingEvents: {
    year: number;
    month: number;
    week: number;
    day: number;
  };
}

export interface State {
  input: InputState;
  output?: OutputState;
}

const defaultState: State = {
  input: {
    nrChargePoints: [{ power: 11, count: 20 }],
    arrivalProbabilityMultiplier: 1,
    carConsumption: 18,
    chargingPower: 11,
  },
  output: undefined,
};

export type Callback = (state: State) => void;

class StateMgmt {
  private callbacks: { [id: string]: Callback } = {};
  constructor(private state: State) {}

  currentState(): State {
    return this.state;
  }

  watch(callback: Callback, id: string) {
    this.callbacks[id] = callback;
  }

  async onAction(action: Action) {
    this.state = this.reduce(action, this.state);
    for (const cb of Object.values(this.callbacks)) {
      cb(this.state);
    }
    // console.log(action.type, this.state);
    await this.effects(action, this.state);
  }

  private reduce(action: Action, state: State): State {
    switch (action.type) {
      case 'form-submit':
        return {
          ...state,
          input: {
            ...state.input,
            ...action.payload,
          },
        };
      case 'simulation-request':
        return {
          ...state,
          output: undefined,
        };
      case 'simulation-success':
        return {
          ...state,
          output: action.payload,
        };
      default:
        return state;
    }
  }

  private async effects(action: Action, state: State): Promise<void> {
    switch (action.type) {
      case 'init':
      case 'form-submit':
        this.onAction({ type: 'simulation-request', payload: state.input });
        return;
      case 'simulation-request': {
        const responseData = await BackendService.simulate(action.payload);
        this.onAction({ type: 'simulation-success', payload: responseData });
        return;
      }
      default:
        return;
    }
  }
}

const stateMgmt = new StateMgmt(defaultState);

export function useWatchState<T>(filter: (s: State) => T, id: string) {
  const current = filter(stateMgmt.currentState());
  const [state, setState] = useState(current);
  stateMgmt.watch((state) => setState(filter(state)), id);
  return state;
}

export function notifyStateMgmt(action: Action) {
  stateMgmt.onAction(action);
}
