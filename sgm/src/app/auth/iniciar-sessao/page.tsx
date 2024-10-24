'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";


import { useState } from "react";


export default function SignIn() {
    const [onLoading, setOnload] = useState(false)
    const router = useRouter()

    function handleClick() {
        setOnload((state) => !state)
        router.replace("/")
    }
    return (
        <div className="max-w-72 flex-col  m-auto mt-20 flex items-center justify-center p-4 py-8 ">
            <div className="flex flex-col items-center mb-5">
                <img src="../images/logo.png" className="w-10" />
                <small className="text-zinc-500 font-light">Sistema integrado de gestao de multas</small>
            </div>
            <h1 className="text-lg font-semibold text-zinc-700">Iniciar sessão</h1>
            <div className="flex flex-col w-full mt-4">
                <form action="" className="flex items-center flex-col gap-4 w-full" >
                    <div className="w-full flex flex-col gap-2">
                        <Input placeholder="Bi" type="text" />
                        <Input placeholder="Password" type="password" />
                    </div>
                    <div className="w-full">
                        <Button onClick={handleClick} className="w-full" type="button" >{onLoading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}Iniciar sessão</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}