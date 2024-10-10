#%%
from datetime import datetime
import pytz
from pytz import NonExistentTimeError, AmbiguousTimeError
import numpy as np
import matplotlib.pyplot as plt





#%%
# adjusted from https://stackoverflow.com/questions/2881025/python-daylight-savings-time

def getDstDelta(date=None, timezone="UTC"):
    if date is None:
        date = datetime.utcnow()
    timezone = pytz.timezone(timezone)

    try:
        timezone_aware_date = timezone.localize(date, is_dst=None)
        isDst = timezone_aware_date.tzinfo._dst.seconds != 0
        if isDst:
            return -4
        else:
            return 0
    except NonExistentTimeError as e: 
        # Must be at end of DST (skipping an hour)
        return -4
    except AmbiguousTimeError as e:  
        # Must be at beginning of DST (re-doing an hour)
        return 0



def formatAndGetDstDelta(day, quartHour):
    year = 2024
    hour = str(int(quartHour / 4))
    if len(hour) == 1:
        hour = f"0{hour}"
    minutes = str((quartHour % 4) * 15)
    if len(minutes) == 1:
        minutes = f"0{minutes}"
    date = datetime.strptime(f"{year}-{day+1} {hour}:{minutes}", "%Y-%j %H:%M")

    delta = getDstDelta(date, "Europe/Berlin")
    return delta


#%%
################################################################
#               GIVENS
################################################################

nrDays = 365
nrChargingPoints = 20
powerPerStation_kW = 11 #kW

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

def simulation(probOneCarAppears, probDemand, nrDays = 365, nrChargingPoints = 20, powerPerStation_kW = 11, ):


    ###############  DERIVED DATA #################################

    # dividing prob that one car arrives in an hour by four, 
    # to get prob that one car arrives in a quarter of an hour.
    # we assume here that `probOneCarAppears` has been obtained 
    # by measuring the number of appearances of cars and then aggregating hourly.
    # otherwise, simply dividing by 4 might not be allowed.
    # The latter might for example be the case when simulating the probability
    # of the arrival of a bus at a bus-stop with an exponential distribution,
    # which notoriously is memory-less, i.e. doesn't depend on how long you've 
    # already been waiting. https://pages.cs.wisc.edu/~dsmyers/cs547/lecture_9_memoryless_property.pdf
    probOneCarAppearsQuartHourly = {
        t: probOneCarAppears[np.floor(t / 4)] / 4 for t in range(24*4)
    }

    nrQuartHours = len(probOneCarAppearsQuartHourly.keys())

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
    demandsKwh = np.zeros((nrChargingPoints, nrDays * nrQuartHours))


    ###############  SIMULATION LOOP  #############################

    for time in range(nrDays * nrQuartHours):
        for chargingPoint in range(nrChargingPoints):

            day = int(time / nrQuartHours)
            quartHour = time % nrQuartHours
            dstDelta = formatAndGetDstDelta(day, quartHour)        # <------ checking whether currently DST

            
            # phase 1: car already there, or potentially new car arrives
            car = chargingPoints[chargingPoint]
            if car is None:
                if np.random.rand() < probOneCarAppearsQuartHourly[(quartHour + dstDelta) % nrQuartHours]:    # <--- getting probabilities from offset position
                    car = Car()
            if car is None:
                continue

            # phase 2: car takes free spot
            chargingPoints[chargingPoint] = car

            # phase 3: car charges
            chargedKwh = car.charge(0.25, powerPerStation_kW)
            demandsKwh[chargingPoint, time] = chargedKwh   # <---- we're _not_ letting DST affect the storage index of our results

            # phase 4: if car is done charging, it leaves the spot
            if car.isDone():
                chargingPoints[chargingPoint] = None

    
    ###############  UNPACKING RESULTS  ###########################

    stationSumDemands_kWh = np.sum(demandsKwh, axis=0)

    # Total energy consumed in kWh
    totalEnergyConsumed_kWh = np.sum(demandsKwh)
    
    # The theoretical maximum power demand
    theoreticalMaxDemand_kW = nrChargingPoints * powerPerStation_kW
    
    # The actual maximum power demand (= the maximum sum of all chargepoints power demands at a given 15-minute interval)
    # Actual Maximum Demand beschreibt die höchste Nachfrage/Leistung die während des Jahres abgerufen wird. 
    # Wenn bei 20 Ladepunkten für einen Simulationsdurchlauf höchstens 12 Punkte gleichzeitig genutzt werden 
    # dann wäre der Actual Maximum Demand 132 kW (bei einer Ladeleistung der Ladepunkte von 11 kW). 
    # Wahrscheinlichkeit und Streuung muss dabei nicht berücksichtigt werden, es geht um den konkreten Wert eines Simulations-Durchlaufs 
    # (diese Werte werden sich je nach Durchlauf natürlich unterscheiden).
    actualMaxDemand_kW = np.max(stationSumDemands_kWh) / 0.25
    
    # The ratio of actual to maximum power demand ("concurrency factor")
    concurrencyFactor = actualMaxDemand_kW / theoreticalMaxDemand_kW


    return {
        "demandsKwh": demandsKwh, 
        "totalEnergyConsumed": totalEnergyConsumed_kWh,
        "theoreticalMaxDemand": theoreticalMaxDemand_kW,
        "actualMaxDemand": actualMaxDemand_kW,
        "concurrencyFactor": concurrencyFactor
    }





#%%
################################################################
#               First task
################################################################

results = simulation(probOneCarAppears, probDemand, nrDays, nrChargingPoints, powerPerStation_kW)



stationSumDemandsKw = np.sum(results["demandsKwh"], axis=0) / 0.25
stationSumDemandsKw_splitByDay = np.reshape(stationSumDemandsKw, (365, 24*4))
highestStationSumDemandKw = np.max(stationSumDemandsKw_splitByDay, axis=0)
averageStationSumDemandKw = np.mean(stationSumDemandsKw_splitByDay, axis=0)
lowestStationSumDemandKw = np.min(stationSumDemandsKw_splitByDay, axis=0)
times = [i/4 for i in range(24*4)]
plt.plot(times, highestStationSumDemandKw, label="highest")
plt.plot(times, averageStationSumDemandKw, label="average")
plt.plot(times, lowestStationSumDemandKw, label="lowest")
plt.title("For each quarter hour: least, avergage and worst demand")
plt.xlabel("time of day")
plt.ylabel("demand [kW]")
plt.legend()


#%%
################################################################
#               BONUS
################################################################


# Run the program from task 1 for between 1 and 30 charge-points. How does the concurrency factor behave?
concurrencyFactors = []
for nrChargePoints in range(1, 31):
    results = simulation(probOneCarAppears, probDemand, nrDays, nrChargePoints, powerPerStation_kW)
    concurrencyFactors.append(results["concurrencyFactor"])

plt.plot(concurrencyFactors, label="concurrency factor (experimental)")
plt.title("concurrency factor")
plt.xlabel("nr charging points")
plt.ylabel("concurrency factor")