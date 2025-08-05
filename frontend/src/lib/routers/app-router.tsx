import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Home from "@/pages/visitors/Home";

import { HOME_URL } from "@/constants/paths";
import {AdminRoutes} from "./admin-router";
import Header from "@/components/custome/sections/Header";
import Footer from "@/components/custome/sections/Footer";


const VisitorsLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>

    );
};;

const AppRouter = createBrowserRouter([

    {
        path: HOME_URL,
        element: <VisitorsLayout />,
        children: [
            {
                path: "",
                element: <Home />
            }
        ]
    },

    ...AdminRoutes 

]);

export default AppRouter;