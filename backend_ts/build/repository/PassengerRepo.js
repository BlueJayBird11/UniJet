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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengerRepo = void 0;
const Passenger_1 = require("../model/Passenger");
class PassengerRepo {
    save(passenger) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Passenger_1.Passenger.create({
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
            }
            catch (error) {
                throw new Error("Failed to create passenger.");
            }
        });
    }
    update(passenger) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_passenger = yield Passenger_1.Passenger.findOne({
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
                yield new_passenger.save();
            }
            catch (error) {
                throw new Error("Failed to update passenger.");
            }
        });
    }
    delete(passengerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_passenger = yield Passenger_1.Passenger.findOne({
                    where: {
                        id: passengerId,
                    },
                });
                if (!new_passenger) {
                    throw new Error("Passenger not found.");
                }
                yield new_passenger.destroy();
            }
            catch (error) {
                throw new Error("Failed to delete passenger.");
            }
        });
    }
    retrieveById(passengerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_passenger = yield Passenger_1.Passenger.findOne({
                    where: {
                        id: passengerId,
                    },
                });
                if (!new_passenger) {
                    throw new Error("Passenger not found.");
                }
                return new_passenger;
            }
            catch (error) {
                throw new Error("Failed to retrieve passenger.");
            }
        });
    }
    retrieveAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Before2");
                return yield Passenger_1.Passenger.findAll();
            }
            catch (error) {
                console.log("❌ After2 - Failed");
                console.log(error);
                throw new Error("Failed to retrive passengers.");
            }
        });
    }
}
exports.PassengerRepo = PassengerRepo;
