export interface RiderType {
  id: number;
  name: string;
  rating: number;
  position: [number, number];
  destination: string;
  destinationChoords: [number, number];
}

export interface OnGoingTrip {
  tripId: number,
  confirmed: boolean,
  passengerId: number,
  driverId: number,
  passengerName: string,
  driverName: string,
  passengerStartLocation:  [number, number],
  passengerLocation: [number, number],
  driverLocation: [number, number],
  destination: string,
  destinationChoords: [number, number];
  startTime: string,
  rideDate: string
  cancelled: boolean
}