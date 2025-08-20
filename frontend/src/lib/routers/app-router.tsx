import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Home from "@/pages/visitors/home/Home";

import { HOME_URL } from "@/constants/paths";
import { AdminRoutes } from "./admin-router";
import Header from "@/components/custome/sections/Header";
import Footer from "@/components/custome/sections/Footer";
import ApolloAppProvider from "@/contexts/Apollo";


const VisitorsLayout = () => {
    return (
        <>
            <ApolloAppProvider>
                <Header />
                <Outlet />
                <Footer />
            </ApolloAppProvider>
        </>

    );
};

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