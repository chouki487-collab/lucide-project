import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
    user: any; // Replace 'any' with the appropriate user type
    login: (user: any) => void; // Replace 'any' with the appropriate user type
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>(null); // Replace 'any' with the appropriate user type

    const login = (user: any) => { setUser(user); }; // Replace 'any' with the appropriate user type
    const logout = () => { setUser(null); };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

