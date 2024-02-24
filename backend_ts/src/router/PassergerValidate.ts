import BaseRoutes from "./base/BaseRouter";
import pool from "../db";
import bcrypt from "bcrypt";

const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

class PassengerValidate extends BaseRoutes {
  routes(): void {
    this.router.get("", async (req, res) => {
      try {
        // console.log(req.params.id);
        const result = await pool.query(
          "SELECT * FROM passengers WHERE email = $1",
          [req.body.email]
        );
        const isValid = await verifyPassword(
          req.body.passwordHash,
          result.rows[0].passwordhash
        );
        if (!isValid) {
          res.status(401).json({ message: "Authentication failed" });
        }
        const token1 = "200";
        res.status(200).json({
          token: token1,
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
}

export default new PassengerValidate().router;
