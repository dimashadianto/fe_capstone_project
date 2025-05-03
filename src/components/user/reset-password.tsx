import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ErrorToast, SuccessToast } from "../toast";
import { ResetPasswordFormSchema, resetPasswordSchema } from "@/validations/user/reset-password";
import { ResetPasswordReq } from "@/models/user_model";
import { resetPassword } from "@/services/user_service";
import { useNavigate } from "react-router-dom";
import Footer from "../footer";
import { PasswordInput } from "../password-input";

const ResetPassword = () => {
    const navigate = useNavigate();

    const form = useForm<ResetPasswordFormSchema>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleSubmit = (value: ResetPasswordFormSchema) => {
        const data: ResetPasswordReq = value;

        resetPassword(data)
            .then((response) => {
                form.reset();
                SuccessToast(response.data.message);
                navigate("/login");
            })
            .catch((err) => {
                ErrorToast(err.response?.data?.message);
            });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow flex items-center justify-center bg-gray-100">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-2">
                        <h2 className="font-semibold text-lg mb-0">Ubah Kata Sandi</h2>
                        <p className="text-gray-600 text-sm">Silakan isi data di bawah untuk mengganti kata sandi</p>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormMessage className="-mt-1" />
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kata Sandi</FormLabel>
                                    <FormMessage className="-mt-1" />
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="Kata Sandi"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Konfirmasi Kata Sandi</FormLabel>
                                    <FormMessage className="-mt-1" />
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="Konfirmasi Kata Sandi"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full text-white transition mt-1">Ubah Kata Sandi</Button>
                    </form>
                </Form>
            </main>
            <Footer />
        </div>
    );
};

export default ResetPassword;
