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
exports.ClassInfo = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Class_1 = require("./Class"); // Assuming your class model is named Class, adjust if needed
const TimeInformation_1 = require("./TimeInformation");
const Section_1 = require("./Section");
const DaysOfWeek_1 = require("./DaysOfWeek");
const Building_1 = require("./Building");
const Term_1 = require("./Term");
let ClassInfo = class ClassInfo extends sequelize_typescript_1.Model {
};
exports.ClassInfo = ClassInfo;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => Class_1.Class),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ClassInfo.prototype, "classID", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => TimeInformation_1.TimeInformation),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ClassInfo.prototype, "timeInfoID", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => Section_1.Section),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ClassInfo.prototype, "sectionID", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => DaysOfWeek_1.DaysOfWeek),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ClassInfo.prototype, "daysOfWeekID", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => Building_1.Building),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ClassInfo.prototype, "buildingID", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => Term_1.Term),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ClassInfo.prototype, "termID", void 0);
exports.ClassInfo = ClassInfo = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "classInfo",
        timestamps: false,
    })
], ClassInfo);
// ClassInfo.belongsTo(Class, { foreignKey: 'classID' });
// ClassInfo.belongsTo(TimeInformation, { foreignKey: 'timeInfoID' });
// ClassInfo.belongsTo(Section, { foreignKey: 'sectionID' });
// ClassInfo.belongsTo(DaysOfWeek, { foreignKey: 'daysOfWeekID' });
// ClassInfo.belongsTo(Building, { foreignKey: 'buildingID' });
// ClassInfo.belongsTo(Term, { foreignKey: 'termID' });
exports.default = ClassInfo;
