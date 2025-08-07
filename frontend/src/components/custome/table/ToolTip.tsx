import type { ReactNode } from "react"

interface ToolTip { children: ReactNode, text: string }

const ToolTip = ({ children, text }: ToolTip) => {
    return (
        <div className="relative group inline-block">
            {children}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out bg-slate-900 text-white dark:bg-white dark:text-black rounded px-3 py-1 shadow-lg w-max text-nowrap">
                <small>{text}</small>
            </div>
        </div>
    );
};

export default ToolTip;
