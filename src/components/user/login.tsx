import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../toast";
import { LoginFormSchema, loginSchema } from "@/validations/user/login";
import { LoginReq } from "@/models/user_model";
import { login } from "@/services/user_service";
import { PasswordInput } from "../password-input";

const Login = () => {
    const navigate = useNavigate();

    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSubmit = (value: LoginFormSchema) => {
        const data: LoginReq = value;

        login(data)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                form.reset();
                SuccessToast(response.data.message);
                navigate("/");
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
                        <p className="text-gray-600 text-sm">Silahkan masuk untuk mengakses layanan website</p>
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
                        <p className="text-sm text-gray-600 text-right">Lupa kata sandi? <Link to="/reset-password" className="text-blue-500 hover:underline">Ubah kata sandi</Link></p>
                        <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-500 text-white transition mt-1">Masuk</Button>
                        <p className="text-sm text-gray-600 text-center">Belum punya akun? <Link to="/register" className="text-blue-500 hover:underline">Daftar disini</Link></p>
                    </form>
                </Form>
            </main>
        </div>
    );
};

export default Login;
