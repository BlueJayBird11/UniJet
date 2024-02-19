import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import Driver from "./Driver";
import OwnsA from "./OwnsA";

@Table({
  tableName: "vehicles",
  timestamps: false, // Assuming you don't have created_at and updated_at columns
})
export class Vehicle extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  make!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  model!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  color!: string;

  @Column({
    type: DataType.STRING(4),
    allowNull: false,
  })
  registeredYear!: string;
}

// Vehicle.belongsToMany(Driver, { through: OwnsA });

export default Vehicle;
