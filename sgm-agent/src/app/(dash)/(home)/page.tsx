"use client"

import useAuthentication from "@/app/hooks/useAuthtication";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { GET_ALERTAS_ROUBO, GET_PESSOA_BY_ID, GET_USUARIO_BY_PESSOA_ID, PUT_USUARIO, VERIFY_MULTAS } from "@/routes";
import { Dialog } from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Eye, EyeOff, LucideNotebook, Notebook, NotebookIcon, NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function HomePage() {
    const router = useRouter();
    const { verifyToken } = useAuthentication();
    useEffect(() => {
        verifyToken();
    }, [verifyToken]);
    const idPessoa = localStorage.getItem('SGM_USER') || '';
    const { data: dataUsuario, isSuccess: isSuccessUsuario } = useQuery({
        queryKey: ['get-usuario-by-pessoa-id', idPessoa],
        queryFn: () => GET_USUARIO_BY_PESSOA_ID(idPessoa),
    });
    const { data: ver, isSuccess: isSuccessVer } = useQuery({
        queryKey: ['verify-multas'],
        queryFn: VERIFY_MULTAS,
    });

    const { data, isSuccess } = useQuery({
        queryKey: ['get-pessoa-by-id', idPessoa],
        queryFn: () => GET_PESSOA_BY_ID(idPessoa)
    });
    const { data: dataAlerta, isSuccess: successAlert } = useQuery({
        queryKey: ['get-alerta'],
        queryFn: () => GET_ALERTAS_ROUBO()
    });

    if (isSuccess) {
        console.log(data);
    }
    function isSameDay(data1: any, data2: any) {
        return (
          data1.getFullYear() === data2.getFullYear() &&
          data1.getMonth() === data2.getMonth() &&
          data1.getDate() === data2.getDate()
        );
      }
    const [res, setRes] = useState<any[]>([]);
    const [re, setRe] = useState<any[]>([]);
    useEffect(() => {
        if (dataAlerta && dataAlerta.length > 0) {
            const resss = dataAlerta?.filter((item: any) => item.status === ("Ativo"));
            setRe(resss);
        }
        if (data && data?.funcionario && data?.funcionario[0]?.multa.length > 0) {
            const results = data?.funcionario[0]?.multa.filter((item: any) =>
                (isSameDay(new Date(item.data), new Date()) && item?.pagamentomulta[0].status !== ("PAGO"))
            );
            setRes(results);
            console.log(results);
        }
    }, [data, dataAlerta]);

    return (
        <div className="px-8">
            <UpdateSenha usuario={dataUsuario} />
            <div className="my-4">
                <Input placeholder="Procurar..." />
            </div>
            <div className="grid grid-cols-3 gap-4 itens-center">
                <Card className=" items-center justify-center pb-2">
                    <CardHeader>
                        <CardTitle className="flex flex-col text-sm md:text-2xl text-center gap-1 items-center justify-center"><Notebook />Multa Diária</CardTitle>
                    </CardHeader>
                    <CardDescription className="text-center text-2xl font-bold">
                        <span>{res.length}</span>
                    </CardDescription>
                </Card>
                <Card className=" items-center justify-center pb-2">
                    <CardHeader>
                        <CardTitle className="flex flex-col text-sm md:text-2xl text-center gap-1 items-center justify-center"><AlertTriangle />Alertas de Roubos</CardTitle>
                    </CardHeader>
                    <CardDescription className="text-center text-2xl font-bold">
                        <span>{re.length}</span>
                    </CardDescription>
                </Card>
                <Card className=" items-center justify-center pb-2">
                    <CardHeader>
                        <CardTitle className="flex flex-col text-sm md:text-2xl gap-1 items-center justify-center text-center"><NotebookPen />Total de multas</CardTitle>
                    </CardHeader>
                    <CardDescription className="text-center text-2xl font-bold">
                        <span>{data?.funcionario[0]?.multa.length}</span>
                    </CardDescription>
                </Card>
            </div>

            <div className="grid grid-cols-3 mt-8  items-end" >
                <div className="flex items-center justify-center"><img className="w-24" src="./images/logo.png" /></div>
                <div className="flex items-center justify-center"><img className="w-24" src="./images/logo.png" /></div>
                <div className="flex items-center justify-center"><img className="w-24" src="./images/logo.png" /></div>
            </div>
        </div>
    )
}

function UpdateSenha({ usuario }: { usuario: any }) {
    // const { data, isSuccess } = useQuery({
    //   queryKey: ["multa_id", viatura],
    //   queryFn: () => GET_(viatura),
    // })
    const queryClient = useQueryClient();
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar senha
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para confirmar senha


    const buttonRef = useRef<HTMLButtonElement>(null);
    const inputSenha = useRef<HTMLInputElement>(null);
    const inputSenhaConf = useRef<HTMLInputElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(Boolean);
    const [cor, setCor] = useState(String);

    useEffect(() => {
        if (usuario?.primeiroLogin === true) {
            setIsDialogOpen(true);
        }else{
            setIsDialogOpen(false);
        }
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
            queryClient.invalidateQueries({queryKey: ["get-usuario-by-pessoa-id"]});
            toast.success('Senha atualizada com sucesso')
            setIsDialogOpen(false);
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
    console.log(usuario);
    return (
        <Dialog open={isDialogOpen}>
            <DialogTrigger asChild>
                <Button ref={buttonRef} variant={"outline"} className="bg-blue-600 text-white flex gap-1 hidden">Alterar Senha</Button>
            </DialogTrigger>
            <DialogContent id="cont-modal" className="max-h-96 overflow-y-auto">
                <DialogHeader className="relative">
                    <DialogTitle><span className="text-slate-700">Digite uma senha</span></DialogTitle>
                    <DialogDescription><span className="text-slate-700 text-orange-400">Esta senha usarás para entrar no sistema (proteja ela!)</span></DialogDescription>
                </DialogHeader>
                <div className="p-4">
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
                    <div className="flex justify-end gap-4 mt-4">
                        <Button className="bg-slate-600 text-white" onClick={alterarSenha}>Salvar</Button>
                    </div>
                </div>
                <ToastContainer />
            </DialogContent>
        </Dialog>
    )
}