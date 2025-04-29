import { z } from "zod";

export const registerSchema = z.object({
    name: z
      .string()
      .min(3, "Nama minimal 3 karakter"),
    email: z
      .string()
      .email("Format email tidak valid"),
    phone: z
      .string()
      .min(10, "Nomor telepon minimal 10 digit")
      .max(15, "Nomor telepon maksimal 15 digit")
      .regex(/^\d+$/, "Nomor telepon hanya boleh berisi angka"),
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

export type RegisterFormSchema = z.infer<typeof registerSchema>;
