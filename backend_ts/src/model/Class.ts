import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import ClassInfo from "./ClassInfo";
import University from "./University";
import OfferedBy from "./OfferedBy";

@Table({
  tableName: "classes",
  timestamps: false,
})
export class Class extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  classSubject!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  courseNumber!: number;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
  })
  className!: string;
}

// Class.hasMany(ClassInfo, { foreignKey: 'classID' });
// Class.belongsToMany(University, {through: OfferedBy});

export default Class;
