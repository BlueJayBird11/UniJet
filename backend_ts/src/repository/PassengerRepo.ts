import { Passenger } from "../model/Passenger";

interface IPassengerRepo {
  save(passenger: Passenger): Promise<void>;
  update(passenger: Passenger): Promise<void>;
  delete(passengerId: number): Promise<void>;
  retrieveById(passengerId: number): Promise<Passenger>;
  retrieveAll(): Promise<Passenger[]>;
}

export class PassengerRepo implements IPassengerRepo {
  async save(passenger: Passenger): Promise<void> {
    try {
      await Passenger.create({
        birthDate: passenger.birthDate,
        email: passenger.email,
        passwordHash: passenger.passwordHash,
        phoneNumber: passenger.phoneNumber,
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        userStatus: 0,
        carPool: false,
        rating: null,
        schedule: null,
      });
    } catch (error) {
      throw new Error("Failed to create passenger.");
    }
  }
  async update(passenger: Passenger): Promise<void> {
    try {
      const new_passenger = await Passenger.findOne({
        where: {
          id: passenger.id,
        },
      });
      if (!new_passenger) {
        throw new Error("Passenger not found.");
      }
      new_passenger.birthDate = passenger.birthDate;
      new_passenger.email = passenger.email;
      new_passenger.passwordHash = passenger.passwordHash;
      new_passenger.phoneNumber = passenger.phoneNumber;
      new_passenger.firstName = passenger.firstName;
      new_passenger.lastName = passenger.lastName;
      new_passenger.userStatus = passenger.userStatus;
      new_passenger.carPool = passenger.carPool;
      new_passenger.rating = passenger.rating;
      new_passenger.schedule = passenger.schedule;

      await new_passenger.save();
    } catch (error) {
      throw new Error("Failed to update passenger.");
    }
  }
  async delete(passengerId: number): Promise<void> {
    try {
      const new_passenger = await Passenger.findOne({
        where: {
          id: passengerId,
        },
      });
      if (!new_passenger) {
        throw new Error("Passenger not found.");
      }

      await new_passenger.destroy();
    } catch (error) {
      throw new Error("Failed to delete passenger.");
    }
  }
  async retrieveById(passengerId: number): Promise<Passenger> {
    try {
      const new_passenger = await Passenger.findOne({
        where: {
          id: passengerId,
        },
      });
      if (!new_passenger) {
        throw new Error("Passenger not found.");
      }
      return new_passenger;
    } catch (error) {
      throw new Error("Failed to retrieve passenger.");
    }
  }
  async retrieveAll(): Promise<Passenger[]> {
    try {
      console.log("Before2");
      return await Passenger.findAll();
    } catch (error) {
      console.log("❌ After2 - Failed");
      console.log(error);
      throw new Error("Failed to retrive passengers.");
    }
  }
}
