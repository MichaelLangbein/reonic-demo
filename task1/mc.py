"""
Cars have to stay at a charging point until they're fully charged.
This causes a discontinuity, 
because new cars arriving might already find all charging points occupied.
If it weren't for that, this situation could potentially be modelled 
elegantly using probability generating functions:
https://www.youtube.com/watch?v=FuJq8Td-rxc&list=PL0SSkmc4r_BY-3yXxYM75h1pJTxgJgisI
"""

#%%
import numpy as np
import matplotlib.pyplot as plt

#
# GIVENS
#

nrChargingStations = 20
powerPerStation = 11 #kW

# T1
# time -> prob
probOneCarAppears = {
    0: 0.0094,
    1: 0.0094,
    2: 0.0094,
    3: 0.0094,
    4: 0.0094,
    5: 0.0094,
    6: 0.0094,
    7: 0.0094,
    8: 0.0283,
    9: 0.0283,
    10: 0.0566,
    11: 0.0566,
    12: 0.0566,
    13: 0.0755,
    14: 0.0755,
    15: 0.0755,
    16: 0.1038,
    17: 0.1038,
    18: 0.1038,
    19: 0.0472,
    20: 0.0472,
    21: 0.0472,
    22: 0.0094,
    23: 0.0094,
}

#  T1: Charging demand probabilities
# km -> prob
probDemand = {
    0: 0.3431,
    5: 0.0490,
    10: 0.0980,
    20: 0.1176,
    30: 0.0882,
    50: 0.1176,
    100: 0.1078,
    200: 0.0490,
    300: 0.0294,
}


monteCarloIterations = 1_000


#
# DERIVED DATA
#

probOneCarAppearsQuartHourly = {
    t: probOneCarAppears[np.floor(t / 4)] for t in range(24*4)
}

times = probOneCarAppearsQuartHourly.keys()

# time -> nrCars -> prob
# assuming iid
# probCars = {
#     "morning": {
#         0: 1 - (probOneCarAtStation["morning"] +  probOneCarAtStation["morning"] ** 2 + ...),
#         1: probOneCarAtStation["morning"],
#         2: probOneCarAtStation["morning"] ** 2,
#         ...
#     }
# }
probNCarsAppear = {}
for time in times:
    pOne = probOneCarAppearsQuartHourly[time]
    probNCarsAppear[time] = {}
    # https://www.wolframalpha.com/input?i=sum+a%5Eb+for+b+from+1+to+infinity
    probNCarsAppear[time][0] = 1. - pOne / (1. - pOne)
    for nrCars in range(1, 21):
        probNCarsAppear[time][nrCars] = pOne ** nrCars


#
# UTILS
#


def distToCumlDist(dist):
    cumDist = {}
    cumProb = 0
    for val, prob in dist.items():
        cumProb += prob
        cumDist[val] = cumProb
    return cumDist

def drawFromDist(dist):
    cumDist = distToCumlDist(dist)
    draw = np.random.rand()
    for val, cumProb in cumDist.items():
        if draw < cumProb:
            return val
    return val

class Car:
    def __init__(self):
        # 18kWh per 100kms
        #   [kWh]     [km]                      [kWh] [km]
        self.demand = drawFromDist(probDemand) * 18 / 100

    def charge(self, time, power):
        maxCharge = time * power  # kWh
        if maxCharge > self.demand:
            self.demand = 0
            return maxCharge - self.demand
        else:
            self.demand -= maxCharge
            return maxCharge

    def isDone(self):
        return self.demand <= 0


stations = {nr: None for nr in range(nrChargingStations)}



demands = np.zeros((monteCarloIterations, nrChargingStations, len(times)))


for iter in range(monteCarloIterations):

    for timeIndx, time in enumerate(times):

        # Phase 1: cars arrive
        nrPotentialCustomers = drawFromDist(probNCarsAppear[time])
        potentialCustomers = [Car() for _ in range(nrPotentialCustomers)]

        # Phase 2: cars take free spots
        for stationNr, car in stations.items():
            if car is None and len(potentialCustomers) > 0:
                stations[stationNr] = potentialCustomers.pop()

        # Phase 3: cars charge
        for stationNr, car in stations.items():
            if car is not None:
                charged = car.charge(0.25, powerPerStation)
                demands[iter, stationNr, timeIndx] = charged

        # Phase 4: cars that are done charging leave
        for stationNr, car in stations.items():
            if car is not None:
                if car.isDone():
                    stations[stationNr] = None



plt.plot(np.max(np.sum(demands, axis=1), axis=0))
plt.plot(np.mean(np.sum(demands, axis=1), axis=0))
plt.plot(np.min(np.sum(demands, axis=1), axis=0))


maxPowerTheoretical = nrChargingStations * powerPerStation
maxPowerPractical = np.max(np.sum(demands, axis=1))
print(maxPowerPractical / maxPowerTheoretical)

#%%
print(demands)
                



#%% Questions

# - Max demand ist immer noch = volle auslastung
#     - Gemeint demand : P(d > demand) < 0.01 ?
# - Prob dist Auto kommt an bei Ladestation:
#     - wenn ankommt und besetzt, fährt zur nächsten Station, richtig?
#     - iid?