import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import Passenger from './Passenger';
import Attends from './Attends';
import Building from './Building';
import LocatedIn from './LocatedIn';
import Class from './Class';
import OfferedBy from './OfferedBy';

@Table({
  tableName: 'university',
  timestamps: false, // Assuming you don't have created_at and updated_at columns
})
export class University extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
  })
  uniName!: string;

  @Column({
    type: DataType.CHAR(7),
    allowNull: false,
  })
  primaryColor!: string;

  @Column({
    type: DataType.CHAR(7),
    allowNull: false,
  })
  secondaryColor!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  emailExtension!: string;

  @Column({
    type: DataType.CHAR(5),
    allowNull: false,
  })
  zip!: string;

  @Column({
    type: DataType.CHAR(2),
    allowNull: false,
  })
  uniState!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  uniAddress!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  timeZone!: string;
}

University.belongsToMany(Passenger, { through: Attends });
University.belongsToMany(Building, { through: LocatedIn });
University.belongsToMany(Class, { through: OfferedBy });

export default University;