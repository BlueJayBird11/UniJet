import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";
import ClassInfo from "./ClassInfo";
import LocatedIn from "./LocatedIn";
import University from "./University";

@Table({
  tableName: "buildings",
  timestamps: false,
})
export class Building extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column(DataType.STRING(50))
  buildingAddress?: string;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
  })
  buildingName!: string;

  @Column(DataType.STRING(40))
  buildingFullName?: string;
}

// Building.hasMany(ClassInfo, { foreignKey: 'buildingID' });
// Building.belongsToMany(University, { through: LocatedIn });

export default Building;
