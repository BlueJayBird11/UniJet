"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassengerSchema = exports.createPassengerSchema = void 0;
const zod_1 = require("zod");
exports.createPassengerSchema = zod_1.z.object({
    body: zod_1.z.object({
        birthDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // DATE as string, assuming ISO format (YYYY-MM-DD)
        email: zod_1.z.string().email().max(30), // VARCHAR(30) with email validation
        passwordHash: zod_1.z.number().int(), // INT, assuming any integer can be a hash (though in practice, you'd hash as a string)
        phoneNumber: zod_1.z.string().length(10), // CHAR(10) is a fixed length string
        firstName: zod_1.z.string().max(25), // VARCHAR(25)
        lastName: zod_1.z.string().max(40), // VARCHAR(40)
        userStatus: zod_1.z.number().int(), // INT for user status, assuming it's an integer code
        carPool: zod_1.z.boolean(), // BOOLEAN
        rating: zod_1.z.number().optional(), // FLOAT, optional because it might not be present
        schedule: zod_1.z.any().optional(), // JSONB, using any() for JSON data; adjust according to the expected structure
    }),
});
exports.updatePassengerSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    body: zod_1.z.object({
        birthDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // DATE as string, assuming ISO format (YYYY-MM-DD)
        email: zod_1.z.string().email().max(30), // VARCHAR(30) with email validation
        passwordHash: zod_1.z.number().int(), // INT, assuming any integer can be a hash (though in practice, you'd hash as a string)
        phoneNumber: zod_1.z.string().length(10), // CHAR(10) is a fixed length string
        firstName: zod_1.z.string().max(25), // VARCHAR(25)
        lastName: zod_1.z.string().max(40), // VARCHAR(40)
        userStatus: zod_1.z.number().int(), // INT for user status, assuming it's an integer code
        carPool: zod_1.z.boolean(), // BOOLEAN
        rating: zod_1.z.number().optional(), // FLOAT, optional because it might not be present
        schedule: zod_1.z.any().optional(), // JSONB, using any() for JSON data; adjust according to the expected structure
    }),
});
