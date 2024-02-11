import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import ClassInfo from "./ClassInfo";

@Table({
  tableName: "timeInformation",
  timestamps: false,
})
export class TimeInformation extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  startTime!: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  endTime!: string;
}

TimeInformation.hasMany(ClassInfo, { foreignKey: "timeInfoID" });

export default TimeInformation;
