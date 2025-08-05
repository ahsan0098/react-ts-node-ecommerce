import type { ReactNode } from "react"

interface ActionButton { children: ReactNode, color: string, callback: CallableFunction }
const ActionButton = ({ children, color = 'bg-red-100 text-red-700', callback }: ActionButton) => {
    return (
        <button type='button' onClick={() => callback} className={`p-2 text-xs font-normal rounded-full flex items-center justify-center w-8 h-8 ${color}`}>
            {children}
        </button>

    )
}

export default ActionButton