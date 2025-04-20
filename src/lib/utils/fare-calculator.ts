/**
 * Fare Calculator Utility
 * Based on Troski's pricing model:
 * - Base Fare: CAD $3.00
 * - Distance Fee: CAD $0.75/km
 * - Time Fee: CAD $0.20/min
 * - No surge pricing
 */

export const BASE_FARE = 3.0;
export const DISTANCE_RATE = 0.75; // per km
export const TIME_RATE = 0.2; // per minute

type FareCalculationParams = {
  distance: number; // in kilometers
  duration: number; // in minutes
};

type FareBreakdown = {
  baseFare: number;
  distanceFee: number;
  timeFee: number;
  totalFare: number;
};

/**
 * Calculate fare based on distance and time
 * @param params Object containing distance (km) and duration (minutes)
 * @returns Object with fare breakdown and total
 */
export function calculateFare({
  distance,
  duration,
}: FareCalculationParams): FareBreakdown {
  const baseFare = BASE_FARE;
  const distanceFee = distance * DISTANCE_RATE;
  const timeFee = duration * TIME_RATE;

  const totalFare = baseFare + distanceFee + timeFee;

  return {
    baseFare,
    distanceFee,
    timeFee,
    totalFare: Number(totalFare.toFixed(2)),
  };
}

/**
 * Calculate driver earnings from a fare
 * @param totalFare The total fare amount
 * @param driverSharePercentage The percentage of fare that goes to driver (70-85%)
 * @returns The driver earnings amount
 */
export function calculateDriverEarnings(
  totalFare: number,
  driverSharePercentage: number = 75
): number {
  // Ensure percentage is between 70 and 85
  const validPercentage = Math.min(Math.max(driverSharePercentage, 70), 85);
  const driverEarnings = totalFare * (validPercentage / 100);

  return Number(driverEarnings.toFixed(2));
}

/**
 * Estimate fuel cost for a trip
 * @param distance Distance in kilometers
 * @param fuelPrice Current fuel price per liter
 * @param fuelConsumption Vehicle's fuel consumption (default: 8L/100km)
 * @returns Estimated fuel cost
 */
export function estimateFuelCost(
  distance: number,
  fuelPrice: number,
  fuelConsumption: number = 8
): number {
  const fuelUsed = distance * (fuelConsumption / 100);
  const cost = fuelUsed * fuelPrice;

  return Number(cost.toFixed(2));
}
