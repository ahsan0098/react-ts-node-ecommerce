import useGlobalContext from '@/hooks/UseContext';
import { AxiosInstance } from '@/lib/axios.helper';
import { Loader } from 'lucide-react';
import React, { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface GuestProps {
    guard: string
    children: ReactNode
}

const Guest: React.FC<GuestProps> = ({ guard, children }) => {
    const { loading, setLoading } = useGlobalContext();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAuth = async () => {
            setLoading(true);
            try {
                await AxiosInstance.get(`/${guard}/auth/check`);
                navigate(`/${guard}/dashboard`);
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
            <Loader className="size-10 animate-spin" />
        </div>
    ) : <>{children}</>;
};


export default Guest;
