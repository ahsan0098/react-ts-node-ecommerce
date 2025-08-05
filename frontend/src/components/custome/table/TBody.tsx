import type { ReactNode } from "react"

interface TBodyInterface { children: ReactNode }

const TBody: React.FC<TBodyInterface> =({ children }) => {
  return (
    <tbody>
      {children}
    </tbody>
  )
}

export default TBody