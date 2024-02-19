import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";
import { Passenger } from "./Passenger";
import { University } from "./University";

@Table({
  tableName: "attends",
  timestamps: false,
})
export class Attends extends Model {
  @PrimaryKey
  @ForeignKey(() => Passenger)
  @Column(DataType.INTEGER)
  passengerID!: number;

  @PrimaryKey
  @ForeignKey(() => University)
  @Column(DataType.INTEGER)
  universityID!: number;
}

export default Attends;
