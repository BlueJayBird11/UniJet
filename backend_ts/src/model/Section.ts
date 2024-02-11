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
  tableName: "section",
  timestamps: false,
})
export class Section extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column({
    type: DataType.STRING(5),
    allowNull: false,
  })
  section!: string;
}

Section.hasMany(ClassInfo, { foreignKey: 'sectionID' });

export default Section;
