import React from "react";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
    return (
        <section
            className="relative my-5 w-full min-h-[500px] flex items-center justify-center">
            <div className="relative z-10 text-center max-w-2xl space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                    Everything You Desire
                </h1>


                <div className="relative w-full">
                    <Input
                        className="w-full p-6 pe-14 bg-transparent rounded-full border-3 pr-10"
                        type="email"
                        placeholder="Type and find your best product"
                    />
                    <Button variant="ghost"
                        className="absolute top-1/2 right-0 -translate-y-1/2 rounded-none rounded-r-full border-0 border-l-3 h-full"
                    >
                        <Search className="size-6"/>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
