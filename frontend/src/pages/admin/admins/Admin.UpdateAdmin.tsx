import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import useGlobalContext from "@/hooks/UseContext";
import { FormProvider, type SubmitHandler } from "react-hook-form";
import { AxiosInstance } from "@/lib/axios.helper";
import HookFormInput from "@/components/custome/form/HookFormInput";
import { Loader2 } from "lucide-react";
import HookFormFile from "@/components/custome/form/HookFormFile";
import { ADMIN_PROFILE_URL, SERVER_PATH } from "@/constants/paths";
import InputLabelSkeleton from "@/components/custome/skeletons/InputLabelSkeleton";
import LineSkeleton from "@/components/custome/skeletons/LineSkeleton";
import Breadcrumbs from "@/components/custome/Breadcrumbs";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AuthState } from '@/contexts/Global';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateAdmin = () => {

    const { loading, setLoading, auth } = useGlobalContext();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [admin, setAdmin] = useState<Admin | null>()
    const form = useProfileForm({});

    useEffect(() => {
        if (id === auth._id)
            navigate(ADMIN_PROFILE_URL)

        const getAdmin = async () => {
            try {
                setLoading(true);

                const response = await AxiosInstance.get('admin/protected/admins/' + id + "/get");
                form.reset({ name: response.data.name, email: response.data.email, current_password: '', new_password: '' });
                setAdmin(response.data);

            } catch (err: any) {
                toast.error(err.response?.data.message || err.message);

            } finally {
                setLoading(false);
            }
        };

        getAdmin();
    }, [])

    const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {

        try {

            form.clearErrors();

            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (Array.isArray(value) && value[0] !== undefined) {
                    formData.append(key, value[0]);
                } else if (value !== undefined) {
                    formData.append(key, value);
                }
            });

            const response = await AxiosInstance.put('admin/protected/admins/' + id + "/update", formData, {
                headers: {
                    Accept: 'multipart/formdata',
                },
            });

            setAdmin(response.data)
            toast.success("Profile Update Successful");
            form.reset({ name: response.data.name, email: response.data.email });
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

                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex items-center gap-4 mb-6">
                            <Avatar className="w-24 h-24 border">
                                <AvatarImage src={SERVER_PATH + admin?.image} />
                                <AvatarFallback className="text-xs">{admin?.name}</AvatarFallback>
                            </Avatar>
                            <div className="w-full flex items-center justify-between">
                                <div className="text-start">
                                    <h2 className="text-2xl font-bold">{admin?.name}</h2>
                                    <p className="text-sm text-muted-foreground">{admin?.email}</p>
                                </div>
                                <div className="">
                                    <HookFormFile name="image" placeholder="Change Avatar" className="bg-secondary p-3 rounded-md" />
                                </div>
                            </div>
                        </div>

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

                    </form>
                </FormProvider>
            </div>
        </>

    );
};

export default UpdateAdmin;

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


interface Admin {
    _id: string,
    name: string,
    email: string,
    image: string,
    verified: boolean
}