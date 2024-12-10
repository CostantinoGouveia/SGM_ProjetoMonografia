"use client"
import { Badge, Eye, Pencil, Trash2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { Button } from "../ui/button";
import AutomobilistaForm, { AutomobilistaType } from "../automobilstas/AutomobilistaForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Multa } from "@/entities/interfaces";
import AlertDeleteViatura from "../AlertDeleteViatura";
import ViewDataViaturaLista from "./ViewDataViaturaLista";
import ViewDataMultaLista from "./ViewDataMultaLista";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_MULTA_BY_ID, PUT_RECLAMACAO } from "@/routes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function RowMulta({ Multa }: { Multa: Multa }) {
    async function handleDeleteMulta() {

    }
    function hancleClickViewAutomobilista() {

    }
    return (
        <TableRow key={Multa?.codMulta}>
            <TableCell className="font-medium">
                <ContextMenu>
                    <ContextMenuTrigger> {Multa?.automobilista?.pessoa?.nome}</ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem>
                            <Button variant={"ghost"}>Visualizar</Button>
                        </ContextMenuItem>
                        <ContextMenuItem>
                            <Button variant={"ghost"}>Editar</Button>
                        </ContextMenuItem>
                        <ContextMenuItem>
                            <Button variant={"ghost"}>Apagar</Button>
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </TableCell>

            <TableCell>
                <ContextMenu>
                    <ContextMenuTrigger>{Multa?.data == null ? "" : format(Multa.data ?? "", "PPP", { locale: ptBR })}</ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem>
                            <Button variant={"ghost"}>Visualizar</Button>
                        </ContextMenuItem>
                        <ContextMenuItem>
                            <Button variant={"ghost"}>Editar</Button>
                        </ContextMenuItem>
                        <ContextMenuItem>
                            <Button variant={"ghost"}>Apagar</Button>
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </TableCell>
            <TableCell>{Multa?.infracao?.length}</TableCell>
            <TableCell >{Multa?.statusTribunal == true ? "R/Tribunal" : ""}</TableCell>
            <TableCell ><label className={` text-white p-1 rounded ${Array.isArray(Multa?.pagamentomulta) && Multa?.pagamentomulta[0]?.status === "PENDENTE" ? "bg-orange-500" : Array.isArray(Multa?.pagamentomulta) && Multa?.pagamentomulta[0]?.status === "PAGO" ? "bg-green-500" : "bg-red-500"}`}>{(Array.isArray(Multa?.pagamentomulta) && Multa?.pagamentomulta[0]?.status === "Nao Pago") ? "N/PAGO" : Array.isArray(Multa?.pagamentomulta) && Multa?.pagamentomulta[0]?.status}</label></TableCell>
            <TableCell><ButtonView Multa={Multa} handleClick={() => console.log("")}> <Button variant={"outline"} className=" hover:bg-muted"><Eye className="w-5 h-5 " /></Button></ButtonView> </TableCell>
            <TableCell className="hidden"><AlertDeleteViatura id={String(Multa?.codMulta)} handleClick={handleDeleteMulta}><Button variant={"outline"} className=" hover:bg-muted"><Trash2 className="w-5 h-5 text-red-700" /></Button></AlertDeleteViatura></TableCell>
        </TableRow>

    )
}

function ButtonView({ Multa, handleClick, children }: { children: ReactNode, Multa?: Multa, handleClick?: () => void }) {
    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                <ViewDataMultaLista data={Multa} handleClick={() => console.log()} />
            </DialogContent>
        </Dialog>
    )
}
function AtenderReclamacao({ idMulta }: { idMulta: string }) {
    const queryClient = useQueryClient();
    const { data, isSuccess } = useQuery({
        queryKey: ["multa_id5", idMulta],
        queryFn: () => GET_MULTA_BY_ID(idMulta),
    })
    const { mutateAsync: atenderReclam } = useMutation({
        mutationFn: PUT_RECLAMACAO,
        onSuccess(data) {
            toast.success('Reclamacao Atendida com sucesso')
            queryClient.invalidateQueries({ queryKey: ["multa_id5"] });
            queryClient.invalidateQueries({ queryKey: ["multa_id2"] });
        },
        onError(error) {
            toast.error('Não foi possível Atender a reclamacao')
            console.log(error)
        }

    })
    const [motivo, setMotivo] = useState<string>("");

    function handleClick(level: number) {
        if (motivo === "") {
            toast.error("Descreva uma Observacao, é obrigatório")
        } else {
            if (level === 1) {
                const dados: any = { observacao: motivo, status: "Negada" }
                atenderReclam({ id: data.reclamacao[0]?.codReclamacao, data: dados })
            } else {
                const dados: any = { observacao: motivo, status: "Aceite" }
                atenderReclam({ id: data.reclamacao[0]?.codReclamacao, data: dados })
            }
            setMotivo("")
            document.getElementById("motivo")?.setAttribute("value", "")
        }
    }


    console.log("ewewd", data);
    console.log(data?.viatura === null ? "N/A" : "asdasd");
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className=" hover:bg-muted"><Pencil className="w-5 h-5 " /></Button>
            </DialogTrigger>
            <DialogContent id="cont-modal" className="max-h-100 overflow-y-auto">
                <DialogHeader className="relative">
                    <DialogTitle><span className="text-slate-700">Reclamação</span></DialogTitle>
                </DialogHeader>
                {isSuccess && data.reclamacao.length > 0 && (

                    <div>
                        <h1 className=" font-bold text-1xl text-blue-600">Detalhes da Reclamação</h1>
                        <div className="grid grid-cols-12">
                            <div className="my-2 col-span-6">
                                <label htmlFor="numeroMatricula" className="block m-2 font-semibold ">Data Feita</label>
                                <input
                                    disabled
                                    type="text"
                                    id="numeroMatricula"
                                    name="numeroMatricula"
                                    value={data.reclamacao[0]?.dataReclamacao?.split("T")[0]}
                                />
                            </div>

                            <div className="my-2 col-span-6">
                                <label htmlFor="status" className="block m-2 font-semibold">Status</label>
                                <label className={`font-semibold text-white rounded p-1 ${data.reclamacao[0]?.status === "Pendente" ? "bg-orange-500" : data.reclamacao[0]?.status === "Aceite" ? "bg-green-500" : data.reclamacao[0]?.status === "Analise" ? "bg-blue-500" : "bg-red-500"}`}>{data.reclamacao[0]?.status}</label>
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="my-2 col-span-6"><Button onClick={() => handleClick(1)} variant={"destructive"} className="flex gap-1">Negar Reclamação</Button></div>
                            <div className="my-2 col-span-6"><Button onClick={() => handleClick(2)} variant={"outline"} className="flex gap-1 bg-green-500 text-white">Aceitar Reclamação</Button></div>
                        </div>

                        <div className="grid grid-cols-12">
                            <div className="my-2 col-span-12">
                                <label htmlFor="descricao" className="block m-2 font-semibold">Motivo</label>
                                <textarea
                                    disabled
                                    id="motivo"
                                    name="motivo"
                                    value={data.reclamacao[0]?.motivo}
                                    className="w-full h-36"
                                />
                            </div>
                        </div>
                        <h1 className=" font-bold text-1xl text-blue-600">Resposta a Reclamação</h1>
                        <div className="grid grid-cols-12">
                            <div className="my-2 col-span-12">
                                <label htmlFor="descricao" className="block m-2 font-semibold">Observação</label>
                                <textarea
                                    id="motivo"
                                    name="motivo"
                                    placeholder="Descreva Observação, do porquê negou ou aceitou a Reclamação"
                                    onChange={(e) => setMotivo(e.target.value)}
                                    className="w-full h-36"
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className=""><span className="text-red-400">Sem reclamacao feita</span></div>
                <ToastContainer />
            </DialogContent>
        </Dialog>
    )
}

function ButtonEdit({ children }: { children: ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader className="relative">
                    <DialogTitle><span className="text-slate-700">Editar automobilista</span></DialogTitle>
                </DialogHeader>
                <AutomobilistaForm />
            </DialogContent>
        </Dialog>
    )
}