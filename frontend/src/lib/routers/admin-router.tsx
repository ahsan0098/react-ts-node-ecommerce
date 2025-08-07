import { Outlet } from "react-router-dom";
import Login from "@/pages/admin/auth/Admin.Login";
import { ADMIN_ADD_ADMIN_URL, ADMIN_ADMINS_URL, ADMIN_DASHBOARD_URL, ADMIN_LOGIN_URL, ADMIN_PROFILE_URL, ADMIN_SIGNUP_URL, ADMIN_UPDATE_ADMIN_URL, ADMIN_URL } from "@/constants/paths";
import Dashboard from "@/pages/admin/dashboard/Admin.Dashboard";
import Profile from "@/pages/admin/profile/Admin.Profile";
import Authenticated from "@/helpers/auth.helper";
import AdminLayout from "@/components/custome/sections/AdminLayout";
import Guest from "@/helpers/guest.helper";
import AllAdmins from "@/pages/admin/admins/Admin.AllAdmins";
import CreateAdmin from "@/pages/admin/admins/Admin.CreateAdmin";
import UpdateAdmin from "@/pages/admin/admins/Admin.UpdateAdmin";



const AuthenticatedLayout = () => (
    <Authenticated guard="admin">
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    </Authenticated>
);

const GuestLayout = () => (
    <Guest guard="admin">
        <Outlet />
    </Guest>
);

export const AdminRoutes = [

    {
        path: ADMIN_URL,
        element: <GuestLayout />,
        children: [
            {
                path: ADMIN_LOGIN_URL,
                element: <Login />,
            },
        ],
    },
    {
        path: ADMIN_URL,
        element: <AuthenticatedLayout />,
        children: [
            {
                path: ADMIN_DASHBOARD_URL,
                element: <Dashboard />,
            },
            {
                path: ADMIN_PROFILE_URL,
                element: <Profile />,
            },

            {
                path: ADMIN_ADMINS_URL,
                element: <AllAdmins />,
            },

            {
                path: ADMIN_ADD_ADMIN_URL,
                element: <CreateAdmin />,
            },

            {
                path: ADMIN_UPDATE_ADMIN_URL,
                element: <UpdateAdmin />,
            },
        ],
    },

];
