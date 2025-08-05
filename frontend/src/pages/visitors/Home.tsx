
import MaxWidthWrapperNavbar from "@/components/custome/MaxWidthWrapperNavbar";
import Menus from "@/components/custome/Menus";
import Hero from "@/components/custome/sections/Hero";


const Home = () => {
    
    return (

        <MaxWidthWrapperNavbar className="flex flex-col justify-center items-center gap-5 px-4 md:px-8 lg:px-12 " >
            <Hero />
            <Menus />
        </MaxWidthWrapperNavbar>
    )
}

export default Home