
import MaxWidthWrapperNavbar from "@/components/custome/MaxWidthWrapperNavbar";
import Hero from "@/components/custome/sections/Hero";
import FeaturedProducts from "./FeaturedProducts";


const Home = () => {

    return (

        <MaxWidthWrapperNavbar className="flex flex-col justify-center items-center gap-5 px-4 md:px-8 lg:px-12 " >
            <Hero />
            {/* <Menus /> */}
            <FeaturedProducts />
        </MaxWidthWrapperNavbar>
    )
}

export default Home