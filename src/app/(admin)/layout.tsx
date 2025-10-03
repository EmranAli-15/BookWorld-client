import Navbar from "@/components/shared/navbar/Navbar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
        </div>
    );
};

export default Layout;