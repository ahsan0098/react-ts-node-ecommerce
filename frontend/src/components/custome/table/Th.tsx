import type { ReactNode } from "react"

interface Th { children: ReactNode }
const Th = ({ children }:Th) => {
    return (
        <th scope="col" className="px-6 py-3">
            {children}
        </th>
    )
}

export default Th