import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";
import { Class } from "./Class"; // Assuming your class model is named Class, adjust if needed
import { University } from "./University";

@Table({
  tableName: "offeredBy",
  timestamps: false,
})
export class OfferedBy extends Model {
  @PrimaryKey
  @ForeignKey(() => Class)
  @Column(DataType.INTEGER)
  classID!: number;

  @PrimaryKey
  @ForeignKey(() => University)
  @Column(DataType.INTEGER)
  universityID!: number;
}

export default OfferedBy;
