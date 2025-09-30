"use client"

import { createContext, useState } from "react";

export const UserContext = createContext<null | any>(null);




export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<null | any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    

    return (
        <UserContext value={{ name: 'emran' }}>
            {children}
        </UserContext>
    )

};