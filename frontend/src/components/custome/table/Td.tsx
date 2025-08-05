import type { ReactNode } from "react"

interface Td { children: ReactNode }
const Td = ({ children }: Td) => {
    return (
        <td scope="col" className="px-6 py-3">
            {children}
        </td>
    )
}

export default Td