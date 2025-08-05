/*===========*****===========imports===========*****===========*/
import { GlobalContext, type GlobalContextType } from "@/contexts/Global";
import { useContext } from "react";
/*===========*****===========imports===========*****===========*/

/*===========*****===========return context===========*****===========*/
const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalContextApi provider');
    }

    return context;
};
/*===========*****===========return context===========*****===========*/

/*===========*****===========export===========*****===========*/
export default useGlobalContext;