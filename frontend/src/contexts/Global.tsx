/*===========*****===========imports===========*****===========*/
import { createContext, useEffect, useReducer } from "react";
import type { ReactNode } from "react";
/*===========*****===========imports===========*****===========*/

/*===========*****===========Types===========*****===========*/
interface AuthState {
    [key: string]: any;
}

interface GlobalState {
    loading: boolean;
    theme: string;
    auth: AuthState;
}

interface GlobalContextType extends GlobalState {
    setTheme: (theme: "light" | "dark") => void;
    setLoading: (loading: boolean) => void;
    setAuth: (auth: AuthState) => void;
}

type ActionType =
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_THEME"; payload: "light" | "dark" }
    | { type: "SET_AUTH"; payload: AuthState };

interface GlobalContextProviderProps {
    children: ReactNode;
}
/*===========*****===========Types===========*****===========*/

/*===========*****===========Initial State===========*****===========*/
const initialStates: GlobalState = {
    loading: false,
    theme: localStorage.getItem("theme") || "light",
    auth: {},
};
/*===========*****===========Initial State===========*****===========*/

/*===========*****===========Reducer===========*****===========*/
const reducer = (state: GlobalState, action: ActionType): GlobalState => {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_THEME":
            return { ...state, theme: action.payload };
        case "SET_AUTH":
            return { ...state, auth: action.payload };
        default:
            throw new Error(`Unhandled action type: ${(action as any).type}`);
    }
};
/*===========*****===========Reducer===========*****===========*/


/*===========*****===========Create Context===========*****===========*/
const GlobalContext = createContext<GlobalContextType | null>(null);
/*===========*****===========Create Context===========*****===========*/

/*===========*****===========provider===========*****===========*/
const GlobalContextApi: React.FC<GlobalContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialStates);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark";
        if (storedTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const setTheme = (theme: "light" | "dark") => {
        localStorage.setItem("theme", theme);
        document.documentElement.classList.toggle("dark", theme === "dark");
        dispatch({ type: "SET_THEME", payload: theme });
    };

    const setLoading = (loading: boolean): void => {
        dispatch({ type: "SET_LOADING", payload: loading });
    };

    const setAuth = (auth: AuthState): void => {
        dispatch({ type: "SET_AUTH", payload: auth });
    };

    return (
        <GlobalContext.Provider
            value={{
                ...state,
                setTheme,
                setLoading,
                setAuth
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
/*===========*****===========provider===========*****===========*/

/*===========*****===========export===========*****===========*/
export { GlobalContext, GlobalContextApi };
export type { GlobalContextType, GlobalState, AuthState };