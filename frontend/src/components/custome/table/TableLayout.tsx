import { type TableHTMLAttributes, type ReactNode } from 'react'

interface TableLayoutProps extends TableHTMLAttributes<HTMLTableElement> {
    children: ReactNode
}

const TableLayout = ({ children, className = '', ...rest }: TableLayoutProps) => {
    return (
        <table
            className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ${className}`}
            {...rest}
        >
            {children}
        </table>
    )
}

export default TableLayout
