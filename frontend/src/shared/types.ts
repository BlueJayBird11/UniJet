export enum SelectedPage {
    Profile = "profile",
    FindDriver = "findDriver",
    FindRider = "findRider",
    History = "history",
    Schedule = "schedule",
    Map = "map",
    Settings = "settings",
  }

export interface DriverType {
  name: string;
  rating: number;
  distance: number;
  location: string;
  payMin: number;
  payMax: number;
}

export interface Passenger {
  id: number;
  birthDate: string; // assuming ISO format for dates: "YYYY-MM-DD"
  email: string;
  passwordHash?: string; // Depending on how you handle hashing, might need adjustment
  phoneNumber: number; // Format could be '1234567890' without any dashes or spaces
  firstName: string;
  lastName: string;
  userStatus: number;
  carPool: boolean;
  rating?: number; // Optional since a new user might not have a rating
  schedule?: any; // Assuming this could be a complex object, 'any' type is used. Preferably define a more specific type
}

export interface Info {
  email: string,
  passwordHash: string
}

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
  cancelled: boolean,
  pPhone: string,
  dPhone: string
}

export interface FoundDriver {
  name: string,
  id: number,
  rating: number
}

export interface HoldDestination {
  name: string,
  destination: [number,number]
}