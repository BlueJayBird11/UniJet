import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";
import ClassInfo from "./ClassInfo";

@Table({
  tableName: "daysOfWeek",
  timestamps: false,
})
export class DaysOfWeek extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column({
    type: DataType.STRING(5),
    allowNull: false,
  })
  daysOfWeek!: string;
}

DaysOfWeek.hasMany(ClassInfo, { foreignKey: "daysOfWeekID" });

export default DaysOfWeek;
