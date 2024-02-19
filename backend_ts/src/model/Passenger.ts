import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import Driver from "./Driver";
import RegisteredAs from "./RegistaredAs";
import University from "./University";
import Attends from "./Attends";
import TripHistory from "./History";

@Table({
  tableName: "passengers",
  timestamps: false
})
export class Passenger extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthdate!: Date;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  passwordhash!: number;

  @Column({
    type: DataType.CHAR(10),
    allowNull: false,
  })
  phonenumber!: string;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
  })
  firstname!: string;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
  })
  lastname!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userstatus!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  carpool!: boolean;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  rating?: number;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  schedule?: object;
}

// Passenger.belongsToMany(Driver, { through: RegisteredAs });
// Passenger.belongsToMany(University, { through: Attends });
// Passenger.hasMany(TripHistory, { foreignKey: 'passengerID' });

export default Passenger;

// @Table({
//     tableName: Passenger.PASSENGER_TABLE_NAME
// })
// export class Passenger extends Model {

//     public static PASSENGER_TABLE_NAME = "passengers" as string;
//     public static PASSENGER_ID = "id" as string;
//     public static PASSENGER_FIRST_NAME = "firstName" as string;
//     public static PASSENGER_schedule = "schedule" as string;

//     @Column({
//         type: DataType.BIGINT,
//         primaryKey: true,

//     })
//     id!:number
// }