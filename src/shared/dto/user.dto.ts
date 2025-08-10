import { z } from 'zod';

// Request payload (ulaz)
export const createUserPayload = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
  bio: z.string().max(280).optional(),
});
export type CreateUserPayload = z.infer<typeof createUserPayload>;

// Odgovor (izlaz)
export const userDto = z.object({
  id: z.string(),
  publicId: z.number(),
  email: z.string().email(),
  name: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  createdAt: z.string(), // ISO string
});
export type UserDto = z.infer<typeof userDto>;

export const usersListDto = z.object({
  users: z.array(userDto),
});
