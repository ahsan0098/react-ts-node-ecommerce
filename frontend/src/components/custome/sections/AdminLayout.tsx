import { HOME_URL, ADMIN_PROFILE_URL, ADMIN_SETTINGS_URL, ADMIN_LOGIN_URL, SERVER_PATH } from '@/constants/paths'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Bell, Menu, Moon, Square, Sun } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import MaxWidthWrapperNavbar from '../MaxWidthWrapperNavbar'
import type { ReactNode } from 'react'
import HeadDropDown, { type MenusInterface } from '../collapases/HeadDropDown'
import MobileNavSheet from '../collapases/MobileNav'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AxiosInstance } from '@/lib/axios.helper'
import { toast } from 'sonner'
import useGlobalContext from '@/hooks/UseContext'

const menus: MenusInterface[] = [
    {
        title: "Site Management",
        routes: [
            { icon: Square, title: "Settings", link: ADMIN_SETTINGS_URL },
            { icon: Square, title: "Admins Management", link: ADMIN_SETTINGS_URL },
            { icon: Square, title: "Clients", link: ADMIN_SETTINGS_URL },
            { icon: Square, title: "Some", link: ADMIN_SETTINGS_URL },
        ],
    },
    {
        title: "Product",
        routes: [
            { icon: Square, title: "Products Management", link: ADMIN_SETTINGS_URL },
            { icon: Square, title: "Categories Management", link: ADMIN_SETTINGS_URL },
            { icon: Square, title: "Clients", link: ADMIN_SETTINGS_URL },
            { icon: Square, title: "Some", link: ADMIN_SETTINGS_URL },
        ],
    },
    // ...more
];
interface AdminLayout {
    children: ReactNode
}
const AdminLayout: React.FC<AdminLayout> = ({ children }) => {

    const { auth, setTheme, theme } = useGlobalContext();

    const navigate = useNavigate();
    const Logout = async () => {
        try {
            const response = await AxiosInstance.get("/admin/auth/logout");
            navigate(ADMIN_LOGIN_URL)
            toast.success(response.data?.message);
        } catch (err: any) {
            toast.error(err.response?.data.message);
        }
    }
    return (

        <MaxWidthWrapperNavbar className="flex flex-col gap-3 bg-background">
            <nav className="h-20 mt-2 flex items-center justify-between px-6 
                border-3 rounded-xl
                backdrop-blur-md backdrop-saturate-150 
                bg-white/70 dark:bg-gray-900/70 
            ">
                <div className='flex items-center justify-between gap-2 md:gap-16'>
                    <Link to={HOME_URL}>
                        <Avatar className='rounded-sm h-12 w-24'>
                            <AvatarImage src="" className="w-24" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </Link>

                    <div className="hidden lg:flex items-center gap-x-2">
                        {
                            menus.map((mn) => <HeadDropDown key={mn.title} menu={mn} />)
                        }


                    </div>
                </div>
                <div className="flex items-center justify-between gap-4">

                    <div className="">
                        <Sheet>
                            <SheetTrigger className="m-0" asChild>
                                <Button className='bg-transparent p-2 h-10 border-3'>
                                    <Menu />
                                </Button>
                            </SheetTrigger>

                            <SheetContent className="w-full h-screen">
                                <SheetHeader>
                                    <SheetTitle className="text-lg">Navigation</SheetTitle>
                                </SheetHeader>

                                <MobileNavSheet menuItems={menus} />
                            </SheetContent>
                        </Sheet>
                    </div>


                    <Button onClick={() => setTheme(theme == "dark" ? "light" : "dark")} className='bg-transparent p-2 h-10 border-3'>
                        {theme == "dark" ? <Sun /> : <Moon />}
                    </Button>

                    <Button className='bg-transparent p-2 h-10 border-3'>
                        <Bell />
                    </Button>

                    <Button className='hidden md:flex font-bold py-2 h-10 border-3 capitalize'>
                        {auth.name}
                    </Button>

                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>

                            <Avatar className='size-16'>
                                <AvatarImage src={SERVER_PATH + auth.image} alt={auth.name} />
                                <AvatarFallback>{auth.name}</AvatarFallback>
                            </Avatar>

                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="center"
                            className="mt-3 right-10 bg-background w-[120px] border rounded-md z-50"
                        >
                            <Button variant="ghost" asChild>
                                <Link className='w-full' to={ADMIN_PROFILE_URL}>Profile</Link>
                            </Button>
                            <hr />
                            <Button onClick={Logout} variant="destructive" className='w-full rounded-none'>
                                Logout
                            </Button>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </nav>

            <div className="2xl:max-w-[1400px] px-4 md:px-8 lg:px-12">
                {children}
            </div>

            <footer className="backdrop-blur-md backdrop-saturate-150 
                bg-white/70 dark:bg-gray-900/70 
             border-3 rounded-lg p-5 space-y-10">
                <div className="flex items-start max-md:flex-col gap-5">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 md:gap-10">
                        {menus.map((section, index) => (
                            <div key={index} className="max-w-full space-y-2">
                                <h3 className="font-semibold text-lg">{section.title}</h3>
                                <ul className="space-y-1">
                                    {section.routes.map((link, linkIndex) => (
                                        <li
                                            key={linkIndex}
                                            className="hover:underline cursor-pointer"
                                        >
                                            <Link to={link.link}>{link.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="h-0.5 w-full bg-muted-foreground border-y-2" />

                <p className="text-center text-muted-foreground pb-5 max-sm:text-xs mb-0">
                    Copyright © 2025 ECom Store.
                </p>
            </footer>
        </MaxWidthWrapperNavbar>

    )
}

export default AdminLayout