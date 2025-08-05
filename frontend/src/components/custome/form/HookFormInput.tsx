import React from "react";
import { useFormContext } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type HookFormInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const HookFormInput: React.FC<HookFormInputProps> = (props) => {
    const form = useFormContext();

    if (!props.name) props.name = ""
    const hasError = !!form.formState.errors[props.name];

    return (
        <FormField
            control={form.control}
            name={props.name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor={props.name} className="capitalize">{props.name?.replace("_", " ")}</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                {...props}
                                {...field}
                                id={props.name}
                                className={`bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  focus:ring-0 focus:outline-none dark:text-white ${hasError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            />
                            {hasError && (
                                <AlertCircle className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500 pointer-events-none" />
                            )}
                        </div>
                    </FormControl>
                    <FormMessage className="mt-0 text-sm text-red-500" />
                </FormItem>
            )}
        />
    );
};

export default HookFormInput;
