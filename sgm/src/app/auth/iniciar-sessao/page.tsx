'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, saveLocalStorageToken, saveLocalStorageUser } from "@/routes";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { toast } from "react-toastify";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";


export default function SignIn() {
    const [onLoading, setOnload] = useState(false)
    const router = useRouter()


    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [dec, setDec] = useState("")
    const [place, setPlace] = useState("")
    const [user, setUser] = useState<any>(null)
    useEffect(() => {
        if (dec === "1") {
            setPlace("BI")
        } else {
            setPlace("Nº Agente")
        }
    }, [dec])
    async function handleClick(e: FormEvent) {
        e.preventDefault()
        const dados = await login(email, senha)
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
        <div className="max-w-72 flex-col  m-auto mt-20 flex items-center justify-center p-4 py-8 ">
            <div className="flex flex-col items-center mb-5">
                <img src="../images/logo.png" className="w-10" />
                <small className="text-zinc-500 font-light">Sistema integrado de gestao de multas</small>
            </div>
            <h1 className="text-lg font-semibold text-zinc-700">Iniciar sessão</h1>
            <div className="flex flex-col w-full mt-4">
                <form action="" className="flex items-center flex-col gap-4 w-full" >
                    <div className="w-full flex flex-col gap-2">
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={place} type="text" />
                        <Input value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Password" type="password" />
                    </div>
                    <div className="w-full flex justify-end">
                        <RadioGroup defaultValue="1" onValueChange={(value) =>setDec(value)}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="1" id="option-one" />
                                <Label htmlFor="option-one">BI</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="2" id="option-two" />
                                <Label htmlFor="option-two">Nº Agente</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="w-full">
                        <Button onClick={handleClick} className="w-full" type="button" >{onLoading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}Iniciar sessão</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}