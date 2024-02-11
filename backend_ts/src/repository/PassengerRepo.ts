import { Passenger } from "../model/Passenger";

interface IPassengerRepo {
    create(passenger: Passenger): Promise<void>;
}