import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";
import { Passenger } from "./Passenger"; // Adjust the import path as necessary
import { Driver } from "./Driver"; // Adjust the import path as necessary

@Table({
  tableName: "registeredAs",
  timestamps: false,
})
export class RegisteredAs extends Model {
  @PrimaryKey
  @ForeignKey(() => Passenger)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  passengerID!: number;

  @PrimaryKey
  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  driverID!: number;
}

export default RegisteredAs;
