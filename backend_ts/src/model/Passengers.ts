import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

@Table({
  tableName: "passengers"
}) //   timestamps: false, // Assuming you don't have created_at and updated_at columns
export class Passenger extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthDate!: Date;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  passwordHash!: number;

  @Column({
    type: DataType.CHAR(10),
    allowNull: false,
  })
  phoneNumber!: string;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userStatus!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  carPool!: boolean;

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
