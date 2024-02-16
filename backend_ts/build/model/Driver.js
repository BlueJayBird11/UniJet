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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Passenger_1 = __importDefault(require("./Passenger"));
const RegistaredAs_1 = __importDefault(require("./RegistaredAs"));
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
], Driver.prototype, "licenceplate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(2),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Driver.prototype, "registeredstate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
    // @Min(1)
    // @Max(8)
    ,
    __metadata("design:type", Number)
], Driver.prototype, "availableseats", void 0);
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
Driver.belongsToMany(Passenger_1.default, { through: RegistaredAs_1.default });
// Driver.belongsToMany(Vehicle, { through: OwnsA });
// Driver.hasMany(TripHistory, { foreignKey: 'driverID' });
exports.default = Driver;
