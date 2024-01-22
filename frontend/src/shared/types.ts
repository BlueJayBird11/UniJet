export enum SelectedPage {
    Profile = "profile",
    FindDriver = "findDriver",
    FindRider = "findRider",
    History = "history",
    Schedule = "schedule",
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