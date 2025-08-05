import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import useGlobalContext from "@/hooks/UseContext";
import { FormProvider, type SubmitHandler } from "react-hook-form";
import { AxiosInstance } from "@/lib/axios.helper";
import HookFormInput from "@/components/custome/form/HookFormInput";
import { Loader2 } from "lucide-react";
import HookFormFile from "@/components/custome/form/HookFormFile";
import { SERVER_PATH } from "@/constants/paths";
import InputLabelSkeleton from "@/components/custome/skeletons/InputLabelSkeleton";
import LineSkeleton from "@/components/custome/skeletons/LineSkeleton";
import Breadcrumbs from "@/components/custome/Breadcrumbs";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AuthState } from '@/contexts/Global';
import { useLocation } from "react-router-dom";

const Profile = () => {

    const { setAuth, loading, setLoading, auth } = useGlobalContext();

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const form = useProfileForm({ name: auth.name, email: auth.email });

    const sendmail = async () => {
        try {
            setLoading(true);

            const response = await AxiosInstance.get("admin/protected/send-email");

            toast.success(response.data.message);

        } catch (err: any) {
            console.log(err);

            toast.error(err.response?.data.message);

        } finally {
            setLoading(false)
        }
    }
    const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {

        try {


            form.clearErrors();

            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    formData.append(key, value[0]);
                } else if (value !== undefined) {
                    formData.append(key, value);
                }
            });

            const response = await AxiosInstance.put("/admin/protected/update-profile", formData, {
                headers: {
                    Accept: 'multipart/formdata',
                },
            });

            form.reset({ name: auth.name, email: auth.email });
            setAuth(response.data);
            toast.success("Profile Update Successful");

        } catch (err: any) {

            if (err.status === 422) {
                Object.entries(err.response?.data).forEach(([key, message]) => {
                    form.setError(key as keyof ProfileFormData, {
                        type: 'server',
                        message: message as string,
                    });
                });
            } else {
                toast.error(err.response?.data.message);
            }
            console.log(err);

        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <Breadcrumbs pages={{ "Update Your Profile": "#" }} />
            <div className="max-w-3xl mx-auto w-full py-10 px-4 space-y-8">
                {
                    params.has('error') && <div className="p-4 border rounded-md bg-red-50">
                        {params.get('error')}
                    </div>
                }

                {
                    params.get('success') && <div className="p-4 border rounded-md bg-green-50">
                        {params.get('success')}
                    </div>
                }
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex items-center gap-4 mb-6">
                            <Avatar className="w-24 h-24 border">
                                <AvatarImage src={SERVER_PATH + auth.image} />
                                <AvatarFallback className="text-xs">{auth?.name}</AvatarFallback>
                            </Avatar>
                            <div className="w-full flex items-center justify-between">
                                <div className="text-start">
                                    <h2 className="text-2xl font-bold">{auth?.name}</h2>
                                    <p className="text-sm text-muted-foreground">{auth?.email}</p>
                                </div>
                                <div className="">
                                    <HookFormFile name="image" placeholder="Change Avatar" className="bg-secondary p-3 rounded-md" />
                                </div>
                            </div>
                        </div>

                        {
                            auth.verified ?
                                <div className="space-y-6 text-start">

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {
                                            loading ? <InputLabelSkeleton cols={2} />
                                                :
                                                <>
                                                    <HookFormInput name="name" placeholder="your full name" type="text" />
                                                    <HookFormInput name="email" placeholder="you@example.com" type="email" />
                                                </>
                                        }
                                    </div>

                                    {loading ?
                                        <LineSkeleton size="p-4" />
                                        :
                                        <h5 className="p-3 text-sm border border-blue-400 rounded-md">Don't use password and confirm password field unless you want to update password</h5>
                                    }

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {
                                            loading ? <InputLabelSkeleton cols={2} />
                                                :
                                                <>
                                                    <HookFormInput name="current_password" placeholder="you@example.com" type="password" />
                                                    <HookFormInput name="new_password" placeholder="you@example.com" type="password" />
                                                </>
                                        }
                                    </div>

                                    <div className="flex justify-end">
                                        {
                                            loading
                                                ?
                                                <Button type="button" disabled>Saving...<Loader2 className="animate-spin" /></Button>
                                                :
                                                <Button type="submit">Save Changes</Button>
                                        }
                                    </div>
                                </div>
                                :
                                <div className="p-4 border rounded-md">
                                    <p className="text-start">
                                        Your email is not verified. You are restricted to perform your tasks until you verify you email. Please click
                                        {
                                            loading ?
                                                <Button type="button" variant="link" className="p-2 underline" disabled>
                                                    Sending...<Loader2 className="animate-spin" />
                                                </Button>
                                                :
                                                <Button type="button" variant="link" onClick={sendmail} className="p-2 underline" >Verify Now</Button>
                                        }


                                        to receive verification email. Thanks :)
                                    </p>


                                </div>
                        }

                    </form>
                </FormProvider>
            </div>
        </>

    );
};

export default Profile;

// Zod 
const profileSchema = z
    .object({
        name: z.string(),
        email: z.string().email(),
        current_password: z.string().optional(),
        new_password: z.string().optional(),
        image: z.any().optional()
    })
    .refine(
        (data) =>

            !data.new_password || (data.current_password && data.current_password.length > 0),
        {
            message: "Required when new password",
            path: ["current_password"],
        }
    )
    .refine(
        (data) =>

            !data.current_password || (data.new_password && data.new_password.length >= 8),
        {
            message: "Required when current password",
            path: ["new_password"],
        }
    );

type ProfileFormData = z.infer<typeof profileSchema>;

const useProfileForm = (defaults: AuthState) => {
    return useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        mode: "onBlur",
        defaultValues: { ...defaults, current_password: '', new_password: '' },
    });
};