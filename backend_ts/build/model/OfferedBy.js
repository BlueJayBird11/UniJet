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
exports.OfferedBy = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Class_1 = require("./Class"); // Assuming your class model is named Class, adjust if needed
const University_1 = require("./University");
let OfferedBy = class OfferedBy extends sequelize_typescript_1.Model {
};
exports.OfferedBy = OfferedBy;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => Class_1.Class),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], OfferedBy.prototype, "classID", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => University_1.University),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], OfferedBy.prototype, "universityID", void 0);
exports.OfferedBy = OfferedBy = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "offeredBy",
        timestamps: false,
    })
], OfferedBy);
exports.default = OfferedBy;
