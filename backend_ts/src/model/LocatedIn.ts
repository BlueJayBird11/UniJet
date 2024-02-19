import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";
import { Building } from "./Building";
import { University } from "./University";

@Table({
  tableName: "locatedIn",
  timestamps: false,
})
export class LocatedIn extends Model {
  @PrimaryKey
  @ForeignKey(() => Building)
  @Column(DataType.INTEGER)
  buildingID!: number;

  @PrimaryKey
  @ForeignKey(() => University)
  @Column(DataType.INTEGER)
  universityID!: number;
}

export default LocatedIn;
