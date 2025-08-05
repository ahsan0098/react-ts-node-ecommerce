import type { ReactNode } from "react"

interface THead { children: ReactNode }

const THead = ({ children }: THead) => {
    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {children}
            </tr>
        </thead>
    )
}

export default THead