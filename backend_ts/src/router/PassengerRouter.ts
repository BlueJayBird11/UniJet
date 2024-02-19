import PassengerController from "../controller/PassengerController";
import validate from "../helper/validate";
import {
  createPassengerSchema,
  updatePassengerSchema,
} from "../schema/PassengerSchema";
import BaseRoutes from "./base/BaseRouter";

class PassengerRoutes extends BaseRoutes {
  routes(): void {
    this.router.post(
      "",
      validate(createPassengerSchema),
      PassengerController.create
    );
    this.router.patch(
      "/:id",
      validate(updatePassengerSchema),
      PassengerController.update
    );
    this.router.delete("/:id", PassengerController.delete);
    this.router.get("/:id", PassengerController.findById);
    this.router.get("", PassengerController.findAll);
  }
}

export default new PassengerRoutes().router;