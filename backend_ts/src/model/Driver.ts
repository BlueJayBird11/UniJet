import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Min,
  Max,
} from "sequelize-typescript";
import Passenger from "./Passenger";
import RegisteredAs from "./RegistaredAs";
import Vehicle from "./Vehicle";
import OwnsA from "./OwnsA";
import { TripHistory } from "./History";

@Table({
  tableName: "drivers",
  timestamps: false, // Assuming you don't have created_at and updated_at columns
})
export class Driver extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  licencePlate!: string;

  @Column({
    type: DataType.CHAR(2),
    allowNull: false,
  })
  registeredState!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @Min(1)
  @Max(8)
  availableSeats!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  rating?: number;
}

// Driver.belongsToMany(Passenger, { through: RegisteredAs });
// Driver.belongsToMany(Vehicle, { through: OwnsA });
// Driver.hasMany(TripHistory, { foreignKey: 'driverID' });


export default Driver;
