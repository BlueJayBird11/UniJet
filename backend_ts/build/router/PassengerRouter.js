"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PassengerController_1 = __importDefault(require("../controller/PassengerController"));
const validate_1 = __importDefault(require("../helper/validate"));
const PassengerSchema_1 = require("../schema/PassengerSchema");
const BaseRouter_1 = __importDefault(require("./base/BaseRouter"));
class PassengerRoutes extends BaseRouter_1.default {
    routes() {
        this.router.post("", (0, validate_1.default)(PassengerSchema_1.createPassengerSchema), PassengerController_1.default.create);
        this.router.patch("/:id", (0, validate_1.default)(PassengerSchema_1.updatePassengerSchema), PassengerController_1.default.update);
        this.router.delete("/:id", PassengerController_1.default.delete);
        this.router.get("/:id", PassengerController_1.default.findById);
        this.router.get("", PassengerController_1.default.findAll);
    }
}
exports.default = new PassengerRoutes().router;
