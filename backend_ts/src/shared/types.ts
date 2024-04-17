export interface RiderType {
  id: number;
  name: string;
  rating: number;
  position: [number, number];
  destination: string;
}

export interface OnGoingTrip {
  tripId: number,
  passengerId: number,
  driverId: number,
  passengerName: string,
  driverName: string,
  passengerStartLocation:  [number, number],
  passengerLocation: [number, number],
  driverLocation: [number, number],
  destination: string,
  startTime: string,
  rideDate: string
}