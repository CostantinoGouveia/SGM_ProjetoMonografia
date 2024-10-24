// "use client"
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { BadgeInfo } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { FormEvent } from "react";

// export default function SignInPage() {
//     const router = useRouter()
//     function handle_click(e: FormEvent) {
//         e.preventDefault()
//         router.replace("http://localhost:3333/")
//     }
//     return (
//         <div className="flex flex-col w-96  m-auto mt-10 gap-3">
//             <div className="flex flex-col gap-2">
//                <h1 className="h3 flex gap-1 font-bold text-blue-600">SGM - AGENTE <BadgeInfo /> </h1>
//                 <h1 className="text-2xl font-medium">Insira suas credencias para entrar na plataforma</h1>
//             </div>
//            <form className="flex flex-col px-8 gap-6 bg-slate-300/30 p-20 rounded-lg ">
//                 <div className="flex flex-col  gap-2">
//                     <Input placeholder="BI ou Nº de agente"/>
//                     <Input placeholder="Palavra-passe"/>      
//                 </div>
//                 <Button onClick={handle_click} className="w-full">Iniciar sessão</Button>
//             </form>
//         </div>
//     )
// }

"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, saveLocalStorageToken, saveLocalStorageUser } from "@/routes";
import { BadgeInfo } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

export default function SignInPage() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [user, setUser] = useState<any>(null)
    async function handle_click(e: FormEvent) {
        e.preventDefault()
        const dados = await login(email, senha)
        console.log(dados)
        if (dados.error) {
            toast.error("Credenciais inválidas")
        } else {
            Cookies.set('token', dados.token, { expires: 1 }); // expira em 1 dia
            toast.success("Bem vindo")
            saveLocalStorageToken(dados.token)
            saveLocalStorageUser(String(dados.newUser.codPessoa))
            
            router.replace("/")
        }
    }
    return (
        <div className="flex flex-col w-96  m-auto mt-10 gap-3">
            <div className="flex flex-col gap-2">
                <h1 className="h3 flex gap-1 font-bold text-blue-600">SGM - AGENTE <BadgeInfo /> </h1>
                <h1 className="text-2xl font-medium">Insira suas credencias para entrar na plataforma</h1>
            </div>
            <form className="flex flex-col px-8 gap-6 bg-slate-300/30 p-20 rounded-lg ">
                <div className="flex flex-col  gap-2">
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="BI ou Nº da carta" />
                    <Input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" placeholder="Palavra-passe" />
                </div>
                <Button onClick={handle_click} className="w-full">Iniciar sessão</Button>
            </form>
        </div>
    )
}