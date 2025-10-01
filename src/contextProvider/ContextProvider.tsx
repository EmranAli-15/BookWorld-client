"use client"
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext<null | any>(null);




export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<null | any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        } else {
            setUser(null);
        }
        setLoading(false);
    }, [loading]);

    const value = {
        user,
        setUser,
        loading,
        setLoading
    }

    return (
        <UserContext value={value}>
            {children}
        </UserContext>
    )

};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("The component not inside the context provider");
    };
    return context;
};