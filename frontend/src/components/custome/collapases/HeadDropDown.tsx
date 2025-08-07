import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../../ui/button"
import { Link } from "react-router-dom"
import type { LucideIcon } from "lucide-react"

export interface MenuItem {
    title: string
    link: string
    icon: LucideIcon
}

export interface MenusInterface {
    title: string
    routes: MenuItem[]
}

interface MenuDropdownProps {
    menu: MenusInterface
}

export const MenuDropdown = ({ menu }: MenuDropdownProps) => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="px-4 ring-0 outline-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none shadow-none"
                >
                    {menu.title}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="center"
                className="mt-5 hidden w-4xl left-0 lg:flex lg:flex-wrap gap-2 p-4 shadow-lg border z-50 mx-4"
            >
                {menu.routes.map((route, index) => (
                    <DropdownMenuItem
                        key={index}
                        className="w-[calc(25%-0.5rem)] rounded-md border hover:bg-muted transition-colors"
                        asChild
                    >
                        <Link to={route.link} className="flex align-center gap-3">
                            <route.icon />
                            {route.title}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MenuDropdown;