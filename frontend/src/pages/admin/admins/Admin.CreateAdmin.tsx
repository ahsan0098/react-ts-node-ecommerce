import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useGlobalContext from "@/hooks/UseContext";
import { FormProvider, type SubmitHandler } from "react-hook-form";
import { AxiosInstance } from "@/lib/axios.helper";
import HookFormInput from "@/components/custome/form/HookFormInput";
import { Loader2 } from "lucide-react";
import HookFormFile from "@/components/custome/form/HookFormFile";
import InputLabelSkeleton from "@/components/custome/skeletons/InputLabelSkeleton";
import LineSkeleton from "@/components/custome/skeletons/LineSkeleton";
import Breadcrumbs from "@/components/custome/Breadcrumbs";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import { ADMIN_ADMINS_URL } from "@/constants/paths";

const CreateAdmin = () => {

    const { loading, setLoading } = useGlobalContext();
    const navigate = useNavigate();

    const form = useProfileForm();

    const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {

        try {

            form.clearErrors();

            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (Array.isArray(value) && value[0] != undefined) {
                    formData.append(key, value[0]);
                } else if (value !== undefined) {
                    formData.append(key, value);
                }
            });

            const response = await AxiosInstance.post("/admin/protected/admins/create", formData, {
                headers: {
                    Accept: 'multipart/formdata',
                },
            });

            toast.success(response.data.message);
            navigate(ADMIN_ADMINS_URL);
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
            <Breadcrumbs pages={{ "Admins": ADMIN_ADMINS_URL, "Create New Site Admin": "#" }} />
            <div className="max-w-3xl mx-auto w-full py-10 px-4 space-y-8">

                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="">
                                <HookFormFile name="image" placeholder="Change Avatar" className="bg-secondary p-3 rounded-md" />
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



                            <div className="grid grid-cols-1 gap-6">
                                {
                                    loading ? <InputLabelSkeleton cols={1} />
                                        :
                                        <>
                                            <HookFormInput name="password" placeholder="you@example.com" type="password" />
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

export default CreateAdmin;

// Zod 
const profileSchema = z
    .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        image: z.any().optional()
    });

type ProfileFormData = z.infer<typeof profileSchema>;

const useProfileForm = () => {
    return useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        mode: "onBlur",
        defaultValues: { name: '', email: '', image: '', password: '' },
    });
};