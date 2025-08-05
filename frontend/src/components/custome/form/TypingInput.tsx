import { useRef } from "react";
import type { InputHTMLAttributes } from "react";

// Types
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    callback: (name: string, value: string) => void;
}

export const Input: React.FC<InputProps> = ({ callback, ...rest }) => {
    const timer = useRef<NodeJS.Timeout | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            callback(e.target.name, e.target.value);
        }, 300);
    };

    return (
        <input
            {...rest}
            className="input input-bordered w-full pl-10 py-5"
            onChange={handleChange}
        />
    );
};