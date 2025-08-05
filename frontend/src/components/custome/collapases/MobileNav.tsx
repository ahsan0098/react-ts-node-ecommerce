
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import React, { useState } from "react"
import type { MenusInterface } from "./HeadDropDown"

interface NavInterface {
    menuItems: MenusInterface[]
}

const MobileNavSheet: React.FC<NavInterface> = ({ menuItems }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <div className="overflow-y-auto max-h-full px-2 mt-4 space-y-4">
            {menuItems.map((menu, idx) => (
                <Collapsible
                    key={idx}
                    open={openIndex === idx}
                    onOpenChange={(isOpen) => setOpenIndex(isOpen ? idx : null)}
                >
                    <CollapsibleTrigger asChild>
                        <Button
                            variant="ghost"
                            className={`w-full justify-between text-left text-base font-medium p-5 ${openIndex === idx ? 'bg-gray-200' : ''}`}
                        >
                            {menu.title}
                            <span>{openIndex === idx ? "−" : "+"}</span>
                        </Button>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="space-y-2 border-2 rounded-md mx=2 border-t-0 p-3">
                        {menu.routes.map((route, index) => (
                            <Link
                                key={index}
                                to={route.link}
                                className="block text-muted-foreground hover:text-foreground"
                            >
                                {route.title}
                            </Link>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            ))}

            <Button type="button" className="w-full mt-6">
                Login
            </Button>
        </div>
    )
}

export default MobileNavSheet