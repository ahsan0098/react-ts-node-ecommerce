import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ActionLink { children: ReactNode, color: string, link: string }
const ActionLink = ({ children, link, color = 'bg-green-100 text-green-700' }: ActionLink) => {
    return (
        <Link to={link} className={`p-2 font-normal rounded-full flex items-center justify-center w-8 h-8 ${color}`}>
            {children}
        </Link>
    )
}

export default ActionLink