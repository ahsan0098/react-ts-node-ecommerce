/*===========*****===========imports===========*****===========*/
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react"
import useGlobalContext from "@/hooks/UseContext";
import { AxiosInstance } from "@/lib/axios.helper";
/*===========*****===========imports===========*****===========*/

/*===========*****===========types===========*****===========*/
interface AuthenticatedProps {
    guard: string
    children: ReactNode
}
/*===========*****===========types===========*****===========*/

/*===========*****===========authenticate===========*****===========*/
const Authenticated: React.FC<AuthenticatedProps> = ({ guard, children }) => {
    const { auth, setAuth } = useGlobalContext();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(auth).length > 0) { setLoading(false); return; }

        const verifyAuth = async () => {
            setLoading(true);

            try {
                const response = await AxiosInstance.get(`/${guard}/auth/check`);
                setAuth(response.data);
            } catch (error) {
                navigate(`/${guard}/login`);
            } finally {
                setLoading(false);
            }
        };

        verifyAuth();

    }, []);

    return loading ? (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="size-20 animate-spin" />
        </div>
    ) : <>{children}</>;
};
/*===========*****===========authenticate===========*****===========*/

/*===========*****===========export===========*****===========*/
export default Authenticated;