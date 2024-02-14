import { Request, Response } from "express";
import Passenger from "../model/Passenger";
import { PassengerRepo } from "../repository/PassengerRepo";

class PassengerController {
  async create(req: Request, res: Response) {
    try {
      const new_passenger = new Passenger();
      new_passenger.birthdate = req.body.birthdate;
      new_passenger.email = req.body.email;
      new_passenger.passwordhash = req.body.passwordhash;
      new_passenger.phonenumber = req.body.phonenumber;
      new_passenger.firstname = req.body.firstname;
      new_passenger.lastname = req.body.lastname;
      new_passenger.userstatus = req.body.userstatus;
      new_passenger.carpool = req.body.carpool;
      new_passenger.rating = req.body.rating;
      new_passenger.schedule = req.body.schedule;

      await new PassengerRepo().save(new_passenger);

      res.status(201).json({
        status: "Created!",
        message: "Successfully created passenger!",
      });
    } catch (error) {
      res.status(500).json({
        status: "Internal Server Error.",
        message: "Internal Server Error.",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      await new PassengerRepo().delete(id);

      res.status(200).json({
        status: "OK!",
        message: "Successfully deleted passenger!",
      });
    } catch (error) {
      res.status(500).json({
        status: "Internal Server Error.",
        message: "Internal Server Error.",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const new_passenger = await new PassengerRepo().retrieveById(id);

      res.status(200).json({
        status: "OK!",
        message: "Successfully fetched passenger by id!",
        data: new_passenger,
      });
    } catch (error) {
      res.status(500).json({
        status: "Internal Server Error.",
        message: "Internal Server Error.",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      console.log("Before");
      const new_passenger = await new PassengerRepo().retrieveAll();
      // const new_passenger = await Passenger.findAll();
      console.log("After");
      res.status(200).json({
        status: "OK!",
        message: "Successfully fetched all passengers data!",
        data: new_passenger,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Internal Server Error.",
        message: "Internal Server Error.",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const new_passenger = new Passenger();

      new_passenger.id = id;
      new_passenger.birthdate = req.body.birthdate;
      new_passenger.email = req.body.email;
      new_passenger.passwordhash = req.body.passwordhash;
      new_passenger.phonenumber = req.body.phonenumber;
      new_passenger.firstname = req.body.firstname;
      new_passenger.lastname = req.body.lastname;
      new_passenger.userstatus = req.body.userstatus;
      new_passenger.carpool = req.body.carpool;
      new_passenger.rating = req.body.rating;
      new_passenger.schedule = req.body.schedule;

      await new PassengerRepo().update(new_passenger);

      res.status(200).json({
        status: "OK!",
        message: "Successfully updated passenger data!",
      });
    } catch (error) {
      res.status(500).json({
        status: "Internal Server Error.",
        message: "Internal Server Error.",
      });
    }
  }
}

export default new PassengerController();