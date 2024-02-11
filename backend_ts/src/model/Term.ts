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
  tableName: "term",
  timestamps: false,
})
export class Term extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endDate!: Date;

  @Column(DataType.STRING(20))
  termName?: string;
}

Term.hasMany(ClassInfo, { foreignKey: 'termID' });

export default Term;
