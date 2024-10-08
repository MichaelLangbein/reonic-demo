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

days = 365
nrChargingPoints = 20
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




#
# DERIVED DATA
#

probOneCarAppearsQuartHourly = {
    t: probOneCarAppears[np.floor(t / 4)] for t in range(24*4)
}

times = probOneCarAppearsQuartHourly.keys()


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


chargingPoints = {nr: None for nr in range(nrChargingPoints)}

# kWh
demandsKw = np.zeros((nrChargingPoints, days, len(times)))


for day in range(days):
    for time in times:
        for chargingPoint in range(nrChargingPoints):
            
            # phase 1: car already there, or potentially new car arrives
            car = chargingPoints[chargingPoint]
            if car is None:
                if np.random.rand() < probOneCarAppearsQuartHourly[time]:
                    car = Car()
            if car is None:
                continue

            # phase 2: car takes free spot
            chargingPoints[chargingPoint] = car

            # phase 3: car charges
            chargedKwh = car.charge(0.25, powerPerStation)
            demandsKw[chargingPoint, day, time] = chargedKwh / 0.25

            # phase 4: if car is done charging, it leaves the spot
            if car.isDone():
                chargingPoints[chargingPoint] = None






stationSumDemandsKw = np.sum(demandsKw, axis=0)
highestStationSumDemandKw = np.max(stationSumDemandsKw, axis=0)
averageStationSumDemandKw = np.mean(stationSumDemandsKw, axis=0)
lowestStationSumDemandKw = np.min(stationSumDemandsKw, axis=0)
plt.plot(highestStationSumDemandKw, label="highest")
plt.plot(averageStationSumDemandKw, label="average")
plt.plot(lowestStationSumDemandKw, label="lowest")
plt.title("average day station sum")
plt.legend()




maxPowerTheoreticalKw = nrChargingPoints * powerPerStation
maxPowerPracticalKw = np.max(stationSumDemandsKw)
print(maxPowerPracticalKw / maxPowerTheoreticalKw)

#%%
print(demandsKw)
                
