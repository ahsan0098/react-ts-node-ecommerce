import React from "react";
import MaxWidthWrapperNavbar from "./../MaxWidthWrapperNavbar";
import { FacebookIcon, LinkedinIcon, Locate, Mail, Phone, TwitchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
    {
        name: "hello@lyceecomtefoix.ad",
        logo: Mail,
    },
    {
        name: "+376 123 456",
        logo: Phone,
    },
    {
        name: "Andorre-la-Vieille, Principauté d’Andorre",
        logo: Locate,
    },
];

const footerLinks = [
    {
        title: "Accueil",
        links: ["Nos Avantages", "Nos Témoignages", "FAQ"],
    },
    {
        title: "À propos de nous",
        links: [
            "Notre mission",
            "Notre vision",
            "Récompenses et distinctions",
            "Histoire",
            "Enseignants",
        ],
    },
    {
        title: "L’établissement",
        links: ["Caractéristiques spécifiques", "Galerie"],
    },
    {
        title: "Contactez-nous",
        links: ["Informations", "Plan et itinéraire"],
    },
];

const links_social = [
    {
        name: "facebook",
        logo: FacebookIcon,
    },
    {
        name: "twitter",
        logo: TwitchIcon,
    },
    {
        name: "linkedin",
        logo: LinkedinIcon,
    },
];

const conditions = [
    "Privacy Policy",
    "Terms And Conditions",
    "Cookies Policy",
];
const Footer: React.FC = () => {
    return (
        <MaxWidthWrapperNavbar className="mt-32 flex flex-col gap-3 backdrop-blur-md backdrop-saturate-150 
                bg-white/70 dark:bg-gray-900/70 dark:border-gray-300">
            <div className="border-3 rounded-lg p-5 space-y-10">
                <div className="flex items-start max-md:flex-col gap-5">
                    <div className="space-y-5">
                        <div className="flex items-center gap-2">
                            <img
                                src="https://i.postimg.cc/fLbKgQgG/Logo.webp"
                                alt="logo"
                                className="h-12 w-12"
                            />
                            <p className="max-sm:text-xs font-bold">LYCÉE COMTE DE FOIX</p>
                        </div>
                        <p className="max-w-96 text-muted-foreground text-start">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque natus ipsum eligendi, rem unde deserunt quasi optio accusantium tempore architecto dolorum placeat sint cupiditate ipsam blanditiis magni nihil iusto? Voluptates!
                        </p>
                        <div className="flex flex-col gap-3">
                            {links.map((link, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="border-2 p-2 rounded-lg bg-blue-300">
                                        <link.logo size={18} />
                                    </div>
                                    <p>{link.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10">
                        {footerLinks.map((section, index) => (
                            <div key={index} className="max-w-full space-y-2">
                                <h3 className="font-semibold text-lg">{section.title}</h3>
                                <ul className="space-y-1">
                                    {section.links.map((link, linkIndex) => (
                                        <li
                                            key={linkIndex}
                                            className="hover:underline cursor-pointer"
                                        >
                                            {link}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="h-0.5 w-full bg-muted-foreground border-y-2" />
                <div className="flex items-center justify-between max-md:flex-col gap-5">
                    <div className="flex items-center gap-5 max-sm:flex-col max-sm:text-xs">
                        {conditions.map((condition, index) => (
                            <p key={index} className="hover:underline cursor-pointer">
                                {condition}
                            </p>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        {links_social.map((link, index) => (
                            <Button key={index} size="icon">
                                <link.logo size={18} />
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="h-0.5 w-full bg-muted-foreground border-y-2" />

                <div className="h-0.5 w-full bg-muted-foreground" />
                <p className="text-center text-muted-foreground pb-5 max-sm:text-xs mb-0">
                    Copyright © 2025 ECom Store.
                </p>
            </div>
        </MaxWidthWrapperNavbar>
    );
};

export default Footer;
