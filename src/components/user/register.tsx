import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegisterFormSchema, registerSchema } from "@/validations/user/register";
import { useForm } from "react-hook-form";
import { register } from "@/services/user_service";
import { RegisterReq } from "@/models/user_model";
import { Link, useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../toast";
import { PasswordInput } from "../password-input";

const Register = () => {
    const navigate = useNavigate();

    const form = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleSubmit = (value: RegisterFormSchema) => {
        const data: RegisterReq = value;

        register(data)
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
            <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-white to-blue-200">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-2">
                        <h2 className="font-semibold text-lg mb-0 text-blue-800">Selamat Datang</h2>
                        <p className="text-gray-600 text-sm">Silahkan daftar untuk menikmati layanan website</p>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-blue-800">Nama</FormLabel>
                                    <FormMessage className="-mt-1" />
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Nama"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-blue-800">Email</FormLabel>
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
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-blue-800">Nomor Telepon</FormLabel>
                                    <FormMessage className="-mt-1" />
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Nomor Telepon"
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
                                    <FormLabel className="text-blue-800">Kata Sandi</FormLabel>
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
                                    <FormLabel className="text-blue-800">Konfirmasi Kata Sandi</FormLabel>
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
                        <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-500 text-white transition mt-1">Daftar</Button>
                        <p className="text-sm text-gray-600 text-center">Sudah punya akun? <Link to="/login" className="text-blue-500 hover:underline">Masuk disini</Link></p>
                    </form>
                </Form>
            </main>
        </div>
    );
};

export default Register;
