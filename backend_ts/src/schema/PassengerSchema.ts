import { z } from "zod";

export const createPassengerSchema = z.object({
  body: z.object({
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // DATE as string, assuming ISO format (YYYY-MM-DD)
    email: z.string().email().max(30), // VARCHAR(30) with email validation
    passwordHash: z.number().int(), // INT, assuming any integer can be a hash (though in practice, you'd hash as a string)
    phoneNumber: z.string().length(10), // CHAR(10) is a fixed length string
    firstName: z.string().max(25), // VARCHAR(25)
    lastName: z.string().max(40), // VARCHAR(40)
    userStatus: z.number().int(), // INT for user status, assuming it's an integer code
    carPool: z.boolean(), // BOOLEAN
    rating: z.number().optional(), // FLOAT, optional because it might not be present
    schedule: z.any().optional(), // JSONB, using any() for JSON data; adjust according to the expected structure
  }),
});

export const updatePassengerSchema = z.object({
    params: z.object({ id: z.string() }),
    body: z.object({
      birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // DATE as string, assuming ISO format (YYYY-MM-DD)
      email: z.string().email().max(30), // VARCHAR(30) with email validation
      passwordHash: z.number().int(), // INT, assuming any integer can be a hash (though in practice, you'd hash as a string)
      phoneNumber: z.string().length(10), // CHAR(10) is a fixed length string
      firstName: z.string().max(25), // VARCHAR(25)
      lastName: z.string().max(40), // VARCHAR(40)
      userStatus: z.number().int(), // INT for user status, assuming it's an integer code
      carPool: z.boolean(), // BOOLEAN
      rating: z.number().optional(), // FLOAT, optional because it might not be present
      schedule: z.any().optional(), // JSONB, using any() for JSON data; adjust according to the expected structure
    }),
  });
  