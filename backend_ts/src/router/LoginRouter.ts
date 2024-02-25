import BaseRoutes from "./base/BaseRouter";
import pool from "../db";
import bcrypt from "bcrypt";

const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

class LoginRouter extends BaseRoutes {
  routes(): void {
    this.router.post("", async (req, res) => {
      try {
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

        const newResults = await pool.query(
          "SELECT birthDate, email, phoneNumber, firstName, lastName, userStatus, carPool FROM passengers WHERE email = $1",
          [req.body.email]
        );
        res.status(200).json({
          token: token1,
          passenger: newResults.rows[0],
        });
        console.log("LOGIN: SUCCESS");
      } catch (err) {
        console.log(err);
      }
    });
  }
}

export default new LoginRouter().router;
