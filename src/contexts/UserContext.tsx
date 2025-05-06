import { createContext } from "react";
import useAuth from "../hooks/useAuth";

interface UserContextProps {
    authenticated: boolean;
    login: (user: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}
export interface ChildrenProps {
    children: React.ReactNode;
}


const Context = createContext({} as UserContextProps)

const UserProvider: React.FC<ChildrenProps> = ({ children }: ChildrenProps) => {
    const { authenticated, login, logout, loading } = useAuth() as UserContextProps;

    return (
        <Context.Provider value={{ authenticated, login, logout, loading }}>
            {children}
        </Context.Provider>
    );
};

export {Context, UserProvider}