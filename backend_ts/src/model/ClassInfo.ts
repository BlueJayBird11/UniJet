import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";
import { Class } from "./Class"; // Assuming your class model is named Class, adjust if needed
import { TimeInformation } from "./TimeInformation";
import { Section } from "./Section";
import { DaysOfWeek } from "./DaysOfWeek";
import { Building } from "./Building";
import { Term } from "./Term";

@Table({
  tableName: "classInfo",
  timestamps: false,
})
export class ClassInfo extends Model {
  @PrimaryKey
  @ForeignKey(() => Class)
  @Column(DataType.INTEGER)
  classID!: number;

  @PrimaryKey
  @ForeignKey(() => TimeInformation)
  @Column(DataType.INTEGER)
  timeInfoID!: number;

  @PrimaryKey
  @ForeignKey(() => Section)
  @Column(DataType.INTEGER)
  sectionID!: number;

  @PrimaryKey
  @ForeignKey(() => DaysOfWeek)
  @Column(DataType.INTEGER)
  daysOfWeekID!: number;

  @PrimaryKey
  @ForeignKey(() => Building)
  @Column(DataType.INTEGER)
  buildingID!: number;

  @PrimaryKey
  @ForeignKey(() => Term)
  @Column(DataType.INTEGER)
  termID!: number;
}

ClassInfo.belongsTo(Class, { foreignKey: 'classID' });
ClassInfo.belongsTo(TimeInformation, { foreignKey: 'timeInfoID' });
ClassInfo.belongsTo(Section, { foreignKey: 'sectionID' });
ClassInfo.belongsTo(DaysOfWeek, { foreignKey: 'daysOfWeekID' });
ClassInfo.belongsTo(Building, { foreignKey: 'buildingID' });
ClassInfo.belongsTo(Term, { foreignKey: 'termID' });

export default ClassInfo;
