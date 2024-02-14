"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passenger = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Passenger = class Passenger extends sequelize_typescript_1.Model {
};
exports.Passenger = Passenger;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Passenger.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], Passenger.prototype, "birthdate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Passenger.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Passenger.prototype, "passwordhash", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(10),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Passenger.prototype, "phonenumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(25),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Passenger.prototype, "firstname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(40),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Passenger.prototype, "lastname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Passenger.prototype, "userstatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
    }),
    __metadata("design:type", Boolean)
], Passenger.prototype, "carpool", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Passenger.prototype, "rating", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSONB,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], Passenger.prototype, "schedule", void 0);
exports.Passenger = Passenger = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "passengers",
        timestamps: false
    }) //   timestamps: false, // Assuming you don't have created_at and updated_at columns
], Passenger);
// Passenger.belongsToMany(Driver, { through: RegisteredAs });
// Passenger.belongsToMany(University, { through: Attends });
// Passenger.hasMany(TripHistory, { foreignKey: 'passengerID' });
exports.default = Passenger;
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
