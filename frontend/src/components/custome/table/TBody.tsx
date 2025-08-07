import type { ReactNode } from "react"

interface TBodyInterface { children: ReactNode }

const TBody: React.FC<TBodyInterface> = ({ children }) => {
  return (
    <tbody className="border-0">
      {children}
    </tbody>
  )
}

export default TBody