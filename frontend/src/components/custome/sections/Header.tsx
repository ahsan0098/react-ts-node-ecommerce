import { HOME_URL, USER_PROFILE_URL } from '@/constants/paths'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu, Moon } from 'lucide-react'
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import MaxWidthWrapperNavbar from './../MaxWidthWrapperNavbar'
import { Button } from '@/components/ui/button'

const Header = () => {
    return (
        <MaxWidthWrapperNavbar className="flex flex-col gap-3 sticky top-0 z-50 bg-transparent">
            <nav className="mt-5 h-20 flex items-center justify-between px-6 border-3 rounded-xl bg-background">
                <div className='flex items-center justify-between gap-2 md:gap-16'>
                    <Link to={HOME_URL}>
                        <Avatar className='rounded-sm h-12 w-24'>
                            <AvatarImage src="https://github.com/shadcn.png" className="w-24" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </Link>

                    <div className="hidden lg:flex items-center gap-x-2">
                        <Link to={HOME_URL}>
                            <Button variant="ghost" className="text-sm font-semibold bg-background border-0">
                                Home
                            </Button>
                        </Link>

                        <Link to={USER_PROFILE_URL}>
                            <Button variant="ghost" className="text-sm font-semibold bg-transparent border-0">
                                Profile
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-4">

                    <div className="flex md:hidden bg-transparent p-3 rounded h-10 border-3 text-main-foreground border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none">
                        <Sheet >

                            <SheetTrigger className="flex items-center">
                                <Menu />
                            </SheetTrigger>

                            <SheetContent className="w-full h-screen">
                                <SheetHeader>
                                    <SheetTitle>Edit profile</SheetTitle>
                                </SheetHeader>
                                <div className="flex-1 overflow-y-auto max-h-full grid auto-rows-min gap-6 px-4">
                                    {Array(10).fill(0).map((_, i) => (
                                        <div key={i} className="grid gap-1 hover:border-3 rounded p-3 border">
                                            <Label>Name {i + 1}</Label>
                                        </div>
                                    ))}

                                    <Button type="button" className='w-full mb-5'>Login</Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>


                    <Button className='bg-transparent p-2 h-10 border-3'>
                        <Moon />
                    </Button>

                    <Button className='bg-transparent p-2 h-10 border-3'>
                        <Bell />
                    </Button>

                    <Button className='hidden md:flex font-bold py-2 h-10 border-3'>
                        SignIn
                    </Button>


                    <Avatar className='size-16'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </nav>

        </MaxWidthWrapperNavbar>
    )
}

export default Header