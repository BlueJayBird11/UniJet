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
exports.University = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let University = class University extends sequelize_typescript_1.Model {
};
exports.University = University;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], University.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(40),
        allowNull: false,
    }),
    __metadata("design:type", String)
], University.prototype, "uniName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(7),
        allowNull: false,
    }),
    __metadata("design:type", String)
], University.prototype, "primaryColor", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(7),
        allowNull: false,
    }),
    __metadata("design:type", String)
], University.prototype, "secondaryColor", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
    }),
    __metadata("design:type", String)
], University.prototype, "emailExtension", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(5),
        allowNull: false,
    }),
    __metadata("design:type", String)
], University.prototype, "zip", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(2),
        allowNull: false,
    }),
    __metadata("design:type", String)
], University.prototype, "uniState", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
    }),
    __metadata("design:type", String)
], University.prototype, "uniAddress", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
    }),
    __metadata("design:type", String)
], University.prototype, "timeZone", void 0);
exports.University = University = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'university',
        timestamps: false, // Assuming you don't have created_at and updated_at columns
    })
], University);
// University.belongsToMany(Passenger, { through: Attends });
// University.belongsToMany(Building, { through: LocatedIn });
// University.belongsToMany(Class, { through: OfferedBy });
exports.default = University;
