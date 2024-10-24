"use client"
    
import useAuthentication from "@/app/hooks/useAuthtication";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertTriangle, LucideNotebook, Notebook, NotebookIcon, NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
    const router = useRouter();
    const { verifyToken } = useAuthentication();
    useEffect(() => {
        verifyToken();
      }, []);

    return (
        <div className="px-8">
            <div className="my-4">
                <Input placeholder="Procurar..." />
            </div>
            <div className="grid grid-cols-3 gap-4 itens-center">
                <Card className=" items-center justify-center pb-2">
                    <CardHeader>
                        <CardTitle className="flex flex-col text-sm md:text-2xl text-center gap-1 items-center justify-center"><Notebook />Multa Diária</CardTitle>
                    </CardHeader>
                    <CardDescription className="text-center text-2xl font-bold">
                        <span>20</span>
                    </CardDescription>
                </Card>
                <Card className=" items-center justify-center pb-2">
                    <CardHeader>
                        <CardTitle className="flex flex-col text-sm md:text-2xl text-center gap-1 items-center justify-center"><AlertTriangle />Alertas de Roubos</CardTitle>
                    </CardHeader>
                    <CardDescription className="text-center text-2xl font-bold">
                        <span>04</span>
                    </CardDescription>
                </Card>
                <Card className=" items-center justify-center pb-2">
                    <CardHeader>
                        <CardTitle className="flex flex-col text-sm md:text-2xl gap-1 items-center justify-center text-center"><NotebookPen />Total de multas</CardTitle>
                    </CardHeader>
                    <CardDescription className="text-center text-2xl font-bold">
                        <span>220</span>
                    </CardDescription>
                </Card>
            </div>

            <div className="grid grid-cols-3 mt-8  items-end" >
                <div className="flex items-center justify-center"><img className="w-24" src="./images/logo.png"/></div>
                <div className="flex items-center justify-center"><img className="w-24" src="./images/logo.png"/></div>
                <div className="flex items-center justify-center"><img className="w-24" src="./images/logo.png"/></div>
            </div>
        </div>
    )
}