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
exports.OwnsA = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Driver_1 = require("./Driver");
const Vehicle_1 = require("./Vehicle");
let OwnsA = class OwnsA extends sequelize_typescript_1.Model {
};
exports.OwnsA = OwnsA;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => Driver_1.Driver),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], OwnsA.prototype, "driverID", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => Vehicle_1.Vehicle),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], OwnsA.prototype, "vehicleID", void 0);
exports.OwnsA = OwnsA = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "ownsA",
        timestamps: false,
    })
], OwnsA);
exports.default = OwnsA;
