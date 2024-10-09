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


#%%
################################################################
#               GIVENS
################################################################

days = 365
nrChargingPoints = 20
powerPerStation = 11 #kW

# T1
# time -> prob
# “The probability distribution of an EV arriving at a chargepoint at a given time” 
# ist etwas unklar formuliert. Gemeint ist der erste, simplere Fall: 
# Für einen Chargepoint besteht zum Zeitpunkt x eine gewisse Wahrscheinlichkeit, 
# dass ein Fahrzeug ankommt. 
# Falls der Chargepoint belegt ist dann kann nicht geladen werden.
# Das ein Auto an einem Chargepoint erscheint ist nicht garantiert, pro Tick wird bestimmt ob ein Fahrzeug ankommt oder nicht. Dabei kann es natürlich auch vorkommen, dass an einem Chargepoint im Tagesverlauf mehrere Fahrezeuge laden.
# Die Tabelle bedeutet: 
# “Wahrscheinlichkeit im Tagesverlauf dafür, dass ein Auto an diesem Chargepoint ankommt”. 
# Für die Ticks zwischen 16-17 Uhr beträgt die Wahrscheinlichkeit, 
# dass ein Fahrzeug ankommt beispielsweise 10.38%. 
# Unabhängig davon ob tatsächlich ein Fahrzeug ankommt oder nicht 
# ist die Wahrscheinlichkeit das ein Fahrzeug zwischen 17-18 Uhr ankommt dann wieder 10.38 %.
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


#%%
################################################################
#               MAIN FUNCTION
################################################################

def simulation(probOneCarAppears, probDemand, days = 365, nrChargingPoints = 20, powerPerStation = 11, ):


    ###############  DERIVED DATA #################################

    # dividing prob that one car arrives in an hour by four, 
    # to get prob that one car arrives in a quarter of an hour.
    # we assume here that `probOneCarAppears` has been obtained 
    # by messuring the number of appearances of cars and then aggregating hourly.
    # otherwise, simply dividing by 4 might not be allowed.
    probOneCarAppearsQuartHourly = {
        t: probOneCarAppears[np.floor(t / 4)] / 4 for t in range(24*4)
    }

    times = probOneCarAppearsQuartHourly.keys()

    ###############  UTILS  #######################################


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
    demandsKwh = np.zeros((nrChargingPoints, days, len(times)))


    ###############  SIMULATION LOOP  #############################

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
                demandsKwh[chargingPoint, day, time] = chargedKwh

                # phase 4: if car is done charging, it leaves the spot
                if car.isDone():
                    chargingPoints[chargingPoint] = None



    ###############  UNPACKING RESULTS  ###########################

    stationSumDemandsKwh = np.sum(demandsKwh, axis=0)

    # Total energy consumed in kWh
    totalEnergyConsumedKwh = np.sum(demandsKwh)
    
    # The theoretical maximum power demand
    theoreticalMaxDemandKw = nrChargingPoints * powerPerStation
    
    # The actual maximum power demand (= the maximum sum of all chargepoints power demands at a given 15-minute interval)
    # Actual Maximum Demand beschreibt die höchste Nachfrage/Leistung die während des Jahres abgerufen wird. 
    # Wenn bei 20 Ladepunkten für einen Simulationsdurchlauf höchstens 12 Punkte gleichzeitig genutzt werden 
    # dann wäre der Actual Maximum Demand 132 kW (bei einer Ladeleistung der Ladepunkte von 11 kW). 
    # Wahrscheinlichkeit und Streuung muss dabei nicht berücksichtigt werden, es geht um den konkreten Wert eines Simulations-Durchlaufs 
    # (diese Werte werden sich je nach Durchlauf natürlich unterscheiden).
    actualMaxDemandKw = np.max(stationSumDemandsKwh) / 0.25
    
    # The ratio of actual to maximum power demand ("concurrency factor")
    concurrencyFactor = actualMaxDemandKw / theoreticalMaxDemandKw


    return {
        "demandsKwh": demandsKwh, 
        "totalEnergyConsumed": totalEnergyConsumedKwh,
        "theoreticalMaxDemand": theoreticalMaxDemandKw,
        "actualMaxDemand": actualMaxDemandKw,
        "concurrencyFactor": concurrencyFactor
    }



#%%
################################################################
#               First task
################################################################

results = simulation(probOneCarAppears, probDemand, days, nrChargingPoints, powerPerStation)



stationSumDemandsKw = np.sum(results["demandsKwh"], axis=0) / 0.25
highestStationSumDemandKw = np.max(stationSumDemandsKw, axis=0)
averageStationSumDemandKw = np.mean(stationSumDemandsKw, axis=0)
lowestStationSumDemandKw = np.min(stationSumDemandsKw, axis=0)
plt.plot(highestStationSumDemandKw, label="highest")
plt.plot(averageStationSumDemandKw, label="average")
plt.plot(lowestStationSumDemandKw, label="lowest")
plt.title("average day station sum")
plt.legend()


#%%
################################################################
#               BONUS
################################################################


# Bonus
# Run the program from task 1 for between 1 and 30 chargepoints. How does theconcurrency factor behave?
concurrencyFactors = []
for nrChargePoints in range(1, 31):
    results = simulation(probOneCarAppears, probDemand, days, nrChargePoints, powerPerStation)
    concurrencyFactors.append(results["concurrencyFactor"])

plt.plot(concurrencyFactors)

# If you consider the impact of DST vs. mapping the hours to the 15 minute ticks.
"""
    - 
"""

# If you seed the probabilities vs. using random() for random-but-deterministic
# results.
"""
    - seeding probabilities for the purpose of creating reproducible results would be detremimental to the process
    - since each simulation is but _one_ possible realization of a statistical process, seeding would cut off all but one possible realizations
    - however: we _require_ those other processes to get a realistic impression of the spread of possible events
    - because after all, it is absolutely possible (though unlikely) that at one point in time 20 cars do arrive at the parking lot, all needing to charge
    - such an event is unlikely to be covered by a fxied (=seeded) realization of the simulation.
"""





# %%
