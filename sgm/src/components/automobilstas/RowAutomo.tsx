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
import { Automobilista } from "@/entities/interfaces";
import ViewDataAutomobilistaLista from "./ViewDataAutomobilistaLista";

export default function RowAutomo({ automobilista }: { automobilista: Automobilista}) {
async function handleDeleteAutomobilista() {
    
}
function hancleClickViewAutomobilista() {
    
}
console.log(" fewfe", automobilista)
   return (
                <TableRow key={automobilista.codAutomobilista}>       
                    <TableCell className="font-medium">
                        <ContextMenu>
                            <ContextMenuTrigger> {automobilista.pessoa.nome}</ContextMenuTrigger>
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
                            <ContextMenuTrigger>{automobilista.pessoa.contacto?.email1}</ContextMenuTrigger>
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
                        <TableCell>{automobilista.cartaconducao.numeroCarta}</TableCell>
                        <TableCell >{automobilista.pessoa.bi.numeroBI}</TableCell>
                        <TableCell className="flex gap-1">
                            <ButtonView automobilista={automobilista} handleClick={()=>console.log("")}> <Button variant={"outline"} className=" hover:bg-muted"><Eye className="w-5 h-5 " /></Button></ButtonView>
                            <ButtonEdit><Button variant={"outline"} className=" hover:bg-muted"><Pencil className="w-5 h-5 " /></Button></ButtonEdit>
                            <AlertDelete id={automobilista.codAutomobilista} handleClick={handleDeleteAutomobilista}><Button variant={"outline"} className=" hover:bg-muted"><Trash2 className="w-5 h-5 text-red-700" /></Button></AlertDelete>
                        </TableCell>
                    </TableRow>
    )
}

function ButtonView({automobilista, handleClick,children}: {children:ReactNode,automobilista: Automobilista, handleClick: () => void}) 
{
    return(
     <Dialog>
        <DialogTrigger>
           {children}
        </DialogTrigger>
        <DialogContent>
            <ViewDataAutomobilistaLista data={automobilista} handleClick={handleClick}/>
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
                          <AutomobilistaForm/>
                    </DialogContent>
                </Dialog>
    )
}