"use client"

import { cmpSenha, PUT_USUARIO } from "@/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { set } from "date-fns";

export function UpdateSenha({ usuario }: { usuario: any }) {
    // const { data, isSuccess } = useQuery({
    //   queryKey: ["multa_id", viatura],
    //   queryFn: () => GET_(viatura),
    // })
    const queryClient = useQueryClient();
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar senha
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para confirmar senha


    const buttonRef = useRef<HTMLButtonElement>(null);
    const inputSenha = useRef<HTMLInputElement>(null);
    const inputSenhaAtual = useRef<HTMLInputElement>(null);
    const inputSenhaConf = useRef<HTMLInputElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(Boolean);
    const [cor, setCor] = useState(String);
    const [div1, setDiv1] = useState(String);
    const [div2, setDiv2] = useState(String);
    
    useEffect(() => {
        if (usuario?.primeiroLogin === true) {
            setIsDialogOpen(true);
        } else {
            setIsDialogOpen(false);
        }
        setDiv1('block');
        setDiv2('hidden');
    }, [usuario]);

    function confirmarSenha() {
        if (inputSenha.current?.value !== inputSenhaConf.current?.value) {
            setCor('border-red-500');
            console.log("3232223")
            return (1);
        } else {
            //  inputSenhaConf.current?.setAttribute('className','rounded-r-none border-green-500');
            setCor('border-green-500');
            return (0);
        }
    }
    const { mutateAsync: upDateSenh } = useMutation({
        onSuccess(data) {
            toast.success('Senha atualizada com sucesso')
            queryClient.invalidateQueries({ queryKey: ["get-pessoa-by-id"] });
            
            setIsDialogOpen(false);
            buttonRef.current?.click();
        },
        mutationFn: PUT_USUARIO,
        onError(error) {
            toast.error('Não foi possível atualizar a senha')
            console.log(error)
        }

    })

    function alterarSenha() {
        if (inputSenha.current?.value === '' || inputSenhaConf.current?.value === '') {
            toast.error('Preencha os campos');
            return;
        } else {
            if (confirmarSenha() === 1) {
                toast.error('As senhas não coincidem');
                return;
            }
        }
        const dados = {
            id: usuario.codUsuario,
            data: {
                senha: inputSenha.current?.value,
                primeiroLogin: 0
            }
        }
        upDateSenh(dados);
    }
    const { mutateAsync: senhaF } = useMutation({
        onSuccess(data) {
            console.log(data);
            if (data.match === false) {
                toast.error('Senha incorreta')
                return;
            }else{
                setDiv1('hidden');
                setDiv2('block');
            }
        },
        mutationFn: cmpSenha,
        onError(error) {
            toast.error('erro ao verificar a senha')
            console.log(error)
        }
    })

    function verifySenhaAtual() {
        if (inputSenhaAtual.current?.value === '') {
            toast.error('Preencha o campo senha atual');
            return;
        } else {
          const  data ={ senha: inputSenhaAtual.current?.value, atual: usuario.senha }
            senhaF(data);
        }

    }
    console.log(usuario);
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"ghost"} className="hover:bg-black/10 hover:text-muted block">Alterar Senha</Button>
            </AlertDialogTrigger>
            <AlertDialogContent id="cont-modal" className="max-h-[600px] overflow-y-auto">
                <AlertDialogHeader className="relative">
                    <AlertDialogTitle><span className="text-slate-700">Alterar senha</span></AlertDialogTitle>
                    <AlertDialogDescription><span className="text-orange-400">Esta senha usarás para entrar no sistema (proteja ela!)</span></AlertDialogDescription>
                </AlertDialogHeader>
                <div >
                    <div className={`${div1}`}>
                        <div className="">
                            {/* Campo para a senha */}
                            <div className="flex">
                                <Input
                                    ref={inputSenhaAtual}
                                    className="rounded-r-none"
                                    placeholder="Senha atual"
                                    type={showPassword ? "text" : "password"} // Condicional para mostrar ou ocultar a senha
                                />
                                <Button

                                    className="rounded-l-none"
                                    onClick={() => setShowPassword(!showPassword)} // Alterna o estado ao clicar
                                    variant={"secondary"}>
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </Button>
                            </div>
                            <div className="flex justify-start gap-4 mt-4">
                            <Button className="bg-slate-600 text-white" onClick={verifySenhaAtual}>Alterar</Button>
                        </div>
                        </div>
                    </div>
                    <div className={`${div2}`}>
                        <div className="">
                            {/* Campo para a senha */}
                            <div className="flex">
                                <Input
                                    ref={inputSenha}
                                    className="rounded-r-none"
                                    placeholder="Nova senha"
                                    type={showPassword ? "text" : "password"} // Condicional para mostrar ou ocultar a senha
                                />
                                <Button

                                    className="rounded-l-none"
                                    onClick={() => setShowPassword(!showPassword)} // Alterna o estado ao clicar
                                    variant={"secondary"}>
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </Button>
                            </div>
                            <br />
                            {/* Campo para confirmar a senha */}
                            <div className="flex">
                                <Input
                                    ref={inputSenhaConf}
                                    className={`rounded-r-none ${cor}`}
                                    placeholder="Confirmar nova senha"
                                    type={showConfirmPassword ? "text" : "password"} // Condicional para mostrar ou ocultar a confirmação

                                />
                                <Button
                                    className="rounded-l-none"
                                    variant={"secondary"}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Alterna o estado ao clicar
                                >
                                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-start gap-4 mt-4">
                            <Button className="bg-slate-600 text-white" onClick={alterarSenha}>Salvar</Button>
                        </div>
                    </div>
                </div>
                <AlertDialogFooter className="">
                    <AlertDialogCancel ref={buttonRef} onClick={()=>{setDiv1("block"), setDiv2("hidden")}} className="">Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}