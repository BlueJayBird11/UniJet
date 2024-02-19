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
      console.log("Before2");
      await Passenger.create({
        birthdate: passenger.birthdate,
        email: passenger.email,
        passwordhash: passenger.passwordhash,
        phonenumber: passenger.phonenumber,
        firstname: passenger.firstname,
        lastname: passenger.lastname,
        userstatus: 0,
        carpool: false,
        rating: null,
        schedule: null,
      });
    } catch (error) {
      console.log("❌ After2 - Failed");
      console.log(error);
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
      new_passenger.birthdate = passenger.birthdate;
      new_passenger.email = passenger.email;
      new_passenger.passwordhash = passenger.passwordhash;
      new_passenger.phonenumber = passenger.phonenumber;
      new_passenger.firstname = passenger.firstname;
      new_passenger.lastname = passenger.lastname;
      new_passenger.userstatus = passenger.userstatus;
      new_passenger.carpool = passenger.carpool;
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
      return await Passenger.findAll();
    } catch (error) {
      throw new Error("Failed to retrive passengers.");
    }
  }
}
