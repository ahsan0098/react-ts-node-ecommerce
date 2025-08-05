import React from "react";
import { useFormContext } from "react-hook-form";
import { AlertCircle, X } from "lucide-react";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type HookFormFile = React.InputHTMLAttributes<HTMLInputElement>;

const HookFormFile: React.FC<HookFormFile> = (props) => {
    const form = useFormContext();
    const name = props.name || "image";
    const hasError = !!form.formState.errors[name];
    const files = form.watch(name) as File[] || [];
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <div className="relative flex flex-col gap-2 w-100 items-end">
                        {
                            files.length <= 0 ?
                                <FormLabel
                                    htmlFor={name}
                                    className={`max-w-48 cursor-pointer  ${props.className} capitalize 
                                ${hasError ? "border-red-500 focus-visible:ring-red-500" : ""}`
                                    }>
                                    {props.placeholder}
                                </FormLabel>
                                :
                                files.map((fl: File, i: number) => (

                                    <div
                                        key={i}
                                        className="border-1 px-0 rounded-md flex items-center justify-between"
                                    >
                                        <small className="text-sm ms-2">{fl.name}</small>
                                        <Button
                                            type="button"
                                            className="text-red-600 bg-transparent p-0"
                                            onClick={() =>
                                                form.setValue(
                                                    name,
                                                    form.watch(name).filter((_: File, ind: number) => i !== ind)
                                                )
                                            }
                                        >
                                            <X className="size-5 p-0" />
                                        </Button>
                                    </div>
                                ))
                        }
                        {hasError && (
                            <AlertCircle className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500 pointer-events-none" />
                        )}
                    </div>

                    <FormControl>
                        <Input
                            id={name}
                            type="file"
                            hidden
                            multiple={props.multiple}
                            onChange={(e) => {
                                form.setValue(name, Array.from(e.target.files || []), { shouldValidate: true });
                            }}
                            ref={field.ref}
                            name={field.name}
                        />
                    </FormControl>

                    <FormMessage className="mt-0 text-sm text-red-500" />
                </FormItem>

            )}
        />
    );
};

export default HookFormFile;
