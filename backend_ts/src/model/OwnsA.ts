import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";
import { Driver } from "./Driver";
import { Vehicle } from "./Vehicle";

@Table({
  tableName: "ownsA",
  timestamps: false,
})
export class OwnsA extends Model {
  @PrimaryKey
  @ForeignKey(() => Driver)
  @Column(DataType.INTEGER)
  driverID!: number;

  @PrimaryKey
  @ForeignKey(() => Vehicle)
  @Column(DataType.INTEGER)
  vehicleID!: number;
}

export default OwnsA;
