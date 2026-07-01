import ChatWidget from "@/components/chat/ChatWidget";
import Navbar from "@/components/shared/navbar/Navbar";
import { ReactNode } from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";

// Configure the font object
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Ensures text is visible during loading
});

export const metadata: Metadata = {
  title: "Book World",
  description: "Book World website provides you all available books in best price in Bangladesh.",
};

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className={inter.className}>
            <Navbar></Navbar>
            {children}
            <ChatWidget></ChatWidget>
        </div>
    );
};

export default Layout;