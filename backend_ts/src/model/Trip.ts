import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import TripHistory from "./History";

@Table({
  tableName: "trip",
  timestamps: false,
})
export class Trip extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  startTime!: Date;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  endTime!: Date;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  startLocation!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  endLocation!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  rideDate!: Date;

  @Column(DataType.INTEGER)
  earnings?: number;
}

// Trip.hasMany(TripHistory, { foreignKey: 'tripID' });

export default Trip;
