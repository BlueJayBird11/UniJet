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
exports.Driver = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Driver = class Driver extends sequelize_typescript_1.Model {
};
exports.Driver = Driver;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], Driver.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Driver.prototype, "licencePlate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(2),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Driver.prototype, "registeredState", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    (0, sequelize_typescript_1.Min)(1),
    (0, sequelize_typescript_1.Max)(8),
    __metadata("design:type", Number)
], Driver.prototype, "availableSeats", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Driver.prototype, "rating", void 0);
exports.Driver = Driver = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "drivers",
        timestamps: false, // Assuming you don't have created_at and updated_at columns
    })
], Driver);
// Driver.belongsToMany(Passenger, { through: RegisteredAs });
// Driver.belongsToMany(Vehicle, { through: OwnsA });
// Driver.hasMany(TripHistory, { foreignKey: 'driverID' });
exports.default = Driver;
