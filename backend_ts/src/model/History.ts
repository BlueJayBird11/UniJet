import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";
import { Passenger } from "./Passenger";
import { Driver } from "./Driver";
import { Trip } from "./Trip";

@Table({
  tableName: "history",
  timestamps: false,
})
export class TripHistory extends Model {
  @PrimaryKey
  @ForeignKey(() => Passenger)
  @Column(DataType.INTEGER)
  passengerID!: number;

  @PrimaryKey
  @ForeignKey(() => Driver)
  @Column(DataType.INTEGER)
  driverID!: number;

  @PrimaryKey
  @ForeignKey(() => Trip)
  @Column(DataType.INTEGER)
  tripID!: number;
}

export default TripHistory;
