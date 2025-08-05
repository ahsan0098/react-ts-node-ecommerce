import { Card, CardContent } from '@/components/ui/card'
import type { LucideIcon } from 'lucide-react'
import React from 'react'

interface StatCard {
    title: string;
    text: React.ReactNode;
    icon?: LucideIcon;
}

const StatCard: React.FC<StatCard> = ({ title, text, icon: Icon }) => {
    return (
        <Card className="pt-0 w-full">
            <CardContent className="pt-6">
                <div className="flex flex-col">
                    <p className="flex items-center justify-between text-muted-foreground text-xs tracking-wide uppercase">
                        <span>{title}</span>
                        {Icon && <Icon className="w-4 h-4" />}
                    </p>
                    <div className="mt-1 flex items-center gap-x-2">
                        <h3 className="text-xl font-medium sm:text-2xl">{text}</h3>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StatCard