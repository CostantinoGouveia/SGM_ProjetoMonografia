"use client"
import { Eye, Pencil, Trash2 } from "lucide-react";
import { ReactNode } from "react";
import { TableCell, TableRow } from "../ui/table";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSubContent, ContextMenuTrigger } from "../ui/context-menu";
import { Button } from "../ui/button";
import AlertDelete from "../AlertDelete";
import AutomobilistaForm from "./AutomobilistaForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import ViewDataAutomobilista, { IAutomobilista } from "./ViewDataAutomobilista";
import { Automobilista, Funcionario, Infracao, Tipoinfracao } from "@/entities/interfaces";
import ViewDataAutomobilistaLista from "./ViewDataAutomobilistaLista";
import AlertDeleteAgente from "../AlertDeleteAgente";
import ViewDataAgenteLista from "./ViewDataAgenteLista ";
import ViewDataAInfracaoLista from "./ViewDataInfracaoLista";
import InfracaoForm from "./InfracaoForm";
import AlertDeleteInfracao from "../AlertDeleteInfracao";

export default function RowInfracao({ Infracao }: { Infracao: Tipoinfracao}) {
async function handleDeleteInfracao() {
    
}
function hancleClickViewInfracao() {
    
}
console.log(" fewfe", Infracao)
   return (
                <TableRow key={Infracao.codTipoInfracao}>       
                    <TableCell className="font-medium">
                        <ContextMenu>
                            <ContextMenuTrigger> {Infracao?.descTipoInfracao}</ContextMenuTrigger>
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
                            <ContextMenuTrigger>{Infracao?.valorInfracao}</ContextMenuTrigger>
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
                        <TableCell className="flex gap-1">
                            <ButtonView Infracao={Infracao} handleClick={()=>console.log("")}> <Button variant={"outline"} className=" hover:bg-muted"><Eye className="w-5 h-5 " /></Button></ButtonView>
                            <ButtonEdit><Button variant={"outline"} className=" hover:bg-muted"><Pencil className="w-5 h-5 " /></Button></ButtonEdit>
                            <AlertDeleteInfracao id={Infracao.codTipoInfracao.toString()} handleClick={handleDeleteInfracao}><Button variant={"outline"} className=" hover:bg-muted"><Trash2 className="w-5 h-5 text-red-700" /></Button></AlertDeleteInfracao>
                        </TableCell>
                    </TableRow>
    )
}

function ButtonView({Infracao, handleClick,children}: {children:ReactNode,Infracao: Tipoinfracao, handleClick: () => void}) 
{
    return(
     <Dialog>
        <DialogTrigger>
           {children}
        </DialogTrigger>
        <DialogContent>
            <ViewDataAInfracaoLista data={Infracao} handleClick={handleClick}/>
        </DialogContent>
    </Dialog>
    )
}

function ButtonEdit({children}: {children: ReactNode}) {
    return (
        <Dialog>
                    <DialogTrigger asChild>
                        {children}
                    </DialogTrigger>
                    <DialogContent className="">
                          <DialogHeader className="relative">
                            <DialogTitle><span className="text-slate-700">Editar automobilista</span></DialogTitle>
                          </DialogHeader>
                          <InfracaoForm/>
                    </DialogContent>
                </Dialog>
    )
}