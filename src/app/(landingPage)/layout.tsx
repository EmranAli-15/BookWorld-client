import ChatWidget from "@/components/chat/ChatWidget";
import Navbar from "@/components/shared/navbar/Navbar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
            <ChatWidget></ChatWidget>
        </div>
    );
};

export default Layout;