"use client"
import Link from "next/link";
import { ReactNode } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
export default function Layout({ children }: { children: ReactNode }) {
     
    return (<main className="flex flex-col h-screen">
        <header className="bg-blue-950 h-16 text-white p-4 flex justify-between items-center">
            <div className="flex gap-2 items-center">
            <Link href="/" className="bg-black/10 p-2 rounded-lg text-sm"> <img className="w-8" src="./images/logo.png" /></Link>
                <div className="flex gap-2">
                    <Link href="/multas" className="bg-black/10 p-2 rounded-lg text-sm">Multas</Link>
                    <Link href="/alertas" className="bg-black/10 p-2 rounded-lg text-sm">Alertas de roubos</Link>
                </div>
            </div>
            <Link href="/auth/entrar"><Button variant={"ghost"} className="hover:bg-black/10 hover:text-muted"><LogOut /></Button></Link>
        </header>
        <div className="flex-1 overflow-y-auto">
            {children}
        </div>
    </main>)
}