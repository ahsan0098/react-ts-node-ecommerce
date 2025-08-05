import type { ReactNode, TableHTMLAttributes } from "react"

interface Tr extends TableHTMLAttributes<HTMLTableRowElement> { children: ReactNode }

const Tr = ({ children, className = '', ...rest }: Tr) => {
    return (
        <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 ${className}`} {...rest}>
            {children}
        </tr>
    )
}

export default Tr