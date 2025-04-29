import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Format email tidak valid"),
  password: z
    .string(),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;
