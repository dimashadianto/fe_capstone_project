import { z } from "zod";

export const resetPasswordSchema = z.object({
    email: z
      .string()
      .email("Format email tidak valid"),
    password: z
      .string()
      .min(6, "Kata sandi minimal 6 karakter")
      .regex(/[A-Z]/, "Kata sandi harus memiliki minimal satu huruf besar")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Kata sandi harus memiliki minimal satu simbol"),
    confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok",
    path: ["confirmPassword"],
});

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordSchema>;
