import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FormProvider, type SubmitHandler } from 'react-hook-form';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import useGlobalContext from '@/hooks/UseContext';
import { AxiosInstance } from '@/lib/axios.helper';
import { ADMIN_DASHBOARD_URL, ADMIN_LOGIN_URL } from '@/constants/paths';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import HookFormInput from '@/components/custome/form/HookFormInput';
import { Loader2 } from 'lucide-react';

const Login: React.FC = () => {
    const { setAuth, loading, setLoading } = useGlobalContext();
    const navigate = useNavigate();
    const form = useLoginForm();

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        try {
            setLoading(true);

            form.clearErrors();

            const response = await AxiosInstance.post("admin/auth/login", data, {
                headers: {
                    Accept: 'application/json',
                },
            });

            setAuth(response.data);
            toast.success("Login Successful");
            navigate(ADMIN_DASHBOARD_URL);

        } catch (err: any) {

            if (err.status === 422) {
                Object.entries(err.response?.data).forEach(([key, message]) => {
                    form.setError(key as keyof LoginFormData, {
                        type: 'server',
                        message: message as string,
                    });
                });
            } else {
                toast.error(err.response?.data.message);
            }

        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row p-4">

            <div className="flex flex-1 items-center justify-center my-10 md:my-0">
                <Card className="w-full max-w-md shadow-none">
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="text-start">
                        <FormProvider {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <HookFormInput name="email" placeholder="you@example.com" type="email" />
                                <HookFormInput name="password" placeholder="••••••••" type="password" />

                                {loading ? (
                                    <Button variant={'default'} className="w-full" type="button" disabled>
                                        <Loader2 className="animate-spin" />
                                    </Button>
                                ) : (
                                    <Button variant={'default'} className="w-full" type="submit">
                                        Submit
                                    </Button>
                                )}
                            </form>
                        </FormProvider>
                    </CardContent>

                    <CardFooter className="flex-col gap-2">
                        <Button className="bg-white w-full" type="button">
                            Login with Google
                        </Button>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link to={ADMIN_LOGIN_URL} className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            <div className="hidden md:flex md:w-1/2 items-center justify-center">
                <img
                    src="/public/login.webp"
                    alt="Login Illustration"
                    className="p-8 w-5/6"
                />
            </div>
        </div>

    );
};

export default Login;


//zod
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const useLoginForm = () => {
    return useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
        },
    });
};
