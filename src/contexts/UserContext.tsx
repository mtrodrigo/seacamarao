import { createContext } from "react";
import useAuth from "../hooks/useAuth";

interface UserContextProps {
    authenticated: boolean;
    isAdmin: boolean
    login: (user: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    loading: boolean;
}
export interface ChildrenProps {
    children: React.ReactNode;
}


const Context = createContext({} as UserContextProps)

const UserProvider: React.FC<ChildrenProps> = ({ children }: ChildrenProps) => {
    const { authenticated, isAdmin, login, logout, loading } = useAuth();

    return (
        <Context.Provider value={{ authenticated, isAdmin, login, logout, loading }}>
            {children}
        </Context.Provider>
    );
};

export {Context, UserProvider}