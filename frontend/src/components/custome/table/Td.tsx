import type { ReactNode, TableHTMLAttributes } from "react"

interface TdProps extends TableHTMLAttributes<HTMLTableDataCellElement> {
    children: ReactNode
}
const Td = ({ children }: TdProps) => {
    return (
        <td scope="col" className="px-6 py-3 text-gray-900">
            {children}
        </td>
    )
}

export default Td