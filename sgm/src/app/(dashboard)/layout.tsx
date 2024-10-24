"use client"
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode, useState } from "react";

export default function LayoutDashboard({ children }: { children: ReactNode }) {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true)
    function toogleSideBar() {
        setIsSideBarOpen((state) => !state)
    }

    return (
        <div className="bg-zinc-100 flex items-start">
            <Sidebar isSideBarOpen={isSideBarOpen} />
            <main className="w-full">
                <Header toogleSideBar={toogleSideBar} />
                {children}
            </main>
            <Toaster/>
        </div>
    )
}