"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Passenger_1 = __importDefault(require("../model/Passenger"));
const PassengerRepo_1 = require("../repository/PassengerRepo");
class PassengerController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_passenger = new Passenger_1.default();
                new_passenger.birthDate = req.body.birthDate;
                new_passenger.email = req.body.email;
                new_passenger.passwordHash = req.body.passwordHash;
                new_passenger.phoneNumber = req.body.phoneNumber;
                new_passenger.firstName = req.body.firstName;
                new_passenger.lastName = req.body.lastName;
                new_passenger.userStatus = req.body.userStatus;
                new_passenger.carPool = req.body.carPool;
                new_passenger.rating = req.body.rating;
                new_passenger.schedule = req.body.schedule;
                yield new PassengerRepo_1.PassengerRepo().save(new_passenger);
                res.status(201).json({
                    status: "Created!",
                    message: "Successfully created passenger!",
                });
            }
            catch (error) {
                res.status(500).json({
                    status: "Internal Server Error.",
                    message: "Internal Server Error.",
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                yield new PassengerRepo_1.PassengerRepo().delete(id);
                res.status(200).json({
                    status: "OK!",
                    message: "Successfully deleted passenger!",
                });
            }
            catch (error) {
                res.status(500).json({
                    status: "Internal Server Error.",
                    message: "Internal Server Error.",
                });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                const new_passenger = yield new PassengerRepo_1.PassengerRepo().retrieveById(id);
                res.status(200).json({
                    status: "OK!",
                    message: "Successfully fetched passenger by id!",
                    data: new_passenger,
                });
            }
            catch (error) {
                res.status(500).json({
                    status: "Internal Server Error.",
                    message: "Internal Server Error.",
                });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Before");
                const new_passenger = yield new PassengerRepo_1.PassengerRepo().retrieveAll();
                console.log("After");
                res.status(200).json({
                    status: "OK!",
                    message: "Successfully fetched all passengers data!",
                    data: new_passenger,
                });
            }
            catch (error) {
                res.status(500).json({
                    status: "Internal Server Error.",
                    message: "Internal Server Error.",
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params["id"]);
                const new_passenger = new Passenger_1.default();
                new_passenger.id = id;
                new_passenger.birthDate = req.body.birthDate;
                new_passenger.email = req.body.email;
                new_passenger.passwordHash = req.body.passwordHash;
                new_passenger.phoneNumber = req.body.phoneNumber;
                new_passenger.firstName = req.body.firstName;
                new_passenger.lastName = req.body.lastName;
                new_passenger.userStatus = req.body.userStatus;
                new_passenger.carPool = req.body.carPool;
                new_passenger.rating = req.body.rating;
                new_passenger.schedule = req.body.schedule;
                yield new PassengerRepo_1.PassengerRepo().update(new_passenger);
                res.status(200).json({
                    status: "OK!",
                    message: "Successfully updated passenger data!",
                });
            }
            catch (error) {
                res.status(500).json({
                    status: "Internal Server Error.",
                    message: "Internal Server Error.",
                });
            }
        });
    }
}
exports.default = new PassengerController();
